# React ガイド

## React とは・JSX の基礎

### React の概要

#### 説明

React は Meta が開発した UI 構築のための JavaScript ライブラリです。画面を「コンポーネント」という小さな単位に分割し、状態が変わると必要な部分だけ再レンダリングする仕組みを持ちます。仮想 DOM（Virtual DOM）が差分を計算し、実際の DOM への更新を最小化します。

#### 注意

React はあくまで UI ライブラリです。ルーティングや状態管理は別のライブラリ（React Router、Zustand など）と組み合わせて使います。

### JSX とは

#### 説明

JSX は JavaScript の中に HTML に似た構文を書けるシンタックスシュガーです。ビルド時に `React.createElement()` 呼び出しへ変換されます。tsx ファイルで TypeScript と組み合わせて使うのが一般的です。

#### 注意

JSX は `return` できる要素はひとつだけです。複数要素を並べる場合は `<div>` や `<>...</>` （Fragment）で囲む必要があります。

```tsx
// JSX は React.createElement に変換される
const element = <h1>Hello, React!</h1>;

// 複数要素は Fragment でまとめる
const multi = (
  <>
    <h1>タイトル</h1>
    <p>本文</p>
  </>
);

// 式は {} で埋め込む
const name = 'Alice';
const greeting = <p>Hello, {name}!</p>;

// className・htmlFor など HTML 属性は camelCase
const styled = <div className="container">...</div>;
```

### JSX の式と条件

#### 説明

`{}` の中には任意の JavaScript 式を書けます。文（`if`文・`for`文）は直接書けないため、三項演算子・論理演算子・`.map()` などの式を使います。

```tsx
const isLoggedIn = true;
const count = 3;
const items = ['A', 'B', 'C'];

const view = (
  <div>
    {/* 三項演算子 */}
    {isLoggedIn ? <span>ようこそ</span> : <span>ログインしてください</span>}

    {/* 論理積で条件付きレンダリング */}
    {count > 0 && <p>件数: {count}</p>}

    {/* リスト */}
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
);
```

## 関数コンポーネント・tsx の書き方

### 関数コンポーネントの基本

#### 説明

React 19 では関数コンポーネントが標準です。Props を受け取り JSX を返す純粋関数として定義します。コンポーネント名は大文字始まりにする規約があります。

```tsx
// シンプルな関数コンポーネント
function Hello() {
  return <p>Hello, World!</p>;
}

// アロー関数でも書ける
const Goodbye = () => <p>Goodbye!</p>;

// エクスポート
export default Hello;
export { Goodbye };
```

### FC 型と戻り値の型

#### 説明

TypeScript では `React.FC<Props>` 型か、引数に型を付けて戻り値を `React.ReactElement` や `JSX.Element` とする書き方があります。現在は引数に直接型を付ける方式が主流です。`React.FC` は暗黙の `children` を含まなくなった（React 18 以降）ため、必要なら Props に明示します。

#### 注意

`React.FC` を使うと `displayName` などが自動設定されますが、ジェネリクスコンポーネントでは型推論に制限が出ることがあります。引数に型を付ける方式の方が柔軟です。

```tsx
import type { ReactElement } from 'react';

// 推奨: 引数に型を付ける
type GreetProps = { name: string };

function Greet({ name }: GreetProps): ReactElement {
  return <p>Hello, {name}!</p>;
}

// React.FC を使う場合
const GreetFC: React.FC<GreetProps> = ({ name }) => <p>Hello, {name}!</p>;
```

### コンポーネントの分割とファイル構成

#### 説明

UI を小さなコンポーネントに分割することで、再利用性とテスタビリティが向上します。一般的なファイル構成は `components/` ディレクトリにコンポーネントファイルを置く方式です。

```tsx
// components/Button.tsx
type ButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

export function Button({ label, onClick, disabled = false }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}

// 使う側
import { Button } from './components/Button';

function App() {
  return <Button label="送信" onClick={() => console.log('clicked')} />;
}
```

## Props

### Props の型定義

#### 説明

Props は親から子へデータを渡す仕組みです。TypeScript では `type` または `interface` で型を定義します。コンポーネント関数の引数で分割代入するのが一般的です。

