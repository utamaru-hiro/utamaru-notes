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

## コールアウト（推奨: タグ構文）

数学系（定理・命題・系・定義・例・証明）と出力は、タグ構文で記述することを推奨します。

```md
<theorem title="カラテオドリの拡張定理">
フィールド $\mathcal{A}$ で定義された確率 $P$ は、
$\sigma(\mathcal{A})$ 上へ一意に拡張できる。
</theorem>

<def title="$\mathcal{G}$ に対する条件付き平均">
$$
E[X|\mathcal{G}]=\sum_{i=1}^{p}x_iP(A_i|\mathcal{G})
$$
</def>

<example title="大数の法則の簡単な例">
独立同分布な $X_1,\dots,X_n$ の標本平均は、
$$
\overline{X}_n=\frac{1}{n}\sum_{i=1}^nX_i
$$
で定義される。
</example>

<proof>
任意の $\varepsilon>0$ に対して
$$
P(|\overline{X}_n-\mu|>\varepsilon)\to0
$$
を示せばよい。
</proof>

<output title="実行結果 $n=100$">
mean=0.0042
variance=0.9981
</output>
```

### タグ種別

| タグ | 表示ラベル |
|---|---|
| `<theorem>` | info（タイトル先頭に「定理」付与） |
| `<proposition>` | info（タイトル先頭に「命題」付与） |
| `<lemma>` | info（タイトル先頭に「系」付与） |
| `<definition>` / `<def>` | info（タイトル先頭に「定義」付与） |
| `<example>` | info（タイトル先頭に「例」付与） |
| `<proof>` | 本文表示（先頭に **[証明]**、末尾に **[証明終]** を自動付与） |
| `<output>` | 出力 |

### title 属性

- `title="..."` でタイトルを指定できます（省略可）。
- `title` ではインライン数式 `$...$` が使えます。
- `title` では `$$...$$` は使えません（本文で使用してください）。
- `<proof>` は `title` 属性を使わず、本文のみを記述してください。

### 本文内の数式

- タグ本文は通常の Markdown と同じ扱いです。
- `$...$` と `$$...$$` の両方を使えます。

### 既存コールアウト記法（後方互換）

以下の記法も当面は利用できます。

| 種別 | 表示ラベル |
|---|---|
| `[!warning]` / `[!warn]` | 注意 |
| `[!information]` / `[!info]` | info |
| `[!theorem]` | info（タイトル先頭に「定理」付与） |
| `[!proposition]` | info（タイトル先頭に「命題」付与） |
| `[!lemma]` | info（タイトル先頭に「系」付与） |
| `[!definition]` / `[!def]` | info（タイトル先頭に「定義」付与） |
| `[!output]` | 出力 |

`> [!...]` 構文を使う場合、複数行は `> ` プレフィックスで継続できます。空行（`>` のない行）で終了します。

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

<theorem title="チェビシェフの不等式">
任意の $\varepsilon > 0$ に対して
$$
P(|X-\mu| \ge \varepsilon) \le \frac{V[X]}{\varepsilon^2}
$$
</theorem>

<proof>
マルコフの不等式を $Y=(X-\mu)^2$ に適用する。
</proof>

<output title="実行結果 $n=100$">
mean=0.0042
</output>
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
packages/content/guides/typescript/guide.md:42: コールアウトまたはタグは項目（###）の中に記述してください
```