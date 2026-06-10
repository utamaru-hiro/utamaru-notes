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
- `lead`
- `heroEmoji`
- `cardSummary`

```ts
export const guideMeta = {
  slug: 'typescript',
  title: 'TypeScript ガイド',
  lead: '型安全な JavaScript 開発のための入門ガイド',
  heroEmoji: '📘',
  cardSummary: 'TypeScript の基本構文と実践ポイントを学ぶ',
} as const;
```

## guide.md の見出し規約

- `##` : 章
- `###` : 項目
- `####` : 項目内の小見出し（任意の名前で使用可能）

## コードブロック

言語識別子付き fenced code block をそのまま書けます。`####` の直後に書く必要はありません。

````md
```ts
const x: number = 1;
```
````

## コールアウト

注意・補足・出力などの強調ブロックはコールアウト構文で記述します。

```md
> [!warning]
> 注意事項をここに書く。

> [!info]
> 補足情報をここに書く。

> [!output]
> 出力結果をここに書く。
```

| 種別 | 表示ラベル |
|---|---|
| `[!warning]` / `[!warn]` | 注意 |
| `[!information]` / `[!info]` | info |
| `[!theorem]` | info（タイトル先頭に「定理」付与） |
| `[!proposition]` | info（タイトル先頭に「命題」付与） |
| `[!lemma]` | info（タイトル先頭に「系」付与） |
| `[!output]` | 出力 |

コールアウト内は複数行を `> ` プレフィックスで継続できます。空行（`>` のない行）で終了します。

## 記述例

```md
## 章タイトル

### 項目タイトル

説明文はここに直接書きます。**太字**や`インラインコード`も使えます。

#### 小見出し

小見出し以下の説明文。

```ts
const example = 'code';
```

> [!warning]
> 注意事項。

> [!info]
> 補足情報。
```

## レガシー構文（後方互換）

以下の `####` 見出し名は引き続き動作しますが、新規ガイドでは上記の記法を推奨します。

- `#### 説明` — 説明ブロック（省略可、直接書くのを推奨）
- `#### 注意` — `> [!warning]` 推奨
- `#### 補足` — `> [!info]` 推奨
- `#### 出力` — `> [!output]` 推奨
- `#### コード` — 不要（fenced code block を直書き推奨）

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
packages/content/guides/typescript/guide.md:42: コールアウトは項目（###）の中に記述してください
```