```tsx
type CardProps = {
  title: string;
  description: string;
  imageUrl?: string; // オプション
};

function Card({ title, description, imageUrl }: CardProps) {
  return (
    <div>
      {imageUrl && <img src={imageUrl} alt={title} />}
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

// 使う側
<Card title="タイトル" description="説明文" />
```

### children Props

#### 説明

`children` は JSX の開始タグと終了タグの間に書いたコンテンツを受け取る特別な Props です。型は `React.ReactNode` を使います。

```tsx
import type { ReactNode } from 'react';

type PanelProps = {
  title: string;
  children: ReactNode;
};

function Panel({ title, children }: PanelProps) {
  return (
    <div className="panel">
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  );
}

// 使う側
<Panel title="お知らせ">
  <p>内容をここに書けます。</p>
  <ul>
    <li>項目1</li>
  </ul>
</Panel>
```

### デフォルト Props

#### 説明

TypeScript では関数の引数のデフォルト値として Props のデフォルトを設定します。旧来の `defaultProps` は React 19 で非推奨になりました。

#### 注意

`defaultProps` は関数コンポーネントでは React 18.3 から非推奨警告が出ています。必ずデフォルト引数（`= value`）で指定してください。

```tsx
type BadgeProps = {
  label: string;
  color?: 'blue' | 'green' | 'red';
  size?: 'sm' | 'md' | 'lg';
};

function Badge({ label, color = 'blue', size = 'md' }: BadgeProps) {
  return (
    <span className={`badge badge-${color} badge-${size}`}>
      {label}
    </span>
  );
}

<Badge label="新着" />             // color="blue", size="md"
<Badge label="重要" color="red" /> // size="md"
```

### Props のスプレッドと型の拡張

#### 説明

HTML 要素に Props をまとめて渡す場合は `React.ComponentProps` や `React.HTMLAttributes` で型を拡張できます。`...rest` スプレッドで残りの Props を HTML 要素に委譲するパターンがよく使われます。

```tsx
import type { ComponentProps } from 'react';

// 既存の button の props を引き継いで拡張
type MyButtonProps = ComponentProps<'button'> & {
  variant?: 'primary' | 'secondary';
};

function MyButton({ variant = 'primary', className, ...rest }: MyButtonProps) {
  return (
    <button
      className={`btn btn-${variant} ${className ?? ''}`}
      {...rest}
    />
  );
}

// 使う側: button の全属性が使える
<MyButton variant="secondary" type="submit" disabled>
  送信
</MyButton>
```

## useState

### useState の基本

#### 説明

`useState` はコンポーネント内で状態を管理する Hook です。`[状態, 更新関数]` のタプルを返します。更新関数を呼ぶとコンポーネントが再レンダリングされます。TypeScript では初期値から型が推論されますが、明示的に型引数を渡すこともできます。

```tsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0); // 型推論: number

  return (
    <div>
      <p>カウント: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(0)}>リセット</button>
    </div>
  );
}
```

### 関数型更新

#### 説明

前の状態に基づいて更新する場合は、更新関数に関数を渡す「関数型更新」が安全です。非同期処理やイベントハンドラーが連続して呼ばれる場合に、古い状態を参照するバグを防げます。

#### 注意

`setCount(count + 1)` を連続して呼ぶと、`count` が古い値（クロージャのキャプチャ）のままになるため 1 しか増えないことがあります。関数型更新 `setCount(prev => prev + 1)` を使えばこの問題を回避できます。

```tsx
function Counter() {
  const [count, setCount] = useState(0);

  // 連続クリックでも正確にカウントされる
  const increment = () => setCount((prev) => prev + 1);
  const add = (n: number) => setCount((prev) => prev + n);

  return (
    <div>
      <p>{count}</p>
      <button onClick={increment}>+1</button>
      <button onClick={() => add(5)}>+5</button>
    </div>
  );
}
```

### オブジェクト・配列の状態

#### 説明

オブジェクトや配列を状態にする場合は、必ずコピーして新しいオブジェクトを渡します。状態を直接変更しても再レンダリングは起きません。スプレッド構文や `map`/`filter` を使って不変更新します。

