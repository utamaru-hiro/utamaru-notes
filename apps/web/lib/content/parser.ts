import type {
    GuideDocument,
    GuideItem,
    GuideItemBlock,
    GuideMeta,
    GuideSection,
    ParseGuideMarkdownOptions,
} from './types';

type TextBlockType = 'description' | 'warn' | 'output' | 'supplement';
type ActiveField = 'sectionLead' | TextBlockType | 'code';

type CurrentTextBlock = { type: TextBlockType; lines: string[] };

type MutableItem = {
  title: string;
  blocks: GuideItemBlock[];
  currentTextBlock: CurrentTextBlock | null;
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

  const fail = (message: string, line: number): never => {
    throw new GuideMarkdownParseError(message, line, options.sourcePath);
  };

  const flushTextBlock = () => {
    if (!currentItem?.currentTextBlock) return;
    const { type, lines } = currentItem.currentTextBlock;
    const text = normalizeMarkdownBlock(lines);
    if (text) {
      currentItem.blocks.push({ type, text });
    }
    currentItem.currentTextBlock = null;
  };

  const appendTextLine = (target: ActiveField, value: string) => {
    if (target === 'sectionLead') {
      if (!currentSection) return;
      currentSection.leadLines.push(value);
      return;
    }

    if (!currentItem || target === 'code') return;

    if (!currentItem.currentTextBlock) {
      currentItem.currentTextBlock = { type: target as TextBlockType, lines: [] };
    }
    currentItem.currentTextBlock.lines.push(value);
  };

  const finalizeItem = (sectionIndex: number) => {
    if (!currentSection || !currentItem) return;

    flushTextBlock();

    const itemIndex = currentSection.items.length + 1;
    const searchParts: string[] = [
      currentSection.title,
      currentItem.title,
      ...currentItem.blocks.map((b) => (b.type === 'code' ? b.code : b.text)),
    ];

    currentSection.items.push({
      id: `section-${sectionIndex}-item-${itemIndex}`,
      title: currentItem.title,
      blocks: currentItem.blocks,
      searchText: createSearchText(searchParts),
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

        currentItem.blocks.push({
          type: 'code',
          lang: openCodeFence.lang,
          code: stripTrailingBlankLines(openCodeFence.lines).join('\n'),
        });
        openCodeFence = null;
        continue;
      }

      openCodeFence.lines.push(rawLine);
      continue;
    }

    if (isFenceLine(rawLine)) {
      if (currentField !== 'code') {
        fail('コードブロックは「#### コード」または「##### コード」セクションの中に置いてください', lineNumber);
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
            blocks: [],
            currentTextBlock: null,
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

          flushTextBlock();
          currentField = nextField;
          break;
        }
        case 5:
        case 6: {
          if (!currentItem) {
            fail('小見出しの前に項目見出しが必要です', lineNumber);
          }

          flushTextBlock();

          const subField = SUBSECTION_LABELS[text];
          if (subField) {
            // 「##### コード」「###### 注意」等はH4と同じフィールド切り替えとして扱う
            currentField = subField;
          } else {
            currentItem!.blocks.push({ type: 'heading', level: depth as 5 | 6, text });
            currentField = 'description';
          }
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