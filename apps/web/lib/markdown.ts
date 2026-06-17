import katex from 'katex';
import { marked } from 'marked';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// $$...$$ ブロック数式
marked.use({
  extensions: [
    {
      name: 'blockMath',
      level: 'block',
      start(src) {
        return src.indexOf('$$');
      },
      tokenizer(src) {
        const match = /^\$\$([\s\S]+?)\$\$/.exec(src);
        if (match) {
          return { type: 'blockMath', raw: match[0], math: match[1].trim() };
        }
        return undefined;
      },
      renderer(token) {
        return katex.renderToString(token.math as string, {
          displayMode: true,
          throwOnError: false,
          output: 'html',
        });
      },
    },
    {
      name: 'inlineMath',
      level: 'inline',
      start(src) {
        return src.indexOf('$');
      },
      tokenizer(src) {
        const match = /^\$([^$\n]+?)\$/.exec(src);
        if (match) {
          return { type: 'inlineMath', raw: match[0], math: match[1].trim() };
        }
        return undefined;
      },
      renderer(token) {
        return katex.renderToString(token.math as string, {
          displayMode: false,
          throwOnError: false,
          output: 'html',
        });
      },
    },
  ],
});

// 外部リンクを新しいタブで開くカスタムレンダラー
marked.use({
  renderer: {
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      const titleAttr = title ? ` title="${title}"` : '';
      const isExternal = href.startsWith('http://') || href.startsWith('https://');
      const targetAttr = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
      return `<a href="${href}"${titleAttr}${targetAttr}>${text}</a>`;
    },
    image({ href, text }) {
      const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
      const src = href.startsWith('/') ? `${base}${href}` : href;
      return `<img src="${src}" alt="${text}" class="guide-diagram" loading="lazy"/>`;
    },
  },
  gfm: true,
});

/**
 * Markdown テキストを HTML 文字列に変換する。
 * コンテンツはローカルファイルのみを使用するため dangerouslySetInnerHTML で安全に使用できる。
 */
export function renderMarkdown(text: string): string {
  return marked.parse(text) as string;
}

/**
 * プレーンテキスト内の $...$ をインラインKaTeXに変換する。
 * title属性など markdown パースを通さない短文向け。
 */
export function renderInlineMathText(text: string): string {
  const re = /\$([^$\n]+?)\$/g;
  let cursor = 0;
  let out = '';
  let match = re.exec(text);

  while (match) {
    const [raw, math] = match;
    const start = match.index;
    out += escapeHtml(text.slice(cursor, start));
    out += katex.renderToString(math.trim(), {
      displayMode: false,
      throwOnError: false,
      output: 'html',
    });
    cursor = start + raw.length;
    match = re.exec(text);
  }

  out += escapeHtml(text.slice(cursor));
  return out;
}