#### 注意

`state.count++` のような直接変更は React が変化を検知できません。必ず新しいオブジェクト・配列を返してください。

```tsx
type User = { name: string; age: number };

function UserForm() {
  const [user, setUser] = useState<User>({ name: '', age: 0 });
  const [tags, setTags] = useState<string[]>([]);

  // オブジェクト: スプレッドでコピーして更新
  const updateName = (name: string) =>
    setUser((prev) => ({ ...prev, name }));

  // 配列: 追加
  const addTag = (tag: string) =>
    setTags((prev) => [...prev, tag]);

  // 配列: 削除
  const removeTag = (target: string) =>
    setTags((prev) => prev.filter((t) => t !== target));

  return (/* JSX */null);
}
```

## イベント処理

### イベントハンドラーの型

#### 説明

TypeScript でイベントハンドラーを書く場合、`React.MouseEvent`・`React.ChangeEvent` などの型を使います。ハンドラーを `onClick` などに直接書く場合は型推論が効くため、型注釈を省略できます。

```tsx
import { useState } from 'react';
import type { ChangeEvent, MouseEvent } from 'react';

function Form() {
  const [text, setText] = useState('');

  // ChangeEvent で型を明示（関数を外に定義する場合）
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  // MouseEvent
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(text);
  };

  return (
    <form>
      {/* インライン: 型推論が効く */}
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleClick}>送信</button>
    </form>
  );
}
```

### フォームイベントと submit

#### 説明

`<form>` の送信は `onSubmit` で処理します。`e.preventDefault()` でページリロードを防ぎます。`FormEvent<HTMLFormElement>` を使います。

```tsx
import type { FormEvent } from 'react';
import { useState } from 'react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">ログイン</button>
    </form>
  );
}
```

### イベント伝播の制御

#### 説明

`e.stopPropagation()` でイベントの伝播（バブリング）を止め、`e.preventDefault()` でブラウザのデフォルト動作を抑制します。ネストしたクリックハンドラーで親への伝播を防ぎたい場面で使います。

```tsx
function Card({ onClick }: { onClick: () => void }) {
  return (
    <div onClick={onClick} style={{ padding: 16, border: '1px solid #ccc' }}>
      <p>カードをクリック</p>
      <button
        onClick={(e) => {
          e.stopPropagation(); // 親の onClick を発火させない
          console.log('ボタンだけ反応');
        }}
      >
        ボタン
      </button>
    </div>
  );
}
```

## 条件分岐・リストレンダリング

### 条件レンダリングのパターン

#### 説明

React で条件によって表示を切り替える主なパターンを整理します。状況に応じて三項演算子・論理積・早期 return を使い分けます。

```tsx
type Status = 'loading' | 'error' | 'success';

function StatusView({ status, data }: { status: Status; data?: string }) {
  // 早期 return パターン（複雑な分岐に向く）
  if (status === 'loading') return <p>読み込み中...</p>;
  if (status === 'error') return <p>エラーが発生しました</p>;

  return (
    <div>
      {/* 三項演算子 */}
      {data ? <p>{data}</p> : <p>データがありません</p>}

      {/* 論理積: falsy の場合は何も表示しない */}
      {data && <small>取得済み</small>}
    </div>
  );
}
```

### リストの key

#### 説明

`.map()` でリストをレンダリングする場合、各要素に一意の `key` Props を付ける必要があります。`key` は React が差分更新のために使う識別子です。インデックスを `key` に使うと、並び替えやフィルタリングでバグの原因になるため、ID などを使います。

#### 注意

`key` は兄弟要素の中で一意であれば十分です（グローバル一意は不要）。配列インデックスを `key` に使うのは、順序が変わらないことが保証されている場合のみにしてください。

```tsx
type Todo = { id: number; text: string; done: boolean };

function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <ul>
      {todos.map((todo) => (
        // ✅ id を key に使う
        <li key={todo.id} style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}

// ❌ インデックスを key にするのは避ける
// todos.map((todo, index) => <li key={index}>...)
```

## useEffect

