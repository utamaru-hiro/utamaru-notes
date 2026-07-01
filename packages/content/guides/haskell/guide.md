# Haskell ガイド

## 基本文法・型

### 値束縛とイミュータブル

Haskell の値はデフォルトで不変です。`let` と `where` でローカル束縛を作り、式を組み合わせてプログラムを構築します。命令的な「代入」ではなく、名前に式を結び付ける考え方が基本です。

> [!warning]
> Haskell では `=` は再代入ではなく「定義」です。`x = x + 1` のような命令的更新はできません。

```hs
x :: Int
x = 10

message :: String
message =
  let name = "Alice"
      age = 30
  in name ++ " is " ++ show age

area :: Double -> Double
area r =
  let pi' = 3.1415926535
  in pi' * r * r
```

### 関数定義とパターンマッチ

関数は複数の節で定義でき、引数の形に応じて分岐できます。`case` 式とガード (`|`) を使うことで、条件分岐を宣言的に記述できます。

```hs
factorial :: Integer -> Integer
factorial 0 = 1
factorial n = n * factorial (n - 1)

describeList :: [a] -> String
describeList xs = case xs of
  [] -> "empty"
  [_] -> "singleton"
  _ -> "longer"

bmiLabel :: Double -> Double -> String
bmiLabel w h
  | bmi < 18.5 = "under"
  | bmi < 25.0 = "normal"
  | otherwise = "over"
  where
    bmi = w / (h * h)
```

### リスト・タプル・Maybe/Either

リストは同一型の列、タプルは固定個数かつ異なる型を保持できます。失敗を表す場合は `Maybe`、エラー情報を持たせたい場合は `Either` を使うのが定石です。

> [!warning]
> `head` や `fromJust` のような部分関数は、入力によって実行時例外を起こします。`Maybe`/`Either` による安全な分岐を優先してください。

```hs
numbers :: [Int]
numbers = [1, 2, 3, 4]

pair :: (String, Int)
pair = ("alice", 30)

safeHead :: [a] -> Maybe a
safeHead [] = Nothing
safeHead (x:_) = Just x

parsePort :: String -> Either String Int
parsePort s =
  case reads s of
    [(n, "")] | n > 0 && n < 65536 -> Right n
    _ -> Left "invalid port"
```

### 型注釈と型推論

Haskell は強力な型推論を持ちますが、公開 API や複雑な式には型注釈を書くのが実務的です。`ghci` では `:type` で推論結果を確認できます。

```hs
add :: Int -> Int -> Int
add a b = a + b

composeExample :: (b -> c) -> (a -> b) -> a -> c
composeExample f g x = f (g x)

-- ghci
-- > :type map
-- map :: (a -> b) -> [a] -> [b]
```

## 型クラス

### 代表的な型クラス (Eq, Ord, Show, Read)

型クラスは「この型が満たす振る舞い」を表現する仕組みです。`deriving` を使うと基本的なインスタンスを自動生成できます。

```hs
data User = User
  { userId :: Int
  , userName :: String
  } deriving (Eq, Ord, Show, Read)

isSameUser :: User -> User -> Bool
isSameUser u1 u2 = u1 == u2
```

### 型クラス制約と多相関数

関数シグネチャの `=>` より左側に、必要な型クラス制約を書きます。これにより、同じ関数を多くの型で再利用できます。

```hs
sumList :: Num a => [a] -> a
sumList = foldr (+) 0

sortPair :: Ord a => (a, a) -> (a, a)
sortPair (x, y)
  | x <= y = (x, y)
  | otherwise = (y, x)

printValue :: Show a => a -> IO ()
printValue = putStrLn . show
```

### Functor・Applicative・Monad

`Functor` は文脈付き値への写像、`Applicative` は文脈付き関数の適用、`Monad` は文脈を保った逐次合成を提供します。`Maybe` や `Either e` は典型的なインスタンスです。

```hs
incrementAll :: [Int] -> [Int]
incrementAll = fmap (+1)

safeDiv :: Double -> Double -> Maybe Double
safeDiv _ 0 = Nothing
safeDiv x y = Just (x / y)

calc :: Double -> Double -> Maybe Double
calc x y = do
  a <- safeDiv x y
  b <- safeDiv a 2
  pure (b + 10)
```

## データ定義

### 代数的データ型 (ADT)

Haskell のデータモデルは、和型（複数コンストラクタ）と積型（複数フィールド）の組み合わせで表現できます。ビジネスルールを型に落とすと、実行前に不正状態を排除しやすくなります。

```hs
data PaymentMethod
  = CreditCard String
  | BankTransfer String
  | Cash
  deriving (Eq, Show)

data Order = Order
  { orderId :: Int
  , amount :: Int
  , paymentMethod :: PaymentMethod
  } deriving (Eq, Show)
```

### record 構文・type alias・newtype

`type` は別名、`newtype` は実行時オーバーヘッドなしの型ラッパです。ドメイン制約を明示したいときは `newtype` が有効です。

```hs
type UserId = Int

newtype Email = Email { unEmail :: String }
  deriving (Eq, Show)

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
data Priority = Low | Medium | High

instance Show Priority where
  show Low = "low"
  show Medium = "medium"
  show High = "high"

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
main :: IO ()
main = do
  putStrLn "What is your name?"
  name <- getLine
  putStrLn ("Hello, " ++ name)
```

### エラーハンドリング (Either / ExceptT)

純粋関数内では `Either e a`、IO と組み合わせる場合は `ExceptT e IO a` を使うと、失敗経路を型で管理できます。

```hs
{-# LANGUAGE OverloadedStrings #-}

import Control.Monad.Except (ExceptT, MonadError(throwError), runExceptT)

validateName :: String -> Either String String
validateName s
  | null s = Left "name is empty"
  | otherwise = Right s

loadUser :: String -> ExceptT String IO String
loadUser s = do
  name <- either throwError pure (validateName s)
  pure ("user:" ++ name)

runLoadUser :: String -> IO (Either String String)
runLoadUser = runExceptT . loadUser
```

### モジュール分割と Cabal

アプリではモジュール境界を先に切ると保守しやすくなります。`cabal` では `library` と `executable` を分け、`hs-source-dirs` と `build-depends` を明示します。

```cabal
cabal-version:      3.0
name:               sample-app
version:            0.1.0.0
build-type:         Simple

library
  hs-source-dirs:   src
  exposed-modules:  Sample.Core
  build-depends:    base ^>=4.20
  default-language: Haskell2010

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
import Data.List (foldl')

sumStrict :: [Int] -> Int
sumStrict = foldl' (+) 0
```

> [!warning]
> `foldl` は大きな入力でメモリを消費しやすいです。集約処理は基本的に `foldl'` を選びます。

### よく使う GHC 拡張

実務で頻出するのは `OverloadedStrings`、`DerivingStrategies`、`GeneralizedNewtypeDeriving` です。拡張は最小限にして、ファイル先頭で明示します。

```hs
{-# LANGUAGE DerivingStrategies #-}
{-# LANGUAGE GeneralizedNewtypeDeriving #-}

newtype Age = Age Int
  deriving stock (Eq, Show)
  deriving newtype (Num)
```

### テストと検証

ユニットテストには Hspec、性質テストには QuickCheck がよく使われます。型で表しきれない仕様はプロパティとして固定し、CI で継続検証します。

```hs
import Test.Hspec
import Test.QuickCheck

main :: IO ()
main = hspec $ do
  describe "reverse" $ do
    it "double reverse is identity" $
      property $ \xs -> reverse (reverse xs :: [Int]) == xs
```
