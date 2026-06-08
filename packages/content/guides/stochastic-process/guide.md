# 確率過程学習メモ

## 確率論の基礎

### 確率変数の変換

関数$f(x)$により、連続な確率変数$X$が、新しい確率変数$Y$に変換されるものとする。

$$Y = f(X)$$
$$X = g(Y)$$
$$(g = f^{-1})$$

このとき$X$の確率密度$p_X(x)$が、どのように$Y$の確率密度$p_Y(y)$に変換されるか。

区間の変換$\,\left[x_1,x_2\right) \to \left[y_1,y_2\right)\,$が生じるが、変数の変換によっては事象は**変化しない**。
つまり、$A_X \equiv \{x_1 \le x_2\}, A_Y \equiv \{y_1 \le y_2\}$ は同じものである。
したがって、$P(A_X) = P(A_Y)$ より、

**確率保存則**
$$
\begin{equation}
\tag{4.3}
\int_{x_1}^{x_2} p_X(x) dx = \int_{y_1}^{y_2} p_Y(y)dy
\end{equation}
$$
が成り立つ。

式$(4.3)$は

$$
p_X(x)\,dx = p_Y(y)\,dy
$$

なので、**微分の公式** $dx=g'(y)dy$ を用いれば、**確率密度の変換則**

$$
\begin{equation}
\tag{4.5}
p_Y(y) = p_X(g(y))|g'(y)|
\end{equation}
$$

が得られる。

#### 【例 4.1】 線形変換

$$
Y=\sigma X + \mu,\qquad X=\frac{Y-\mu}{\sigma}
$$

による確率密度の変換は、$dx=dy/\sigma$ からただちに

$$
p_Y(y)=p_X\left(\frac{y-\mu}{\sigma}\right)\frac{1}{|\sigma|}
$$

が得られる。
$\mu$ は確率密度の**移動**を、$\sigma$は座標の**伸縮**を表すパラメータである。

#### 【例 4.2】 対数変換

$R_X=(0,1]$ 上の確率変数を、$R=[0, \infty)$ 上の確率変数に変換する関数として、

$$
Y=-\log X
$$

を考える。$x=e^{-y},\,\,dx=-e^{-y}dy$ であるから、式 (4.5) より$Y$の確率密度

$$
p_Y(y)=p_X(e^{-y})e^{-y},\qquad 0 \le y \lt \infty
$$

が得られる。
特に、$X$ が $R_X=\left(0,1\right]$ 上で一様な密度 $p_X(x) = 1$ をもてば、

$$
p_Y(y) = e^{-y}, \qquad 0 \le y \lt \infty
$$

が得られる。これは**指数分布**と言われている。

この事実より、一様乱数を指数分布を持つ乱数に変換できる。

#### 2次元確率変数の変換

1次元と同様に議論できる。
確率保存則

$$
p_Y(y_1,y_2)dy_1dy_2 = p_X(x_1,x_2)dx_1dx_2
$$

が成り立つ。したがって、積分変換の公式 $dx_1dx_2=|J|dy_1dy_2$ を用いれば

$$
p_Y(y_1,y_2)=p_X(g_1(y_1,y_2),g_2(y_1,y_2))|J|
$$

ただし、

$$
J \equiv \frac{\partial (x_1, x_2)}{\partial (y_1, y_2)} = \begin{vmatrix} \frac{\partial g_1}{\partial y_1} \frac{\partial g_1}{\partial y_2} \\ \frac{\partial g_2}{\partial y_1} \frac{\partial g_2}{\partial y_2}\end{vmatrix}
$$

で Jacobi 行列式。

#### 確率変数の和の確率分布

２つの確率変数$X_1,\,\,X_2$の和の確率密度を求める。

$$
X = X_1 + X_2, \qquad Y = X_2
$$

と変数変換すると、$(X,Y)$ の2次元確率密度は$p(x-y,y)$となる。
したがって、

$$
p(x) = \int_{-\infty}^{\infty} p(x,x-y)dy
$$

となる。もし、$X_1, X_2$ が独立であったな、$p(x_1, x_2)=p_1(x_1)p_2(x_2)$となるので

$$
p(x) = \int_{-\infty}^{\infty} p_1(x)p_2(x-y)\mathrm{d}y \equiv p_1(x) * p_2(x)
$$

となり、畳み込み積分となる。

#### 【例 4.3】 線形変換による確率密度の変換則

$$
\bm{Y}=\bm{A}\bm{X}+\bm{b}, \qquad \bm{X}=\bm{A^{-1}}(\bm{Y}-\bm{b})
$$

となる場合、確率密度は

$$
p_Y(\bm{y})=p_X(\bm{A^{-1}}(\bm{y}-\bm{b}))\frac{1}{|\bm{A}|} \\
|\bm{A}|=|\mathrm{det}\bm{A}|
$$

