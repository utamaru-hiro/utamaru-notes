# Next.js ガイド

## Next.js とは・プロジェクト構成

### Next.js の概要

#### 説明

Next.js は Vercel が開発した React ベースのフルスタックフレームワークです。ルーティング・データ取得・最適化・デプロイを統合しており、React だけでは別途用意が必要な機能を標準で提供します。Next.js 13 以降、従来の Pages Router に加えて App Router が導入され、15 では App Router が推奨構成です。

#### 注意

Pages Router（`pages/` ディレクトリ）と App Router（`app/` ディレクトリ）は同一プロジェクトに共存できますが、新規プロジェクトでは App Router を選ぶことを推奨します。本ガイドは App Router に特化して解説します。

### プロジェクトの作成

#### 説明

`create-next-app` でプロジェクトを作成します。TypeScript・ESLint・Tailwind CSS などのオプションを対話形式で選択できます。

#### コード

```bash
npx create-next-app@latest my-app
cd my-app
npm run dev
```

### ディレクトリ構成

#### 説明

App Router プロジェクトの標準的なディレクトリ構成です。`app/` がルーティングの起点で、ファイル名がルールに対応しています。

#### コード

```text
my-app/
├── app/
│   ├── layout.tsx        # ルートレイアウト（必須）
│   ├── page.tsx          # / ルート
│   ├── globals.css
│   └── posts/
│       ├── page.tsx      # /posts
│       └── [id]/
│           └── page.tsx  # /posts/[id]
├── components/           # 共有コンポーネント
├── lib/                  # ユーティリティ
├── public/               # 静的ファイル
├── next.config.ts
└── package.json
```

### next.config.ts の基本設定

#### 説明

`next.config.ts` でビルド設定をカスタマイズします。TypeScript で型補完が効きます。

#### コード

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 静的エクスポート（GitHub Pages など向け）
  // output: 'export',

  // 画像の外部ホストを許可
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'example.com' },
    ],
  },

  // 実験的機能（Next.js 15 では多くが安定版に）
  // experimental: {},
};

export default nextConfig;
```

## App Router の基礎

### ファイルベースルーティング

#### 説明

App Router では `app/` 配下のディレクトリ構造が URL に対応します。ルートセグメント（フォルダ）の中に `page.tsx` を置くとそのパスでアクセス可能になります。

#### コード

```text
app/
├── page.tsx          →  /
├── about/
│   └── page.tsx      →  /about
├── blog/
│   ├── page.tsx      →  /blog
│   └── [slug]/
│       └── page.tsx  →  /blog/:slug
└── dashboard/
    ├── layout.tsx    →  /dashboard 以下で共有されるレイアウト
    ├── page.tsx      →  /dashboard
    └── settings/
        └── page.tsx  →  /dashboard/settings
```

### リンクとナビゲーション

#### 説明

ページ間の遷移には `next/link` の `<Link>` コンポーネントを使います。クライアントサイドナビゲーションによりページ全体の再読み込みなしに遷移します。プログラマティックなナビゲーションには `useRouter` を使います。

#### 注意

`useRouter` は `'use client'` の Client Components でのみ使えます。Server Components では `redirect()` 関数を使います。

#### コード

```tsx
// Link コンポーネント
import Link from 'next/link';

export default function Nav() {
  return (
    <nav>
      <Link href="/">ホーム</Link>
      <Link href="/about">About</Link>
      {/* 動的ルート */}
      <Link href={`/posts/${post.id}`}>{post.title}</Link>
    </nav>
  );
}

// useRouter（Client Component）
'use client';
import { useRouter } from 'next/navigation';

export function GoBackButton() {
  const router = useRouter();
  return <button onClick={() => router.back()}>戻る</button>;
}
```

### usePathname・useSearchParams

#### 説明

現在のパスやクエリパラメータを読み取るフックです。どちらも Client Components でのみ使えます。`useSearchParams` は `<Suspense>` でラップが必要です。

#### コード

```tsx
'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SearchInfo() {
  const pathname = usePathname();       // 例: "/posts"
  const searchParams = useSearchParams();
  const query = searchParams.get('q'); // ?q=... の値

  return <p>パス: {pathname}、検索: {query}</p>;
}