### useEffect の基本

#### 説明

`useEffect` は副作用（データ取得・タイマー・DOM 操作・イベントリスナー登録など）を扱う Hook です。第2引数の依存配列で実行タイミングを制御します。

| 依存配列 | 実行タイミング |
|----------|---------------|
| なし | 毎レンダリング後 |
| `[]` | マウント時のみ |
| `[a, b]` | `a` か `b` が変わった後 |

```tsx
import { useEffect, useState } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  // マウント時に開始、アンマウント時にクリア
  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    // クリーンアップ関数
    return () => clearInterval(id);
  }, []); // 空配列 = マウント時のみ

  return <p>経過時間: {seconds}秒</p>;
}
```

### データ取得パターン

#### 説明

`useEffect` 内で API を呼ぶパターンです。コンポーネントがアンマウントされた後に `setState` が呼ばれないよう、クリーンアップで `AbortController` を使います。

#### 注意

`useEffect` のコールバック自体は `async` にできません。内側に `async` 関数を定義して呼ぶか、Promise チェーンを使います。

```tsx
import { useEffect, useState } from 'react';

type Post = { id: number; title: string };

function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchPosts = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
          signal: controller.signal,
        });
        const data: Post[] = await res.json();
        setPosts(data.slice(0, 5));
      } catch (err) {
        if ((err as Error).name !== 'AbortError') console.error(err);
      } finally {
        setLoading(false);
      }
    };

    void fetchPosts();
    return () => controller.abort();
  }, []);

  if (loading) return <p>読み込み中...</p>;
  return (
    <ul>
      {posts.map((p) => <li key={p.id}>{p.title}</li>)}
    </ul>
  );
}
```

### useEffect の依存配列と exhaustive-deps

#### 説明

`eslint-plugin-react-hooks` の `exhaustive-deps` ルールは、`useEffect` 内で使っている変数を依存配列に含め忘れた場合に警告します。依存配列を正しく保つことで、クロージャが古い値を参照するバグを防げます。

#### 注意

依存配列の警告を `// eslint-disable-line` で無視するのは危険です。警告が出る場合はロジックを見直すか、`useCallback` などで安定した参照を作ることを検討してください。

```tsx
import { useEffect, useState, useCallback } from 'react';

function Search({ query }: { query: string }) {
  const [results, setResults] = useState<string[]>([]);

  // useCallback で安定した関数参照を作成
  const search = useCallback(async (q: string) => {
    const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
    const data: string[] = await res.json();
    setResults(data);
  }, []); // 依存なし: fetch は安定

  useEffect(() => {
    void search(query);
  }, [query, search]); // query と search を依存配列に入れる

  return <ul>{results.map((r) => <li key={r}>{r}</li>)}</ul>;
}
```

## useRef

### DOM 参照

#### 説明

`useRef` で DOM 要素への参照を取得できます。`ref` 属性に渡すと、マウント後に `.current` に DOM 要素が入ります。フォーカス制御・スクロール・サードパーティライブラリとの統合に使います。

```tsx
import { useRef, useEffect } from 'react';

function AutoFocusInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // マウント後に自動フォーカス
    inputRef.current?.focus();
  }, []);

  return <input ref={inputRef} placeholder="自動フォーカス" />;
}
```

### 値の保持（レンダリングをトリガーしない）

#### 説明

`useRef` は DOM 参照以外にも、レンダリングを引き起こさずに値を保持したいときに使います。タイマー ID・前回の値・フラグなどの用途に適しています。`useState` との違いは、`.current` を更新しても再レンダリングが発生しない点です。

```tsx
import { useRef, useState, useEffect } from 'react';

function StopWatch() {
  const [time, setTime] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setTime((t) => t + 1);
    }, 100);
  };

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => () => stop(), []);

  return (
    <div>
      <p>{(time / 10).toFixed(1)}秒</p>
      <button onClick={start}>スタート</button>
      <button onClick={stop}>ストップ</button>
    </div>
  );
}
```

### 前回の値を保持するパターン

#### 説明

`useRef` に前回の値を保存するカスタムフックは頻出パターンです。`useEffect` が実行されるタイミング（レンダリング後）を利用します。

