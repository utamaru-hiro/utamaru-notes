# 解析入門

## 第１章 数
### 1.1 実数
### 1.2 自然数、整数
### 1.3 順序体
### 1.4 実数体の構成
### 1.5 複素数

## 第２章　数列と級数
### 2.1 数列
### 2.2 数列の収束条件
### 2.3 級数

## 第３章　関数の極限と連続性
### 3.1 関数の極限
### 3.2 連続関数の性質

## 第４章　微分法
### 4.1 微分法の諸公式
### 4.2 平均値の定理
### 4.3 関数の凹凸
### 4.4 高次導関数

## 第５章　各種の初等関数
### 5.1 対数関数・指数関数
### 5.2 累乗関数、大きさの比較
### 5.3 三角関数
### 5.4 三角関数（続き）、逆三角関数
### 5.5 複素数の幾何学的表現

## 第６章　関数の近似、テイラーの定理
### 6.1 テイラーの定理
#### A) 近似多項式

関数 $f$ が $a$ を含むある区間で定義されているとし、 $f$ は必要な回数だけ微分可能であると仮定する。そのとき、 $a$ の近傍で $f$ を近似する多項式を作ることを考える。そのような $n$ 次多項式 $P_n(x)$ は

$$
P_n(x)=f(a)+\frac{f'(a)}{1!}(x-a)+\cdots+\frac{f^{(n)}}{n!}(x-a)^n
$$

によって与えられる。この多項式 $P_n(x)$ を $f$ の $n$ 次の**近似多項式**という。

#### B) テイラーの定理

近似の実際上の効用をみるためには、誤差 $f(x)-P_{n-1}(x)$ を評価しておかなければならない。その問題に答えるのが次の**テイラーの定理**である。

<theorem title="1 テイラーの定理">

$f$ を区間 $I$ で定義された関数とし、 $f$ は $I$ において $n$ 回微分可能であるとする。 $a,b$ を $I$ に属する２つの異なる点とし、

$$
P_{n-1}(x)=\sum_{k=0}^{n-1}\frac{f^{(k)}(a)}{k!}(x-a)^k, \\
f(b)=P_{n-1}(b)+R_n
$$

とおく。そのとき

$$
R_n=\frac{f^{(n)}(c)}{n!}(b-a)^n
$$

となるような$a$と$b$の間の点$c$が存在する。

</theorem>

点$a$の近傍で$f$を近似した多項式で、離れた点$b$を評価した際の誤差が$R_n$になるということを示している。

<proof>

仮定のように $f(b)=P{n-1}(b)+R_n$とし、定数$M$を

$$
R_n=M(b-a)^n
$$

によって定める。$x$を変数として、関数$g$を

$$
g(x)=f(x)-P_{n-1}(x)-M(x-a)^n
$$

と定義する。$M$の定め方によって$g(b)=0$である。また$k=0,1,\cdots,n-1$に対して

$$
g^{(k)}(x)=f^{(k)}(x)-P_{n-1}^{(k)}(x)-\frac{n!M}{(n-k)!}(x-a)^{n-k}
$$

で、$f^{(k)}(a)=P_{n-1}^{(k)}(a)$であるから

$$
g(a)=g'(a)=\cdots=g^{(n-1)}(a)=0
$$

である。さらに$P_{n-1}(x)$は$n$回微分すると$0$になるから、

$$
g^{(n)}(x)=f^{(n)}(x)-n!M
$$

となる。

さて、いま$g(a)=g(b)=0$であるから、ロルの定理によって$a$と$b$の間に$g'(c_1)=0$となる$c_1$がある。すると、$g'(a)=g'(c_1)=0$であるから、ふたたびロルの定理によって$a$と$c_1$の間に$g''(c_2)=0$となる$c_2$がある。こうしたステップを$n$回重ねれば$a$と$c_{n-1}$の間に$g^{(n)}(c_n)=0$となる$c_n$が存在することがわかる。$c_n=c$とおけば、$c$は$a$と$b$の間にあって、$g^{(n)}(c)=f^{(n)}(c)-n!M=0$、したがって

$$
M=\frac{f^{(n)}(c)}{n!}
$$

である。これが証明すべきことであった。

</proof>

次の定理２は実質的には単に定理１を書き換えただけのものにすぎない。

<theorem title="2">

$f$を区間$I$で$n$回微分可能な関数とし、$a$を$I$の１つの点とする。そのとき、$I$の任意の点$x$に対し

$$
f(x)=\sum_{k=0}^{n-1}\frac{f^{(k)}(a)}{k!}(x-a)^k+R_n
$$

とおけば、$R_n$は$a$と$x$の間のある点$c$、あるいは$0\le\theta\lt1$を満たすある$\theta$によって

$$
R_n=\frac{f^{(n)}(c)}{n!}(x-a)^n=\frac{f^{(n)}(a+\theta(x-a))}{n!}(x-a)^n
$$

と表される。

</theorem>

この定理から次の系がえられる。

<lemma title="マクローリンの定理">

$f$は$0$を含む区間$I$において$n$回微分可能な関数とする。そのとき任意の$x \in I$に対し

$$
f(x)=\sum_{k=0}^{n-1}\frac{f^{(k)}(0)}{k!}x^k+R_n
$$

とおけば、$R_n$は$0\lt\theta\lt1$を満たすある$\theta$によって

$$
R_n=\frac{f^{(n)}(\theta x)}{n!}x^n
$$

と書かれる。

</lemma>

<proof>

これは定理２で$a=0$とした特別な場合である。

</proof>

$R_n$を**剰余項**という。

#### C) 例

指数関数の例

$$
e^x=1+\frac{x}{1!}+\frac{x^2}{2!}+\cdots+\frac{x^{n-1}}{(n-1)!}+\frac{e^{\theta x}}{n!}x^n
$$

#### D) 剰余項の評価

<theorem title="3">

$(a)\,\,f^{(n)}$が連続ならば

$$
\lim_{x \to a}\frac{R_{n+1}}{(x-a)^n}=0
$$

$(b)\,\,f^{(n+1)}$が存在し、$I$においてその絶対値が定数$M$を超えないならば

$$
|R_{n+1}|\le\frac{M}{(n+1)!}|x-a|^{n+1}
$$

</theorem>

#### E) 関数のテイラー展開

テイラーの定理でもし$I$のすべての点$x$に対して$n \to \infty$のとき$R_n \to 0$となるならば、$f(x)$は$I$において、

$$
\begin{split}
f(x)&=\sum_{n=0}^{\infty}\frac{f^{(n)}(x)}{n!}(x-a)^n \\
&=f(a)+\frac{f'(a)}{1!}(x-a)+\cdots+\frac{f^{(n)}(a)}{n!}(x-a)^n+\cdots
\end{split}
$$

のように無限級数として表されることになる。

一般に、$x$を変数として

$$
\sum_{n=0}^{\infty}c_n(x-a)^n=c_0+c_1(x-a)+c_2(x-a)^2+\cdots
$$

の形に書かれる級数は、$a$を中心とする$x$の**整級数**（または**べき級数**）とよばれる。特に$0$を中心とする整級数は

$$
\sum_{n=0}^{\infty}a_nx^n=a_0+a_1x+a_2x^2+\cdots
$$

の形の級数である。

もし区間$I$において関数$f$が上のように

$$
f(x)=\sum_{n=0}^{\infty}\frac{f^{(n)}(a)}{n!}(x-a)^n
$$

と表されるならば、これを$f$の$a$における**テイラー展開**といい、右辺の級数を$f$の**テイラー級数**とよぶ。

#### F) 指数関数・三角関数のテイラー展開

<proposition>

$a$を正の定数とするとき

$$
\lim_{n \to \infty}\frac{a^n}{n!}=0
$$

が成り立つ。

</proposition>

<proof>

$0\lt a\le 1$の場合は$0\lt a^n\le1$であるから、この極限は明らか。

次に$a \gt 1$とし、$2a-1$より大きい自然数のうち最小のものを$n_0$とする。そのとき、$m$を$n_0$より大きい自然数とすれば$m \ge n_0+1\gt2a$であるから

$$
\frac{a}{m} \lt \frac{1}{2}
$$

である。いま$n$を$n_0$より大きい任意の自然数とすれば、

$$
\frac{a^n}{n!}=\frac{a^{n_0}}{n_0!}\cdot\frac{a}{n_0+1}\cdot\frac{a}{n_0+2}\cdot\cdots\cdot\frac{a}{n}
$$

で、右辺の$a_{n_0}/n_0!$を除く$n-n_0$個の因数は上に注意したことによっていずれも$1/2$より小さい。したがって

$$
\frac{a^n}{n!}\lt\frac{n^{n_0}}{n_0!}\left(\frac{1}{2}\right)^{n-n_0}
$$

上の不等式で$a^{n_0}/n_0!$は定数であり、$(1/2)^{n-n_0}$は$n \to \infty$のとき$0$に近づく。よって

$$
\lim_{n \to \infty}\frac{a^n}{n!}=0
$$

である。

</proof>

<theorem title="4">

指数関数 $e^{x}$は全区間$(-\infty,\infty)$で

$$
e^x=1+\frac{x}{1!}+\frac{x^2}{2!}+\cdots+\frac{x^n}{n!}+\cdots
$$

とテイラー級数に展開される。

</theorem>

<proof>

C)の例１でみたように

$$
e^x=1+\frac{x}{1!}+\frac{x^2}{2!}+\frac{x^{n-1}}{(n-1)!}+R_n \\
R_n=\frac{e^{\theta x}}{n!}x^n
$$

である。任意の$x$に対し、$n \to \infty$のとき$R_n \to 0$であることを言えばよい。


$x\le0$のときは$\theta x\le 0$、したがって$0\lt e^{\theta x}\le1$であるから

$$
|R_n|\le\frac{|x|^n}{n!}
$$

で、補題により$n \to \infty$のとき右辺は$0$に近づくから、$\lim_{n \to \infty}R_n=0$である。

$0 \lt x$のときは、$0\lt\theta x\lt x$であるから、$1\lt e^{\theta x}\lt e^x$で、

$$
0\lt R_n\lt e^x\cdot\frac{x^n}{n!}
$$

となる。ここで$e^x$は$n$に無関係な定数で、補題より$n \to \infty$のとき$x^n/n! \to 0$であるから、やはり$\lim_{n \to \infty}R_n=0$となる。これで定理が証明された。

</proof>

<theorem title="5">

三角関数$\sin{x},\cos{x}$は全区間$(-\infty,\infty)$で

$$
\begin{split}
\sin{x}&=\sum_{n=0}^{\infty}(-1)^{n-1}\frac{x^{2n-1}}{(2n-1)!} \\
&=x-\frac{x^3}{3!}+\frac{x^5}{5!}-\frac{x^7}{7!}+\cdots, \\
\cos{x}&=\sum_{n=0}^{\infty}(-1)^n\frac{x^{2n}}{2n!} \\
&=1-\frac{x^2}{2!}+\frac{x^4}{4!}-\frac{x^6}{6!}+\cdots
\end{split}
$$

と整級数に展開される。

</theorem>

### 6.2 極限の計算

#### A) 不定形の極限

不定形は原則、

$$
\frac{0}{0}\quad or\quad \frac{\infty}{\infty}
$$

の形に還元して考えるのが原則的な手段である。

例えば、$0\cdot\infty$の形の場合、すなわち$u \to 0$、$v \to \infty$の場合には、$uv$を

$$
\frac{u}{v^{-1}}\quad or \quad\frac{v}{u^{-1}}
$$

と変形すれば、$\frac{0}{0}$または$\frac{\infty}{\infty}$の形になる。

また、$u^v$が$1^\infty,0^0,\infty^0$などの形になる場合は

$$
\log{u^v}=v\log{u}
$$

が上記の$\infty\cdot 0$または$0\cdot\infty$の形になる。

これらを計算するために、前節の定理３やC)で述べるロピタルの定理などが用いられる。