// useSearchParams は Suspense でラップ必須
export default function Page() {
  return (
    <Suspense fallback={null}>
      <SearchInfo />
    </Suspense>
  );
}
```

## レイアウト

### layout.tsx の役割

#### 説明

`layout.tsx` は配下の全ページに共通して適用されるラッパーコンポーネントです。ナビゲーションバー・フッター・プロバイダーなど、ページ遷移をまたいで保持したい UI をここに置きます。`children` として各ページが渡されます。

#### 注意

ルートレイアウト（`app/layout.tsx`）は必須で、`<html>` と `<body>` タグを含む必要があります。ネストしたレイアウトには `<html>/<body>` は書きません。

#### コード

```tsx
// app/layout.tsx（ルートレイアウト）
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My App',
  description: 'アプリの説明',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <header>ナビゲーション</header>
        <main>{children}</main>
        <footer>フッター</footer>
      </body>
    </html>
  );
}
```

### ネストしたレイアウト

#### 説明

サブディレクトリに `layout.tsx` を置くと、そのセグメント以下にのみ適用されるレイアウトを追加できます。ルートレイアウトの内側にネストされる形で組み合わさります。

#### コード

```tsx
// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex' }}>
      <aside>
        <nav>
          <a href="/dashboard">概要</a>
          <a href="/dashboard/settings">設定</a>
        </nav>
      </aside>
      <section>{children}</section>
    </div>
  );
}

// ルート構造:
// RootLayout > DashboardLayout > page.tsx
```

### template.tsx との違い

#### 説明

`template.tsx` は `layout.tsx` と似ていますが、ページ遷移のたびに新しいインスタンスが作られます（状態がリセットされる）。アニメーションのトリガーやページごとに初期化が必要な処理に使います。

#### コード

```tsx
// app/dashboard/template.tsx
// ページ遷移のたびにマウント・アンマウントされる
export default function DashboardTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fade-in">
      {children}
    </div>
  );
}
```

## 特殊ファイル

### page.tsx・loading.tsx

#### 説明

`page.tsx` はそのルートのページ本体です。`loading.tsx` はページ読み込み中に表示されるフォールバック UI で、Next.js が自動的に `<Suspense>` でラップします。

#### コード

```tsx
// app/posts/page.tsx
export default async function PostsPage() {
  const posts = await fetchPosts(); // サーバーサイドで実行
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

// app/posts/loading.tsx（自動的に Suspense フォールバックとして使われる）
export default function Loading() {
  return <p>読み込み中...</p>;
}
```

### error.tsx・not-found.tsx

#### 説明

`error.tsx` はレンダリングエラーをキャッチするエラーバウンダリです。`'use client'` が必要です。`not-found.tsx` は `notFound()` 関数が呼ばれたときや 404 時に表示されます。

#### コード

```tsx
// app/posts/error.tsx
'use client';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <p>エラーが発生しました: {error.message}</p>
      <button onClick={reset}>再試行</button>
    </div>
  );
}

// app/posts/[id]/not-found.tsx
export default function NotFound() {
  return <p>投稿が見つかりません。</p>;
}
```

### notFound() と redirect()

#### 説明

Server Components から `notFound()` を呼ぶと最寄りの `not-found.tsx` を表示します。`redirect()` は指定のパスへリダイレクトします。どちらも例外を投げる実装のため、`try/catch` の外で呼びます。

#### コード

```tsx
import { notFound, redirect } from 'next/navigation';

async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await fetchPost(id);

  if (!post) notFound();           // not-found.tsx を表示
  if (post.draft) redirect('/');   // ルートへリダイレクト

  return <article>{post.title}</article>;
}
```

## Server Components と Client Components

### 2 種類のコンポーネント

#### 説明

App Router のコンポーネントはデフォルトで Server Components です。`'use client'` ディレクティブを先頭に書くと Client Component になります。

| 項目 | Server Component | Client Component |
|------|-----------------|-----------------|
| 実行場所 | サーバーのみ | サーバー + ブラウザ |
| useState/useEffect | ❌ | ✅ |
| DB・ファイルアクセス | ✅ | ❌ |
| バンドルサイズへの影響 | なし | あり |

#### 注意

Client Component に `import` された Server Component は自動的に Client Component になりません。Server Component は `children` として Client Component に渡すことで境界を維持できます。

#### コード

```tsx
// app/page.tsx（Server Component：デフォルト）
import { ClientButton } from './ClientButton';

