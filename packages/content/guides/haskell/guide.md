# Haskell ガイド

## 基本文法・型

### 値束縛とイミュータブル

Haskell の値はデフォルトで不変です。`let` と `where` でローカル束縛を作り、式を組み合わせてプログラムを構築します。命令的な「代入」ではなく、名前に式を結び付ける考え方が基本です。

> [!warning]
> Haskell では `=` は再代入ではなく「定義」です。`x = x + 1` のような命令的更新はできません。

```hs
-- 型注釈: x は Int
x :: Int
-- 値定義: Haskell の `=` は再代入ではなく定義
x = 10

-- 複数行の式を束縛して文字列を作る
message :: String
message =
  -- let でローカル束縛
  let name = "Alice"
      age = 30
  -- in で本体式を返す
  in name ++ " is " ++ show age

-- 関数型: Double を受け取って Double を返す
area :: Double -> Double
area r =
  -- 末尾の ' は識別子で使える
  let pi' = 3.1415926535
  in pi' * r * r
```

### 関数定義とパターンマッチ

関数は複数の節で定義でき、引数の形に応じて分岐できます。`case` 式とガード (`|`) を使うことで、条件分岐を宣言的に記述できます。

```hs
-- 0 のときのベースケース
factorial :: Integer -> Integer
factorial 0 = 1
-- それ以外は再帰
factorial n = n * factorial (n - 1)

-- case 式でリストの形に応じて分岐
describeList :: [a] -> String
describeList xs = case xs of
  [] -> "empty"
  [_] -> "singleton"
  _ -> "longer"

-- ガードで条件分岐
bmiLabel :: Double -> Double -> String
bmiLabel w h
  | bmi < 18.5 = "under"
  | bmi < 25.0 = "normal"
  | otherwise = "over"
  -- where で補助値を後置定義
  where
    bmi = w / (h * h)
```

### case 式とガードの使い分け（初心者向け）

どちらも条件分岐ですが、見る対象が違います。初心者のうちは次の基準で選ぶと迷いにくくなります。

- case 式: 値の形を分解したいとき（リスト、Maybe、Either、独自データ型）
- ガード: 値の大小比較や述語判定を上から順に評価したいとき

「データの形を見るなら case、真偽条件の段階判定ならガード」と覚えると実装が整理されます。実務では両方を組み合わせることも多いです。

```hs
-- Maybe の形を見て分岐するので case が自然
describeScoreCase :: Maybe Int -> String
describeScoreCase m =
  case m of
    Nothing -> "no score"
    Just n -> "score=" ++ show n

-- 数値の範囲で分岐するのでガードが自然
gradeByGuard :: Int -> String
gradeByGuard n
  | n < 0 = "invalid"
  | n < 60 = "F"
  | n < 80 = "B"
  | n <= 100 = "A"
  | otherwise = "invalid"

-- 組み合わせ例: 先に case で形を見て、その後ガードで条件判定
describeScore :: Maybe Int -> String
describeScore m =
  case m of
    Nothing -> "no score"
    Just n
      | n < 60 -> "fail"
      | otherwise -> "pass"
```

### リスト・タプル・Maybe/Either

リストは同一型の列、タプルは固定個数かつ異なる型を保持できます。失敗を表す場合は `Maybe`、エラー情報を持たせたい場合は `Either` を使うのが定石です。

> [!warning]
> `head` や `fromJust` のような部分関数は、入力によって実行時例外を起こします。`Maybe`/`Either` による安全な分岐を優先してください。

```hs
-- 同一型の要素を持つリスト
numbers :: [Int]
numbers = [1, 2, 3, 4]

-- 異なる型を並べられるタプル
pair :: (String, Int)
pair = ("alice", 30)

-- 空リストは Nothing
safeHead :: [a] -> Maybe a
safeHead [] = Nothing
-- 先頭要素があれば Just x
safeHead (x:_) = Just x

-- Either で失敗理由を返す
parsePort :: String -> Either String Int
parsePort s =
  -- reads は [(parsedValue, rest)] を返す
  case reads s of
    -- 文字列を最後まで消費し、範囲内なら成功
    [(n, "")] | n > 0 && n < 65536 -> Right n
    _ -> Left "invalid port"
```

