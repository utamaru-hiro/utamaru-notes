# 生成AI・LLM ガイド

## ニューラルネットワーク

### Kerasの例

#### 説明

Kerasでニューラルネットワークを実装する例。MNISTの手書き数字（0〜9）を分類する全結合ネットワークを構築し、学習・評価・推論までの一連の流れを示す。

#### コード

```python
import numpy as np
from tensorflow import keras
from tensorflow.keras import layers

# KerasでMNISTデータセットを読み込む
(x_train, y_train), (x_test, y_test) = keras.datasets.mnist.load_data()

# 画像データの前処理
x_train = x_train.astype("float32") / 255.0  # ピクセル値を [0, 1] に正規化
x_test  = x_test.astype("float32") / 255.0
x_train = x_train.reshape(-1, 28 * 28)       # 28×28 → 784次元のベクトルに平坦化
x_test  = x_test.reshape(-1, 28 * 28)

# modelの作成
model = keras.Sequential([
    layers.Dense(128, activation="relu", input_shape=(784,)),
    layers.Dropout(0.2),
    layers.Dense(10, activation="softmax"),   # 出力層: 10クラス（0〜9）
])

# コンパイル
model.compile(
    optimizer="adam",
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"],
)

# モデルの適合
history = model.fit(
    x_train, y_train,
    epochs=5,
    batch_size=128,
    validation_split=0.1,   # 訓練データの10%を検証用に使用
)

# モデルの性能を評価
test_loss, test_acc = model.evaluate(x_test, y_test, verbose=0)
print(f"テスト損失: {test_loss:.4f}  テスト精度: {test_acc:.4f}")

# 予測値の生成
predictions = model.predict(x_test[:5])         # 各クラスの確率分布
predicted_labels = np.argmax(predictions, axis=1)
print("予測ラベル:", predicted_labels)
```

##### 損失関数・オプティマイザ

**損失関数**とは、モデルの予測がどれだけ「外れているか」を数値で表すものです。この数値が小さいほどモデルの予測が正確です。`sparse_categorical_crossentropy` は「複数のクラスのどれか1つに分類する」問題に使う損失関数で、正解ラベルが 0・1・2 … のような整数のときに使います。

**オプティマイザ**とは、損失関数の値を小さくするようにモデルの内部パラメータを少しずつ調整していく仕組みです。`adam` は学習率（パラメータを1回にどれだけ動かすか）を自動で調整してくれる定番のオプティマイザで、とくに理由がなければまずこれを使えば大丈夫です。

##### バッチ学習とエポック

**バッチ**とは、1回のパラメータ更新に使うデータのかたまりのことです。全データを一度に使うのではなく、`batch_size=128` のように少しずつ分けて処理します。こうすることでメモリを節約しつつ、細かく何度もパラメータを更新できます。

**エポック**とは、訓練データ全体を1回学習し終えた単位です。`epochs=5` なら全データを5周学習します。1エポックの中でデータは `batch_size` ずつ分割されて順に処理されるので、1エポックあたりのパラメータ更新回数は「データ数 ÷ バッチサイズ」回になります（MNISTの訓練データ54,000件で `batch_size=128` なら約422回）。

エポック数が少なすぎると学習不足（未学習）になり、多すぎると過学習のリスクが高まります。

##### 損失・正解率

学習中の成績は `history.history` に記録されます。各エポック（データを1周学習するたび）の `loss`（訓練データの損失）・`accuracy`（訓練データの正解率）・`val_loss`・`val_accuracy`（検証データの同指標）が入っています。

訓練の損失は下がり続けているのに、検証の損失が途中から上がり始めたら「過学習（オーバーフィッティング）」のサインです。MNISTではこのコードで5エポックほど学習すると、検証精度が97〜98%程度に達します。

##### オーバーフィッティング

**過学習（オーバーフィッティング）**とは、モデルが訓練データの答えを丸暗記してしまい、初めて見るデータにはうまく対応できなくなる状態です。

コードの `Dropout(0.2)` はそれを防ぐ工夫のひとつです。学習中にランダムでニューロンの20%を使わないようにして、特定のパターンへの依存を抑えます。他にも「L2正則化（大きすぎるパラメータにペナルティを与える）」や「早期終了（検証損失が悪化し始めたら学習を止める）」といった対策があります。

### データテンソル

#### 説明

#### 注意

## プロンプトエンジニアリング

### 基本構造（役割・指示・文脈・出力形式）

#### 説明

#### コード

```python
```

### Few-shot プロンプト

#### 説明

#### コード

```python
```

### Chain-of-Thought（CoT）

#### 説明

#### 補足

## RAG（Retrieval-Augmented Generation）

### RAG の全体像

#### 説明

### 埋め込み（Embedding）とベクトル検索

#### 説明

#### 補足

### チャンク戦略

#### 説明

#### 注意

## エージェントとツール呼び出し

### エージェントの構造

#### 説明

### Function Calling / Tool Use

#### 説明

#### コード

```json
```

### ReAct パターン

#### 説明

#### 補足

## ファインチューニング

### フルファインチューニング vs LoRA

#### 説明

### 学習データの作り方

#### 説明

#### 注意

## 評価・安全性

### LLM の評価指標

#### 説明

### ハルシネーション対策

#### 説明

#### 注意