### 確率変数の平均

#### 1次元確率変数の平均

**平均値（期待値）**

$$
\langle f(X) \rangle = \frac{1}{N_{\Omega}}\sum_{\omega \in \Omega}f(X(\omega))
$$
$$
\Omega := 全事象 \\
\omega := 要素事象 \\
$$

> [!tip] 平均値の線形性
> 平均値の計算は線形性がある

**離散確率変数の場合**

$$
\langle f(X) \rangle = \sum_{k=1}^{\infty}f(a_k)p_k
$$

**連続確率変数の場合**

$$
\langle f(X) \rangle = \int_{-\infty}^{\infty}f(x)p(x)dx
$$

**モーメント**

$$
M_n \equiv \langle X^n \rangle = \int_{-\infty}^{\infty}x^n p(x)dx
$$

を $X$ の **$n$次モーメント**とよぶ。

**中心モーメント**

$$
\langle (X-\mu)^n \rangle = \int_{-\infty}^{\infty}(x-\mu)^n p(x)dx
$$

**分散**

$$
\sigma^2 \equiv \langle(X-\mu)^2\rangle = \langle X^2 \rangle-\langle X \rangle^2
$$

**標準偏差**

$$
\sigma = \sqrt{\sigma^2}
$$

**Chebyshev不等式**

$K \gt 0$に対し、

$$
P(\lvert X-\mu \rvert \ge K\sigma) \le \frac{1}{K^2}
$$

[証明]

平均値の式で、積分範囲を$f(x) \ge K^2\sigma^2$に限定すると

$$
\begin{equation}
\begin{split}
\tag{5.13}
\langle f(X) &\rangle \ge \int_{f(x)\ge K^2\sigma^2} f(x)p(x)dx \\
&\ge K^2\sigma^2\int_{f(x)\ge K^2\sigma^2}p(x)dx\\
&= K^2\sigma^2 P(f(X) \gt K^2\sigma^2)
\end{split}
\end{equation}
$$

ここで、$f(x)=(x-\mu)^2$とすると、 $\langle f(X) \rangle = \langle (X-\mu)^2 \rangle = \sigma^2$ であり、 $(X-\mu)^2 \gt K^2\sigma^2$ は $\lvert X-\mu \rvert \gt K\sigma$ と同じなので

$$
\sigma^2 \ge K^2\sigma^2P(\lvert X-\mu \rvert \ge K\sigma)
$$

$$
P(\lvert X-\mu \rvert \ge K\sigma) \le \frac{1}{K^2}
$$

となる。
[証明終]

**情報量**

$$I(X)=-\log p(X)\quad(\ge0)$$

**エントロピー**

$$H \equiv \langle I(X) \rangle = - \sum_{k=1}^{\infty} p_k \log p_k$$

連続確率密度の場合は

$$H \equiv \langle I(X) \rangle = - \int_{-\infty}^{\infty} p(x) \log p(x)\,dx$$

#### 2次元確率変数の平均

$$\langle f(X,Y) \rangle = \iint_{-\infty}^{\infty} f(x,y)p(x,y)\,dxdy$$

**条件付き平均**

$$\langle f(X,Y)|Y=y \rangle=\int_{-\infty}^{\infty}f(x,y)p(x|y)\,dx$$

**分散・共分散・相関**

$(X,Y)$の平均値、分散を

$$\mu_x \equiv \langle X \rangle, \qquad \sigma_x^2 \equiv R_{xx}=\langle (X-\mu_x)^2 \rangle$$

$$\mu_y \equiv \langle Y \rangle, \qquad \sigma_y^2 \equiv R_{yy}=\langle (Y-\mu_y)^2 \rangle$$

とおく。$X$と$Y$にまたがる2次の中心モーメント

$$
\begin{split}
R_{xy}=R_{yx}&= \langle (X-\mu_x)(Y-\mu_y) \rangle \\
&=\langle XY \rangle-\langle X \rangle \langle Y \rangle
\end{split}
$$

を$X$と$Y$の**共分散**あるいは**相関**とよぶ。

**2次相関行列**

$$\mathbf{R}=\begin{bmatrix}R_{xx} R_{xy} \\ R_{yx} R_{yy}\end{bmatrix}$$

**相関係数**

$$
\rho_{xy} \equiv \frac{R_{xy}}{\sigma_x\sigma_y}=\frac{\langle (X-\mu_x)(Y-\mu_y) \rangle}{[\langle (X-\mu_x)^2\rangle \langle (Y-\mu_y)^2 \rangle]^{1/2}}
$$

相関係数の絶対値は1より小さい

$$-1 \le \rho_{xy} \le 1, \qquad \rho_{xy} \equiv \cos{\theta_{xy}}$$

