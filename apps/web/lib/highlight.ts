import { codeToHtml } from 'shiki';

const SUPPORTED_LANGS = new Set([
  'typescript', 'ts', 'javascript', 'js', 'jsx', 'tsx',
  'json', 'bash', 'sh', 'zsh', 'css', 'html', 'markdown', 'md',
  'yaml', 'yml', 'toml', 'go', 'python', 'py', 'rust', 'sql', 'text',
]);

function normalizeLang(lang: string): string {
  const l = lang.toLowerCase().trim();
  return SUPPORTED_LANGS.has(l) ? l : 'text';
}

export async function highlightCode(code: string, lang: string): Promise<string> {
  return codeToHtml(code, {
    lang: normalizeLang(lang),
    theme: 'one-dark-pro',
  });
}
