# KaTeX 記法チートシート

## 基本記法

各表の「記法」列は KaTeX ソースコード、「表示」列はレンダリング結果です。インライン数式は `$...$`、ブロック数式は `$$...$$` で囲みます。

### インライン数式とブロック数式

テキスト中に埋め込む場合は `$...$`、独立した行に大きく表示する場合は `$$...$$` で囲みます。

| 記法 | 表示 |
|---|---|
| `$E = mc^2$` | $E = mc^2$ |

ブロック数式（`$$...$$`）は中央揃えで表示されます。

$$E = mc^2$$

### 上付き・下付き文字

`^` で上付き、`_` で下付きになります。2 文字以上は `{...}` で囲みます。

| 記法 | 表示 |
|---|---|
| `x^{2}` | $x^{2}$ |
| `x_{i}` | $x_{i}$ |
| `x^{n+1}` | $x^{n+1}$ |
| `x_{i,j}` | $x_{i,j}$ |
| `x_i^2` | $x_i^2$ |
| `A^{-1}` | $A^{-1}$ |

### 分数・根号・括弧

`\frac{分子}{分母}` で分数、`\sqrt{...}` で根号を表します。`\left...\right` でネストに合わせて括弧のサイズを自動調整できます。

| 記法 | 表示 |
|---|---|
| `\frac{a}{b}` | $\frac{a}{b}$ |
| `\sqrt{x}` | $\sqrt{x}$ |
| `\sqrt[n]{x}` | $\sqrt[n]{x}$ |
| `\left( \frac{a}{b} \right)` | $\left( \frac{a}{b} \right)$ |
| `\left[ \frac{a}{b} \right]` | $\left[ \frac{a}{b} \right]$ |
| `\left\{ x \mid x > 0 \right\}` | $\left\{ x \mid x > 0 \right\}$ |

### 演算子・等号・比較

| 記法 | 表示 | 意味 |
|---|---|---|
| `\pm` | $\pm$ | プラスマイナス |
| `\times` | $\times$ | 積（クロス）|
| `\div` | $\div$ | 除算 |
| `\cdot` | $\cdot$ | 中点積 |
| `\leq` | $\leq$ | 以下 |
| `\geq` | $\geq$ | 以上 |
| `\neq` | $\neq$ | 不等 |
| `\approx` | $\approx$ | 近似 |
| `\equiv` | $\equiv$ | 恒等・合同 |
| `\propto` | $\propto$ | 比例 |
| `\sim` | $\sim$ | 漸近・従う（確率分布）|
| `\ll` | $\ll$ | 十分小さい |
| `\gg` | $\gg$ | 十分大きい |

### ギリシャ文字

頻出する小文字・大文字を一覧します。

| 記法 | 表示 | 記法 | 表示 | 記法 | 表示 |
|---|---|---|---|---|---|
| `\alpha` | $\alpha$ | `\beta` | $\beta$ | `\gamma` | $\gamma$ |
| `\delta` | $\delta$ | `\epsilon` | $\epsilon$ | `\varepsilon` | $\varepsilon$ |
| `\zeta` | $\zeta$ | `\eta` | $\eta$ | `\theta` | $\theta$ |
| `\kappa` | $\kappa$ | `\lambda` | $\lambda$ | `\mu` | $\mu$ |
| `\nu` | $\nu$ | `\xi` | $\xi$ | `\pi` | $\pi$ |
| `\rho` | $\rho$ | `\sigma` | $\sigma$ | `\tau` | $\tau$ |
| `\phi` | $\phi$ | `\varphi` | $\varphi$ | `\omega` | $\omega$ |
| `\Gamma` | $\Gamma$ | `\Delta` | $\Delta$ | `\Sigma` | $\Sigma$ |
| `\Lambda` | $\Lambda$ | `\Pi` | $\Pi$ | `\Phi` | $\Phi$ |
| `\Psi` | $\Psi$ | `\Omega` | $\Omega$ | | |