次の節ではロピタルの定理の準備として、コーシーの平均値の定理を導入する。

#### B) 平均値の定理の一般化

<theorem title="1 コーシーの平均値の定理">

関数$f,g$は区間$[a,b]$で連続、区間$(a,b)$で微分可能で、$(a,b)$のすべての点$x$に対し$g'(x)\neq 0$であるとする。このとき、

$$
\frac{f(b)-f(a)}{g(b)-g(a)}=\frac{f'(c)}{g'(c)}
$$

となるような$(a,b)$の点$c$が存在する。

</theorem>

<proof>

すべての点で$g'(x)\neq0$なので$g(b)\neq g(a)$であることに注意する。

$$
\begin{split}
\varphi(x)=&\left(f(b)-f(a)\right)\left(g(x)-g(a)\right) \\
&-\left(g(b)-g(a)\right)\left(f(x)-f(a)\right)
\end{split}
$$

という関数$\varphi(x)$を定義する。$\varphi$も$[a,b]$で連続、$(a,b)$で連続で、明らかに

$$
\varphi(b)=\varphi(a)=0
$$

である。よってロルの定理より区間$(a,b)$に$\varphi'(c)=0$となる$c$が存在するが、

$$
\varphi'(x)=\left(f(b)-f(a)\right)g'(x)-\left(g(b)-g(a)\right)f'(x)
$$