**独立変数の和 - 平均と分散**

$N$ 個の独立な確率変数 $X_n$ の和

$$X=X_1+X_2+\cdots+X_N$$

の平均値と分散は次の通り。

$$
\begin{split}
\langle X \rangle &\equiv \bar{\mu}=\mu_1+\cdots+\mu_N \\

\langle X^2 \rangle - \langle X \rangle^2 &\equiv \bar{\sigma}^2=\sigma_1^2 + \cdots + \sigma_N^2
\end{split}
$$

特に全ての平均と分散が$\mu,\,\sigma^2$とひとしければ

$$\bar{\mu}=N\mu,\quad \bar{\sigma}^2=N\sigma^2$$

#### 多次元確率変数の相関行列

**相関行列**

$$R_{mn}=\langle X_mX_n \rangle - \langle X_m \rangle\langle X_n \rangle
$$

とした時に、

$$
\mathbf{R} \equiv \begin{bmatrix}
R_{11} & R_{12} & \cdots & R_{1N} \\
R_{21} & R_{22} & \cdots & R_{2N} \\
\vdots & \vdots & \ddots & \vdots \\
R_{N1} & R_{N2} & \cdots & R_{NN}
\end{bmatrix}
$$

を相関行列または共分散行列という。

**相関係数**

$$\rho_{mn} \equiv \cos{\theta_{mn}}=\frac{R_{mn}}{\sqrt{R_{mm}R_{nn}}}$$

### 特性関数・モーメント母関数

#### 特性関数

**連続確率変数の場合**

確率密度のFourier変換を**特性関数**と呼ぶ。

$$\Phi(\lambda)=\langle \mathrm{e}^{i\lambda X} \rangle=\int_{-\infty}^{\infty}\mathrm{e}^{i\lambda x}p(x)dx, \quad -\infty \lt \lambda \lt \infty$$

Fourier逆変換は分布を表す。

$$p(x)=\frac{1}{2\pi}\int_{-\infty}^{\infty}\mathrm{e}^{-i\lambda x}\Phi(\lambda)d\lambda$$

次が成り立つ。

$$
\Phi(0)=1, \quad \bar{\Phi(\lambda)}=\Phi(-\lambda), \quad \lvert \Phi(\lambda) \rvert \le 1
$$

**特性関数のメリット**

1. 常に存在する
1. 特性関数が同じなら分布も同じ
1. 和の分布が積になる
1. 収束の議論に非常に相性がいい
1. モーメントを取り出せる

5の議論については次が成り立つ。

$$\Phi_X'(0)=i\langle X \rangle, \quad \Phi_X''(0)=-\langle X^2 \rangle$$

**離散確率変数の場合**

状態空間が整数 $R=\{-\infty \lt n \lt \infty \}$で、確率分布が $p_n$ の場合、Fourier級数は次の形で与えられる。

$$
\Phi(\Lambda) \equiv \langle \mathrm{e}^{i\Lambda X} \rangle = \sum_{n=-\infty}^{\infty}p_n\mathrm{e}^{in\Lambda}, \quad -\pi \le \Lambda \lt \pi
$$

逆変換は、

$$
p_n=\frac{1}{2\pi}\int_{-\infty}^{\infty} \mathrm{e}^{-in\Lambda}\Phi(\Lambda)d\Lambda
$$

特に、状態空間が正の整数 $R_+=\{0,1,2,\cdots\}$の場合には、$\mathrm{e}^{i\Lambda} \to z$と置き換えたものを**確率母関数**とよぶ。

$$
\psi(z) \equiv \langle z^X \rangle=\sum_{k=0}^{\infty}p_kz^k, \quad |z| \le 1
$$

この場合、確率分布はべき展開の$z^k$の係数として求められる。

**特性関数の特別な場合**

$N$次元の独立な確率変数の特性関数は

$$\Phi(\lambda_1,\cdots,\lambda_N)=\Phi_1(\lambda_1)\cdots\Phi_N(\lambda_N)$$

$N$個の独立な確率変数の和は

$$\Phi(\lambda)=\Phi_1(\lambda)\cdots\Phi_N(\lambda)$$

#### モーメント母関数

確率分布のラプラス変換を**モーメント母関数**という。

**連続確率変数の場合**

$$
\varphi(z)=\langle \mathrm{e}^{zX} \rangle=\int_{-\infty}^{\infty} \mathrm{e}^{zx}p(x)dx
$$

別の観点として、$\mathrm{e}^{zX}$のTaylor展開を代入すると、

$$
\varphi(z)=\langle \sum_{n=0}^{\infty}\frac{(zX)^{n}}{n!} \rangle=\sum_{n=0}^{\infty}\frac{M_n}{n!}z^n
$$

