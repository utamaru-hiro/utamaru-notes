# utamaru-notes

`utamaru-notes` は、`packages/content/guides` に `meta.ts` と `guide.md` を配置すると、`apps/web` が静的ページを自動生成する構成です。

## ガイド追加手順

1. `packages/content/guides/<slug>/` フォルダを作成する。
2. `meta.ts` を作成する。
3. `guide.md` を作成する。
4. `npm run build` を実行し、トップページと `/guides/<slug>` が生成されることを確認する。

## meta.ts の書き方

必須キーは以下です。

- `slug`
- `title`
- `version`
- `lead`
- `heroEmoji`
- `accent`
- `accent2`
- `bgGradientTop`
- `bgRadialLeft`
- `bgRadialRight`
- `badgeGradient`
- `cardSummary`

```ts
export const guideMeta = {
  slug: 'typescript',
  title: 'TypeScript ガイド',
  version: 'v1.0',
  lead: '型安全な JavaScript 開発のための入門ガイド',
  heroEmoji: '📘',
  accent: '#0d9488',
  accent2: '#14b8a6',
  bgGradientTop: 'linear-gradient(180deg, #f0fdfa 0%, #ffffff 60%)',
  bgRadialLeft: 'radial-gradient(circle at 20% 20%, rgba(20,184,166,0.12), transparent 55%)',
  bgRadialRight: 'radial-gradient(circle at 80% 10%, rgba(13,148,136,0.12), transparent 50%)',
  badgeGradient: 'linear-gradient(135deg, #0d9488, #14b8a6)',
  cardSummary: 'TypeScript の基本構文と実践ポイントを学ぶ',
} as const;
```

## guide.md の見出し規約

- `##` : 章
- `###` : 項目
- `####` : 項目内セクション

`####` で利用できるセクション名は次です。

- `説明`
- `注意`
- `コード`
- `出力`
- `補足`

補足事項:

- `#### コード` の直下には言語指定付き fenced code block（例: ```ts）だけを書いてください。
- `注意`・`出力`・`補足` は任意です。

## 検証コマンド

```bash
npm run validate-content
npm run lint
npm run type-check
npm run build
```

`npm run validate-content` は `packages/content/guides` 配下の全ガイドを parser/loader で強制検証し、違反があれば終了コード 1 で停止します。

## エラー表示（位置付き）

Markdown 規約違反時は、`apps/web/lib/content/parser.ts` の `GuideMarkdownParseError` が `ファイルパス:行番号: メッセージ` 形式でエラーを返します。

例:

```text
packages/content/guides/typescript/guide.md:42: 未対応の小見出しです: 目的
```