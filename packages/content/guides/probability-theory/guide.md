# 確率論の基礎

## 第１章　確率論の基礎概念

### 1.1 離散型の確率モデル

確率モデルとは、興味の対象となる偶然変量がフィルター付きの**確率空間**で記述される模型のことである。この模型は

- 基本事象からなる標本空間
- フィールドという集合族で定義される確率
- 増大情報を表す部分フィールドの列からなるフィルトレーション

という道具を用いてつくられる。

ある株式の時刻 $t=1,2,\cdots,T$ における株価を $S_t$ とする。このとき、株価の値に注目して、 $T$ までに起こりうる全ての状態を $\Omega$ とおけば

$$
\Omega=\{\omega \mid \omega=(S_1, S_2, \cdots, S_T)\}
$$

と表すことができる。

このような $\Omega$ は将来起こりうる株価の状態をリストアップしたものである。未知な将来は $\Omega$ のどれかによって表され、時間が経つほどに、実際に起こった状態からたくさんの情報が得られるようになっている。

一般に、実験や観察を**試行**という。試行には起こりうるいくつかの結果があるが、その１つ１つを**基本事象**という。基本事象の全体からなる集合、すなわち、起こりうる結果をリストアップした全体集合を**標本空間**といい、 $\Omega$ で表す。

$\Omega$ の部分集合を**事象**といい、アルファベット大文字 $A,B,C,\cdots$ などで表す。 $A$ でない事象は $A$ の**余事象**といい、 $A^c$ で表す。

特に、 $\Omega$ 自身と空集合 $\phi$ はともに $\Omega$ の部分集合であり、それぞれ**全事象**、**空事象**とよばれる。

> [!warn] 集合の演算について
> 省略

#### 1.1.1 フィールド

前述の株価の状態に注目し、時刻 $t$ で投資家が利用できる情報を $\mathcal{F}_t$ とおくと、この $\mathcal{F}_t$ は時刻 $t$ とそれ以前の株価の状態から成り立っている。

たとえば $T=2$ としよう。このとき、時刻 $t=0$ では $S_1$ と $S_2$ の情報が得られないから、 $\mathcal{F}_0=\{\phi, \Omega\}$ 。すなわち、 $t=0$ での情報は $\Omega$ に含まれているどれかが起こる、ということだけである。

また、時刻 $t=1$ で株価の上昇 $(u)$ があったとすれば、実際の状態は

$$
A=\{(u, S_2) \mid S_2=uまたはd\}=\{(u,u),(u,d)\}
$$

であって、$A$ の余事象 $A^c$ ではない、したがって、 $t=1$ での情報は

$$
\mathcal{F}_1=\{\phi,\Omega,A,A^c\}
$$

と表される。この場合、以前の情報を忘れていないから、 $\mathcal{F}_0 \subset \mathcal{F}_1$ となっていることに注意されたい。

このように、時刻 $t$ で、投資家は $\Omega$ のどの部分が実際の情報を含んでいるのかを知ることになる。一般に、 $\mathcal{F}_t$ は集合の"集まり"で、フィールドと呼ばれる $\mathcal{F}$ の仲間である。

<def title="1.1.1">
次の性質を満たす $\mathcal{F}$ を**フィールド**という。  
$(1)\quad \phi, \Omega \in \mathcal{F}$  
$(2)\quad A \in \mathcal{F},\,B \in \mathcal{F}\,\Rightarrow\,A \cup B \in \mathcal{F},\,A \cap B \in \mathcal{F},\,A \setminus B \in \mathcal{F}$  
</def>

- $\{\phi,\Omega\}$ を**自明なフィールド**といい、 $\mathcal{F}_0$ と表す。

- $\{\phi,\Omega,A,A^c\}$ を**集合$A$から生成されたフィールド**といい、$\mathcal{F}_A$ と表す。

- $\Omega$ の部分集合からなる全体 $\{A \mid A \subset \Omega\}$ を $2^{\Omega}$ あるいは $\mathcal{P}(\Omega)$と表す。

<def title="1.1.2">
$\Omega$ が互いに排反な $D_1,D_2,\cdots,D_k$ の和からなるとき、すなわち  
$$D_i \cap D_j = \phi \quad (i \ne j), \quad \bigcup_{i=1}^kD_i=\Omega$$
であるとき、 $\{D_1,D_2,\cdots,D_k\}$ を $\Omega$ の**分割**という。  
</def>

一般に、**分割から生成されたフィールド**は $D_i$ の有限個の和事象とその余事象から構成されている。もしも $\Omega$ が有限個の集合から成り立っていれば、フィールドは分割によって生成される。

#### 1.1.2 フィルトレーション

次に、フィールド $\mathcal{F}_1$ がフィールド $\mathcal{F}_2$ に含まれる場合を考える。このとき、

$$
\mathcal{F}_1 \subset \mathcal{F}_2 \Longleftrightarrow 任意のAに対して、A \in \mathcal{F}_1 ならば A \in \mathcal{F}_2
$$

この場合、 $\mathcal{F}_2$ を生成する分割は $\mathcal{F}_1$ を生成する分割よりも細かい（時刻 $t=1,2$ ならば、時間経過で知識や情報は詳細になる）。

<def title="1.1.3">
次のようなフィールドの集まり $\mathbb{F}$ を**フィルトレーション**という。  
$$\mathbb{F}=\{\mathcal{F}_0, \mathcal{F}_1,\cdots,\mathcal{F}_t,\cdots,\mathcal{F}_T\}, \quad \mathcal{F}_t \subset \mathcal{F}_{t+1}$$
$\mathbb{F}$ は情報の流れをモデル化するのに用いられる。  
上式は、観察者にとって、時間が経てば経つほどに、たくさんの詳細な情報を知ることができ、 $\Omega$ の分割はさらに細かくなっていくということを意味している。  
株価の推移にたとえれば、 $\mathbb{F}$ は投資家に必要な株価の情報を記述している。  
</def>

#### 1.1.3 可測

もしも事象のフィールド $\mathcal{F}$ が特定されるならば、 $\mathcal{F}$ に属する集合は**可測**であるという（たとえば、 $\mathcal{F} = 2^{\Omega}$ のとき、 $\Omega$ の任意の部分集合 $A$ は $\mathcal{F}$ に属するから可測）。

<def title="1.1.4">

標本空間 $\Omega$ は有限個の要素からなり、 $\Omega$ 上の関数 $X$ は値 $x_i,\,i=1,2,\cdots,k$ をとるとする。  
また、 $\Omega$ 上の関数 $X$ は、すべての集合 $\{\omega \mid X(\omega)=x_i\},\,i=1,2,\cdots,k$ が $\mathcal{F}$ に属するとき、 **$\mathcal{F}$ -可測**または $(\Omega,\mathcal{F})$ 上の**確率変数**であるという。  

</def>

言い換えれば、可測であるということは、もしも $\mathcal{F}$ で記述される情報を得たならば、すなわち、 $\mathcal{F}$ のどの事象が起こったのかを知ったならば、 $X$ のどの値が起こったのかを知ることができる、ということである。

#### 1.1.4 確率過程

<def title="1.1.5">
確率変数の集まり $\{X_t \mid t=0,1,\cdots,T\}$ を**確率過程**という。この場合、任意に固定した $t$ に対して、 $X_t$ は $(\Omega,\mathcal{F}_t)$ 上の確率変数である。
</def>

<def title="1.1.6">
すべての $t=1,2,\cdots,T$ に対して、 $X_t$ が $(\Omega,\mathcal{F}_t)$ 上の確率変数であるとき、すなわち、 $X_t$ が $\mathcal{F}_t$ -可測であるとき、確率過程 $\{X_t\}$ はフィルトレーション $\mathbb{F}=\{\mathcal{F}_t \mid t=0,1,\cdots,T\}$ に**適合している**という。
</def>

たとえば、

$$
\begin{split}
X_1&=X, \quad X_2=Y \quad (X,Y \subset \Omega)\\
\mathcal{F}_1&=\{\phi,\Omega,X,X^c\} \\
\mathcal{F}_2&=\{\phi,\Omega,2^{\Omega}\} \\
(\mathcal{F}_1 &\subset \mathcal{F}_2)
\end{split}
$$

とすると、 $X_1$ は $\mathcal{F}_1$ -可測、 $X_2$ は $\mathcal{F}_2$ -可測である。
したがって、確率過程 $\{X_t \mid t=1,2\}=\{X_1,X_2\}$ は $\mathbb{F}=\{\mathcal{F}_1,\mathcal{F}_2\}$ に適合している。

$\Omega$ の部分集合全体からなるフィールド $2^{\Omega}$ をもつ標本空間を $(\Omega,2^{\Omega})$ とし、そこで定義された確率変数 $X$ のとりうる値を $x_i,i=1,2,\cdots,k$ とする。このとき $X=x_i$ となる事象、すなわち、集合

$$
A_i=\{\omega \mid X(\omega)=x_i\} \subset \Omega, \quad i=1,2,\cdots,k
$$

を考える。 $\{A_1,A_2,\cdots,A_k\}$ は $\Omega$ の分割になっているが、この分割によって生成されたフィールドは **$X$ から生成されたフィールド**とよばれ、 $\mathcal{F}_X$ または $\sigma(X)$ と表される。

$(\Omega,\mathcal{F})$ と確率過程 $\{X_t\}$ が与えられているとき、確率変数 $X_s,s=0,1,\cdots,t$ から生成されたフィールドを $\mathcal{F}_t=\sigma(X_s,\,0 \le s \le t)$ と表す。これは時刻 $t$ までの観察結果から利用できる全ての情報である。明らかに、 $\mathcal{F}_t \subset \mathcal{F}_{t+1}$ であるから、これらの集まりはフィルトレーションとなる。このようなフィルトレーションを $\{X_t\}$ の**自然なフィルトレーション**という。

#### 1.1.5 確率空間

$\Omega$ が有限個の基本事象 $\omega$ からなるとき、各 $\omega$ に対して、その起こりやすさの尺度として**確率** $P(\omega)$ を割り当てることができる。 $P(\omega)$ の与え方はさまざまに設定できるが、次の2点を満たす必要がある。

$$
\begin{split}
(1)& \quad P(\omega) \ge 0 \\
(2)& \quad \sum_{\omega}P(\omega)=P(\Omega)=1
\end{split}
$$

<def title="1.1.8">

$\Omega$ は有限個の基本事象からなるとし、確率変数 $X$ 、すなわち、 $\omega \in \Omega$ から実数の集まり $\mathbb{R}$ への関数 $X:\omega \rightarrow \mathbb{R}$、を考える。 $X$ は有限個の値を取り得るので、それらを $x_i,\,\,i=1,2,\cdots,k$ とし、事象 $\{\omega \mid X(\omega)=x_i\}$ を単に $\{X=x_i\}$ と表し、その確率を $p_i=P(X=x_i)$ とかく。すなわち、
$$p_i=P(X=x_i)=\sum_{\omega \mid X(\omega)=x_i}P(\omega)$$
（$X(\omega)=x_i$ となる $\omega$ に関する和）  
このような確率の組 $\{p_i\}$ を $X$ の**確率分布**という。
</def>

<def title="1.1.9">

$X$ が $(\Omega, \mathcal{F})$ 上の確率変数で、 $P$ が確率のとき、
$$ E[X]=\sum_{\omega}X(\omega)P(\omega) $$
によって与えられる値 $E[X]$ を $X$ の**平均**または**期待値**という。 $X$ の確率分布を用いてかけば、
$$ E[X]=\sum_{i=1}^k x_iP(X=x_i) $$
と表される。
</def>

<def title="1.1.10">
事象 $A$ に対して
$$ I_A(\omega)= \begin{cases} 1 & \text{if \,\, $\omega \in A$} \\ 0 & \text{if \,\, $\omega \notin A$} \end{cases} $$
とおき、確率変数 $I_A$ を事象 $A$ の**インディケータ**という。 $I_A$ を $I(A)$ ともかく。
</def>

以降においては、 $\Omega$ を有限個の基本事象からなる標本空間とし、 $\mathcal{F}=2^{\Omega}$、$P$ を $\Omega$ 上の確率とする。これら３つの組 $(\Omega, \mathcal{F}, P)$ を**確率空間**という。

#### 1.1.6 条件付き確率

<def title="1.1.11">
$A, D$ を事象とし、 $P(D) \gt 0$ とする。このとき $D$ が起こったと言う前提のもとに $A$ が起こる**条件付き確率**( $D$ に対する $A$ の条件付き確率) $P(A|D)$ を次のように定義する。
$$P(A|D)=\frac{P(A\cap D)}{P(D)}$$
</def>

条件付き確率を書き直すと**乗法公式**が得られる。

$$
P(A\cap D)=P(D)P(A|D)
$$