であるから、$\varphi'(c)=0$を書き換えれば、定理の等式が得られる。

</proof>

#### C) ロピタルの定理

<theorem title="2 ロピタルの定理">

$-\infty\le a \lt b \le\infty$とし（$a$は$-\infty$であってもよく、$b$は$+\infty$であってもよい）、$f,g$は区間$(a,b)$で微分可能で、$(a,b)$でつねに$g'(x)\neq0$とする。また $x \to a$のとき$f'(x)/g'(x)$の極限が存在し

$$
\lim_{x \to a}\frac{f'(x)}{g'(x)}=A
$$

であるとする。このとき、もし仮定

$$
(a)\qquad\lim_{x \to a}f(x)=0,\quad\lim_{x \to a}g(x)=0
$$

あるいは

$$
(b)\qquad\lim_{x \to a}g(x)=+\infty\quadまたは\quad\lim_{x \to a}g(x)=-\infty
$$

のいずれかが成り立つならば、$f(x)/g(x)$の極限も存在して

$$
\lim_{x \to a}\frac{f(x)}{g(x)}=A
$$

である。

$A$は$+\infty$または$-\infty$でもよい。

また、 $x \to b$の場合でも同様の定理が成り立つ。

</theorem>

<proof>

まず$-\infty \le A \lt +\infty$とし、$r$を$A\lt r$を満たす任意の実数とする。$A\lt \rho \lt r$なる$\rho$をとれば、$x \to a$のとき$f'(x)/g'(x) \to A$であるから、$a \lt c_1$なる$c_1$を適当に取るとき、$a \lt x \lt c_1$を満たすすべての$x$に対して