```tsx
import { useRef, useEffect } from 'react';

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current; // 前回のレンダリング時の値
}

// 使い方
function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <p>
      現在: {count} / 前回: {prevCount ?? '-'}
    </p>
  );
}
```

## コンテキスト

### createContext・useContext の基本

#### 説明

`createContext` と `useContext` を組み合わせると、Props を経由せずにコンポーネントツリーの深い部分へ値を渡せます（Props ドリリングの回避）。テーマ・ロケール・認証情報など、グローバルに共有するデータに向いています。

```tsx
import { createContext, useContext } from 'react';

type Theme = 'light' | 'dark';

// コンテキストの作成
const ThemeContext = createContext<Theme>('light');

// プロバイダー（ツリーの上位に置く）
function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContext.Provider value="dark">
      {children}
    </ThemeContext.Provider>
  );
}

// 子コンポーネントで利用
function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button className={`btn btn-${theme}`}>
      テーマ: {theme}
    </button>
  );
}
```

### コンテキストに状態を持たせる

#### 説明

`useState` と組み合わせることで、コンテキスト経由で状態と更新関数を共有できます。小〜中規模のグローバル状態管理に利用できます。

```tsx
import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type AuthContextType = {
  user: string | null;
  login: (name: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        login: (name) => setUser(name),
        logout: () => setUser(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('AuthProvider の外で useAuth を使っています');
  return ctx;
}
```

### コンテキストのパフォーマンス注意点

#### 説明

コンテキストの値が変わると、`useContext` を呼んでいるすべてのコンポーネントが再レンダリングされます。変更頻度の高い状態と低い状態は別のコンテキストに分けるのが効果的です。

#### 注意

一つのコンテキストに大量の状態をまとめると、一部の変更でも全コンシューマーが再レンダリングされます。大規模なグローバル状態には Zustand など専用のライブラリを検討してください。

```tsx
// 悪い例: 頻繁に変わる値と変わらない値が同じコンテキスト
const AppContext = createContext({ theme: 'dark', user: null, notifications: [] });

// 良い例: 変更頻度で分割
const ThemeContext = createContext<'light' | 'dark'>('light');   // 変わりにくい
const UserContext = createContext<string | null>(null);           // 変わりにくい
const NotificationContext = createContext<string[]>([]);          // 頻繁に変わる
```

## カスタムフック

### カスタムフックの作り方

#### 説明

カスタムフックは `use` で始まる関数で、複数の組み込み Hook を組み合わせてロジックを再利用します。コンポーネントから状態管理ロジックを分離し、テスト・再利用をしやすくします。

```tsx
import { useState } from 'react';

// トグル状態を扱うカスタムフック
function useToggle(initial = false): [boolean, () => void] {
  const [value, setValue] = useState(initial);
  const toggle = () => setValue((v) => !v);
  return [value, toggle];
}

// 使い方
function Modal() {
  const [isOpen, toggleOpen] = useToggle(false);

  return (
    <>
      <button onClick={toggleOpen}>
        {isOpen ? '閉じる' : '開く'}
      </button>
      {isOpen && <div className="modal">モーダルの内容</div>}
    </>
  );
}
```

### データ取得カスタムフック

#### 説明

API 呼び出しのロジックをカスタムフックにまとめると、複数のコンポーネントで再利用でき、ローディング・エラー状態の管理も一元化できます。

```tsx
import { useState, useEffect } from 'react';

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    setState({ data: null, loading: true, error: null });

    fetch(url, { signal: controller.signal })
      .then((res) => res.json() as Promise<T>)
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err: Error) => {
        if (err.name !== 'AbortError') {
          setState({ data: null, loading: false, error: err.message });
        }
      });

    return () => controller.abort();
  }, [url]);

  return state;
}

// 使い方
function UserProfile({ userId }: { userId: number }) {
  const { data, loading, error } = useFetch<{ name: string }>(
    `/api/users/${userId}`
  );

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>エラー: {error}</p>;
  return <p>{data?.name}</p>;
}
```

## useMemo・useCallback

### useMemo で計算結果をメモ化