async function Page() {
  const data = await fetchFromDB(); // サーバーサイドのみ
  return (
    <div>
      <h1>{data.title}</h1>
      {/* Client Component に Server Component の出力を children で渡す */}
      <ClientButton>
        <span>{data.label}</span>
      </ClientButton>
    </div>
  );
}

// app/ClientButton.tsx
'use client';
import { useState } from 'react';
import type { ReactNode } from 'react';

export function ClientButton({ children }: { children: ReactNode }) {
  const [clicked, setClicked] = useState(false);
  return (
    <button onClick={() => setClicked(true)}>
      {clicked ? '押した！' : children}
    </button>
  );
}
```

### コンポーネントの境界設計

#### 説明

「できるだけ末端の小さなコンポーネントだけを Client Component にする」のが基本方針です。ページの大部分を Server Component にすることで、バンドルサイズを最小化できます。

#### コード

```tsx
// ✅ 良い例: インタラクティブな部分だけ Client Component に切り出す
// app/posts/[id]/page.tsx（Server Component）
import { LikeButton } from '@/components/LikeButton'; // Client Component

async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await fetchPost(id);
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <LikeButton postId={id} initialCount={post.likes} />
    </article>
  );
}

// ❌ 悪い例: ページ全体を Client Component にする
'use client'; // これによりページ全体がブラウザのバンドルに含まれる
export default function PostPage() { /* ... */ }
```

## データ取得

### Server Component でのデータ取得

#### 説明

Server Components は `async/await` が使えるため、コンポーネント内で直接データを取得できます。Next.js の `fetch` は標準 `fetch` を拡張しており、キャッシュ制御オプションを追加で持ちます。

#### コード

```tsx
// app/posts/page.tsx
type Post = { id: number; title: string; body: string };

async function getPosts(): Promise<Post[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    // デフォルト: キャッシュされる（静的）
  });
  if (!res.ok) throw new Error('投稿の取得に失敗しました');
  return res.json() as Promise<Post[]>;
}