$$
\frac{f'(x)}{g'(x)}\lt \rho
$$

が成り立つ。いま$u, v$を$a\lt u\lt v \lt c_1$を満たす２つの数とすると、定理１によって

$$
\frac{f(u)-f(v)}{g(u)-g(v)}=\frac{f'(w)}{g'(w)}
$$

となる$w \in (u,v)$が存在する。したがって、

$$
\begin{equation}
\frac{f(u)-f(v)}{g(u)-g(v)}\lt \rho
\end{equation}
$$

である。

そこでいま、(a) を仮定する。そのとき上の不等式で $u \to a$とすれば、$f(u) \to 0,\,\,g(u) \to 0$であるから

$$
\frac{f(u)}{g(u)}\le\rho\lt r
$$

を得る。

次に(b)を仮定する。もし$g(x) \to -\infty$ならば$g$のかわりに$-g$を考えれば良いから、$\lim_{x \to a}g(x)=+\infty$と仮定して差し支えない。さて、そう仮定し、$v$を１つ固定すると、$a\lt c_2\lt v$なる$c_2$を適当に取るとき、$a\lt u \lt c_2$である任意の$u$に対して$g(u)\gt0,\,\,g(u)-g(v)\gt0$となるから、上の不等式(1)の両辺に$\left(g(u)-g(v)\right)/g(u)$をかけると