#### 説明

`useMemo` は依存値が変わったときだけ再計算し、結果をキャッシュします。コストの高い計算をレンダリングのたびに実行しないようにするためのフックです。

#### 注意

すべての計算に `useMemo` を使う必要はありません。計算が単純な場合は逆にオーバーヘッドになります。実際にパフォーマンス問題が発生したときに導入するのが基本です。

```tsx
import { useMemo, useState } from 'react';

function SortedList({ items }: { items: number[] }) {
  const [ascending, setAscending] = useState(true);

  // items か ascending が変わったときだけ再計算
  const sorted = useMemo(
    () => [...items].sort((a, b) => (ascending ? a - b : b - a)),
    [items, ascending],
  );

  return (
    <div>
      <button onClick={() => setAscending((v) => !v)}>
        {ascending ? '昇順' : '降順'}
      </button>
      <ul>{sorted.map((n) => <li key={n}>{n}</li>)}</ul>
    </div>
  );
}
```

### useCallback で関数参照を安定化

#### 説明

`useCallback` は関数をメモ化し、依存値が変わらない限り同じ関数参照を返します。`React.memo` でラップした子コンポーネントへコールバックを渡すときや、`useEffect` の依存配列に関数を入れるときに有用です。

```tsx
import { useCallback, useState, memo } from 'react';

// memo でラップした子コンポーネント
const ExpensiveChild = memo(function ExpensiveChild({
  onUpdate,
}: {
  onUpdate: (value: string) => void;
}) {
  console.log('ExpensiveChild レンダリング');
  return <button onClick={() => onUpdate('hello')}>更新</button>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // useCallback なし: count が変わるたびに新しい関数参照 → 子が毎回再レンダリング
  // useCallback あり: text が変わったときだけ新しい参照
  const handleUpdate = useCallback((value: string) => {
    setText(value);
  }, []); // テキスト設定のみ、依存なし

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>カウント: {count}</button>
      <ExpensiveChild onUpdate={handleUpdate} />
    </div>
  );
}
```

### React.memo によるコンポーネントのメモ化

#### 説明

`React.memo` は Props が変わっていなければコンポーネントの再レンダリングをスキップします。親が再レンダリングされても、Props が同じなら子は再レンダリングされません。

```tsx
import { memo } from 'react';

type AvatarProps = { name: string; imageUrl: string };

// Props が変わらない限り再レンダリングしない
const Avatar = memo(function Avatar({ name, imageUrl }: AvatarProps) {
  console.log(`Avatar(${name}) レンダリング`);
  return <img src={imageUrl} alt={name} />;
});

// カスタム比較関数を渡すこともできる
const AvatarDeep = memo(
  function AvatarDeep({ name, imageUrl }: AvatarProps) {
    return <img src={imageUrl} alt={name} />;
  },
  (prev, next) => prev.name === next.name && prev.imageUrl === next.imageUrl,
);
```

## フォーム

### 制御コンポーネント

#### 説明

入力値を React の状態として管理するパターンを「制御コンポーネント」と呼びます。`value` と `onChange` を明示的に指定し、React が値の唯一の源泉（Single Source of Truth）になります。バリデーションや入力の加工がしやすくなります。

```tsx
import { useState } from 'react';

function ControlledForm() {
  const [name, setName] = useState('');
  const [agree, setAgree] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) return alert('同意してください');
    console.log({ name, agree });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="名前"
      />
      <label>
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
        />
        利用規約に同意する
      </label>
      <button type="submit">送信</button>
    </form>
  );
}
```

### 非制御コンポーネントと useRef

#### 説明

`useRef` で DOM に直接アクセスして値を取得するパターンを「非制御コンポーネント」と呼びます。送信時にのみ値を参照するシンプルなフォームや、パフォーマンスが重要な場面で使われます。

```tsx
import { useRef } from 'react';

function UncontrolledForm() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      name: nameRef.current?.value,
      email: emailRef.current?.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={nameRef} type="text" defaultValue="" placeholder="名前" />
      <input ref={emailRef} type="email" placeholder="メール" />
      <button type="submit">送信</button>
    </form>
  );
}
```

