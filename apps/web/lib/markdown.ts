import { marked } from 'marked';

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