$$
\frac{f(u)-f(v)}{g(u)}\lt\rho-\rho\frac{g(v)}{g(u)}
$$

したがって

$$
\frac{f(u)}{g(u)}\lt\rho-\rho\frac{g(v)}{g(u)}+\frac{f(v)}{g(u)}
$$

をえる。そこで$u \to a$とすると$g(u) \to +\infty$であるから、上の式で$g(u)$を分母とする右辺の２つの項はいくらでも$0$に近づく。よって$a\lt c_3 \lt c_2$なる$c_3$を適当にとれば、$a \lt u \lt c_3$であるとき

$$
-\rho\frac{g(v)}{g(u)}+\frac{f(v)}{g(u)}\lt r- \rho
$$

したがって

$$
\frac{f(u)}{g(u)}\lt r
$$

以上によって、仮定(a)(b)いずれの場合にも、$A \lt r$ を満たす任意の実数$r$をとるとき、$a\lt M$なる定数$M$をとれば、$a \lt x \lt M$であるすべての$x$に対して

$$
\frac{f(x)}{g(x)} \lt r
$$

の成り立つことが証明された（$A=-\infty$ の場合はこれで証明が終わったのである）。

同様に、もし$-\infty \lt A \le +\infty$ならば、$s \lt A$である任意の実数$s$をとるとき、 $a \lt M'$となる$M'$を適当にとれば、 $a \lt x \lt M'$を満たすすべての$x$に対して

$$
s \lt \frac{f(x)}{g(x)}
$$

が成り立つことが証明される。

$A$が有限の場合には、以上によって、$s \lt A \lt r$なる$s,r$を任意に与えたとき、上記のように$M,M'$を適当にとれば、$a \lt x \lt \min{\{M,M'\}}$であるすべての$x$に対して

$$
s \lt \frac{f(x)}{g(x)} \lt r
$$

が成り立つから

$$
\lim_{x \to a}\frac{f(x)}{g(x)}=A
$$

である。これで証明が完了した。

</proof>

#### D) 極限の計算

<example title="1">

$\alpha$を正の定数とするとき

$$
\lim_{x \to +\infty}\frac{\log{x}}{x^\alpha}=0
$$

</example>

<proof>

$f(x)=\log{x},\,\,g(x)=x^\alpha$とすると、$f'(x)=\frac{1}{x},\,\,g'(x)=\alpha x^{\alpha-1}$なので、

$$
\frac{f'(x)}{g'(x)}=\frac{1}{\alpha x^\alpha} \to 0\,\,(x \to +\infty)
$$

である。よってロピタルの定理より$\lim_{x \to +\infty}\frac{\log{x}}{x^\alpha}=0$である。

</proof>

<example title="2">

$\alpha$を正の定数とするとき

$$
\lim_{x \to +0}x^\alpha \log{x}=0
$$

</example>

<proof>

$1/x=y$とおけば、$x\to +0$のとき$y \to +\infty$で、例１より

$$
\lim_{x \to +0}x^\alpha\log{x}=\lim_{x \to +\infty}\left(\frac{-\log{y}}{y^\alpha}\right)=0
$$

</proof>

<example title="3">

$$
\lim_{x\to+0}x^x=1
$$

</example>

<proof>

$u=x^x$とおくと、$\log{u}=x\log{x}$で、例２より$x\to+0$のとき$x\log{x}\to0$。よって$u\to e^0=1$。

</proof>

<example title="4">

$$
\lim_{x\to0}\frac{x-\sin{x}}{x^3}=\frac{1}{6}
$$