### 数式フォントと特殊定数

`\mathbb`（黒板太字）や `\mathcal`（筆記体）は数集合・演算子の表記に使います。

| 記法 | 表示 | 用途 |
|---|---|---|
| `\mathbb{R}` | $\mathbb{R}$ | 実数全体 |
| `\mathbb{C}` | $\mathbb{C}$ | 複素数全体 |
| `\mathbb{N}` | $\mathbb{N}$ | 自然数 |
| `\mathbb{Z}` | $\mathbb{Z}$ | 整数 |
| `\mathbb{Q}` | $\mathbb{Q}$ | 有理数 |
| `\mathcal{L}` | $\mathcal{L}$ | 筆記体（ラプラスなど）|
| `\mathbf{A}` | $\mathbf{A}$ | 太字（行列・ベクトル）|
| `\mathrm{e}` | $\mathrm{e}$ | 正体（自然定数）|
| `\infty` | $\infty$ | 無限大 |
| `\partial` | $\partial$ | 偏微分記号 |
| `\nabla` | $\nabla$ | ナブラ |

### アクセント・装飾と省略記号

| 記法 | 表示 | 用途 |
|---|---|---|
| `\hat{x}` | $\hat{x}$ | 推定量・単位ベクトル |
| `\bar{x}` | $\bar{x}$ | 平均・複素共役 |
| `\vec{x}` | $\vec{x}$ | ベクトル |
| `\dot{x}` | $\dot{x}$ | 時間微分（1 階）|
| `\ddot{x}` | $\ddot{x}$ | 時間微分（2 階）|
| `\tilde{x}` | $\tilde{x}$ | 変換後・近似 |
| `\overline{AB}` | $\overline{AB}$ | 複数文字上線 |
| `\cdots` | $\cdots$ | 中央省略（水平）|
| `\vdots` | $\vdots$ | 垂直省略 |
| `\ddots` | $\ddots$ | 対角省略 |

---

## 集合論

集合の基本演算から写像・濃度まで整理します。

### 帰属と部分集合

| 記法 | 表示 | 意味 |
|---|---|---|
| `a \in A` | $a \in A$ | a は A の元 |
| `a \notin A` | $a \notin A$ | a は A の元でない |
| `A \subset B` | $A \subset B$ | A は B の部分集合 |
| `A \subseteq B` | $A \subseteq B$ | 等号を含む部分集合 |
| `A \subsetneq B` | $A \subsetneq B$ | 真の部分集合 |
| `A \supset B` | $A \supset B$ | A は B を包含 |

### 集合演算

| 記法 | 表示 | 意味 |
|---|---|---|
| `A \cup B` | $A \cup B$ | 和集合 |
| `A \cap B` | $A \cap B$ | 積集合 |
| `A \setminus B` | $A \setminus B$ | 差集合 |
| `A^c` | $A^c$ | 補集合 |
| `\overline{A}` | $\overline{A}$ | 補集合（上線）|
| `\emptyset` | $\emptyset$ | 空集合 |
| `\varnothing` | $\varnothing$ | 空集合（別形）|
| `A \times B` | $A \times B$ | 直積 |

多重演算の添字はブロック数式で見やすくなります。

$$\bigcup_{i=1}^{n} A_i \qquad \bigcap_{i=1}^{n} A_i$$

### 冪集合と濃度

| 記法 | 表示 | 意味 |
|---|---|---|
| `\mathcal{P}(A)` | $\mathcal{P}(A)$ | 冪集合 |
| `2^A` | $2^A$ | 冪集合（別形）|
| `\lvert A \rvert` | $\lvert A \rvert$ | 濃度・要素数 |
| `\aleph_0` | $\aleph_0$ | 可算無限濃度 |
| `\mathfrak{c}` | $\mathfrak{c}$ | 連続体の濃度 |

### 写像