<theorem title="1.1.13">
$\{D_1,D_2,\cdots,D_k\}$ を定義1.1.2で与えられた $\Omega$ の分割とし、 $P(D_i) \gt 0,i=1,2,\cdots,k$ とする。このとき次が成り立つ。
$$(1) 全確率の公式 \quad P(A)=\sum_{i=0}^{k}P(D_i)P(A|D_i)$$
$$(2) ベイズの公式 \quad P(A) \gt 0 ならば P(D_i|A)=\frac{P(D_i)P(A|D_i)}{\sum_{i=1}^{k}P(D_i)P(A|D_i)}$$
$P(D_i)$ を**事前確率** 、 $P(D_i|A)$ を**事後確率**という。
</theorem>

<def title="1.1.14">
$\mathcal{G}$　を定義1.1.2で与えられた $\Omega$ の分割 $\{D_1,D_2,\cdots,D_k\}$ から生成されたフィールドとし、 $P(D_i) \gt 0,i=1,2,\cdots,k$ とする。このとき、**$\mathcal{G}$ に対する $A$ の条件付き確率**は、 $D_i$ 上で値 $P(A|D_i)$ をとる確率変数のことであり、これを $P(A|\mathcal{G})$ とかく。すなわち
$$P(A|\mathcal{G})(\omega)=\sum_{i=1}^kP(A|D_i)I_{D_i}(\omega)$$
特に、 $\mathcal{G}=\{\phi,\Omega\}$ （自明なフィールド）ならば、次のようになる。
$$P(A|\mathcal{G})=P(A|\Omega)I_{\Omega}=\frac{P(A \cap \Omega)}{P(\Omega)}=P(A)$$
</def>