</example>

<proof>

$\sin{x}=x-\frac{x^3}{3!}+\varepsilon$とおくと、$\lim_{x\to0}\frac{\varepsilon}{x^3}=0$（前節の定理３より）。よって

$$
\begin{split}
\lim_{x\to0}\frac{x-\sin{x}}{x^3}&=\lim_{x\to0}\frac{x-\left(x-\frac{x^3}{3!}+\varepsilon\right)}{x^3} \\
&=\frac{1}{3!}=\frac{1}{6}
\end{split}
$$

</proof>

<example title="5">

$$
\lim_{x\to0}\frac{\tan{x}-x}{x(1-\cos{x})}=\frac{2}{3}
$$

</example>

<proof>

$$
\frac{\tan{x}-x}{x(1-\cos{x})}=\frac{1}{\cos{x}}\cdot\frac{\sin{x}-x\cos{x}}{x(1-\cos{x})}, \\
\lim_{x\to0}\frac{1}{\cos{x}}=1
$$

であるから、

$$
\lim_{x\to0}\frac{\sin{x}-x\cos{x}}{x(1-\cos{x})}
$$

を求めればよい。前節6.1の定理３によって

$$
\begin{split}
\sin{x}&=x-\frac{x^3}{3!}+\varepsilon_1,\qquad\lim_{x\to0}\frac{\varepsilon_1}{x^3}=0, \\
\cos{x}&=1-\frac{x^2}{2!}+\varepsilon_2,\qquad\lim_{x\to0}\frac{\varepsilon_2}{x^2}=0
\end{split}
$$

よって

$$
\sin{x}-x\cos{x}=\left(x-\frac{x^3}{6}\right)-\left(x-\frac{x^3}{2}\right)+\delta_1=\frac{x^3}{3}+\delta_1 \\
x(1-\cos{x})=\frac{x^3}{2}+\delta_2
$$

で$\lim_{x\to0}\frac{\delta_1}{x^3}=\lim_{x\to0}\frac{\delta_2}{x^3}=0$。ゆえに

$$
\lim_{x\to0}\frac{\sin{x}-x\cos{x}}{x(1-\cos{x})}=\lim_{x \to 0}\frac{\frac{1}{3}+\frac{\delta_1}{x^3}}{\frac{1}{2}+\frac{\delta_2}{x^3}}=\frac{2}{3}
$$

</proof>

<example title="6">

$a_1,\cdots,a_n$を正の定数とし、$\alpha \gt 0$に対して

$$
F(\alpha)=\left(\frac{a_1^\alpha+\cdots+a_n^\alpha}{n}\right)^{\frac{1}{\alpha}}
$$

とおく。この関数について

$$
\lim_{a\to+0}F(\alpha)=(a_1\cdots a_n)^{\frac{1}{n}}
$$

が成り立つ

</example>

<proof>

$$
\log{F(\alpha)}=\frac{1}{\alpha}\log{\left(\frac{a_1^\alpha+\cdots+a_2^\alpha}{n}\right)}
$$

これを$\alpha$の関数と見て、ロピタルの定理を適用すると、分母の微分は１で、分子の微分

$$
\begin{split}
\frac{d}{d\alpha}&\log{\left(\frac{a_1^\alpha+\cdots+a_n^\alpha}{n}\right)} \\
&=\frac{n}{a_1^\alpha+\cdots+a_n^\alpha}\cdot\frac{a_1^\alpha\log{a_1}+\cdots+a_n^\alpha\log{a_n}}{n}
\end{split}
$$

は$\alpha \to +0$のとき$\frac{1}{n}(\log{a_1}+\cdots+\log{a_n})=\log{(a_1\cdots a_n)^{\frac{1}{n}}}$に近づく。よって

$$
\lim_{\alpha \to +0}\log{F(\alpha)}=\log{(a_1\cdots a_n)^{\frac{1}{n}}}
$$

したがって

