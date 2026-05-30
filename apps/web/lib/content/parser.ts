import type {
    GuideCodeBlock,
    GuideDocument,
    GuideItem,
    GuideItemField,
    GuideMeta,
    GuideSection,
    ParseGuideMarkdownOptions,
} from './types';

type TextField = 'sectionLead' | 'description' | 'warn' | 'output' | 'supplement';
type ActiveField = TextField | 'code';

type MutableItem = {
  title: string;
  fieldOrder: GuideItemField[];
  descriptionLines: string[];
  warnLines: string[];
  outputLines: string[];
  supplementLines: string[];
  codeBlocks: GuideCodeBlock[];
};

type MutableSection = {
  title: string;
  leadLines: string[];
  items: GuideItem[];
};

type OpenCodeFence = {
  lang: string;
  lines: string[];
  openedAtLine: number;
};

const SUBSECTION_LABELS: Record<string, ActiveField> = {
  説明: 'description',
  注意: 'warn',
  コード: 'code',
  出力: 'output',
  補足: 'supplement',
};

export class GuideMarkdownParseError extends Error {
  readonly line: number;
  readonly sourcePath?: string;

  constructor(message: string, line: number, sourcePath?: string) {
    super(sourcePath ? `${sourcePath}:${line}: ${message}` : `line ${line}: ${message}`);
    this.name = 'GuideMarkdownParseError';
    this.line = line;
    this.sourcePath = sourcePath;
  }
}