## エラーバウンダリ

### ErrorBoundary の実装

#### 説明

`ErrorBoundary` はレンダリング中に発生したエラーをキャッチしてフォールバック UI を表示するコンポーネントです。クラスコンポーネントで実装する必要があります（関数コンポーネントでは `getDerivedStateFromError` を使えないため）。

#### 注意

`ErrorBoundary` はイベントハンドラー内のエラーや非同期エラー（`useEffect` 内の `throw` など）はキャッチしません。それらは `try/catch` で個別に処理します。

```tsx
import { Component, type ReactNode, type ErrorInfo } from 'react';

type Props = { children: ReactNode; fallback?: ReactNode };
type State = { hasError: boolean; error?: Error };

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <p>エラーが発生しました</p>;
    }
    return this.props.children;
  }
}

// 使い方
<ErrorBoundary fallback={<p>コンポーネントの読み込みに失敗しました</p>}>
  <SomeRiskyComponent />
</ErrorBoundary>
```

## React 19 の新機能

### use フック

#### 説明

`use` は Promise やコンテキストを読み取るための新しい API です。`useContext` とは異なり、条件分岐やループの中でも呼べます。Suspense と組み合わせることで、データ取得を宣言的に書けます。

```tsx
import { use, Suspense } from 'react';

// Promise を渡すと Suspense でラップが必要
function UserName({ userPromise }: { userPromise: Promise<{ name: string }> }) {
  const user = use(userPromise); // Suspense がフォールバックを表示する間、コンポーネントをサスペンド
  return <p>{user.name}</p>;
}

function App() {
  const userPromise = fetch('/api/user').then((r) => r.json() as Promise<{ name: string }>);

  return (
    <Suspense fallback={<p>読み込み中...</p>}>
      <UserName userPromise={userPromise} />
    </Suspense>
  );
}

// コンテキストにも使える（条件分岐内でも OK）
function ConditionalTheme({ show }: { show: boolean }) {
  if (!show) return null;
  const theme = use(ThemeContext); // ✅ 条件分岐の中でも使える
  return <p>{theme}</p>;
}
```

### useActionState

#### 説明

`useActionState`（旧 `useFormState`）はフォームのアクションと状態を統合して管理する Hook です。Server Actions との連携を想定した設計ですが、クライアントサイドでも使えます。

```tsx
import { useActionState } from 'react';

type FormState = { message: string; error?: string };

// アクション関数（Server Action としても使える）
async function submitAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const name = formData.get('name') as string;
  if (!name) return { message: '', error: '名前を入力してください' };
  return { message: `こんにちは、${name}さん！` };
}

function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitAction, {
    message: '',
  });

  return (
    <form action={formAction}>
      <input name="name" placeholder="名前" />
      {state.error && <p style={{ color: 'red' }}>{state.error}</p>}
      {state.message && <p>{state.message}</p>}
      <button type="submit" disabled={isPending}>
        {isPending ? '送信中...' : '送信'}
      </button>
    </form>
  );
}
```

### useOptimistic

#### 説明

`useOptimistic` は非同期操作の結果を待たずに UI を先行更新（楽観的更新）するための Hook です。送信ボタンを押した瞬間にリストに追加し、サーバーレスポンスが失敗したら元に戻すパターンで使います。

```tsx
import { useOptimistic, useState } from 'react';

type Message = { id: number; text: string; sending?: boolean };

async function sendMessage(text: string): Promise<Message> {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // 模擬遅延
  return { id: Date.now(), text };
}

function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [optimisticMessages, addOptimistic] = useOptimistic(
    messages,
    (state, newText: string) => [
      ...state,
      { id: Date.now(), text: newText, sending: true },
    ],
  );

  const handleSubmit = async (formData: FormData) => {
    const text = formData.get('text') as string;
    addOptimistic(text); // 先行表示
    const sent = await sendMessage(text); // 実際の送信
    setMessages((prev) => [...prev, sent]); // 確定
  };

  return (
    <>
      <ul>
        {optimisticMessages.map((m) => (
          <li key={m.id} style={{ opacity: m.sending ? 0.5 : 1 }}>
            {m.text} {m.sending && '(送信中)'}
          </li>
        ))}
      </ul>
      <form action={handleSubmit}>
        <input name="text" />
        <button type="submit">送信</button>
      </form>
    </>
  );
}
```