$$
\lim_{\alpha \to +0}F(\alpha)=(a_1\cdots a_n)^{\frac{1}{n}}
$$

</proof>

## 第７章　積分法
### 7.1 リーマン積分

#### A) 上積分・下積分

$f$を区間$[a,b](a \lt b)$で定義された関数として、$f$はこの区間で有界とする。

区間$[a,b]$の**分割**とは

$$
a=x_0\lt x_1 \lt x_2 \lt \cdots \lt x_{n-1} \lt x_n=b
$$

であるような有限個の点の列$x_0,x_1,\cdots,x_n$をいう。

$$
P=(x_0,x_1,\cdots,x_n)
$$

分割$P$によって区間$[a,b]$は$n$個の小区間$[x_{i-1},x_i](i=1,2,\cdots,n)$に分かれる。このとき小区間の幅$\varDelta x_i$を

$$
\varDelta x_i=x_i-x_{i-1}
$$

で表す。またこの小区間における$f$の上限、下限をそれぞれ

$$
\begin{split}
M_i&=\sup{f(x)}, \\
m_i&=\inf{f(x)}
\end{split}
$$

として、

$$
\begin{split}
U(P,f)=\sum_{i=1}^nM_i\varDelta x_i, \\
L(P,f)=\sum_{i=1}^nm_i\varDelta x_i, \\
\end{split}
$$

とおく。$U(P,f)$を区間$[a,b]$における分割$P$に対する$f$の**上方和**、$L(P,f)$を$f$を下方和という。$m_i\le M_i,\,\,\varDelta x_i \gt 0$であるから

$$
L(P,f)=U(P,f)
$$

である。

$f$は区間$[a,b]$で有界であるから、すべての$x\in[a,b]$に対し

$$
m\le f(x)\le M
$$

となる定数$m,\,\,M$が存在する。そして$i=1,\cdots,n$に対し$m \le m_i,\,\,M_i \le M$であるから

$$
m(b-a)\le L(P,f) \le U(P,f) \le M(b-a)
$$

である。ゆえに、$[a,b]$のすべての分割$P$に対する上方和$U(P,f)$の集合、下方和$L(P,f)$の集合はともに有界である。

そこですべての分割$P$に対する数$U(P,f)$の集合の下限、数$L(P,f)$の集合の上限をそれぞれ

$$
\begin{split}
\overline{\int_a^b}f=\inf{U(P,f)} \\
\underline{\int_a^b}f=\inf{U(P,f)} \\
\end{split}
$$

とおき、前者を区間$[a,b]$における関数$f$の**リーマン上積分**、後者を$f$の**リーマン下積分**という。

区間$[a,b]$における上積分、下積分は、この区間で有界な任意の関数に対して定義されることを注意しておこう。

#### B) 積分の定義

分割$P$に対して、同じ区間に対する別の分割で、分割$P$の分点をすべて含む分割$P^*$を$P$の**細分**という。

<proposition title="1">

$P^*$が$P$の細分ならば

$$
\begin{split}
U(P^*,f)&\le U(P,f) \\
L(P^*,f)&\ge L(P,f)
\end{split}
$$

すなわち、細分によって上方和は小さくなり、下方和は大きくなる。

</proposition>

<proof>

上方和について証明する。

$P=(x_0,x_1,\cdots,x_n)$とし、$P^*$は$P$に１つの分点$x^*$を付け加えた細分で、 $x_{i-1}\lt x^* \lt x_i$であるとする。そのとき、和$U(P,f)$の項のうち

$$
M_i\varDelta x_i=M_i(x_i-x_{i-1})
$$

以外の項は$U(P^*,f)$においても不変であるが、上記の項は$U(P^*,f)$においては

$$
M_i'(x^*-x_{i-1})+M_i''(x_i-x^*)
$$

に変わる。ただし

$$
\begin{split}
M_i'&=\sup{f(x)}\qquad(x_{i-1}\le x \le x^*) \\
M_i''&=\sup{f(x)}\qquad(x^*\le x \le x_i) \\
\end{split}
$$