ただし、$M_n$はn次モーメントを表す。

$$
M_n=\langle X^n \rangle=\left[ \frac{d^n\varphi(z)}{dz^n} \right]_{z=0}
$$

**離散確率変数の場合**

n次の**階乗モーメント**

$$
\begin{split}
\langle X^{(n)} \rangle&=\langle X(X-1)\cdots(X-n+1) \rangle \\
&=\sum_{k=0}^{\infty}k(k-1)\cdots(k-n+1)p_k \\
&=\left[ \frac{d^n\psi(z)}{dz^n} \right]_{z=1}
\end{split}
$$

ただし、$\psi(z)$は確率母関数。

#### キュムラント

モーメント母関数$\psi(z)$の対数$\log{\psi(z)}$を、キュムラント母関数とよぶ。母関数のべき展開

$$
C_{X}(z)=\log{\varphi(z)}=\sum_{n=1}^{\infty}\frac{C_n}{n!}z^n
$$

の係数$C_n$をn次のキュムラントと呼ぶ。
モーメント$\langle X^n \rangle$に対応して、

$$
C_n=\langle X^n \rangle_{c}
$$

と書き、$\langle \,\, \rangle_c$を**キュムラント平均**と呼ぶことがある。

**キュムラントとモーメントの関係**

$$
\begin{split}
C_1&=M_1 \\
C_2&=M_2-M_1^2 \\
C_3&=M_3-3M_2M_1+2M_1^3 \\
\vdots
\end{split}
$$

一般に$C_n$はn次以下のモーメントで現れる。
明らかに$C_1$は平均値、$C_2$は分散に等しい。

キュムラント展開を用いるとモーメント母関数は次のようにかける。

$$
\varphi(z)=\exp{\left[ \sum_{n=1}^{\infty}\frac{C_n}{n!}z^n \right]}
$$

**キュムラント母関数のメリット**

1. 独立な和で足し算になる
独立な確率変数 $X, Y$ に対して、モーメント母関数は

$$
\varphi_{X+Y}(z)=\varphi_X(z)\varphi_Y(z)
$$

なので、キュムラント母関数では

$$
C_{X+Y}(z)=C_X(z)+C_Y(z)
$$

となる。

2. キュムラントが直接読める
$$
C_n=C_{X}^{(n)}(0)
$$
でn次キュムラントがそのまま得られる。

3. 分布の形（歪み・裾）を整理しやすい
3次・4次キュムラントは歪度・尖度と関係が深い

4. 正規分布との比較が明快
正規分布は3次以上のキュムラントが0。
つまり3次以上のキュムラントを見れば、どこまでがガウス近似で、どこから逸脱するかをみやすい

#### 特性関数・モーメント母関数・キュムラント母関数の使い分け

3つとも、確率分布を「計算しやすい関数」に写すための道具である。
使い分けは、**何をしたいか**で決めると分かりやすい。

1. 一般性を優先するなら特性関数 $\Phi(\lambda)$

$$
\Phi(\lambda)=\langle \mathrm{e}^{i\lambda X} \rangle
$$

を用いる。
特性関数は常に定義でき、分布の同一性判定や収束の議論（中心極限定理など）に強い。
また、独立な和で積になる

$$
\Phi_{X+Y}(\lambda)=\Phi_X(\lambda)\Phi_Y(\lambda)
$$

ため、和の分布解析にも適している。

2. モーメントを直接計算したいならモーメント母関数 $\varphi(z)$

$$
\varphi(z)=\langle \mathrm{e}^{zX} \rangle
$$

は、$z=0$ まわりの微分でモーメントを直接与える。

$$
M_n=\left[\frac{d^n\varphi(z)}{dz^n}\right]_{z=0}
$$

したがって、平均・分散・高次モーメントを計算する用途で扱いやすい。
ただし分布によっては存在しない場合があるので、定義域の確認が必要である。

3. 独立和や高次統計量の整理にはキュムラント母関数 $C_X(z)$

$$
C_X(z)=\log \varphi(z)
$$

を用いると、独立な和が加法になる。

$$
C_{X+Y}(z)=C_X(z)+C_Y(z)
$$

また、

$$
C_n=C_X^{(n)}(0)
$$

より、平均・分散・歪み・尖度に対応する量を系統的に取り出せる。
特に正規分布は3次以上のキュムラントが0なので、ガウス近似からのずれを評価しやすい。

4. 実務的な目安

- 収束性や理論的な同定を重視する: 特性関数
- モーメント計算を主目的とする: モーメント母関数
- 独立和や近似展開（非ガウス性評価）を重視する: キュムラント母関数

以上より、3者は競合ではなく補完関係にある。
対象の分布と目的に応じて使い分けるのがよい。