export default async function PostsPage() {
  const posts = await getPosts();
  return (
    <ul>
      {posts.slice(0, 5).map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

### キャッシュと再検証

#### 説明

Next.js の `fetch` は第2引数の `cache` / `next.revalidate` オプションでキャッシュ戦略を制御します。

| オプション | 動作 |
|-----------|------|
| `cache: 'force-cache'`（デフォルト） | ビルド時に一度だけ取得（静的） |
| `next: { revalidate: 60 }` | 60 秒ごとに再取得（ISR） |
| `cache: 'no-store'` | 毎リクエスト取得（動的） |

#### コード

```tsx
// 静的（デフォルト）
const staticData = await fetch('https://api.example.com/data');

// ISR: 60 秒ごとに再検証
const revalidatedData = await fetch('https://api.example.com/data', {
  next: { revalidate: 60 },
});

// 動的: キャッシュなし（毎リクエスト取得）
const dynamicData = await fetch('https://api.example.com/data', {
  cache: 'no-store',
});
```

### revalidatePath・revalidateTag

#### 説明

Server Actions やRoute Handlers から `revalidatePath` / `revalidateTag` を呼ぶことで、特定のパスやタグのキャッシュを手動で無効化できます。フォーム送信後に一覧ページを更新する用途が典型です。

#### コード

```tsx
'use server';
import { revalidatePath, revalidateTag } from 'next/cache';

// 特定パスのキャッシュを無効化
async function createPost(formData: FormData) {
  await db.posts.create({ title: formData.get('title') as string });
  revalidatePath('/posts'); // /posts の静的キャッシュを更新
}

// タグでまとめて無効化
const data = await fetch('https://api.example.com/posts', {
  next: { tags: ['posts'] },
});

async function deletePost(id: string) {
  await db.posts.delete(id);
  revalidateTag('posts'); // 'posts' タグが付いたキャッシュをすべて無効化
}
```

## 動的ルート

### [slug] と generateStaticParams

#### 説明

`[slug]` のようにブラケットで囲んだフォルダが動的セグメントです。`generateStaticParams` でビルド時に生成するパラメータ一覧を返すと、静的ページとして事前レンダリングされます。

#### コード

```tsx
// app/posts/[id]/page.tsx
type Params = Promise<{ id: string }>;

// ビルド時に全投稿を静的生成
export async function generateStaticParams() {
  const posts = await fetchAllPosts();
  return posts.map((post) => ({ id: String(post.id) }));
}

export default async function PostPage({ params }: { params: Params }) {
  const { id } = await params;
  const post = await fetchPost(id);
  if (!post) notFound();
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </article>
  );
}
```

### キャッチオールルートとオプショナルルート

#### 説明

`[...slug]` はすべてのサブパスをキャッチするルートです。`[[...slug]]` はパラメータなしのパスも含むオプショナル版です。

#### コード

```tsx
// app/docs/[...slug]/page.tsx
// /docs/a, /docs/a/b, /docs/a/b/c をすべてキャッチ

type Params = Promise<{ slug: string[] }>;

export default async function DocsPage({ params }: { params: Params }) {
  const { slug } = await params;
  // slug は ["a"] や ["a", "b", "c"] などの配列
  const path = slug.join('/');
  const doc = await fetchDoc(path);
  return <article>{doc.content}</article>;
}

// app/[[...slug]]/page.tsx
// / も /a も /a/b もキャッチ（オプショナル）
```

### Route Groups

#### 説明

`(name)` のように括弧でフォルダを囲むと URL に影響しない「Route Group」を作れます。レイアウトをグループごとに適用したい場合や、コードを論理的に整理したい場合に使います。

#### コード

```tsx
// ディレクトリ構成
// app/
// ├── (marketing)/
// │   ├── layout.tsx    ← マーケティング用レイアウト
// │   ├── page.tsx      → /
// │   └── about/
// │       └── page.tsx  → /about
// └── (app)/
//     ├── layout.tsx    ← アプリ用レイアウト（認証必須など）
//     ├── dashboard/
//     │   └── page.tsx  → /dashboard
//     └── settings/
//         └── page.tsx  → /settings
//
// URL は (marketing) や (app) の括弧部分を含まない
```

## Server Actions

### Server Actions の基本

#### 説明

Server Actions は `'use server'` ディレクティブを付けたサーバーサイドの非同期関数です。クライアントから直接呼び出せるサーバー関数で、フォームの `action` 属性やイベントハンドラーから使えます。API Routes を作らずにフォーム処理が実装できます。

#### 注意

Server Actions は POST リクエストとして実行されます。CSRF 対策は Next.js が自動で行いますが、入力値のバリデーションは必ず実装してください。

#### コード

```tsx
// app/actions.ts
'use server';
import { revalidatePath } from 'next/cache';

export async function createTodo(formData: FormData) {
  const title = formData.get('title') as string;
  if (!title.trim()) return { error: 'タイトルを入力してください' };

  await db.todos.create({ title });
  revalidatePath('/todos');
  return { success: true };
}

// app/todos/page.tsx（Server Component）
import { createTodo } from '../actions';

export default function TodoPage() {
  return (
    <form action={createTodo}>
      <input name="title" placeholder="タスクを入力" />
      <button type="submit">追加</button>
    </form>
  );
}
```

### useActionState と組み合わせる

#### 説明

`useActionState`（React 19）と組み合わせることで、送信状態・エラー・成功メッセージをリアクティブに扱えます。

#### コード

```tsx
// app/actions.ts
'use server';

type State = { message: string; error?: string };

export async function createPost(prev: State, formData: FormData): Promise<State> {
  const title = formData.get('title') as string;
  if (!title) return { message: '', error: 'タイトルは必須です' };
  await db.posts.create({ title });
  revalidatePath('/posts');
  return { message: '投稿しました！' };
}

// app/posts/new/page.tsx
'use client';
import { useActionState } from 'react';
import { createPost } from '../../actions';

export default function NewPostPage() {
  const [state, action, isPending] = useActionState(createPost, { message: '' });

  return (
    <form action={action}>
      <input name="title" />
      {state.error && <p style={{ color: 'red' }}>{state.error}</p>}
      {state.message && <p>{state.message}</p>}
      <button disabled={isPending}>{isPending ? '送信中...' : '投稿'}</button>
    </form>
  );
}
```

### Server Actions をイベントハンドラーから呼ぶ

#### 説明

Server Actions はフォームだけでなく、Client Component のイベントハンドラーからも直接呼び出せます。

#### コード

```tsx
// app/actions.ts
'use server';
export async function deletePost(id: string): Promise<void> {
  await db.posts.delete(id);
  revalidatePath('/posts');
}

// Client Component から呼び出す
'use client';
import { deletePost } from '../actions';
import { useState } from 'react';

export function DeleteButton({ postId }: { postId: string }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await deletePost(postId);
    setLoading(false);
  };

  return (
    <button onClick={handleDelete} disabled={loading}>
      {loading ? '削除中...' : '削除'}
    </button>
  );
}
```

## Route Handlers

### Route Handler の作成

#### 説明

`app/api/route.ts` に `GET`・`POST` などの関数をエクスポートすると API エンドポイントになります。従来の Pages Router の `pages/api/` に相当します。

#### コード

```tsx
// app/api/posts/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const posts = await db.posts.findAll();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const body = await request.json() as { title: string };
  const post = await db.posts.create({ title: body.title });
  return NextResponse.json(post, { status: 201 });
}
```

### 動的 Route Handler とリクエスト情報

#### 説明

動的セグメントを持つ Route Handler では `params` を受け取れます。`NextRequest` を使うとクエリパラメータ・ヘッダー・Cookie などに簡単にアクセスできます。

#### コード

```tsx
// app/api/posts/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { notFound } from 'next/navigation';

type Context = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, { params }: Context) {
  const { id } = await params;

  // クエリパラメータ: /api/posts/1?fields=title
  const fields = request.nextUrl.searchParams.get('fields');

  const post = await db.posts.findById(id);
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json(fields === 'title' ? { title: post.title } : post);
}

export async function DELETE(_req: NextRequest, { params }: Context) {
  const { id } = await params;
  await db.posts.delete(id);
  return new Response(null, { status: 204 });
}
```

## メタデータ API

### 静的メタデータ

#### 説明

`metadata` オブジェクトをエクスポートするとそのページの `<head>` に反映されます。`<title>`・`<meta description>`・OGP タグなどをサーバーサイドで設定でき、SEO に有利です。

#### コード

```tsx
// app/about/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | My App',
  description: 'このサイトについての説明です。',
  openGraph: {
    title: 'About | My App',
    description: 'このサイトについての説明です。',
    images: [{ url: 'https://example.com/og.png' }],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function AboutPage() {
  return <h1>About</h1>;
}
```

### generateMetadata（動的メタデータ）

#### 説明

動的ルートでは `generateMetadata` 関数でパラメータに基づいたメタデータを返します。データ取得も可能で、ページ本体とは別に実行されます。

#### コード

```tsx
// app/posts/[id]/page.tsx
import type { Metadata } from 'next';

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = await fetchPost(id);

  if (!post) return { title: '投稿が見つかりません' };

  return {
    title: `${post.title} | My Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      images: post.thumbnail ? [{ url: post.thumbnail }] : [],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { id } = await params;
  const post = await fetchPost(id);
  if (!post) notFound();
  return <article>{post.title}</article>;
}
```

## 画像・フォント最適化

### next/image

#### 説明

`next/image` の `<Image>` コンポーネントは、自動リサイズ・WebP 変換・遅延読み込み・レイアウトシフト防止（`width`/`height` 指定で CLS を解消）などの最適化を自動で行います。

#### 注意

`<Image>` は必ず `width` と `height`（または `fill` + 親要素の `position: relative`）を指定してください。指定がないと警告が出てレイアウトシフトが発生します。

#### コード

```tsx
import Image from 'next/image';

// 固定サイズの画像
export function Avatar({ src, name }: { src: string; name: string }) {
  return (
    <Image
      src={src}
      alt={name}
      width={64}
      height={64}
      className="rounded-full"
    />
  );
}

// fill で親要素いっぱいに広げる（レスポンシブ）
export function HeroImage({ src }: { src: string }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: 400 }}>
      <Image
        src={src}
        alt="ヒーロー画像"
        fill
        style={{ objectFit: 'cover' }}
        priority  // LCP 画像は priority を付ける
      />
    </div>
  );
}
```

### next/font

#### 説明

`next/font` はフォントをビルド時に最適化します。Google Fonts やローカルフォントをゼロランタイムで読み込み、フォントのレイアウトシフト（FOUT）を防ぎます。フォントファイルはサーバーから配信されるため、外部 CDN へのリクエストも発生しません。

#### コード

```tsx
// app/layout.tsx
import { Noto_Sans_JP, JetBrains_Mono } from 'next/font/google';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ja"
      className={`${notoSansJP.variable} ${jetBrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

// CSS でカスタムプロパティとして使う
// font-family: var(--font-noto), sans-serif;
```

## ミドルウェア

### middleware.ts の基本

#### 説明

プロジェクトルートに置いた `middleware.ts` はすべてのリクエストの前に実行されます。認証チェック・リダイレクト・ヘッダー操作などに使います。`matcher` でミドルウェアを適用するパスを絞り込めます。

#### コード

```tsx
// middleware.ts（プロジェクトルート）
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 認証トークンがなければログインページへ
  const token = request.cookies.get('token')?.value;
  if (pathname.startsWith('/dashboard') && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// 適用するパスを限定（API・静的ファイルは除外）
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

### ミドルウェアでのヘッダー操作

#### 説明

リクエストヘッダーやレスポンスヘッダーをミドルウェアで追加・変更できます。A/B テストのためのフラグ伝達や、CORS ヘッダーの設定などに使います。

#### コード

```tsx
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // レスポンスヘッダーを追加
  response.headers.set('X-Custom-Header', 'my-value');

  // リクエストヘッダーを書き換えて Server Component に渡す
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', request.nextUrl.pathname);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}
```

## 環境変数

### .env ファイルの使い分け

#### 説明

Next.js は複数の `.env` ファイルを優先度順に読み込みます。`NEXT_PUBLIC_` プレフィックスを付けた変数はクライアント側にも公開されます。付けない変数はサーバーサイドのみで使用可能です。

| ファイル | 用途 |
|---------|------|
| `.env` | 全環境共通のデフォルト値 |
| `.env.local` | ローカルのみ（Git 管理外） |
| `.env.development` | `npm run dev` 時のみ |
| `.env.production` | ビルド時のみ |

#### 注意

`NEXT_PUBLIC_` を付けた変数はブラウザのソースに公開されます。API キーやシークレットは絶対に `NEXT_PUBLIC_` を付けないでください。

#### コード

```bash
# .env.local（Git 管理外）
DATABASE_URL=postgresql://localhost/mydb      # サーバーのみ
NEXT_PUBLIC_API_URL=https://api.example.com  # クライアントにも公開
```

### 環境変数の型安全な使い方

#### 説明

`process.env` の値は `string | undefined` です。型安全にアクセスするため、起動時に検証するユーティリティを作る方法が一般的です。

#### コード

```ts
// lib/env.ts（サーバーサイド専用）
function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`環境変数 ${key} が設定されていません`);
  return value;
}