である。しかるに$M_i=\sup{f(x)}\,\,(x_{i-1}\le x \le x_i)$であるから、明らかに

$$
M_i'\le M,\qquad M_i'' \le M
$$

であり、したがって

$$
\begin{split}
&M_i'(x^*-x_{i-1})+M_i''(x_i - x^*) \\
&\le M_i(x^*-x_{i-1})+M_i(x_i-x^*) \\
&=M_i(x_i-x_{i-1})
\end{split}
$$

である。ゆえに

$$
U(P^*,f)\le U(P,f)
$$

となる。

もし$P^*$が$P$に$k$個の分点を付け加えた細分であるならば、上の議論を$k$回繰り返せばいい。

下方和に関する主張も同様にして証明される。

</proof>

<proposition title="2">

$[a,b]$の任意の２つの分割$P_1,P_2$に対して

$$
L(P_1,f)\le U(P_2,f)
$$

</proposition>

<proof>

$P_1,P_2$の分点を合わせて得られる分割$P_1\cup P_2$を$P^*$とすれば、$P^*$は$P_1,P_2$の共通の細分となっている。したがって命題１により

$$
L(P_1,f)\le L(P^*,f) \le U(P^*,f) \le U(P_2, f)
$$

となる。

</proof>

### 7.2 積分の性質
### 7.3 不定積分、広義積分

## 第８章　積分の計算
### 8.1 不定積分の計算
### 8.2 定積分の計算

## 第９章　関数列と関数級数
### 9.1 一様収束
### 9.2 整級数（べき級数）
### 9.3 複素整級数（指数関数・三角関数再論）

## 第１０章　n次元空間
### 10.1 ユークリッド空間
### 10.2 ベクトル空間

## 第１１章　集合論初歩
### 11.1 集合・論理・関係
### 11.2 濃度
### 11.3 ツォルンの補題

## 第１２章　距離空間の位相
### 12.1 位相の基礎的諸概念
### 12.2 完備性、コンパクト性
### 12.3 連結性
### 12.4 $R^n$における曲線

## 第１３章　連続写像の空間
### 13.1 ノルム空間
### 13.2 ストーン・ワイエルシュトラスの定理

## 第１４章　多変数の関数
### 14.1 微分可能性と勾配ベクトル
### 14.2 高次偏導関数、テイラーの定理
### 14.3 極値問題
### 14.4 陰関数
### 14.5 積分記号下の微分

## 第１５章　線形写像
### 15.1 線形写像と行列
### 15.2 線形写像の空間

## 第１６章　行列式
### 16.1 行列式写像とその存在
### 16.2 行列式の他の性質

## 第１７章　逆写像定理と陰関数定理
### 17.1 逆写像定理
### 17.2 陰関数定理

## 第１８章　固有値と２次形式
### 18.1 基底変換、行列の固有値
### 18.2 ２次形式・エルミート形式

## 第１９章　フーリエ展開
### 19.1 三角関数系とフーリエ級数
### 19.2 不連続点がある場合

## 第２０章　複素数の関数
### 20.1 複素解析関数；多項式、有理関数
### 20.2 初頭超越関数、コーシー・リーマンの微分方程式
### 20.3 １次変換

## 第２１章　複素積分
### 21.1 線積分とコーシーの定理
### 21.2 解析関数の性質
### 21.3 コーシーの定理の一般形
### 21.4 留数定理と実定積分の計算

## 第２２章　複素解析の続き
### 22.1 無限級数と無限積
### 22.2 具体例の追補

## 第２３章　重積分
### 23.1 区間上の積分、面積・体積
### 23.2 一般の集合の上の積分

## 第２４章　重積分の変数変換
### 24.1 アフィン変換と測度
### 24.2 変数変換定理
### 24.3 広義の積分

## 第２５章　微分形式とその積分
### 25.1 微分形式
### 25.2 ストークスの定理
### 25.3 $R^2, R^3$への応用（ベクトル解析）

## 第２６章　ルベーグ積分
### 26.1 測度
### 26.2 積分