### 型注釈と型推論

Haskell は強力な型推論を持ちますが、公開 API や複雑な式には型注釈を書くのが実務的です。`ghci` では `:type` で推論結果を確認できます。

```hs
-- 引数2つの関数
add :: Int -> Int -> Int
add a b = a + b

-- 高階関数: 関数を受け取り関数を返す
composeExample :: (b -> c) -> (a -> b) -> a -> c
composeExample f g x = f (g x)

-- ghci
-- > :type map
-- map :: (a -> b) -> [a] -> [b]
```

### カリー化と部分適用

Haskell の関数は「複数引数を受け取る関数」ではなく、「1引数を受け取って次の関数を返す関数」として扱われます。この性質をカリー化と呼びます。引数を一部だけ与えて新しい関数を作る書き方が部分適用です。

> [!warning]
> `add 1 2` は `(add 1) 2` と同じです。カンマ区切りで `add(1,2)` のようには書きません。

```hs
-- Int -> (Int -> Int) と同じ意味
add :: Int -> Int -> Int
add x y = x + y

-- 引数を1つだけ渡して新しい関数を作る
addOne :: Int -> Int
addOne = add 1

result1 :: Int
result1 = addOne 41

result2 :: [Int]
-- map (add 1) は各要素に 1 を足す関数を渡している
result2 = map (add 1) [1, 2, 3]
```

### 関数適用と演算子（$, .）

Haskell は関数適用（空白）が最優先です。括弧を減らすために `$`（適用演算子）と `.`（関数合成）をよく使います。

```hs
-- 通常の関数適用
v1 :: Int
v1 = sum (map (+1) [1, 2, 3])

-- $ は右側全体を引数にする（括弧を減らせる）
v2 :: Int
v2 = sum $ map (+1) [1, 2, 3]

-- . は関数合成: (f . g) x = f (g x)
formatLen :: String -> String
formatLen = show . length

-- 合成した関数を map に渡せる
v3 :: [String]
v3 = map (show . (+1)) [1, 2, 3]
```

> [!warning]
> `.` はメソッドアクセスではなく関数合成です。JavaScript の `obj.prop` と意味が違う点でつまずきやすいです。

### リスト再帰と fold の読み方

リスト処理は再帰で直接書けますが、`foldr` と `foldl'` に置き換えられると一気に読みやすくなります。まずは「空リストのときの値」と「先頭要素をどう畳むか」を意識すると理解しやすいです。

```hs
-- 再帰で合計
sumRec :: [Int] -> Int
sumRec [] = 0
sumRec (x:xs) = x + sumRec xs

-- 同じ処理を foldr で表現
sumFoldr :: [Int] -> Int
sumFoldr = foldr (+) 0

-- 大きなデータでは foldl' を使う
sumFoldlStrict :: [Int] -> Int
sumFoldlStrict = foldl' (+) 0
```

## 型クラス

### 代表的な型クラス (Eq, Ord, Show, Read)

型クラスは「この型が満たす振る舞い」を表現する仕組みです。`deriving` を使うと基本的なインスタンスを自動生成できます。

```hs
-- レコード構文 + deriving
data User = User
  { userId :: Int
  , userName :: String
  } deriving (Eq, Ord, Show, Read)

-- Eq 制約により (==) が使える
isSameUser :: User -> User -> Bool
isSameUser u1 u2 = u1 == u2
```

### 型クラス制約と多相関数

関数シグネチャの `=>` より左側に、必要な型クラス制約を書きます。これにより、同じ関数を多くの型で再利用できます。