export const env = {
  databaseUrl: requireEnv('DATABASE_URL'),
  apiSecret: requireEnv('API_SECRET'),
} as const;

// クライアント向け（NEXT_PUBLIC_ のみ）
export const publicEnv = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? '',
} as const;
```

## デプロイ

### Vercel へのデプロイ

#### 説明

Next.js は Vercel に最適化されています。GitHub リポジトリを連携するだけで、`main` ブランチへの push ごとに自動デプロイされます。プレビューデプロイ（PR ごとに自動で URL が発行される）も標準機能です。

#### コード

```bash
# Vercel CLI でデプロイ（CI/CD の代替）
npm i -g vercel
vercel        # 初回: プロジェクト設定
vercel --prod # 本番デプロイ
```

### 静的エクスポート（output: 'export'）

#### 説明

`output: 'export'` を設定すると Next.js が静的 HTML ファイルを生成します。サーバーなしで GitHub Pages・S3・Netlify 等に配信できます。ただし Server Actions・Route Handlers・動的レンダリングは使えません。

#### 注意

`output: 'export'` では `cache: 'no-store'` や `revalidate` を使う動的 fetch は使えません。すべてのページがビルド時に静的生成される必要があります。

#### コード

```ts
// next.config.ts
const nextConfig: NextConfig = {
  output: 'export',        // 静的エクスポート有効
  trailingSlash: true,     // /about/ 形式のパスを生成
  images: {
    unoptimized: true,     // 画像最適化はビルド時のみ
  },
  basePath: '/my-repo',    // サブパス配信の場合（GitHub Pages など）
};
```

### 動的レンダリングの強制

#### 説明

ページのレンダリング戦略を `export const dynamic` で明示できます。デフォルトは静的ですが、動的データを使う場合は `'force-dynamic'` を指定します。

#### コード

```tsx
// app/dashboard/page.tsx