export function parseGuideMarkdown(
  meta: GuideMeta,
  markdown: string,
  options: ParseGuideMarkdownOptions = {},
): GuideDocument {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const sections: GuideSection[] = [];

  let currentSection: MutableSection | null = null;
  let currentItem: MutableItem | null = null;
  let currentField: ActiveField | null = null;
  let openCodeFence: OpenCodeFence | null = null;

  const trackField = (field: GuideItemField) => {
    if (!currentItem || currentItem.fieldOrder.includes(field)) return;
    currentItem.fieldOrder.push(field);
  };

  const fail = (message: string, line: number): never => {
    throw new GuideMarkdownParseError(message, line, options.sourcePath);
  };

  const appendTextLine = (target: TextField, value: string) => {
    if (target === 'sectionLead') {
      if (!currentSection) return;
      currentSection.leadLines.push(value);
      return;
    }

    if (!currentItem) return;

    // Track field order on first non-empty content (handles implicit description without H4)
    if (value.trim()) {
      trackField(target as GuideItemField);
    }

    switch (target) {
      case 'description':
        currentItem.descriptionLines.push(value);
        break;
      case 'warn':
        currentItem.warnLines.push(value);
        break;
      case 'output':
        currentItem.outputLines.push(value);
        break;
      case 'supplement':
        currentItem.supplementLines.push(value);
        break;
      default:
        break;
    }
  };

  const finalizeItem = (sectionIndex: number) => {
    if (!currentSection || !currentItem) return;

    const itemIndex = currentSection.items.length + 1;
    const description = normalizeMarkdownBlock(currentItem.descriptionLines);
    const warn = normalizeMarkdownBlock(currentItem.warnLines);
    const output = normalizeMarkdownBlock(currentItem.outputLines);
    const supplement = normalizeMarkdownBlock(currentItem.supplementLines);

    currentSection.items.push({
      id: `section-${sectionIndex}-item-${itemIndex}`,
      title: currentItem.title,
      description: description || undefined,
      warn: warn || undefined,
      output: output || undefined,
      supplement: supplement || undefined,
      codeBlocks: currentItem.codeBlocks,
      fieldOrder: currentItem.fieldOrder,
      searchText: createSearchText([
        currentSection.title,
        currentItem.title,
        description,
        warn,
        output,
        supplement,
        currentItem.codeBlocks.map((codeBlock) => codeBlock.code).join('\n'),
      ]),
    });

    currentItem = null;
  };

  const finalizeSection = () => {
    if (!currentSection) return;

    const sectionIndex = sections.length + 1;
    finalizeItem(sectionIndex);

    if (currentSection.items.length === 0) {
      fail(`章「${currentSection.title}」に項目がありません`, lines.length);
    }

    sections.push({
      id: `section-${sectionIndex}`,
      num: sectionIndex,
      title: currentSection.title,
      lead: normalizeMarkdownBlock(currentSection.leadLines) || undefined,
      items: currentSection.items,
    });

    currentSection = null;
  };

  for (let index = 0; index < lines.length; index += 1) {
    const lineNumber = index + 1;
    const rawLine = lines[index];

    if (openCodeFence) {
      if (isFenceLine(rawLine)) {
        if (!currentItem) {
          throw new GuideMarkdownParseError(
            'コードブロックが項目に属していません',
            lineNumber,
            options.sourcePath,
          );
        }

        currentItem.codeBlocks.push({
          lang: openCodeFence.lang,
          code: stripTrailingBlankLines(openCodeFence.lines).join('\n'),
        });
        trackField('code');
        openCodeFence = null;
        continue;
      }

      openCodeFence.lines.push(rawLine);
      continue;
    }

    if (isFenceLine(rawLine)) {
      if (currentField !== 'code') {
        fail('コードブロックは「#### コード」セクションの中に置いてください', lineNumber);
      }

      const lang = rawLine.replace(/^```/, '').trim();
      if (!lang) {
        fail('コードブロックには言語識別子が必要です', lineNumber);
      }

      openCodeFence = {
        lang,
        lines: [],
        openedAtLine: lineNumber,
      };
      continue;
    }

    const heading = parseHeading(rawLine);
    if (heading) {
      const { depth, text } = heading;

      switch (depth) {
        case 1:
          currentField = null;
          break;
        case 2:
          finalizeSection();
          currentSection = {
            title: text,
            leadLines: [],
            items: [],
          };
          currentItem = null;
          currentField = 'sectionLead';
          break;
        case 3: {
          if (!currentSection) {
            fail('項目見出しの前に章見出しが必要です', lineNumber);
          }

          const sectionIndex = sections.length + 1;
          finalizeItem(sectionIndex);
          currentItem = {
            title: text,
            fieldOrder: [],
            descriptionLines: [],
            warnLines: [],
            outputLines: [],
            supplementLines: [],
            codeBlocks: [],
          };
          currentField = 'description';
          break;
        }
        case 4: {
          if (!currentItem) {
            fail('小見出しの前に項目見出しが必要です', lineNumber);
          }

          const nextField = SUBSECTION_LABELS[text];
          if (!nextField) {
            fail(`未対応の小見出しです: ${text}`, lineNumber);
          }

          currentField = nextField;
          trackField(nextField as GuideItemField);
          break;
        }
        default:
          fail(`見出しレベル ${depth} は未対応です`, lineNumber);
      }

      continue;
    }

    if (!rawLine.trim()) {
      if (currentField && currentField !== 'code') {
        appendTextLine(currentField, rawLine);
      }
      continue;
    }

    if (!currentSection) {
      fail('本文は章見出し（##）の後に記述してください', lineNumber);
    }

    if (!currentField) {
      currentField = currentItem ? 'description' : 'sectionLead';
    }

    if (currentField === 'code') {
      fail('「#### コード」セクションには言語指定付きコードブロックのみを記述してください', lineNumber);
    }

    if (currentField !== 'code') {
      appendTextLine(currentField, rawLine);
    }
  }

  if (openCodeFence) {
    fail('コードブロックが閉じられていません', openCodeFence.openedAtLine);
  }

  finalizeSection();

  if (sections.length === 0) {
    fail('章見出し（##）が 1 つもありません', 1);
  }

  return {
    ...meta,
    sections,
  };
}

function parseHeading(line: string): { depth: number; text: string } | null {
  const match = /^(#{1,6})\s+(.*)$/.exec(line);
  if (!match) return null;

  const text = match[2].trim();
  if (!text) return null;

  return {
    depth: match[1].length,
    text,
  };
}

function isFenceLine(line: string): boolean {
  return line.trimStart().startsWith('```');
}

function normalizeMarkdownBlock(lines: string[]): string {
  return stripOuterBlankLines(lines).join('\n').trim();
}

function stripOuterBlankLines(lines: string[]): string[] {
  let start = 0;
  let end = lines.length;

  while (start < end && !lines[start].trim()) {
    start += 1;
  }

  while (end > start && !lines[end - 1].trim()) {
    end -= 1;
  }

  return lines.slice(start, end);
}

function stripTrailingBlankLines(lines: string[]): string[] {
  let end = lines.length;

  while (end > 0 && !lines[end - 1].trim()) {
    end -= 1;
  }

  return lines.slice(0, end);
}

function createSearchText(parts: string[]): string {
  return parts
    .map((part) => part.trim())
    .filter(Boolean)
    .join('\n');
}