```hs
-- Num 制約: (+) や 0 が使える
sumList :: Num a => [a] -> a
sumList = foldr (+) 0

-- Ord 制約: 比較演算子が使える
sortPair :: Ord a => (a, a) -> (a, a)
sortPair (x, y)
  | x <= y = (x, y)
  | otherwise = (y, x)

-- Show 制約: show で文字列化
printValue :: Show a => a -> IO ()
printValue = putStrLn . show
```

### Functor・Applicative・Monad

`Functor` は文脈付き値への写像、`Applicative` は文脈付き関数の適用、`Monad` は文脈を保った逐次合成を提供します。`Maybe` や `Either e` は典型的なインスタンスです。

```hs
-- リストは Functor なので fmap できる
incrementAll :: [Int] -> [Int]
incrementAll = fmap (+1)

-- 0除算を Maybe で表現
safeDiv :: Double -> Double -> Maybe Double
safeDiv _ 0 = Nothing
safeDiv x y = Just (x / y)

-- do 記法で Maybe を逐次合成
calc :: Double -> Double -> Maybe Double
calc x y = do
  -- <- で文脈から値を取り出す
  a <- safeDiv x y
  b <- safeDiv a 2
  -- pure で文脈に戻す
  pure (b + 10)
```

## データ定義

### 代数的データ型 (ADT)

Haskell のデータモデルは、和型（複数コンストラクタ）と積型（複数フィールド）の組み合わせで表現できます。ビジネスルールを型に落とすと、実行前に不正状態を排除しやすくなります。

```hs
-- 和型: 複数コンストラクタを持つ
data PaymentMethod
  = CreditCard String
  | BankTransfer String
  | Cash
  deriving (Eq, Show)

-- 積型: 複数フィールドを同時に持つ
data Order = Order
  { orderId :: Int
  , amount :: Int
  , paymentMethod :: PaymentMethod
  } deriving (Eq, Show)
```

### record 構文・type alias・newtype

`type` は別名、`newtype` は実行時オーバーヘッドなしの型ラッパです。ドメイン制約を明示したいときは `newtype` が有効です。

```hs
-- type は別名（新しい型ではない）
type UserId = Int

-- newtype は実体は同じでも別型として扱える
newtype Email = Email { unEmail :: String }
  deriving (Eq, Show)

-- レコードでドメイン型を組み立てる
data Profile = Profile
  { profileUserId :: UserId
  , profileEmail :: Email
  } deriving (Eq, Show)
```

> [!warning]
> `type` は単なる別名なので型安全は増えません。識別子の取り違えを防ぎたい場合は `newtype` を使ってください。

### deriving と手書きインスタンス

多くの型クラスは `deriving` で十分ですが、表示形式や比較規則をカスタムしたい場合はインスタンスを手で定義します。

```hs
-- 列挙型
data Priority = Low | Medium | High

-- 表示文字列を独自定義
instance Show Priority where
  show Low = "low"
  show Medium = "medium"
  show High = "high"

-- 並び順を独自定義
instance Ord Priority where
  compare Low Low = EQ
  compare Low _ = LT
  compare Medium Low = GT
  compare Medium Medium = EQ
  compare Medium High = LT
  compare High High = EQ
  compare High _ = GT
```

## 実践パターン

### IO と do 記法

`IO a` は副作用を伴う計算を表す型です。`do` 記法はモナドの逐次処理を読みやすく書くための糖衣構文です。

```hs
-- IO () は「副作用あり・戻り値なし」
main :: IO ()
main = do
  -- 画面出力
  putStrLn "What is your name?"
  -- 標準入力を受け取る
  name <- getLine
  -- 文字列結合して出力
  putStrLn ("Hello, " ++ name)
```

### エラーハンドリング (Either / ExceptT)

純粋関数内では `Either e a`、IO と組み合わせる場合は `ExceptT e IO a` を使うと、失敗経路を型で管理できます。