// 毎リクエスト動的レンダリング（ログイン済みユーザーの個別データなど）
export const dynamic = 'force-dynamic';

// ISR: 60 秒ごとに再生成
export const revalidate = 60;

// 完全静的（デフォルト）
// export const dynamic = 'force-static';

export default async function DashboardPage() {
  const user = await getCurrentUser(); // 動的データ
  return <h1>こんにちは、{user.name}さん</h1>;
}
```

## パフォーマンスと実践パターン

### Suspense と Streaming

#### 説明

`<Suspense>` でデータ取得コンポーネントをラップすると、ロードが完了した部分から順次 HTML をストリーミングできます。ページ全体の表示を遅らせずに、重いコンポーネントだけローディング UI を先に見せられます。

#### コード

```tsx
// app/page.tsx
import { Suspense } from 'react';
import { SlowDataComponent } from './SlowDataComponent';

export default function HomePage() {
  return (
    <div>
      <h1>ホーム</h1>
      {/* 高速なコンテンツは即表示 */}
      <p>ようこそ！</p>

      {/* 重いコンポーネントは Suspense でラップ */}
      <Suspense fallback={<p>おすすめ記事を読み込み中...</p>}>
        <SlowDataComponent />
      </Suspense>
    </div>
  );
}

// app/SlowDataComponent.tsx（Server Component）
async function SlowDataComponent() {
  const data = await fetchSlowData(); // 時間がかかるデータ取得
  return <ul>{data.map((d) => <li key={d.id}>{d.title}</li>)}</ul>;
}
```

### Parallel Routes（並列ルート）

#### 説明

`@folder` の命名規則で並列ルートを定義します。同じレイアウトの中に複数の独立したページセクションを同時にレンダリングできます。ダッシュボードのような複数ペインの UI に向いています。

#### コード

```tsx
// ディレクトリ構成
// app/dashboard/
// ├── layout.tsx       ← @analytics と @team を受け取る
// ├── page.tsx
// ├── @analytics/
// │   └── page.tsx
// └── @team/
//     └── page.tsx

// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
  analytics,
  team,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  team: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {analytics}
        {team}
      </div>
    </div>
  );
}
```

### Intercepting Routes（インターセプトルート）

#### 説明

`(.)folder` の命名規則でルートをインターセプトします。一覧ページでアイテムをクリックしたとき、URL は変わりつつモーダルで詳細を表示するパターン（Instagram 風フォトモーダルなど）で使います。

#### コード

```tsx
// ディレクトリ構成
// app/
// ├── photos/
// │   ├── page.tsx           → /photos（一覧）
// │   └── [id]/
// │       └── page.tsx       → /photos/1（詳細ページ）
// └── @modal/
//     └── (.)photos/
//         └── [id]/
//             └── page.tsx   → 一覧からクリック時にモーダル表示

// app/@modal/(.)photos/[id]/page.tsx
export default async function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const photo = await fetchPhoto(id);
  return (
    <dialog open>
      <img src={photo.url} alt={photo.title} />
    </dialog>
  );
}
```
