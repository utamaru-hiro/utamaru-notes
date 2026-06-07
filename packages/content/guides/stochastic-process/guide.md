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

**エントロピー**