```hs
{-# LANGUAGE OverloadedStrings #-}

-- ExceptT: IO の上にエラー文脈を積む
import Control.Monad.Except (ExceptT, MonadError(throwError), runExceptT)

-- 純粋関数での入力検証
validateName :: String -> Either String String
validateName s
  | null s = Left "name is empty"
  | otherwise = Right s

-- Either を ExceptT に持ち上げて扱う
loadUser :: String -> ExceptT String IO String
loadUser s = do
  name <- either throwError pure (validateName s)
  pure ("user:" ++ name)

-- 実行して IO (Either e a) を得る
runLoadUser :: String -> IO (Either String String)
runLoadUser = runExceptT . loadUser
```

### モジュール分割と Cabal

アプリではモジュール境界を先に切ると保守しやすくなります。`cabal` では `library` と `executable` を分け、`hs-source-dirs` と `build-depends` を明示します。

```cabal
-- Cabal ファイルの最低バージョン
cabal-version:      3.0
-- パッケージ識別情報
name:               sample-app
version:            0.1.0.0
build-type:         Simple

-- ライブラリ定義
library
  hs-source-dirs:   src
  exposed-modules:  Sample.Core
  build-depends:    base ^>=4.20
  default-language: Haskell2010

-- 実行ファイル定義
executable sample-app
  hs-source-dirs:   app
  main-is:          Main.hs
  build-depends:    base ^>=4.20, sample-app
  default-language: Haskell2010
```

## パフォーマンス・品質

### 遅延評価と strictness

Haskell は遅延評価のため、不要な計算を避けられる一方でサンク蓄積に注意が必要です。厳格評価が必要な箇所では `foldl'` や strict フィールドを使います。

```hs
-- 厳格な左畳み込み版を使う
import Data.List (foldl')

sumStrict :: [Int] -> Int
-- 大きな入力でもサンクを溜めにくい
sumStrict = foldl' (+) 0
```

> [!warning]
> `foldl` は大きな入力でメモリを消費しやすいです。集約処理は基本的に `foldl'` を選びます。

### よく使う GHC 拡張

実務で頻出するのは `OverloadedStrings`、`DerivingStrategies`、`GeneralizedNewtypeDeriving` です。拡張は最小限にして、ファイル先頭で明示します。

```hs
-- 拡張をファイル先頭で明示
{-# LANGUAGE DerivingStrategies #-}
{-# LANGUAGE GeneralizedNewtypeDeriving #-}

-- stock/newtype を分けて deriving
newtype Age = Age Int
  deriving stock (Eq, Show)
  deriving newtype (Num)
```

### テストと検証

ユニットテストには Hspec、性質テストには QuickCheck がよく使われます。型で表しきれない仕様はプロパティとして固定し、CI で継続検証します。

```hs
-- Hspec と QuickCheck を併用
import Test.Hspec
import Test.QuickCheck

main :: IO ()
main = hspec $ do
  describe "reverse" $ do
    -- 性質: reverse を2回適用すると元に戻る
    it "double reverse is identity" $
      property $ \xs -> reverse (reverse xs :: [Int]) == xs
```

## 高度な実践トピック

### Lens（ネストした更新を読みやすくする）

イミュータブルなデータを深く更新すると、レコード更新が入れ子になって読みにくくなります。Lens は「どこを読む/書くか」を値として扱い、更新ロジックを合成できるようにします。

初心者は最初に `(^.)`（読む）と `%~`（更新）だけ覚えると十分です。

```hs
{-# LANGUAGE TemplateHaskell #-}

import Lens.Micro ((^.), (%~), (.~))
import Lens.Micro.TH (makeLenses)

data Address = Address
  { _city :: String
  } deriving (Show)

data User = User
  { _name :: String
  , _address :: Address
  } deriving (Show)

-- フィールドから Lens を自動生成
makeLenses ''Address
makeLenses ''User

sampleUser :: User
sampleUser = User "alice" (Address "tokyo")

cityName :: String
-- (^.) は「取り出し」
cityName = sampleUser ^. address . city

updatedUser1 :: User
-- (.~) は「値を置き換え」
updatedUser1 = sampleUser & address . city .~ "osaka"

updatedUser2 :: User
-- (%~) は「関数で変換」
updatedUser2 = sampleUser & name %~ map toUpper
```