### Server Components 概要

#### 説明

React Server Components（RSC）はサーバーサイドで実行されるコンポーネントです。バンドルサイズを削減でき、データベースやファイルシステムに直接アクセスできます。Next.js 13 以降の App Router で標準採用されています。

#### 注意

Server Components では `useState`・`useEffect` などのブラウザ側の Hook は使えません。インタラクティブな部分は `'use client'` ディレクティブを付けた Client Components に分離します。

```tsx
// ServerComponent.tsx（デフォルトは Server Component）
// async/await が使える・DB アクセス可
async function ProductList() {
  const products = await db.query('SELECT * FROM products'); // 直接 DB アクセス
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}

// ClientComponent.tsx
'use client';
import { useState } from 'react'; // Client Component なら OK

export function AddToCart({ productId }: { productId: number }) {
  const [added, setAdded] = useState(false);
  return (
    <button onClick={() => setAdded(true)}>
      {added ? '追加済み' : 'カートに追加'}
    </button>
  );
}
```

## コンポーネント設計パターン

### コンポーネントの合成パターン

#### 説明

合成（Composition）パターンは、小さなコンポーネントを組み合わせて複雑な UI を構築します。継承より合成を優先することで、柔軟で再利用しやすい設計になります。`children` や Props として JSX を渡す方法が基本です。

```tsx
// スロットパターン: header/footer をコンポーネントとして受け取る
type LayoutProps = {
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
};

function PageLayout({ header, footer, children }: LayoutProps) {
  return (
    <div>
      <header>{header}</header>
      <main>{children}</main>
      <footer>{footer}</footer>
    </div>
  );
}

// 使い方
<PageLayout
  header={<nav>ナビゲーション</nav>}
  footer={<p>© 2025</p>}
>
  <article>本文コンテンツ</article>
</PageLayout>
```

### カスタムフックへのロジック分離

#### 説明

コンポーネントが肥大化してきたら、状態管理ロジックをカスタムフックに切り出します。コンポーネントは「表示」に集中し、「振る舞い」はフックが担う分離が理想です。

```tsx
// ロジックをフックに分離
function useSearchFilter<T>(
  items: T[],
  filter: (item: T, query: string) => boolean,
) {
  const [query, setQuery] = useState('');
  const filtered = useMemo(
    () => items.filter((item) => filter(item, query)),
    [items, query, filter],
  );
  return { query, setQuery, filtered };
}

// コンポーネントは表示に集中
type Product = { id: number; name: string };

function ProductSearch({ products }: { products: Product[] }) {
  const { query, setQuery, filtered } = useSearchFilter(
    products,
    (p, q) => p.name.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="商品を検索..."
      />
      <ul>
        {filtered.map((p) => <li key={p.id}>{p.name}</li>)}
      </ul>
    </div>
  );
}
```

### Headless パターン

#### 説明

ロジックと UI を完全に分離するパターンです。カスタムフックがロジック（状態・イベントハンドラー）を提供し、コンポーネントは好きなスタイルで描画します。ライブラリを使わずにアクセシブルなコンポーネントを作る場合によく採用されます。

```tsx
// ロジックのみのフック
function useDisclosure(initial = false) {
  const [isOpen, setIsOpen] = useState(initial);
  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen((v) => !v),
    // アクセシビリティ属性もまとめて提供
    triggerProps: {
      'aria-expanded': isOpen,
      onClick: () => setIsOpen((v) => !v),
    },
    contentProps: {
      hidden: !isOpen,
      'aria-hidden': !isOpen,
    },
  };
}

// 好きなスタイルで使う
function Accordion({ title, children }: { title: string; children: ReactNode }) {
  const { isOpen, triggerProps, contentProps } = useDisclosure();

  return (
    <div>
      <button {...triggerProps}>{title}</button>
      <div {...contentProps}>{children}</div>
    </div>
  );
}
```