| 記法 | 表示 | 意味 |
|---|---|---|
| `f: A \to B` | $f: A \to B$ | 写像の型 |
| `x \mapsto f(x)` | $x \mapsto f(x)$ | 元の対応 |
| `f \circ g` | $f \circ g$ | 合成写像 |
| `f^{-1}` | $f^{-1}$ | 逆写像 |
| `\twoheadrightarrow` | $\twoheadrightarrow$ | 全射 |
| `\hookrightarrow` | $\hookrightarrow$ | 単射 |

---

## 論理記号・関係記号

命題論理と述語論理の標準記法を整理します。

### 量化子と論理演算

| 記法 | 表示 | 意味 |
|---|---|---|
| `\forall x` | $\forall x$ | すべての x について |
| `\exists x` | $\exists x$ | ある x が存在する |
| `\exists! x` | $\exists! x$ | ただ一つ存在する |
| `\nexists` | $\nexists$ | 存在しない |
| `P \land Q` | $P \land Q$ | かつ（AND）|
| `P \lor Q` | $P \lor Q$ | または（OR）|
| `\neg P` | $\neg P$ | 否定（NOT）|
| `P \oplus Q` | $P \oplus Q$ | 排他的論理和 |

### 含意・同値・証明記号

| 記法 | 表示 | 意味 |
|---|---|---|
| `P \Rightarrow Q` | $P \Rightarrow Q$ | P ならば Q |
| `P \Leftrightarrow Q` | $P \Leftrightarrow Q$ | 同値 |
| `P \iff Q` | $P \iff Q$ | 同値（別形）|
| `\therefore` | $\therefore$ | ゆえに |
| `\because` | $\because$ | なぜなら |
| `:=` | $:=$ | 定義 |
| `\triangleq` | $\triangleq$ | 定義（別形）|
| `a \equiv b \pmod{n}` | $a \equiv b \pmod{n}$ | n を法とする合同 |

---

## 微積分

### 極限

| 記法 | 表示 |
|---|---|
| `\lim_{x \to a} f(x)` | $\lim_{x \to a} f(x)$ |
| `\lim_{n \to \infty} a_n` | $\lim_{n \to \infty} a_n$ |
| `\lim_{x \to 0^+}` | $\lim_{x \to 0^+}$ |
| `\lim_{x \to 0^-}` | $\lim_{x \to 0^-}$ |

ブロック表示で添字がより見やすくなります。

$$\lim_{n \to \infty} \left(1 + \frac{1}{n}\right)^n = e$$

### 微分

ライプニッツ記法、ラグランジュ記法、ニュートン記法の 3 種類を示します。

| 記法 | 表示 | 備考 |
|---|---|---|
| `\frac{dy}{dx}` | $\frac{dy}{dx}$ | ライプニッツ 1 階 |
| `\frac{d^2 y}{dx^2}` | $\frac{d^2 y}{dx^2}$ | ライプニッツ 2 階 |
| `f'(x)` | $f'(x)$ | ラグランジュ 1 階 |
| `f''(x)` | $f''(x)$ | ラグランジュ 2 階 |
| `f^{(n)}(x)` | $f^{(n)}(x)$ | n 階 |
| `\dot{x}` | $\dot{x}$ | ニュートン 1 階 |
| `\ddot{x}` | $\ddot{x}$ | ニュートン 2 階 |

### 偏微分

| 記法 | 表示 |
|---|---|
| `\frac{\partial f}{\partial x}` | $\frac{\partial f}{\partial x}$ |
| `\frac{\partial^2 f}{\partial x^2}` | $\frac{\partial^2 f}{\partial x^2}$ |
| `\frac{\partial^2 f}{\partial x \partial y}` | $\frac{\partial^2 f}{\partial x \partial y}$ |

### 積分