> [!warning]
> Lens 演算子は最初は記号が多く見えます。`(^.)`=読む、`.~`=代入風更新、`%~`=関数更新、の3つに絞って使い始めるのがおすすめです。

### STM（安全な共有状態）

複数スレッドで共有状態を扱うとき、`MVar` などのロック管理はデッドロックや取り忘れのリスクがあります。STM（Software Transactional Memory）は「トランザクションとしてまとめて更新」でき、失敗時に自動リトライできます。

```hs
import Control.Concurrent.STM

-- 口座残高を TVar で持つ
type Account = TVar Int

transfer :: Int -> Account -> Account -> STM Bool
transfer amount from to = do
  fromBal <- readTVar from
  if fromBal < amount
    then pure False
    else do
      -- 同一トランザクション内で一貫して更新
      writeTVar from (fromBal - amount)
      toBal <- readTVar to
      writeTVar to (toBal + amount)
      pure True

exampleSTM :: IO Bool
exampleSTM = do
  a <- newTVarIO 100
  b <- newTVarIO 0
  -- atomically で STM を IO から実行
  atomically (transfer 30 a b)
```

> [!warning]
> STM ブロック内では基本的に副作用 IO を直接実行できません。`STM` は状態遷移、`IO` は外側で実行、という分離を意識すると設計が安定します。

### 並行処理（async / race / concurrently）

独立した IO を並行で実行したいときは `async` パッケージの `concurrently` や `race` が実用的です。スレッド生成と待機・例外伝播を手で管理するより安全に書けます。

```hs
import Control.Concurrent (threadDelay)
import Control.Concurrent.Async (concurrently, race)

fetchUser :: IO String
fetchUser = do
  threadDelay 500000
  pure "user:alice"

fetchOrders :: IO [String]
fetchOrders = do
  threadDelay 700000
  pure ["order-1", "order-2"]

loadDashboard :: IO (String, [String])
-- 独立な2つの IO を同時実行
loadDashboard = concurrently fetchUser fetchOrders

fastest :: IO String
-- 早く終わった方の結果を使う
fastest = do
  result <- race fetchUser (pure "cached-user")
  case result of
    Left live -> pure live
    Right cached -> pure cached
```

> [!warning]
> 並行化は「速くなる」だけでなく「失敗のしかた」が変わります。キャンセル時の後始末（ファイル・接続）を意識し、`bracket` 等でリソース管理してください。

### Parser Combinator（パーサを関数合成で書く）

文字列処理を手書きで進めると分岐が増えて壊れやすくなります。Parser Combinator は小さなパーサを合成して、大きな文法を段階的に構築できる手法です。

ここでは `megaparsec` を使って、`name=alice,age=30` をパースする最小例を示します。

```hs
{-# LANGUAGE OverloadedStrings #-}

import Data.Void (Void)
import Text.Megaparsec (Parsec, parseMaybe, sepBy1)
import Text.Megaparsec.Char (alphaNumChar, char, letterChar)
import qualified Text.Megaparsec.Char.Lexer as L

type Parser = Parsec Void String

keyValue :: Parser (String, String)
keyValue = do
  -- キーは英字で開始、値は英数字列
  key <- (:) <$> letterChar <*> many alphaNumChar
  _ <- char '='
  value <- some alphaNumChar
  pure (key, value)

keyValues :: Parser [(String, String)]
-- `,` 区切りで1個以上
keyValues = keyValue `sepBy1` char ','

parseParams :: String -> Maybe [(String, String)]
parseParams = parseMaybe keyValues
```

> [!warning]
> パーサは「入力をどこまで消費したか」が重要です。最初は `parseMaybe` で成功/失敗を確認し、慣れてきたら `parse` で詳細エラーを出すとデバッグしやすくなります。
