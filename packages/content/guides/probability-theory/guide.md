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
### 2.2 独立性
#### 2.2.1 事象の独立性
#### 2.2.2 σ-加法族の独立性
#### 2.2.3 確率変数の独立性
### 2.3 確率空間の直積
#### 2.3.1 有限個の確率空間の直積
#### 2.3.2 無限個の確率空間の直積
#### 2.3.3 独立確率変数の無限列の存在
### 2.4 σ-加法族に関する条件付き確率と条件付き期待値
#### 2.4.1 素朴な定義
#### 2.4.2 一般的な定義
#### 2.4.3 条件付き期待値の性質
### 2.5 コルモゴロフの0-1法則

## 第３章　大数の法則
### 3.1 弱法則
### 3.2 強法則

## 第４章　中心極限定理と少数の法則
### 4.1 測度の弱収束
### 4.2 特性関数
### 4.3 中心極限定理
### 4.4 ポアソンの少数の法則
### 4.5 統計力学への応用
#### 4.5.1 マクスウェル分布
#### 4.5.2 ポアソン点過程