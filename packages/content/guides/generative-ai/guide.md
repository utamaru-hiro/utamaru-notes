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

`sparse_categorical_crossentropy` はラベルが整数（0〜9）のままで使える多クラス分類向け損失関数。ラベルがone-hotエンコードされている場合は `categorical_crossentropy` を使う。`adam` は学習率を自動調整する適応的オプティマイザで、多くのタスクでデフォルトとして機能する。

##### 損失・正解率

`history.history` に各エポックの `loss`・`val_loss`・`accuracy`・`val_accuracy` が格納される。訓練損失が下がり続けているのに検証損失が上昇し始めたら過学習のサイン。MNISTでは5エポック程度で検証精度97〜98%程度に達する。

##### オーバーフィッティング

訓練データには高精度なのにテストデータで精度が落ちる状態。`Dropout(0.2)` はランダムにニューロンを20%無効化して過学習を抑制する正則化手法。他の対策として、データ拡張・L2正則化（`kernel_regularizer=keras.regularizers.l2(0.01)`）・早期終了（`EarlyStopping` コールバック）がある。

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