| 記法 | 表示 |
|---|---|
| `\int f(x)\,dx` | $\int f(x)\,dx$ |
| `\int_a^b f(x)\,dx` | $\int_a^b f(x)\,dx$ |
| `\iint_D f\,dA` | $\iint_D f\,dA$ |
| `\iiint_V f\,dV` | $\iiint_V f\,dV$ |
| `\oint_C \mathbf{F} \cdot d\mathbf{r}` | $\oint_C \mathbf{F} \cdot d\mathbf{r}$ |

$$\int_a^b f(x)\,dx = F(b) - F(a)$$

### 総和・総積

| 記法 | 表示 |
|---|---|
| `\sum_{k=1}^{n} a_k` | $\sum_{k=1}^{n} a_k$ |
| `\prod_{k=1}^{n} a_k` | $\prod_{k=1}^{n} a_k$ |
| `\sum_{k=0}^{\infty}` | $\sum_{k=0}^{\infty}$ |

$$e^x = \sum_{n=0}^{\infty} \frac{x^n}{n!}$$

---

## 線形代数

### ベクトル表記と内積

| 記法 | 表示 | 意味 |
|---|---|---|
| `\mathbf{v}` | $\mathbf{v}$ | 太字ベクトル |
| `\vec{v}` | $\vec{v}$ | 矢印ベクトル |
| `\hat{e}` | $\hat{e}$ | 単位ベクトル |
| `\mathbf{u} \cdot \mathbf{v}` | $\mathbf{u} \cdot \mathbf{v}$ | 内積（ドット）|
| `\langle \mathbf{u}, \mathbf{v} \rangle` | $\langle \mathbf{u}, \mathbf{v} \rangle$ | 内積（山括弧）|
| `\mathbf{u} \times \mathbf{v}` | $\mathbf{u} \times \mathbf{v}$ | 外積 |

列ベクトルは `pmatrix` 環境で表します。

$$\mathbf{v} = \begin{pmatrix} v_1 \\ v_2 \\ v_3 \end{pmatrix}$$

### 行列

丸括弧は `pmatrix`、角括弧は `bmatrix`、縦棒は `vmatrix` 環境を使います。