<def title="1.1.15">
確率変数 $Y$ の値を $y_1,y_2,\cdots,y_k$ とする。このとき、 $D_i=\{\omega \mid Y(\omega)=y_i\},\,i=1,2,\cdots,k$ は $\Omega$ の分割になる。そこで、 $\mathcal{F}_Y$ を $Y$ から生成されたフィールドとするとき、 **$\mathcal{F}_Y$ に対する $A$ の条件付き確率** $P(A|\mathcal{F}_Y$ を $P(A|Y)$ と表す。すなわち
$$P(A|\mathcal{F}_Y)=P(A|Y)$$
</def>

<def title="1.1.16">
確率変数 $X$ の値を $x_1,x_2,\cdots,x_p$ とするとき、事象を $A_1=\{X=x_1\},\,\,A_2=\{X=x_2\},\cdots,A_p=\{X=x_p\}$ とおく。 $\Omega$ の分割 $\{D_1,D_2,\cdots,D_k\}$ によって生成されたフィールドを $\mathcal{G}$ とする。このとき
$$E[X|\mathcal{G}]=\sum_{i=1}^{p}x_iP(A_i|\mathcal{G})$$
によって与えられる $E[X|\mathcal{G}]$ を、 **$\mathcal{G}$ に対する $X$ の条件付き平均**という。
</def>

<def title="1.1.19">
$X, Y$ が確率変数で、いずれも有限個の値をとるとき、 $Y$ に対する $X$ の条件付き平均 $E[X|Y]$ は、
$$E[X|Y] = E[X|\mathcal{F}_Y]$$
</def>

### 1.2 連続型の確率モデル

前節では離散型の確率モデルを扱った。本説では、実数の区間内に連続的に変化する値をとり得る連続型の確率モデルを扱う。そのためには、 $\Omega$ の加算個の集合の和 $\bigcup$ と積 $\bigcap$ の演算に関して閉じているフィールドが必要になる。

#### 1.2.1 可測空間

<def title="1.2.1">
次の性質を満たすフィールド $\mathcal{F}$ を** $\sigma$ -フィールド**という。
$$
\begin{split}
(1)&\,\,\phi, \Omega \in \mathcal{F} \\
(2)&\,\,A \in \mathcal{F}ならば、A^c \in \mathcal{F} \\
(3)&\,\,A_1,A_2,\cdots,A_n,\cdots \in \mathcal{F}ならば、 \bigcup_{n=1}^{\infty}A_n \in \mathcal{F} \\
(4)&\,\,A_1,A_2,\cdots,A_n,\cdots \in \mathcal{F}ならば、 \bigcap_{n=1}^{\infty}A_n \in \mathcal{F} \\
\end{split}
$$
</def>

$\Omega$ の任意の部分集合 $B$ が $\mathcal{F}$ に属するとき、 $B$ を可測集合という。
$\mathcal{F}$ を $\Omega$ 上の $\sigma$ -フィールドとするとき、組 $(\Omega, \mathcal{F})$ を可測空間という。

#### 1.2.2 確率空間

<def title="1.2.2">

$(\Omega, \mathcal{F})$ 上で与えられて、次の性質を満たし、非負の値をとる関数 $P: \mathcal{F} \rightarrow [0,1]$ を**確率測度**または単に**確率**という。
$$
\begin{split}
(1)\,\,&A \in \mathcal{F}ならば、P(A) \ge 0 \\
(2)\,\,&P(\Omega)=1 \\
(3)\,\,&A_1,A_2,\cdots,A_n,\cdots \in \mathcal{F}が互いに排反ならば、 \\
&P\left(\bigcup_{n=1}^{\infty}A_n\right)=\sum_{n=1}^{\infty}P(A_n)
\end{split}
$$
性質(3)は**加算加法性**または$\sigma$**-加法性**と呼ばれる。
</def>

$(\Omega,\mathcal{F})$ 上の確率を $P$ とするとき、組 $(\Omega, \mathcal{F}, P)$ を**確率空間**という。

> [!warn] 確率 $P$ の定義から次の性質が得られる。
> $$
> \begin{split}
> (1)\,\,&P(A^c)=1-P(A) \\
> (2)\,\,&P(\omega)=0 \\
> (3)\,\,&P(A\cup B)=P(A)+P(B)-P(A \cap B) \\
> (4)\,\,&単調性\quad A \subset B \Rightarrow P(A) \le P(B) \\
> (5)\,\,&劣加法性\quad P\left(\bigcup_{n=1}^{\infty}A_n\right) \le \sum_{n=1}^{\infty}P(A_n)
> \end{split}
> $$

<def title="1.2.3">

確率空間 $(\Omega, \mathcal{F}, P)$ が完備(complete)とは

$$
N \in \mathcal{F},\,\,P(N)=0,\,\,A \subset N \quad \Rightarrow A \in \mathcal{F}
$$

を満たすときにいう。すなわち、零集合（測度0の可測集合）の部分集合がすべて可測のときにいう。

</def>

<def title="1.2.4">

確率空間 $(\Omega, \mathcal{F}, P)$ が任意に与えられたとき、完備な確率空間 $(\Omega, \bar{\mathcal{F}}, \bar{P})$ をとり、 $\mathcal{F} \subset \bar{\mathcal{F}}$ かつ
任意の $A \in \mathcal{F}$ に対して $P(A)=\bar{P}(A)$ が成り立つようにできる。 $(\Omega, \bar{\mathcal{F}}, \bar{P})$ を $(\Omega, \mathcal{F}, P)$ の**完備化**(completion)という。

</def>

#### 1.2.3 確率の連続性

事象の単調列に対して、次の性質が成り立つ。

$$
\begin{split}
(1)\,\,&A_1 \subset A_2 \subset \cdots \subset A_n \subset \cdots\,\,\Rightarrow\,\,P(A_1 \cup A_2 \cup \cdots)=\lim_{n \to \infty}P(A_n) \\
(1)\,\,&A_1 \supset A_2 \supset \cdots \supset A_n \supset \cdots\,\,\Rightarrow\,\,P(A_1 \cap A_2 \cap \cdots)=\lim_{n \to \infty}P(A_n) \\
\end{split}
$$

一般に、事象列 $\{A_n \mid n=1,2,\cdots\}$ に対して

$$
\limsup_{n}A_n=\bigcap_{n=1}^{\infty}\bigcup_{i=n}^{\infty}A_i, \qquad \liminf_{n}A_n=\bigcup_{n=1}^{\infty}\bigcap_{i=n}^{\infty}A_i
$$

とおく。それぞれ、**本質的上限**、**本質的下限**という。

> [!warn]
> $\overline{A}_n \equiv \bigcup_{i=n}^{\infty}A_i=A_n \cup A_{n+1} \cup \cdots$ とすると、 $\overline{A_1} \supset \overline{A_2} \supset \cdots \overline{A_n} \supset \cdots$ となるので、
> $$
> \limsup_{n}A_n = \bigcap_{n=1}^{\infty}\bigcup_{i=n}^{\infty}A_i=\bigcap_{n=1}^{\infty}\overline{A_n}
> $$
> は $A_n$ を上から抑えていく減少列になる。
> $\liminf$ も同様で、 $\underline{A_n} \equiv \bigcup_{i=n}^{\infty}A_i=A_n \cap A_{n+1} \cap \cdots$とすると、 $\underline{A_1} \subset \underline{A_2} \subset \cdots \subset \underline{A_n} \subset \cdots$ となるので、
> $$
> \liminf_{n}A_n = \bigcup_{n=1}^{\infty}\bigcap_{i=n}^{\infty}A_i=\bigcup_{n=1}^{\infty}\underline{A_n}
> $$
> は $A_n$ を下から抑えていく増加列になる。


#### 1.2.4 σ-フィールドの生成

<def title="1.2.5">
$\mathcal{A}$ を $\Omega$ の部分集合の集まりの一つとする。このとき、次の性質を満たす $\mathcal{S}$ を **$\mathcal{A}$から生成された $\sigma$ -フィールド**といい、 $\mathcal{S}=\sigma(\mathcal{A})$ とかく。
$$
\begin{split}
(1)\,\,&\mathcal{S} \supset \mathcal{A} \\
(2)\,\,&もしも\mathcal{S}'が\mathcal{A}を含む他の\sigma-フィールドならば、\mathcal{S}' \supset \mathcal{S} \\
\end{split}
$$
言い換えれば、 $\sigma (\mathcal{A})$ は $\mathcal{A}$ を含む "最小の $\sigma$ -フィールド"である。
</def>

$\sigma$-フィールドに確率を定義することは、基本事象 $\omega$ がたくさんあり難しい（連続無限個である可能性がある）。

確率の与え方として標準的なのは、まず１つのフィールド上で確率を定義し、そこから拡張する方法である。

この方法を保証してくれるのが、次の**カラテオドリの拡張定理**である。

<theorem title="カラテオドリの拡張定理">
フィールド $\mathcal{A}$ で定義された確率 $P$ は、 $\mathcal{A}$ から生成された $\sigma$ -フィールド $\sigma(\mathcal{A})$ 上の確率になるように、ただ１通りに拡張できる。
</theorem>

#### 1.2.5 ボレルσ-フィールド

連続型の確率変数を考えるときに、最も重要なフィールドは**ボレル $\sigma$ -フィールド**である。
これは、すべての実数区間および加算子の区間の和集合からなる区間から得られ、無駄のないよう、すべての区間を含む最小の $\sigma$ -フィールドになっている。

<def title="1.2.7">
$\Omega = \mathbb{R}$ と仮定し、 $\mathcal{A}=\{[a,b] \mid -\infty \le a \le b \lt \infty\}$ とする。このとき $\mathcal{A}$ から生成された $\sigma$ -フィールド $\sigma(\mathcal{A})$ を $\mathcal{B}(\mathbb{R})$ または単に $\mathcal{B}$ で表し、 **$\mathbb{R}$ のボレル $\sigma$** -フィールドという。すなわち、 $\mathcal{B}=\sigma(\mathcal{A})$ 。さらに、 $B \in \mathcal{B}$ のとき、 $B$ を $\mathbb{R}$ の**ボレル集合**という。
</def>

#### 1.2.6 ルベーグ測度

$\Omega = [0,1]$ とおく。 $[0,1]$ のボレル $\sigma$-フィールドを $\mathcal{B}=\mathcal{B}([0,1])$ とし、 $\mathcal{A}=\{(a,b] \mid 1 \le a \le b \le 1\}$ とする。このとき、 $\mathcal{A}$ 上の集合関数 $\lambda=\mathcal{A} \rightarrow [0,1]$ を

$$
\lambda(\phi)=0, \qquad \lambda(a,b]=b-a
$$

と定めれば、 $\lambda$ は $\mathcal{B}$ 上の確率に、ただ１通りに拡張される。この確率を区間 $[0,1]$ 上の**ルベーグ測度**という。

【問 1.2.2】区間 $[0,1]$ において、次を示せ。
$(1)\,\,任意の点xのルベーグ測度は0$
$(2)\,\,任意の可算集合のルベーグ測度は0$
$(3)\,\,有理数からなる集合のルベーグ測度は0$
$(4)\,\,無理数からなる集合のルベーグ測度は1$

【解答】
$(1)\,\,x=\bigcap_{n=1}^{\infty}A_n, A_n=\left(x-\frac{1}{n},x+\frac{1}{n}\right)$ と表される。
$A_n$ は $n$ とともに縮小していくから、 $P({x})=\lim_{n \to \infty}P(A_n)=\lim_{n \to \infty}\frac{2}{n}=0$
$(2)\,\,$(1)の結果と確率測度の加算加法性による。
$(3)\,\,$(2)の結果と有理数の集まりは可算集合であることによる。
$(4)\,\,$無理数の集まりは有理数の集まりの補集合であることによる。

「**ほとんどいたるところで**」「**ほとんどすべての $x$ に対して**」という用語は、ルベーグ測度0の集合を除いた「いたるところで」という意味である。

#### 1.2.7 確率変数

<def title="1.2.8">

$\mathcal{F}$ が $\Omega$ 上の $\sigma$-フィールドのとき、関数 $X: \Omega \rightarrow \mathbb{R}$ が、 $\mathbb{R}$ の任意のボレル集合 $B$ に対して、
$$\{X \in B\}=\{\omega \in \Omega \mid X(\omega) \in B\} \in \mathcal{F}$$
を満たすならば、 $X$ は **$\mathcal{F}$ -可測**または単に**可測**であるとよばれる。 $(\Omega, \mathcal{F}, P)$ が確率空間のとき、このような $X$ は**確率変数**とよばれる。
</def>

**インディケーター**

$(\Omega, \mathcal{F}, P)$ を確率空間とし、 $A \in \mathcal{F}$ とする。 $A$ の**インディケータ**は

$$
I_A(\omega)= \begin{cases}
1 & \omega \in Aのとき \\
0 & \omega \notin Aのとき \\
\end{cases}
$$

と与えられる。 $I_A$ は確率変数である。

<theorem title="1.2.9">

確率変数の定数倍、和、積、商は確率変数になる。また、確率変数の極限および確率変数の合成関数も確率変数になる。すなわち  
$(1)\,\,X_nが(\Omega,\mathcal{F})上の確率変数で、X(\omega)=\lim_{n \to \infty}X_n(\omega)ならば、X(\omega)は確率変数$  
$(2)\,\,Xが(\Omega,\mathcal{F})上の確率変数で、gが\mathcal{B}-可測な関数ならば、g(X)は確率変数$
</theorem>

**確率変数 $X$ から生成された $\sigma$-フィールド**は離散確率変数の場合と定義が同じなので省略。

<proposition>

$\Omega$ 上の実数値関数 $X=X(\omega)$ について、以下の (1)-(5)は互いに同地である。

$(1)\,\,X$ は確率変数である。
$(2)\,\,$ 任意の $a \in \mathbb{R}$ に対して $\{X \le a\} \in \mathcal{F}$ が成立する。
$(3)\,\,$ 任意の $a \in \mathbb{R}$ に対して $\{X \lt a\} \in \mathcal{F}$ が成立する。
$(4)\,\,$ 任意の $a \in \mathbb{R}$ に対して $\{X \ge a\} \in \mathcal{F}$ が成立する。
$(5)\,\,$ 任意の $a \in \mathbb{R}$ に対して $\{X \gt a\} \in \mathcal{F}$ が成立する。

</proposition>

<proof>

$(2) \Leftrightarrow (5),\,\,(3) \Leftrightarrow (4)$ は、それぞれ $\{X \le a\}^c=\{X \gt a\},\,\,\{X \lt a\}^c=\{X \ge a\}$ だから明らかである。
$(2) \Leftrightarrow (5)$ を示すには、それぞれ

$$
\{X \lt a\}=\bigcup_{n=1}^{\infty}\{X \le a-\frac{1}{n}\}
$$
$$
\{X \le a\}=\bigcap_{n=1}^{\infty}\{X \lt a+\frac{1}{n}\}
$$
に注意すれば良い。以上から $(2)-(5)$ が同値であることがわかった。

$(1) \Rightarrow (2)$ は、 $A=\left(-\infty,a\right]$ ととれば $A \in \mathcal{B}(\mathbb{R})$ だから、 $(1)$ から

$$
\{X \le a\}=X^{-1}(A) \in \mathcal{F}
$$

がわかる。

最後に $(1) \Leftarrow (2)$ を示そう。そのために、

$$
\mathcal{B}_0=\{A \in \mathcal{B}(\mathbb{R}) \mid X^{-1}(A) \in \mathcal{F}\}
$$

とおく。条件 $(2)$ から、任意の無限閉区間は $\left(-\infty,a\right] \in \mathcal{B}_0$ を満たす。一方、 $\mathcal{B}_0$ が $\sigma$ -加法族であることが容易に言える。実際、

- $X^{-1}(\mathbb{R})=\Omega \in \mathcal{F}$ だから $\mathbb{R} \in \mathcal{B}_0$ である
- $A \in \mathcal{B}_0 \Rightarrow X^{-1}(A^c)=\left(X^{-1}(A)\right)^c \in \mathcal{F} \Rightarrow A^c \in \mathcal{B}_0$
- $A_n \in \mathcal{B}_0,n=1,2,\cdots \Rightarrow X^{-1}\left(\bigcup_{n=1}^{\infty}A_n\right)=\bigcup_{n=1}^{\infty}X^{-1}(A_n) \in \mathcal{F} \Rightarrow \bigcup_{n=1}^{\infty}A_n \in \mathcal{B}_0$

の３点に注意すればよい。以上から、

$$
\sigma\left(\{(-\infty,a]\mid a \in \mathbb{R}\}\right) \subset \mathcal{B}_0
$$
がわかる。左辺は $\mathcal{B}(\mathbb{R})$ と一致する。したがって、 $\mathcal{B}(\mathbb{R}) \subset \mathcal{B}_0$ が得られた。しかし、定義から $\mathcal{B}(\mathbb{R}) \supset \mathcal{B}_0$ だから、結局 $\mathcal{B}(\mathbb{R}) = \mathcal{B}_0$ であることがわかった。これは

$$
A \in \mathcal{B}(\mathbb{R}) \Rightarrow X^{-1}(A) \in \mathcal{F}
$$

を意味し、(1)が示された。

</proof>

実数値関数を $f:\mathbb{R} \rightarrow \mathbb{R}$ とする。 $\mathbb{R}$ の任意のボレル集合 $B$ に対して、$f$ の逆像 $f^{-1}(B)=\{x \mid f(x)=y \in B\}$ がボレル集合であるとき、 $f$ を**ボレル関数**という。

- 連続な実数値関数 $f$ はボレル関数( $\mathcal{B}$-可測)である。
- 一般に、 $\mathcal{F}_X$-可測な確率変数 $Y$ は、あるボレル関数 $f: \mathbb{R} \rightarrow \mathbb{R}$ で $Y=f(X)$ と表される。

#### 1.2.8 確率分布

確率空間 $(\Omega,\mathcal{F},P)$ 上の確率変数 $X$ とする。このとき、 $\mathbb{R}$ のボレル集合 $B \in \mathcal{B}=\mathcal{B}(\mathbb{R})$ に対して、集合 $\{\omega \in \Omega \mid X(\omega) \in B\}$ を $\{X \in B\}$ と表し、確率 $P(\{X \in B\})$ を $P_X(B)$ と表す。

$$
P_X(B)=P(X \in B)
$$

$P_X$ は $(\mathbb{R}, \mathcal{B})$ 上の確率測度になり、 **$X$ の確率分布**または単に**分布**と呼ばれる。

> [!warn] 確率と確率分布
> 確率は、 $P: \Omega \to \mathbb{R}$
> 確率分布は、 $P: \mathbb{R} \to \mathbb{R}$
> となる関数。つまり、確率は事象に対して定義されるが、確率分布は確率変数の取りうる値に対して定義される。  
> 確率は $(\Omega, \mathcal{F})$ が可測空間になり、  
> 確率分布は $(\mathbb{R}, \mathcal{B})$ が可測空間になる。 

<def title="1.2.11">
$X$ が確率変数のとき
$$
F(x)=F_X(x)=P_X((-\infty,x])=P(X \le x)
$$
によって定義される$F:\mathbb{R} \rightarrow [0,1]$ を**Xの分布関数**という。
</def>

<theorem title="1.2.12">
確率変数 $X$ の分布関数 $F(x)$ は次の性質を満たす。  
$(1)\,\,a \lt b$ ならば、 $F(b)-F(a)=P_X((a,b])$  
$(2)\,\,F(x)$ は右連続で単調非減少  
$(3)\,\,\lim_{x \to \infty}F(x)=1, \quad \lim_{x \to -\infty}F(x)=0$
</theorem>

<def title="1.2.13">
確率変数 $X$ の分布関数 $F(x)$ において、
$$F(x)=\int_{-\infty}^{x}f(t)dt$$
を満たす関数 $f(x)$ が存在するとき、 $f(x)$ を **$X$ の確率密度関数**または単に**確率密度**という。
</def>

微分積分の基本定理から $\frac{dF(x)}{dx}=f(x)$ となる。さらに、 $f(x)$ は非負、かつ $\mathbb{R}$ 上での積分は１である。

$$
\frac{dF(x)}{dx}=f(x), \quad f(x) \ge 0, \quad \int_{-\infty}^{\infty}f(x)dx=1
$$

<def title="1.2.14">
$X,Y$ が同じ確率空間 $(\Omega, \mathcal{F}, P)$ における確率変数のとき、 $X \le x$ と $Y \le y \quad (x,y \in \mathbb{R})$ が同時に起こる事象 $\{X \le x,Y \le y\}$ の確率を $P(X \le x, Y \le y)$ と表す。これを $(x, y)$ の２変数関数とみなして $F(x,y)$ とおき、 $X,Y$ の**結合分布関数**という。すなわち
$$F(x,y)=P(X \le x, Y \le y)$$
$F(x,y)$ が
$$F(x,y)=\int_{-\infty}^{x}\int_{-\infty}^{y}f(u,v)dudv$$
と表されるとき、 $f(x,y)$ を $X,Y$ の**結合確率密度**または単に**確率密度**という。
</def>

特に、 $f$ は関係式

$$
f(x,y)=\frac{\partial^2F}{\partial x \partial y}(x,y)
$$

を満たす。また、 $X,Y$ の分布関数をそれぞれ $F_X(x),F_Y(y)$ とおけば、これらは結合分布関数から次のようにして得られる。

$$
F_X(x)=F(x,\infty), \quad F_Y(y)=F(\infty, y)
$$

この意味で、 $F_X(x),F_Y(y)$ を**周辺分布関数**という。

これをn次元に拡張して、**確率変数ベクトル$\bm{X}$**も同様に定義できる。

<def title="1.2.15">
$\bm{X}$ が確率変数ベクトルのとき、 $\mathbb{R}^n$ の任意のボレル集合 $B$ に対して、次を満たす関数 $f(\bm{x})=f(x_1,x_2,\cdots,x_n)$ を**確率変数ベクトル $\bm{X}$ の確率密度**という。
$$P_{\bm{X}}(B)=P(\bm{X} \in B)=\int_{\bm{x} \in B}f(\bm{x})dx_1dx_2\cdots dx_n$$
ただし、積分は $\bm{x}=(x_1,x_2,\cdots,x_n)$ が $B$ に属するような $\mathbb{R}^n$ の部分領域において重積分をするという意味である。
</def>

### 1.3 確率変数の平均

$X$ を確率空間 $(\Omega, \mathcal{F}, P)$ 上の確率変数とするとき、 $X$ の平均(期待値)は、

$$
E[X]=\int_{\Omega}X(\omega)dP(\omega)
$$

と定義される。

上記は全事象に対して定義された積分だが、これを確率変数の取りうる値に対して定義することを考える。
確率変数が $[x,x+dx]$ の間を取るとしたら、そのときの確率を

$$
F(x+dx) - F(x) \equiv F(dx)=P_X(dx)
$$

と書く。この表記を使えば、

$$
E[X]=\int_{-\infty}^{\infty}xF(dx)
$$

と書き直すことができる。

<theorem title="1.3.1">
$X$ を確率変数とし、 $F(x)$ を $X$ の分布関数とする。さらに、 $h$ を $\mathbb{R}$ 上の可測な関数で $h(X)$ を積分可能とする。このとき
$$
\begin{split}
E[h(X)]&=\int_{\Omega}h(X(\omega))dP(\omega) \\
&=\int_{-\infty}^{\infty}h(x)P_X(dx)=\int_{-\infty}^{\infty}h(x)F(dx) \\
\end{split}
$$
</theorem>

この積分を $F$ に関する $h$ の**ルベーグ・スティルチェス積分**という。
とくに、 $F(x)=x$ に関するルベーグ・スティルチェス積分は**ルベーグ積分**という。

<theorem title="1.3.2">
$X,Y$ が確率変数のとき、平均は次の性質をもつ。
$(1)\,\,P(X \ge 0)=1$ で $E[X]$ が存在するとき、$E[X] \ge 0$  
$\quad X \ge 0$ のとき、$E[X]=0$ であるための必要十分条件は 
$$
P(X=0)=1
$$ 
$(2)\,\,\alpha$ が定数のとき、 $E[\alpha]=\alpha$  
$(3)\,\,X$ が有界、すなわち、 $P(|X| \le M)=1$ を満たす定数 $M \gt 0$ が存在するとき、 $E[X]$ は存在する。
$\quad$ 一般に、 $|X| \le Y$ かつ $E[Y]$ が存在するとき、 $E[X]$ も存在して  
$$E[|X|] \le E[Y]$$
$(4)\,\,\alpha,\beta$ が定数、かつ $E[X]$ と $E[Y]$ が存在するとき、
$$E[\alpha X + \beta Y]=\alpha E[X] + \beta E[Y]$$
$(5)\,\,\alpha,\beta$ が定数、$g,h$ が関数、かつ $g[X]$ と $h[Y]$ が確率変数でそれらの平均が存在するとき、
$$E[\alpha g(X) + \beta h(x)]=\alpha E[g(X)] + \beta E[h(Y)]$$
$(6)\,\,g,h$ が関数で $g(x) \le h(x), \,\,x \in \mathbb{R}$ を満たし。かつ $g(X),h(X)$ が確率変数でそれらの平均が存在するとき、
$$E[g(X)] \le E[h(X)]$$
$\quad$ 特に不等式 $-|x| \le x \le |x|$ に注意すれば、 $|E[X]| \le E[|X|]$
</theorem>

平均の計算式は次のようにも計算できる。

$$
\int_{-\infty}^{\infty}|x|f(x)dx \lt \infty　ならば、　E[X]=\int_{-\infty}^{\infty}xf(x)dx
$$

### 1.4 確率変数の変換と収束

#### 1.4.1 積率母関数

<def title="1.4.1">
$E[|X|^r] \lt \infty$ のとき、 $X^r$ は**可積分**または**積分可能**であるとよばれる。 $E[X^r]$ を $X$ の $r$ 次**積率**または $r$ 次**モーメント**という。とくに $E[|X|^2]$ のとき、 $X$ は**２乗可積分**であるとよばれる。
</def>

<def title="1.4.2">
$0$ の近傍の $t$ に対して $e^{tX}$ が積分可能なとき、
$$m(t)=m_X(t)=E[e^{tX}]$$
によって定められる $m(t)$ を $X$ の**積率母関数**という。
</def>

マクローリン展開を使えば、

$$
m(t)=m_X(t)=E[e^{tX}]=E\left[ \sum_{n=0}^{\infty}\frac{t^nX^n}{n!} \right]=\sum_{n=0}^{\infty}\frac{t^n}{n!}E[X^n]
$$

とかけるので、次の定理が成り立つ。

<theorem title="1.4.3">
$X$ の積率母関数 $m_X(t)$ が存在するとき、すべての自然数 $r$ に対して $E[X^r]$ は存在し、次のように与えられる。
$$E[X^r]=\left. \frac{d^r}{dt^r}m_X(t) \right|_{t=0}$$
</theorem>

積率母関数は分布を一意的に決定する。

<theorem title="1.4.4">
確率変数 $X,Y$ の積率母関数 $m_X(t),m_Y(t)$ が存在し、すべての $t$ に対して $m_X(t)=m_Y(t)$ とする。このとき、 $X$ と $Y$ は同じ分布を持つ。
</theorem>

正規分布 $N(\mu,\sigma^2)$ の積率母関数は以下。

$$
m_X(t)=\exp{\left[\mu t + \frac{1}{2}\sigma^2t^2\right]}
$$

#### 1.4.2 確率変数の収束

確率変数の収束には4つの概念がある。

(1) 分布収束
(2) 確率収束
(3) 概収束
(4) $L^r$-収束
（上記は強い順に並んでいる）

<def title="1.4.5 分布収束">
$X, X_n$ を確率変数、 $F(x), F_n(x)$ を分布関数とする。次の式が成り立つとき、**分布収束する**という。
$$\lim_{n \to \infty}F_n(x)=F(x)$$
</def>

<theorem title="1.4.6">
$\{X_n\}$ が $X$ に分布収束することと、次の(1)(2)は同値である。  
$(1)\,\,\{X_n\}$ の積率母関数が $X$ の積率母関数に収束する。  
$(2)\,\,$任意の有界かつ連続な関数 $g$ に対して、
$$E[g(X_n)] \to E[g(X)]\quad(n \to \infty)$$
</theorem>

<def title="1.4.7 確率収束">
任意の $\varepsilon \gt 0$ に対して次の式が成り立つとき、 $\{X_n\}$ は $X$ に**確率収束する**という。
$$P(|X_n-X| \gt \varepsilon) \to 0\quad(n \to \infty)$$
</def>

<def title="1.4.8 概収束">
確率0の事象に属していない任意の $\omega$ に対して、次の式が成り立つとき、 $\{X_n\}$ は $X$ に**概収束**するという。
$$
A=\{\omega \mid X_n(\omega) \to X(\omega)\}\quad ならば \quad P(A)=1
$$
</def>

> [!warn]
> $n \to \infty$ における上記３種類の収束を次のように表す。  
> 分布収束 $\quad X_n \xrightarrow{d} X$  
> 確率収束 $\quad X_n \xrightarrow{P} X$  
> 概収束　 $\quad X_n \xrightarrow{a.s.} X$  

<theorem title="1.4.10">
確率変数列の収束については、次の関係が成り立つ。  
$(1)\,\,X_n \xrightarrow{a.s.} X$ ならば、 $X_n \xrightarrow{P} X, \quad X_n \xrightarrow{P} X$ ならば、 $X_n \xrightarrow{d} X$  
$(2)\,\,X_n \xrightarrow{d} c$ （定数）ならば、 $X_n \xrightarrow{P} c$  
$(3)\,\,X_n \xrightarrow{P} X$ ならば、$\{n_k\} \subset \{n\}, n_k \to \infty$ を満たす $\{n\}$ の部分列 $\{n_k\}$ が存在して、 $n_k \to \infty$ のとき $X_{n_k} \xrightarrow{a.s.} X$  
</theorem>

<def title="1.4.11 $L^r$-収束">
任意の $n$ に対して次の式が成り立つとき、 **$L^r$-収束する**という。  
$E[|X_n|^r] \lt \infty \quad$ かつ $\quad E[|X_n -X|^r] \to 0\,\,(n \to \infty)$
</def>

<theorem title="1.4.12">
$X_n \xrightarrow{L^2} X$ ならば $X_n \xrightarrow{L^1} X$, $\quad X_n \xrightarrow{L^1} X$ ならば $X_n \xrightarrow{P} X$
</theorem>

#### 1.4.3 一様可積分

<def title="1.4.13">
確率変数列 $\{X_n\}$ が**一様可積分**であるとは、$a_{m,n}=E[|X_m|I(|X_m| \gt n)]$ とおけば、 $n \to \infty$ のとき、 $a_{m,n}$ が $m$ に関して一様に0に収束することである。すなわち  
$$\lim_{n \to \infty}\sup_{m}E[|X_m|I(|X_m|>n)]=0$$
が成り立つことである。ただし、 $I(A)$ は $A$ のインディケーター。
</def>

<theorem title="1.4.14">
$X_n \xrightarrow{L^r} X$ であることは、 $X_n \xrightarrow{P} X$ かつ $\{|X_n|^r\}$ が一様可積分であることと同値である。
</theorem>

#### 1.4.4 収束に関する定理

<theorem title="1.4.16">
$(1)\,\,X_n \ge 0,$ かつ $n \to \infty$ において $X_n$ が単調に増加して、ある $X\,\,(\infty の場合も許して)$ に近づけば、
$$\lim_{n \to \infty}E[X_n]=E[X]\qquad（単調収束定理）$$
$(2)\,\,X_n \ge 0$（または $X_n \ge c \gt -\infty$）ならば
$$E\left[\liminf_{n \to \infty}X_n\right] \le \liminf_{n \to \infty}E[X_n]\qquad（ファトウの補題）$$
$(3)\,\,X_n \xrightarrow{P} X$かつすべての $n$ に対して $|X_n| \le Y,\,\,E[Y]\lt \infty$ ならば
$$\lim_{n \to \infty}E[X_n]=E[X]\qquad（有界収束定理）$$
</theorem>

概収束の判定として、次の定理が知られている。

<theorem title="1.4.17">
すべての $\varepsilon \gt 0$ に対して
$$\sum_{n=1}^{\infty}P(\lvert X_n - X \rvert \ge \varepsilon) \lt \infty$$
が成り立つならば、 $X_n \xrightarrow{a.s.} X$
</theorem>

### 1.5 共分散

<def title="1.5.3">
可積分な確率変数 $X,Y$ の平均をそれぞれ $\mu_X=E[X],\,\,\mu_Y=E[Y]$ とおく。このとき、積 $XY$ が可積分ならば、次式で与えられる $C(X,Y)$ を $X$ と $Y$ の**共分散**という。
$$C(X,Y)=E[(X-\mu_X)(Y-\mu_Y)]=E[XY]-E[X]E[Y]$$
特に、 $X$ と $X$ 自身の共分散を $X$ の**分散**といい、 $V[X]$ で表す。すなわち
$$V[X]=C(X,X)=E[(X-\mu_X)^2]=E[X^2]-E[X]^2$$
</def>

また、 $V[X]=E[(X-\mu_X)^2]\ge0$ だから、

$$
V[X]=0\,\,\Leftrightarrow\,\,P(X=\mu_X)=1
$$

次の不等式が成り立つ（シュワルツの不等式）。

$$
\lvert E[XY] \rvert^2 \le E[X^2]E[Y^2]
$$

[証明] $\alpha=E[Y^2],\,\,\beta=-E[XY]$とおく。明らかに $\alpha \ge 0$ である。 $\alpha=0$ のとき不等式は成り立つから、 $\alpha \gt 0$ のときを考える。

$$
\begin{split}
0&\le E[(\alpha X + \beta Y)^2]=E[\alpha^2X^2 + 2\alpha\beta XY+\beta^2Y^2] \\
&=\alpha^2E[X^2]+2\alpha\beta E[XY] +\beta^2E[Y^2] \\
&=\alpha^2E[X^2]+2\alpha\beta(-\beta)+\beta^2\alpha=\alpha(\alpha E[X^2]-\beta^2) \\
&=\alpha(E[X^2]E[Y^2]-E[XY]E[XY])
\end{split}
$$

ゆえに、 $\alpha \gt 0$ によって、求める不等式が得られる。 [証明終]

２乗可積分な確率変数 $X$ は可積分である。また、 $X_n \xrightarrow{L^2} X$ ならば $X_n \xrightarrow{L^1} X$ である。

[証明] シュワルツの不等式において、 $X$ を $|X|$ 、 $Y=1$とおく。このとき、

$$
\begin{split}
&(E[|X|])^2 \le E[X^2] \lt \infty \\
\therefore \,\,&E[|X|] \lt \infty
\end{split}
$$

上の式で、特に $X$ を $X_n-X$ とみなせば、 $E[(X_n-X)] \le (E[|X_n-x|^2])^{\frac{1}{2}}$

したがって、 $L^2$ -収束ならば $L^1$ -収束である。 [証明終]

シュワルツの不等式は、２乗可積分な確率変数に対して共分散は存在することを保証している。

<theorem title="1.5.4">
共分散は次の性質をもつ。 
$(1)\,\,C(X,Y)$ は $X,Y$ に関して**対称**である。すなわち
$$C(X,Y)=X(Y,X)$$
$(2)\,\,C(X,Z)$ は $X,Z$ に関して線形である。たとえば、 $a,b$ が定数のとき
$$C(aX+bY,Z)=aC(X,Z)+bC(Y,Z)$$
</theorem>

<def title="1.5.5">
２乗可積分な $X,Y$ に対して、 $V(X) \neq0,V(Y)\neq0$ のとき
$$\rho(X,Y)=\frac{C(X,Y)}{\sqrt{V(X)}\sqrt{V(Y)}}$$
によって定められる $\rho(X,Y)$ を $X,Y$ の**相関係数**という。
</def>

> [!warn] 相関係数の性質
> $(1)\,\,-1 \le \rho(X,Y) \le 1$  
> $(2)\,\,C(X,Y)=0$ は、 $\rho(X,Y)=0$ と同値である。 $C(X,Y)=0$ のとき、 $X,Y$ には**相関がない**という。

<theorem title="1.5.7">

確率変数 $X,Y$ が独立なら、次が成り立つ。  
$(1)\,\,E[XY]=E[X]E[Y]$  
$(2)\,\,C(X,Y)=0$ すなわち、 $X,Y$ は相関がない。  
$(3)\,\,V(X + Y)=V(X)+V(Y)$  
</theorem>

<def title="1.5.8">

確率変数ベクトル $\bm{X}=(X_1, X_2, \cdots, X_n)$ の**共分散行列**とは、 $C(X_i,X_j)$ を $i$ 行 $j$ 列成分にもつ $n$次正方行列のことである。
</def>

## 第２章 条件付き確率と独立性
### 2.1 条件付き確率の素朴な定義

<def title="2.1">

$A,B \in \mathcal{F}$ で $P(B) \gt 0$ とする。事象 $B$ を与えたときの事象 $A$ の**条件付き確率**(conditional probability)とは

$$
P(A|B)=\frac{P(A \cap B)}{P(B)}
$$

をいう。あるいは、 $B$ を固定し $A$ が変化すると考えて、

$$
P(\cdot|B)=\frac{P(\cdot \cap B)}{P(B)}
$$

を、 $B$ が与えられたときの条件付き確率という。

</def>

<lemma title="2.2">

$(1)\,\,P(A|B)$ は $A$ について確率測度である。すなわち、 $P(B)\gt0$ として
$\quad (a)\,\,P(A|B)\ge0$
$\quad (b)\,\,P(\Omega|B)=1$
$\quad (c)\,\,A_n \in \mathcal{F},\,\,n=1,2,\cdots$ が互いに疎ならば
$$
P\left(\left.\bigcup_{n=1}^{\infty}A_n\right|B\right)=\sum_{n=1}^{\infty}P(A_n|B)
$$

$(2)\,\,$（全確率の公式） $\{B_i\in \mathcal{F}\}_{i\in I}$ が、 $\Omega$ の有限または可算分割で、各 $i \in I$ に対して $P(B_i)\gt0$ を満たすとする。このとき

$$
P(A)=\sum_{i \in I}P(A|B_i)P(B_i)
$$

$(3)\,\,$ （ベイズの公式） $\{B_i \in \mathcal{F}\}_{i \in I}$ は上と同じ条件を満たすとして、任意の $j \in I$ に対して

$$
P(B_i|A)=\frac{P(A|B_i)P(B_i)}{\sum_{i \in I}P(A|B_i)P(B_i)}
$$

</lemma>

$P(\cdot|B)$ は $(\Omega,\mathcal{F})$ 上の確率測度であるが、この測度に関する期待値を**条件付き期待値**という。すなわち $X=X(\omega)$ を実数値確率変数とするとき

$$
E[X|B]=\int_{\Omega}X(\omega)P(d\omega | B)
$$

と定める。

$$
P(d\omega | B)=\frac{1}{P(B)}1_B(\omega)P(d\omega)
$$

だから

$$
E[X|B]=\frac{1}{P(B)}\int_B X(\omega)P(d\omega)
$$

である。あるいは、事象 $B$ 上の $X$ の期待値 $E[X,B]$ を用いて

$$
E[X|B]=\frac{E[X,B]}{P(B)}
$$

と書いてもよい。

### 2.2 独立性
#### 2.2.1 事象の独立性

##### ２つの事象の独立性

「事象 $A$ が $B$ によらない」いいかえれば「事象 $A$ と $B$ が独立」ということは、「$B$ で条件をつけても $A$ の確率はもとと変わらない」ということだと考えられる。そこで、まず $P(B)\gt0$ のときには

$$
P(A|B)=P(A)
$$

が成立することと定義しよう。この条件は $P(A \cap B)=P(A)P(B)$ と書き換えられることができ、この式は $P(B)=0$ であっても意味を持つから、これを定義に採用して


<def title="2.3">

$A,B\in\mathcal{F}$ として、２つの事象 $A$ と $B$ が**独立**であるとは

$$
P(A\cap B)=P(A)P(B)
$$

が成立するときにいう。

</def>

<lemma title="2.4">

$A,B\in\mathcal{F}$ として、次の４条件は互いに同値である。

$(1)\,\,A$ と $B$ が独立

$(2)\,\,A^c$ と $B$ が独立

$(3)\,\,A$ と $B^c$ が独立

$(4)\,\,A^c$ と $B^c$ が独立

特に $A\in\mathcal{F}$ に対して $A$ を含む最小の $\sigma$ -加法族を $\mathcal{F}_A=\{0,A,A^c,\Omega\}$ と書くとき、 $A$ と $B$ が独立ならば、任意の $C_1\in\mathcal{F}_A$ と $C_2\in\mathcal{F}_B$ に対して

$$
P(C_1 \cap C_2)=P(C_1)P(C_2)
$$

が成立する。

</lemma>

##### 複数個の事象の独立性

事象の個数が３以上の場合にも、独立性の概念を定義する。

<def title="2.5">

$A_k \in \mathcal{F},\,\,k=1,2,\cdots,n$ として、事象の集まり $\{A_k\}_{k=1,2,\cdots,n}$ が**独立**であるとは、任意の $1 \le \ell \le n$ と任意の $a\le k_1 \lt k_2 \lt \cdots \lt k_{\ell} \le n$ に対して

$$
P\left(\bigcap_{i=1}^{\ell}A_{k_i}\right)=\prod_{i=1}^{\ell}P(A_{k_i})
$$

が成立するときにいう。

</def>

<def title="2.7">

（一般に非加算な）集合 $\Lambda$ によってパラメータづけられた事象の集まり $\{A_k\in \mathcal{F}\}_{k \in \Lambda}$ が独立であるとは、 $\Lambda$ の任意の有限部分集合 $\{k_1,k_2,\cdots,k_{\ell}\} \subset \Lambda$ に対して

$$
P\left(\bigcap_{i=1}^{\ell}A_{k_i}\right)=\prod_{i=1}^{\ell}P(A_{k_i})
$$

が成立するときにいう。

</def>

#### 2.2.2 σ-加法族の独立性

<def title="2.8">

$\mathcal{F}_1,\,\,\mathcal{F}_2$ を $\mathcal{F}$ の**部分$\sigma$-加法族**、すなわち

$$
各\mathcal{F}_k\,\,(k=1,2)\,\,は\sigma-加法族で、\mathcal{F}_k \subset \mathcal{F} を満たす
$$

として $\mathcal{F}_1$ と $\mathcal{F}_2$ が**独立**であるとは、任意の $C_1 \in \mathcal{F}_1,\,\,C_2 \in \mathcal{F}_2$ に対して

$$
P(C_1 \cap C_2)=P(C_1)P(C_2)
$$

が成立するときにいう。

</def>

<def title="2.9">

$(1)\,\,\mathcal{F}_1,\mathcal{F}_2,\cdots,\mathcal{F}_n$ を $\mathcal{F}$ の部分 $\sigma$ -加法族として $\mathcal{F}_1,\mathcal{F}_2,\cdots,\mathcal{F}_n$ が独立であるとは、任意の $C_k \in \mathcal{F}_k\,\,(1 \le k \le n)$ に対して

$$
P(C_1 \cap C_2 \cap \cdots \cap C_n)=\prod_{k=1}^{n}P(C_k)
$$

が成立するときにいう。

$(2)\,\,$ また、（一般に非可算）の集合 $\Lambda$ でパラメータづけられた $\mathcal{F}$ の部分 $\sigma$ -加法族の集まり $\{\mathcal{F}_k\}_{k \in \Lambda}$ が独立であるとは、$\Lambda$ の任意の有限部分集合 $\{k_1,k_2,\cdots,k_{\ell}\}$ に対して $\{\mathcal{F}_{k_i}\}_{i=1,2,\cdots,\ell}$ が独立であるときにいう。

$(3)\,\,\{\mathcal{F}_k\}_{k \in \Lambda}$ から任意の組 $i \neq j\,\,(i,j \in \Lambda)$ をとるとき $\mathcal{F}_i$ と $\mathcal{F}_j$ が独立であれば $\{\mathcal{F}_k\}_{k \in \Lambda}$ は**組ごとに独立**(pairwisely independent)という。

</def>


#### 2.2.3 確率変数の独立性

一般の可測空間に値をとる確率変数について独立性の概念を定義する。ここでは、確率変数はすべて同一の確率空間 $(\Omega, \mathcal{F}, P)$ で定義されているものとする。 $k=1,2,\cdots,n$ または $\Lambda$ は一般の集合として $k \in \Lambda$ に対して可測空間 $(S_k, \mathcal{S}_k)$ が与えられているとする。

<def title="2.10">

$(1)\,\,S_k$ -値確率変数列 $(X_k)_{k=1,2,\cdots,n}$ が**独立**とは、任意の $A_1 \in \mathcal{S}_1, A_2 \in \mathcal{S}_2, \cdots, A_n \in \mathcal{S}_n$ に対して

$$
P(X_k \in A_k, k=1,2,\cdots,n)=\prod_{k=1}^{n}P(X_k \in A_k)
$$

が成立するときにいう。

$(2)\,\,$ さらに一般に $S_k$ -値確率変数の集まり $(X_k)_{k\in \Lambda}$ が**独立**とは、 $\Lambda$ の任意の有限部分集合 $k_1,k_2,\cdots,k_{\ell} \in \Lambda$ と $A_1 \in \mathcal{S}_{k_1}, A_2 \in \mathcal{S}_{k_2}, \cdots, A_\ell \in \mathcal{S}_{k_\ell}$ に対して

$$
P(X_{k_i} \in A_i, i=1,2,\cdots,\ell)=\prod_{i=1}^{\ell}P(X_{k_i} \in A_i)
$$

が成立する時にいう。

</def>

> [!warn] 2.12
> 確率変数 $X$ が生成する $\sigma$ -加法族を $\sigma(X)$ とすれば、確率変数列の独立性はそれらが生成する $\sigma$ -加法族の独立性と同値である。

<proposition title="2.13">

$S_k=\mathbb{R}$ で各 $X_k$ の分布が確率密度関数 $p_k(x)$ をもつとき、 $(X_k)_{k=1,2,\cdots,n}$ の独立性は、

$$
P(a_1 \le X_1 \le b_1,a_2 \le X_2 \le b_2,\cdots,a_n \le X_n \le b_n)=\prod_{k=1}^{n}\int_{a_k}^{b_k}p_k(x)dx
$$

が任意の $a_1 \le b_1,a_2 \le b_2,\cdots,a_n \le b_n$ に対して成立することと同値である。

</proposition>

確率変数列の独立性は、可測関数との合成によって保たれる。

<proposition title="2.14">

$S_k$ -値確率変数列 $(X_k)_{k=1,2,\cdots,n}$ は独立で、 $g_k:S_k \to S_k', k=1,2,\cdots,n$ は可測とする。ただし、 $(S_k', \mathcal{S}_k')$ は他の可測空間とする。このとき $Y_k=g_k(X_k),k=1,2,\cdots,n$ とおけば、 $S_k'$ -確率変数列 $(Y_k)_{k=1,2,\cdots,n}$ は独立である。

</proposition>

<proof>

$k=1,2,\cdots,n$ に対して

$$
\{Y_k \in A_k\}=\{X_k \in g_k^{-1}(A_k)\},\quad A_k \in \mathcal{S}_k'
$$

であることに注意すればよい。

</proof>

<example title="2.15">

実数値確率変数 $X$ と $Y$ が独立ならば、 $X^2$ と $Y^2$ は独立である（逆は一般に成立しない）。

</example>

<lemma title="2.16">

$(X_k)_{k=1,2,\cdots,n}$ は独立な実数値確率変数列で、 $g=g(x_1,x_2,\cdots,x_i):\mathbb{R}^i \to \mathbb{R}$ はボレル可測であるとする。ただし、 $i \lt n$ である。このとき $Y=g(X_1,X_2,\cdots,X_i)$ とおけば $Y, X_{i+1},\cdots,X_n$ は独立な確率変数列である。

</lemma>

<proof>

$X=(X_1,X_2,\cdots,X_i)$ は $\mathbb{R}^i$ -値確率変数であり、 $X,X_{i+1}, \cdots, X_n$ が独立であることが示せる。したがって、補題2.14で $S_1=\mathbb{R}^i,S_2=\cdots=S_{n-i+1}=\mathbb{R}$ ととればよい。

</proof>

<proposition title="2.17">

実数値確率変数列 $(X_k)_{k=1,2,\cdots,n}$ は独立で、可積分（すなわち $E[|X_k|]\lt\infty$ を満たす）とする。このとき、これらの積 $X=X_1X_2\cdots X_n$ も可積分で

$$
E[X]=E[X_1]E[X_2]\cdots E[X_n]
$$

が成立する。

</proposition>

<proof>

**第１段：** $X_k=X_k^+ - X_k^-$ と分解する。ただし $X_k^{\pm}$ はそれぞれ $X_k$ の正部分および負部分である。各 $k$ ごとに $+,-$ のどちらかをとり、それを $\mathrm{sgn}(k)$ とおけば補題2.14から 

$$
X_1^{\mathrm{sgn}(1)},X_2^{\mathrm{sgn}(2)},\cdots,X_n^{\mathrm{sgn}(n)}
$$

は独立になる。したがって、

$$
E[X]=E\left[\prod_{k=1}^{n}(X_k^+-X_k^-)\right]=\sum_{\mathrm{sgn}}E\left[\prod_{k=1}^{n}\mathrm{sgn}(k)\cdot X_k^{\mathrm{sgn}(k)}\right]
$$

だから、 $X_k\ge0$ と仮定して結論をいえば十分である。ただし $\sum_{\mathrm{sgn}}$ は写像 $\mathrm{sgn}:\{1,2,\cdots,n\} \to \{+,-\}$ 全体についての和を表す。

**第２段：** 

$$
g^{(N)}(x)=\sum_{i=0}^{N\cdot 2^N-1}\frac{i}{2^N}1_{[\frac{i}{2^N},\frac{i+1}{2^N}]}(x)+N1_{[N,\infty)}(x),\quad x \ge 0
$$

とおき $X_k^{(N)}=g^{(N)}(X_k)$ とすると、 $X_k^{(N)}$ は単純な確率変数であって $N \to \infty$ とするとき $X_k^{(N)} \nearrow X_k$ （すなわち、単調に増加して $X_k$ に近づく）を満たす。しかも補題2.14から $X_1^{(N)},X_2^{(N)},\cdots,X_n^{(N)}$ は独立になる。したがって、各 $X_k$ は単純な確率変数として結論を示せば十分である。積分に関する単調収束定理を用いる。

**第３段：** 各 $k=1,2,\cdots,n$ について有限集合 $I_k$ があって、 $i \in I_k$ に対して $a_i^k \ge 0,\,\,A_i^k \in \mathcal{F}$ がとれ、非負かつ単純な確率変数 $X_k$ は

$$
X_k(\omega)=\sum_{i \in I_k}a_i^k1_{A_i^k}(\omega)
$$

と表示することができる。ただし、 $a_i^k \neq a_{i'}^k\,\,(i \neq i',i,i' \in I_k)$ で $\{A_i^k\}_{i \in I_k}$ は互いに素であるとしてよい。このとき

$$
E[X]=\sum_{i_1 \in I_1,i_2 \in I_2,\cdots,i_n \in I_n,}a_{i_1}^1a_{i_2}^2\cdots a_{i_n}^nE\left[1_{A_{i_1}^1}1_{A_{i_2}^2}\cdots 1_{A_{i_n}^n}\right]
$$

となるが、 $X_k,\,\,k=1,2,\cdots,n$ の独立性を用いれば

$$
\begin{split}
E\left[1_{A_{i_1}^1}1_{A_{i_2}^2}\cdots 1_{A_{i_n}^n}\right]&=P(X_k=a_{i_k}^k, 1\le k \le n) \\
&=\prod_{k=1}^nP(X_k=a_{i_k}^k) \\
&=\prod_{k=1}^nP(A_{i_k}^k)=\prod_{k=1}^nE\left[1_{A_{i_k}^k}\right] \\
\end{split}
$$

がわかる。したがって

$$
E[X]=\prod_{k=1}^nE[X_k]
$$

が証明された。

</proof>

> [!warn] 2.18
> $X_1,X_2,\cdots,X_n$ が補題2.17の結論
> $$E[X_1X_2\cdots X_n]=E[X_1]E[X_2]\cdots E[X_n]$$
> を満たしても、必ずしも独立ではない。

<proposition title="2.19">

実数値確率変数列 $(X_k)_{k=1,2,\cdots,n}$ は組ごとに独立で、 $\rm{Var}(X_k)\lt\infty (k=1,2,\cdots,n)$ を満たすとする。このとき、 $\rm{Var}(\sum_{k=1}^{n}X_k)\lt\infty$ で、

$$
\rm{Var}\left(\sum_{k=1}^nX_k\right)=\sum_{k=1}^n\rm{Var}(X_k)
$$

が成立する。

</proposition>

### 2.3 確率空間の直積
#### 2.3.1 有限個の確率空間の直積

$(S_k,\mathcal{S}_k,\mu_k),k=1,2,\cdots,n$ を確率空間の列とする。このとき

$$
\Omega=\prod_{k=1}^nS_k,\quad \mathcal{F}=\sigma(\mathcal{P})
$$

とすれば（ただし、 $\mathcal{P}$ は $\Omega$ のべき集合）、可測空間 $(\Omega, \mathcal{F})$ の上の確率測度 $P$ で、任意の $A_1 \in \mathcal{S}_1,A_2 \in \mathcal{S}_2,\cdots,A_n \in \mathcal{S}_n$ に対して、

$$
P(A_1 \times A_2 \times \cdots \times A_n) = \prod_{k=1}^n\mu_k(A_k)
$$

を満たすものが構成でき、そのような測度は一意的である。

このようにして定義された $\sigma$ -加法族 $\mathcal{F}$ と測度 $P$ を

$$
\mathcal{S}_1 \times \mathcal{S}_2 \times \cdots \times \mathcal{S}_n, \quad \mu_1 \times \mu_2 \times \cdots \times \mu_n 
$$

とかき、それぞれ、**直積 $\sigma$ -加法族**、**直積測度**という。

<proposition title="2.20 独立確率変数列の存在">

確率空間 $(S_k,\mathcal{S}_k,\mu_k)$ 上に確率変数 $X^{(k)}:S_k \to \mathbb{R}, k=1,2,\cdots,n$ が与えられたとき、 $\omega=(\omega_1,\omega_2,\cdots,\omega_n) \in \Omega=\prod_{k=1}^nS_k$ に対して

$$
X_k(\omega)=X^{(k)}(\omega_k)
$$

とおけば、 $(X_k)_{k=1,2,\cdots,n}$ は確率空間 $(\Omega,\mathcal{F},P)$ 上の独立な確率変数列である。ただし $\mathcal{F}=\mathcal{S}_1\times\mathcal{S}_2\times\cdots\times\mathcal{S}_n,\,\, P=\mu_1\times\mu_2\times\cdots\times\mu_n$ である。

</proposition>

$(S_k,\mathcal{S}_k,\mu_k) \equiv (S,\mathcal{S},\mu)$ が $k$ によらないときに、以上のようにして得られる $(\Omega,\mathcal{F},P)\equiv(S^n,\mathcal{S}^n,\mu^n)$ を結果 $S$ とその分布 $\mu$ をもつ $n$ 回の**独立同試行**という。

#### 2.3.2 無限個の確率空間の直積

確率空間の無限列 $(S_n,\mathcal{S}_n,\mu_n), n=1,2,\cdots$ が与えられているとする。このとき $\Omega=\prod_{n=1}^{\infty}S_n$ （無限直積空間）とし、 $\Omega$ の部分集合で

$$
C_A^{(n)}=\{\omega \in \Omega \mid (\omega_1,\omega_2,\cdots,\omega_n)\in A\},\quad A \in \mathcal{S_1}\times\mathcal{S_2}\times\cdots\times\mathcal{S_n}
$$

の形のものを**柱状集合**という。柱状集合の集まり

$$
\mathcal{C}=\{C_A^{(n)} \mid n=1,2,\cdots,A\in\mathcal{S_1}\times\mathcal{S_2}\times\cdots\times\mathcal{S_n}\}
$$

は $\Omega$ の有限加法族である。 $\mathcal{C}$ が生成する $\sigma$ -加法族 $\mathcal{F}=\sigma(\mathcal{C})$ を**コルモゴロフの$\sigma$-加法族**という。

#### 2.3.3 独立確率変数の無限列の存在

<theorem title="2.23">

$\mu_1,\mu_2,\cdots$ を $(\mathbb{R},\mathcal{B}(\mathbb{R}))$ 上の確率測度の列とする。このとき適当な確率空間 $(\Omega,\mathcal{F},P)$ の上に確率変数列 $X_1,X_2,\cdots$ を作って

$(1)\,\,(X_n)_{n=1,2,\cdots}$ は独立

$(2)\,\,$ 各 $X_n$ の分布は $\mu_n$

となるようにできる。

</theorem>

<def title="2.24">

確率変数列 $(X_n)_{n=1,2,\cdots}$ （または $(X_n)_{n=1,2,\cdots,N}$ ）が独立で同分布をもつことを簡略に **i.i.d.**(independent and identically distributed)ということがある。

</def>

### 2.4 σ-加法族に関する条件付き確率と条件付き期待値
#### 2.4.1 素朴な定義

$\{B_i\}_{i=1,2,\cdots,n}$ が与えられたときの $A$ の条件付き確率を

$$
P(A \mid \{B_i\}_{i=1,2,\cdots,n})(\omega) = \sum_{i=1}^{n}P(A \mid B_i)1_{B_i}(\omega)
$$

によって定義する。さらに条件付き期待値は

$$
E[X \mid \{B_i\}_{i=1,2,\cdots,n}](\omega) = \sum_{i=1}^{n}E[X \mid B_i]1_{B_i}(\omega)
$$

で定義することができる。

有限分割 $\{B_i\}_{i=1,2,\cdots,n}$ を与えることと、それが生成する $\sigma$ -加法族 $\mathcal{G}=\sigma(\{B_i\}_{i=1,2,\cdots,n})$ を考えることは同値だから

$$
P(A \mid \mathcal{G})(\omega),\quad E[X \mid \mathcal{G}](\omega)
$$

と書いても良い。

#### 2.4.2 ラドン-ニコディムの定理

ここで2.4.3で利用する**ラドン-ニコディムの定理**を天下り的に与えておく。

測度空間 $(S, \mathcal{S}, \mu)$ と、 $S$ 上の実数値可積分関数 $f$ が与えられているとする。すなわち、 $f$ は写像 $f:(S, \mathcal{S}) \to (\mathbb{R},\mathcal{B}(\mathbb{R}))$ として可測で、 $\int_{S}|f(x)|\mu(dx) \lt \infty$ を満たすとする。このとき、 $A \in \mathcal{S}$ に対して

$$
\begin{equation}
\nu(A)=\int_A f(x)\mu(dx) \tag{A.1}
\end{equation}
$$

とおけば、集合関数 $\nu$ は有限な符号付き測度で、 $\mu$ について絶対連続である。すなわち

$(1)\,\,$ （有限性）任意の $A \in \mathcal{S}$ に対して $|\nu(A)| \le \infty$ （つまり $\nu(A) \in \mathbb{R}$ ）

$(2)\,\,$ （ $\sigma$ -加法性） $A_n \in \mathcal{S}, n=1,2,\cdots$ は互いに素な集合として、

$$
\nu\left(\bigcup_{n=1}^{\infty}A_n\right) = \sum_{n=1}^{\infty}\nu(A_n)
$$

$(3)\,\,$ （絶対連続性） $\mu(A)=0,A \in \mathcal{S}$ ならば $\nu(A)=0$

逆にこのような条件を満たす $\nu$ が与えられたときに、関数 $f$ を適当にとれば $\nu$ は $(A.1)$ の形に表現できることを保証するのが**ラドン-ニコディムの定理**である。

<theorem title="2.25 ラドン-ニコディムの定理">

$\mu$ は $(S,\mathcal{S})$ 上の有限測度（つまり $\mu(S) \lt \infty$）、 $\nu$ は $(S, \mathcal{S})$ 上の有限な符号付き測度で、 $\mu$ に関して絶対連続であると仮定する。このとき

$(1)\,\,S$ 上の $\mathbb{R}$ 値 $\mathcal{S}$ -可測関数 $f$ で、 $\mu$ について可積分なものが存在し、 $\nu$ は $(A.1)$ のように表現できる。

$(2)\,\,$ （$f$ の一意性）条件 $(A.1)$ を満たす関数 $\tilde{f}$ が他に存在すれば

$$
f(x)=\tilde{f}(x), \quad \mu-a.e.x
$$

が成立する。

</theorem>

<def title="2.26">

定理2.25が定める関数 $f$ を、 $\nu$ の $\mu$ に関する**密度関数**(density function)と呼び

$$
\frac{d\nu}{d\mu}(x)
$$

と書くことがある。

</def>

#### 2.4.3 一般的な定義

$(\Omega, \mathcal{F}, P)$ を確率空間、 $\mathcal{G}$ を $\mathcal{F}$ の **部分$\sigma$
-加法族**とする。すなわち

$$
\mathcal{G} \subset \mathcal{F} で \mathcal{G} も \sigma -加法族
$$

である。実数値確率変数 $X=X(\omega)$ が与えられ、可積分（つまり $E[|X|]\lt\infty$ ）であるときに、

$$
Q(B)=E[X, B],\quad B \in \mathcal{G}
$$

とおくと、 $Q$ は $(\Omega,\mathcal{G})$ 上の有限な符号付き測度であり、明らかに $B \in \mathcal{G}$ が $P(B)=0$ を満たせば $Q(B)=0$ だから、 $Q$ は $(P, \mathcal{G})$ について絶対連続である。 $(P,\mathcal{G})$ とは、測度 $P$ を $\mathcal{G}$ 上で（つまり $\mathcal{G}$ に制限して）考えたものである。したがって、ラドン-ニコディムの定理を $(S, \mathcal{G},\mu)=(\Omega, \mathcal{G}, P), \nu=Q$ として適用すれば、 $\mathcal{G}$ -可測で $P$ -可積分な関数 $Y=Y(\omega)$ が存在して、任意の $B \in \mathcal{G}$ に対して

$$
Q(B)=\int_BY(\omega)P(d\omega)
$$

が成立することがわかる。いいかえれば、２つの条件

$$
\begin{equation}
\tag{2.5}
\begin{split}
(1)\,\,&B \in \mathcal{G} \Longrightarrow E[X,B]=E[Y,B] \\
(2)\,\,&Yは\mathcal{G}-可測な確率変数
\end{split}
\end{equation}
$$

を満たすような $Y$ が存在する。 $Y$ は $P-a.s.$ の意味で一意的に定まる。

<def title="2.25">

$(1)\,\,$条件(2.5)を満たす確率変数 $Y(\omega)$ を $E[X \mid \mathcal{G}](\omega)$ とかき、 $\mathcal{G}$ の下での $X$ の**条件付き期待値**（条件付き平均値）という。

$(2)\,\,A \in \mathcal{F}$ に対して

$$
P(A \mid \mathcal{G})(\omega)=E[1_A \mid \mathcal{G}](\omega)
$$

とおき、 $\mathcal{G}$ の下での $A$ の**条件付き確率**という。

</def>

<example title="2.26">

$(1)\,\,\mathcal{G}=\mathcal{F}$ のときは、 $Y=X$ ととれば(2.5)を満たす。したがって $E[X|\mathcal{F}]=X(P-a.s.)$ である。

$(2)\,\,\mathcal{G}=\{\emptyset,\Omega\}$ のときは、 $E[X|\mathcal{G}]=E[X](P-a.s.)$ である。実際、定数関数 $Y=E[X]$ は $\mathcal{G}$ -可測であり、条件(2.5)(1)を $B=\emptyset,\Omega$ に対して満たすことも容易にわかる。

</example>

<proposition title="2.27">

$\mathcal{G}=\sigma(\{B_i\}_{i=1,2,\cdots,n})$ が $\Omega$ の有限分割から定まるとき、素朴な意味での条件付き確率・条件付き期待値は、定義2.25の意味での条件付き確率・条件付き期待値と一致する。

</proposition>

<proof>

条件付き期待値について見てみよう。条件付き確率については、特に $X=1_A$ ととればいい。 $E[X|\{ B_i\}]$ を素朴な意味での条件付き期待値とすれば、 $E[X|\{B_i\}]$ が $\mathcal{G}$-可測であることはあきらかである。したがって、 $Y=E[X|\{B_i\}]$ が条件(2.5)(1)を満たすことを確認すれば結論がいえる。そこで、 $B \in \mathcal{G}$ として (2.5)(1)の右辺を計算していこう。

$$
\begin{split}
E[E[X|\{B_i\}],B]&=E\left[\sum_{i=1}^{n}E[X|B_i]1_{B_i},B\right] \\
&=\sum_{i=1}^{n}E\left[\frac{E[X,B_i]}{P(B_i)}1_{B_i},B\right] \\
&=\sum_{i=1}^{n}\frac{E[X, B_i]}{P(B_i)}P(B_i \cap B)
\end{split}
$$

ところが、 $B \in \mathcal{G}$ だから

$$
P(B_i \cap B)=
\begin{cases}
P(B_i), & B_i \subset B のとき \\
0, & B_i \cap B=\emptyset のとき \\
\end{cases}
$$

であり、上式はさらに

$$
\begin{split}
&=\sum_{i:B_i \subset B}E[X,B_i] \\
&=E[X,B]
\end{split}
$$

と変形できる。ゆえに(2.5)(1)が成り立つことがわかった。

</proof>

#### 2.4.4 条件付き期待値の性質

<proposition>

$X,Y$ は可積分な実数値確率変数とする

$(1)\,\,$任意の$a,b\in\mathbb{R}$に対し

$$
E[aX+bY \mid \mathcal{G}]=aE[X\mid \mathcal{G}]+bE[Y\mid \mathcal{G}]\quad a.s.
$$

$(2)\,\,X\ge0\,a.s.$ならば$E[X \mid \mathcal{G}]\ge0\,\,a.s.$である

$(3)\,\,X$が$\mathcal{G}$-可測で、積$XY$が可積分ならば

$$
E[XY\mid \mathcal{G}]=XE[Y\mid \mathcal{G}]\quad a.s.
$$

$(4)\,\,\mathcal{H},\mathcal{G}$を$\mathcal{F}$の部分$\sigma$-加法族で$\mathcal{H} \subset \mathcal{G}$とすれば

$$
E[E[X|\mathcal{G}]|\mathcal{H}]=E[X|\mathcal{H}]\quad a.s.
$$

$(5)\,\,X$と$\mathcal{G}$が独立（すなわち$\sigma(X)$と$\mathcal{G}$が独立）ならば、 $E[X|\mathcal{G}]=E[X]\,\,a.s.$である。したがって、$f$を$\mathbb{R}$上のボレル可測関数として$f(X)$が可積分ならば

$$
E[f(X)|\mathcal{G}]=E[f(X)]\quad a.s.
$$

</proposition>

<proof>

$(1)\,\,Z=aE[X|\mathcal{G}]+bE[X|\mathcal{G}]$ は$\mathcal{G}$-可測であり、任意の$B\in\mathcal{G}$に対して$E[aX+bY,B]=E[Z,B]$を満たすから$E[aX+bY|\mathcal{G}]=Z\,\,a.s.$がわかる。

$(2)\,\,$ は自明なので省略。

$(3)\,\,$右辺は$\mathcal{G}$-可測だから、任意の$B\in\mathcal{G}$に対して

$$
\begin{equation}
E[XY,B]=E[XE[Y|\mathcal{G}],B]
\end{equation}
$$

を示せば十分である。まず$X=1_A,A \in \mathcal{G}$のときは

$$
E[1_AE[Y|\mathcal{G}],B]=E[E[Y|\mathcal{G}],A\cap B]=E[Y,A\cap B]=E[1_AY,B]
$$

だから(1)は成立する。したがって$X$が$\mathcal{G}$-可測な単純確率変数のときに(1)は示される。さらに極限をとることにより、$X$が一般の$\mathcal{G}$-可測な確率変数のときにも(1)が証明される。特に$Y=1$ととれば$E[1|\mathcal{G}]=1\,\,a.s.$だから$E[X|\mathcal{G}]=X\,\,a.s.$を得る。

$(4)\,\,$両辺とも$\mathcal{H}$-可測だから、任意の$B\in\mathcal{H}$に対して

$$
\begin{equation}
E[E[E[X|\mathcal{G}]|\mathcal{H}],B]=E[X,B]
\end{equation}
$$

を示せば十分である。ところが(2)の左辺は$E[E[X|\mathcal{G}],B]$に一致し、$\mathcal{H}\subset\mathcal{G}$だから、$B\in\mathcal{G}$でもあり、これは$E[X,B]$と一致することがわかる。特に$\mathcal{G}=\mathcal{T}(\equiv \{\emptyset,\Omega\})$にとって$E[E[X|\mathcal{G}]]=E[X]$を得る。

$(5)\,\,X$と$\mathcal{G}$は独立だから、任意の$B\in\mathcal{G}$に対し

$$
E[X,B]=E[X]\cdot P(B)=E[E[X],B]
$$

これは$E[X|\mathcal{G}]=E[X]\,\,a.s.$を意味する。$f(X)$と$\mathcal{G}$も独立になれるから、$X$の代わりに$f(X)$ととって$E[f(X)|\mathcal{G}]=E[f(X)]\,\,a.s.$が得られる。

</proof>

<proposition title="2.31 イェンセンの不等式">

$\psi$は$\mathbb{R}$上の実数値関数で下に凸とする。このとき、確率変数$X$が$E[|X|]\lt\infty,\,\,E[|\psi(X)|]\lt\infty$を満たせば

$$
E[\psi(X)|\mathcal{G}]\ge\psi(E[X|\mathcal{G}])\quad a.s.
$$

である。特に、$p\ge1$として、$X$が$p$乗可積分$(E[|X|^p]\lt\infty)$ならば

$$
E[|X|^p|\mathcal{G}]\ge |E[X|\mathcal{G}]|^p\quad a.s.
$$

</proposition>

<proof>

$\psi$は下に凸だから、グラフ$y=\psi(x)$はその任意の（広義の）接線より上にある。すなわち、任意の$a\in\mathbb{R}$に対し$c=c(a)\in\mathbb{R}$が存在し$\psi(x)\ge\psi(a)+c\cdot(x-a),\,\,x\in\mathbb{R}$とできる。しかも$c$は$a$のボレル可測関数に取れる。特に$x=X,\,\,a=E[X|\mathcal{G}]$ととれば、$\mathcal{G}$-可測な関数$\tilde{c}=\tilde{c}(\omega)\equiv c(E[X|\mathcal{G}](\omega))$が存在し

$$
\psi(X)\ge\psi(E[X|\mathcal{G}])+\tilde{c}\cdot(X-E[X|\mathcal{G}])\quad a.s.
$$

であることがわかる。したがって命題2.29-(2)と(1)より

$$
E[\psi(X)|\mathcal{G}]\ge E[\psi(E[X|\mathcal{G}]|\mathcal{G})]+E[\tilde{c}\cdot(X-E[X|\mathcal{G}])|\mathcal{G}]\quad a.s.
$$

ところが、$\psi(E[X|\mathcal{G}])$は$\mathcal{G}$-可測だから命題2.29-(3)により右辺の第１項は$\psi(E[X|\mathcal{G}])$と$a.s.$に一致する。第２項は$\tilde{c}$が$\mathcal{G}$-可測なので、やはり命題2.29-(3)より$\tilde{c}E[X-E[X|\mathcal{G}]|\mathcal{G}]$になり$E[E[X|\mathcal{G}]|\mathcal{G}]=E[X|\mathcal{G}]$だから、この項は$a.s.$に$0$になる。したがって、イェンセンの不等式が示された。特に$\psi(x)=|x|^p,\,\,p\ge1$が下に凸であることに注意すれば第２の不等式が得られる。

</proof>

<proposition title="2.32">

可積分な実数値確率変数列$(X_n)_{n=1,2,\cdots}$と$X$が与えられ、$X_n \to X$（一次平均収束）ならば、$E[X_n|\mathcal{G}] \to E[X|\mathcal{G}]$（一次平均収束）である。

</proposition>

<proof>

次のように評価すればよい。

$$
E[|E[X_n|\mathcal{G}]-E[X|\mathcal{G}]|]=E[|E[X_n-X|\mathcal{G}]] \\
\le E[E[|X_n-X||\mathcal{G}]]=E[|X_n-X|] \xrightarrow{n \to \infty}0
$$

ここで、第１の等号は命題2.29-(1)、次の不等号は命題2.31、最後の等号は命題2.29-(4)を用いた。

</proof>

> [!warn] 直交射影
> $L^2\equiv L^2(\Omega,\mathcal{F},P)$ は内積$(X,Y)_{L^2}=E[XY]$をもつ実ヒルベルト空間である。$L_{\mathcal{G}}^2$を$\mathcal{G}$-可測関数からなる$L^2$の部分空間として$X\in L_{\mathcal{G}}^2$とすれば、命題2.29-(3)より、$Y\in L^2$に対し
> $$E[X(Y-E[Y|\mathcal{G}])]=0$$
> が成立することがわかる。これは$E[Y|\mathcal{G}]$が$Y$の$L_{\mathcal{G}}^2$への直交射影であることを意味する。

### 2.5 コルモゴロフの0-1法則

$(\Omega, \mathcal{F},P)$を確率空間とし、$\mathcal{F}$の部分$\sigma$-加法族の列$(\mathcal{B}_k)_{k=1,2,\cdots}$が与えられ、独立であるとする

$$
\mathcal{G}_k=\sigma\left(\bigcup_{j=k}^{\infty}\mathcal{B}_j\right),\qquad \mathcal{T}=\bigcap_{k=1}^{\infty}\mathcal{G}_k
$$

とおき、$\mathcal{T}$を末尾加法族(tail σ-algebra)という。

<info title="末尾加法族の直感的意味">

末尾加法族$\mathcal{T}$は、$\mathcal{G}_k$が「$k$番目以降のすべての情報」を表すことから、「すべての$k$に対して、$k$番目以降の情報だけで完全に決定されるイベント」の集合です。つまり、最初の有限個の情報を取り除いても確定するイベント—**無限遠方の情報に依存するイベント**を捉えています。

例えば、確率変数列$(X_1, X_2, X_3, \ldots)$があるとき、「この列は収束するか」「$\limsup_n X_n$の値」といった性質は、最初の1000項を変えても変わりません。このような「漸近的性質」が末尾加法族に属します。

</info>

<theorem title="2.34 コルモゴロフの0-1法則">

任意の$A\in\mathcal{T}$は$P(A)=0$または$1$を満たす。

</theorem>

<proof>

**第１段**：$k=1,2,\cdots$に対して

$$
\mathcal{F}_k=\sigma\left(\bigcup_{j=1}^{k}\mathcal{B}_j\right),\quad \mathcal{F}_\infty=\sigma\left(\bigcup_{j=1}^{\infty}\mathcal{B}_j\right)
$$

とおく。$A\in\mathcal{T}$が与えられたとき、任意の$n=1,2,\cdots$に対して$1_A$と$\mathcal{F}_n$は独立だから、命題2.29-(5)より

$$
E[1_A|\mathcal{F}_n]=E[1_A]=P(A)\quad a.s.
$$

である。したがって、任意の$B\in\mathcal{F}_n$に対して

$$
\begin{split}
E[1_A,B]&=E[E[1_A|\mathcal{F}_n],B] \\
&=E[P(A),B] \\
&=P(A)P(B) \\
\end{split}
$$

である。$n$は任意だったから、すべての$B\in\bigcup_{n=1}^{\infty}\mathcal{F}_n$に対して

$$
\begin{equation}
E[1_A,B]=P(A)P(B)
\end{equation}
$$

が成立することがわかった。

**第２段**：任意の$B\in\mathcal{F}_{\infty}$に対して、(3)が成立することを示そう。そのために

$$
\mathcal{P}=\bigcup_{n=1}^{\infty}\mathcal{F}_n,\qquad \mathcal{L}=\{B\in\mathcal{F};(3)が成立\}
$$

とおく。このとき、$\mathcal{P}$が$\pi$-系、$\mathcal{L}$が$\lambda$-系であることは、ともに明らかである。$\mathcal{L}$については、単調収束定理を用いればよい。したがって、$\pi-\lambda$定理によれば

$$
\sigma(\mathcal{P})=\mathcal{F}_{\infty} \subset \mathcal{L}
$$

がわかり、(3)は任意の$B \in \mathcal{F}_{\infty}$に対して成立することが示された。

**第３段**：(3)において、特に$B=A$ととれば

$$
P(A)=P(A)^2
$$

がえられ、したがって$P(A)=0$または$1$であることがいえた。

</proof>

> [!warn]
> ここの証明がよくわかっていないので後でたどり直す

<info title="0-1法則の意義">

コルモゴロフの0-1法則は、独立な情報列の「無限遠方の現象」は確率的ゆれを持たないことを主張しています。末尾加法族$\mathcal{T}$に属するイベント$A$は、いかなる有限個の情報を変えても決定されるので、その確率は0か1に制限されます。

実務的には：収束しているか/発散しているか、振動しているか/収束しているか、といった漸近的性質は、最初のいくつかの項では決まらず、無限の構造に依存するが、そのような性質は本質的に「確実に起きるか起きないか」に二値化される、ということです。これは**大数の法則**の理論的根拠の一つになります。

</info>

<proposition title="2.35">

$(X_n)_{n=1,2,\cdots}$を独立な確率変数列として、その見本平均の概収束極限

$$
Y=\lim_{n \to \infty}\frac{1}{n}\sum_{k=1}^nX_k
$$

が存在すると仮定する。このとき、確率変数$Y$は$a.s.$に定数である。

</proposition>

<proof>

$\mathcal{B}_k=\sigma(X_k)$ととる。このとき、$Y$は$(\mathcal{B}_k)_{k=1,2,\cdots}$の末尾加法族$\mathcal{T}$について可測である。

**直感的に言えば**：$Y$は「全ての項の無限平均」なので、最初の有限個の項を変えても変わりません。数学的には、任意の$m=1,2,\cdots$に対して、$Y$の右辺の和を$k=m$から始めて考えても$\lim_{n \to \infty}\frac{1}{n}\sum_{k=1}^{m-1}X_k=0$だから

$$
Y=\lim_{n \to \infty}\sum_{k=m}^{\infty}X_k
$$

である。したがって、$Y$は$\mathcal{G}_m$-可測であり、しかも$m$は任意にとってよいから$Y$は$\mathcal{T}$-可測であることがわかる。特に、任意の$x\in\mathbb{R}$に対して$\{Y \le x\}\in\mathcal{T}$だから、定理2.34より

$$
P(Y \le x)=0 または1
$$

である。これはYが$a.s.$に定数であることを意味する。実際、もし「$Y$が$a.s.$に定数」でなければ、ある$x\in\mathbb{R}$が存在して

$$
P(Y\le x )\gt 0\quadかつ\quad(Y\gt x)\gt0
$$

となるからである。

</proof>

## 第３章　大数の法則

大数の弱法則 $\to$ 確率収束

大数の強法則 $\to$ 概収束

### 3.1 弱法則

確率空間$(\Omega, \mathcal{F}, P)$上に実数値確率変数列$(X_n)_{n=1,2,\cdots}$が与えられ、それぞれ$E[|X_n|]\lt\infty$を満たすとしよう。このとき、期待値$m_n=E[X_n]$は有限である。

$$
Y_n=\frac{1}{n}\sum_{k=1}^{n}X_k,\quad \bar{m}_n=\frac{1}{n}\sum_{k=1}^{n}m_k
$$

とおく。$Y_n$は$(X_k)_{k=1,2,\cdots}$の**見本平均**（あるいは**標本平均**）、$\bar{m}_n$は$Y_n$の期待値である。

<def title="3.1">

$(1)\,\,$規格化された見本平均$\tilde{Y}_n=Y_n-\bar{m}_n$が$0$に確率収束するとき、すなわち、任意の$\epsilon \gt 0$に対して

$$
\lim_{n \to \infty}P(|Y_n-\bar{m}_n|\gt\epsilon)=0
$$

が成立するとき、$(Y_n)_{n=1,2,\cdots}$は**大数の弱法則**を満たすという。

$(2)\,\,\tilde{Y}_n$が$0$に概収束するとき、$(Y_n)_{n=1,2,\cdots}$は**大数の強法則**を満たすという。

</def>

<theorem title="3.2">

$(X_n)_{n=1,2,\cdots}$が組ごとに独立、つまりどの組$i,j(i \neq j)$をとっても$X_i$と$X_j$は独立で、

$$
\sup_{n}\rm{Var}(X_n)\lt \infty
$$

ならば、$(Y_n)_{n=1,2,\cdots}$は大数の弱法則を満たす。

</theorem>

<proof>

$\epsilon\gt0$は任意として

$$
\begin{split}
P(|\tilde{Y}_n|\gt\epsilon)&\le\frac{1}{\epsilon^2}E[\tilde{Y}_m^2] \\
&=\frac{1}{\epsilon^2n^2}\sum_{j,k=1}^nE[(X_j-m_j)(X_k-m_k)] \\
&=\frac{1}{\epsilon^2n^2}\sum_{k=1}^nE[(X_k-m_k)^2] \\
&\le\frac{1}{\epsilon^2n}\sup_{n}\rm{Var}(X_n)\quad\longrightarrow\quad0\quad(n \to \infty)
\end{split}
$$

だからである。ここで、最初の不等式はチェビシェフの不等式、３行目に移る時は組ごとの独立性を用いた。

</proof>

### 3.2 強法則

大数の強法則を示すためには、ボレル-カンテリの補題とコルモゴロフの不等式を利用するため、準備として証明しておく。

#### 上極限・下極限

事象の列$A_n\in\mathcal{F},n=1,2,\cdots$に対して

$$
\limsup_{n \to \infty}A_n=\bigcap_{k=1}^{\infty}\bigcup_{n=k}^{\infty}A_n
$$

とおき、$A_n$の**上極限**という。あるいは

$$
\omega\in\limsup_{n \to \infty}A_n\quad\Longleftrightarrow\quad\omegaは無限個のA_nに属する
$$

と言い換えてもよい。このことを簡単に"$A_n\,\,i.o.$"と書くことがある。

また、

$$
\liminf_{n \to \infty}A_n=\bigcup_{k=1}^{\infty}\bigcap_{n=k}^{\infty}A_n
$$

とおき、$A_n$の下極限という。

$$
\begin{split}
\omega&\in\liminf_{n \to \infty}A_n \\
&\Longleftrightarrow \text{ある番号k=k(}\omega\text{)から先のすべてのnに対して}\omega\in A_n \\
&\Longleftrightarrow \sharp\{n \mid \omega \notin A_n\}\lt\infty
\end{split}
$$

である。次が成り立つ。

$$
\left(\limsup_{n \to \infty}A_n\right)^c=\liminf_{n \to \infty}A_n^c
$$

#### ボレル-カンテリの補題

<proposition title="3.4 ボレル-カンテリの補題">

$(1)\,\,\sum_{n=1}^\infty P(A_n)\lt\infty$ならば

$$
P\left(\limsup_{n \to \infty}A_n\right)=0
$$

すなわち、$P(A_n\,\,i.o.)=0$である。

$(2)\,\,$事象 $(A_n)_{n=1,2,\cdots}$が独立で$\sum_{n=1}^\infty P(A_n)=\infty$ならば

$$
P\left(\limsup_{n \to \infty}A_n\right)=1
$$

</proposition>

<info title="ボレル-カンテリの補題の直感的意味">

この補題は、無限列の事象 $A_1, A_2, A_3, \ldots$ が「無限個（infinitely often, i.o.）起こる確率」を、単純な確率の合計で完全に判定できることを主張しています：

- **(1) 合計が有限**：$\sum P(A_n) < \infty$ ⟹ 無限個起こる確率は 0
  - 直感：各事象の確率が減衰していくので、無限回繰り返しても総確率が有限に留まる
  - 「稀な事象を無限に試しても、結局は起こらない」

- **(2) 合計が無限 + 独立性**：$\sum P(A_n) = \infty$ ⟹ 無限個起こる確率は 1
  - 直感：確率が減衰しないので、独立試行の積み重ねで必ずいつかは起こる
  - 「十分な回数試せば、独立な事象は確実に何度も起こる」

**典型的な応用場面**：
- **大数の強法則の証明**：見本平均の収束を示すときに、「偏差が繰り返し大きくなる」という坏イベント列が確率 0 に落ちることを保証
- **ランダムウォークの再帰性**：「原点に戻る」という事象が無限回起こるかどうかの判定
- **無限列のタイトルな挙動**：確率変数列が「確率1で収束する」「確率1で発散する」などの判定

</info>

<proof>

$(1)\,\,A=\limsup_{n \to \infty}A_n$とおく。このとき、任意の$k=1,2,\cdots$について$A\subset\bigcup_{n=k}^{\infty}A_n$だから、確率測度の劣加法性により

$$
P(A)\le P\left(\bigcup_{n=k}^{\infty}A_n\right)\le\sum_{n=k}^{\infty}P(A_n)
$$

ところが、$k$は任意にとってよいから、特に$k \to \infty$とすれば、(1)の仮定から右辺$\to 0$となり、$P(A)=0$が得られる。

$(2)\,\,$まず、任意の$k=1,2,\cdots$に対して$P(\bigcup_{n=k}^{\infty}A_n)=1$を言えば十分であることを示しておこう。実際、このことが言えれば、再び$P$の劣加法性より

$$
P(A^c)=P\left(\bigcup_{k=1}^{\infty}(\bigcup_{n=k}^{\infty}A_n)^c\right)\le\sum_{k=1}^{\infty}P\left((\sum_{n=k}^{\infty}A_n)^c\right)=0
$$

となるから、$P(A)=1$がわかるのである。ところが、任意の$N=1,2,\cdots$に対して

$$
\begin{split}
1-P\left(\bigcup_{n=k}^{\infty}A_n\right)&\le1-P\left(\bigcup_{n=k}^{N}A_n\right) \\
&=P\left((\bigcup_{n=k}^{N}A_n)^c\right) \\
&=P\left(\bigcap_{n=k}^{N}A_n^c\right) \\
&=\prod_{n=k}^{N}P(A_n^c) \\
&=\prod_{n=k}^{N}(1-P(A_n)) \\
&\le\prod_{n=k}^{N}e^{-P(A_n)}
\end{split}
$$

最後の不等号では$1-x\le e^{-x},\,\,x\ge0$を用いた。したがって、任意の$N=1,2,\cdots$に対して、

$$
1-P\left(\bigcup_{n=k}^{\infty}A_n\right)\le\exp\left\{-\sum_{n=k}^{N}P(A_n) \right\}
$$

が示された。ところが、(2)の仮定から$\sum_{n=k}^{\infty}P(A_n)=\infty$だから、$N \to \infty$のとき、右辺$\to 0$となり、$P(\bigcup_{n=k}^{\infty}A_n)=1$が得られる。

</proof>

<lemma title="3.5">

$\sum_{n=k}^{\infty}P(A_n)\lt\infty$ならば

$$
P\left(\liminf_{n \to \infty}A_n^c\right)=1
$$

である。すなわち

$$
\sharp\{n \mid \omega \in A_n\}\lt \infty, \quad a.s.\,\,\omega
$$

が成立する。

</lemma>

<supplement title="ボレル-カンテリ補題のまとめと活用">

ボレル-カンテリの補題（補題3.4）と補題3.5を合わせると、次のように要約できます：

| 条件 | 結論 |
|-----|------|
| $\sum P(A_n) < \infty$ | $P(A_n \text{ i.o.}) = 0$（ほぼ確実に有限回だけ起こる） |
| $\sum P(A_n) = \infty$ + 独立 | $P(A_n \text{ i.o.}) = 1$（ほぼ確実に無限回起こる） |

**核心的な効用**：
1. **収束判定**：確率変数列 $(X_n)$ の挙動（収束 vs 発散）を、各項の「大きな偏差イベント」の確率合計で判定
2. **確率1での性質**：大数の強法則などで「ほぼ確実に収束する」という強い主張を証明可能にする

後続する大数の強法則の証明では、「見本平均が真の期待値から大きく外れる」というイベント列を作り、ボレル-カンテリの補題でその確率が0に落ちることを示すという手法が使われます。

</supplement>

#### コルモゴロフの定理

## 第４章　中心極限定理と少数の法則
### 4.1 測度の弱収束
### 4.2 特性関数
### 4.3 中心極限定理
### 4.4 ポアソンの少数の法則
### 4.5 統計力学への応用
#### 4.5.1 マクスウェル分布
#### 4.5.2 ポアソン点過程