$$A = \begin{pmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{pmatrix} \qquad \begin{vmatrix} a & b \\ c & d \end{vmatrix} = ad - bc$$

### 行列の演算記号

| 記法 | 表示 | 意味 |
|---|---|---|
| `A^\top` | $A^\top$ | 転置 |
| `A^{-1}` | $A^{-1}$ | 逆行列 |
| `\det(A)` | $\det(A)$ | 行列式 |
| `\mathrm{tr}(A)` | $\mathrm{tr}(A)$ | トレース |
| `\mathrm{rank}(A)` | $\mathrm{rank}(A)$ | ランク |
| `\ker(A)` | $\ker(A)$ | 核 |
| `\lVert \mathbf{v} \rVert` | $\lVert \mathbf{v} \rVert$ | ノルム |

### 固有値問題

固有値方程式と特性方程式です。

$$A\mathbf{x} = \lambda\mathbf{x} \qquad \det(A - \lambda I) = 0$$

---

## ベクトル解析

ナブラ演算子を使った標準記法です。

### 勾配・発散・回転・ラプラシアン

| 演算 | 記法 | 表示 |
|---|---|---|
| 勾配（grad）| `\nabla f` | $\nabla f$ |
| 発散（div）| `\nabla \cdot \mathbf{F}` | $\nabla \cdot \mathbf{F}$ |
| 回転（rot）| `\nabla \times \mathbf{F}` | $\nabla \times \mathbf{F}$ |
| ラプラシアン | `\nabla^2 f` | $\nabla^2 f$ |

各演算の成分展開形です。

$$\nabla f = \left(\frac{\partial f}{\partial x},\, \frac{\partial f}{\partial y},\, \frac{\partial f}{\partial z}\right)$$

$$\nabla \cdot \mathbf{F} = \frac{\partial F_x}{\partial x} + \frac{\partial F_y}{\partial y} + \frac{\partial F_z}{\partial z}$$

$$\nabla^2 f = \frac{\partial^2 f}{\partial x^2} + \frac{\partial^2 f}{\partial y^2} + \frac{\partial^2 f}{\partial z^2}$$

### 積分定理

ガウスの発散定理とストークスの定理です。

$$\oiint_S \mathbf{F} \cdot d\mathbf{S} = \iiint_V (\nabla \cdot \mathbf{F})\,dV$$

$$\oint_C \mathbf{F} \cdot d\mathbf{r} = \iint_S (\nabla \times \mathbf{F}) \cdot d\mathbf{S}$$

---

## 常微分方程式

### ODE の記法

| 記法 | 表示 | 意味 |
|---|---|---|
| `y'` | $y'$ | 1 階導関数 |
| `y''` | $y''$ | 2 階導関数 |
| `\dot{y}` | $\dot{y}$ | 時間微分（ニュートン）|
| `y^{(n)}` | $y^{(n)}$ | n 階導関数 |

### 1 階線形 ODE

標準形と積分因子法を示します。

$$y' + p(x)y = q(x)$$

積分因子 $\mu(x) = e^{\int p(x)\,dx}$ を両辺に掛けると $(\mu y)' = \mu q$ が得られます。

### 2 階定係数 ODE

特性方程式の根の種類で一般解の形が変わります。

$$ay'' + by' + cy = 0 \qquad \text{特性方程式: } a\lambda^2 + b\lambda + c = 0$$

| 根の種類 | 一般解 |
|---|---|
| 実数異根 $\lambda_1 \neq \lambda_2$ | $C_1 e^{\lambda_1 x} + C_2 e^{\lambda_2 x}$ |
| 重根 $\lambda$ | $(C_1 + C_2 x)e^{\lambda x}$ |
| 複素根 $\alpha \pm \beta i$ | $e^{\alpha x}(C_1 \cos\beta x + C_2 \sin\beta x)$ |

---

## フーリエ・ラプラス変換

変換演算子は筆記体文字 $\mathcal{F}$、$\mathcal{L}$ で表します。

### フーリエ変換

| 記法 | 表示 |
|---|---|
| `\mathcal{F}\{f\}` | $\mathcal{F}\{f\}$ |
| `\hat{f}(\omega)` | $\hat{f}(\omega)$ |
| `\mathcal{F}^{-1}\{\hat{f}\}` | $\mathcal{F}^{-1}\{\hat{f}\}$ |

$$\mathcal{F}\{f(t)\} = \hat{f}(\omega) = \int_{-\infty}^{\infty} f(t)\,e^{-i\omega t}\,dt$$

$$f(t) = \frac{1}{2\pi}\int_{-\infty}^{\infty} \hat{f}(\omega)\,e^{i\omega t}\,d\omega$$

### ラプラス変換

| 記法 | 表示 |
|---|---|
| `\mathcal{L}\{f\}` | $\mathcal{L}\{f\}$ |
| `F(s)` | $F(s)$ |
| `\mathcal{L}^{-1}\{F\}` | $\mathcal{L}^{-1}\{F\}$ |

$$\mathcal{L}\{f(t)\} = F(s) = \int_0^{\infty} f(t)\,e^{-st}\,dt$$

主な変換ペア（$s > 0$）:

| $f(t)$ | $F(s)$ |
|---|---|
| $1$ | $\dfrac{1}{s}$ |
| $e^{-at}$ | $\dfrac{1}{s+a}$ |
| $\sin(\omega t)$ | $\dfrac{\omega}{s^2+\omega^2}$ |
| $\cos(\omega t)$ | $\dfrac{s}{s^2+\omega^2}$ |
| $t^n$ | $\dfrac{n!}{s^{n+1}}$ |

### 畳み込み

時間領域の畳み込みはラプラス変換で積になります。

$$(f * g)(t) = \int_0^t f(\tau)\,g(t-\tau)\,d\tau$$

$$\mathcal{L}\{f * g\} = F(s)\cdot G(s)$$
