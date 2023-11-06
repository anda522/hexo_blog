---
title: ACM模板
top: false
cover: false
toc: true
mathjax: true
abbrlink: 3941430957
date: 2022-07-29 15:30:42
password:
summary:
tags:
  - 模板
categories:
  - ACM

---



# 1 杂项

## 1.1 __int128和快读

```cpp
inline __int128 read() {
	__int128 x = 0; int f = 1;
    char ch; ch = getchar();
	while(!isdigit(ch)) { if(ch=='-') f = -1; ch = getchar(); }
	while(isdigit(ch)) x = x * 10 + ch-'0',ch=getchar();
	return x*f;
}
void print(__int128 x) {
	if(x < 0) { putchar('-'); x = -x; }
	if(x > 9) print(x/10);
	putchar(x % 10 + '0');
}
std::istream& operator >>(std::istream&in, __int128 &x) {
  char c;
  while(c = in.get(), c != '-' && !isdigit(c));
  if(c == '-') {x = '0' - (c = in.get()); while(isdigit(c = getchar()))x = x * 10 + '0' - c;}
  else {x = c - '0'; while(isdigit(c = in.get()))x = x * 10 - '0' + c;};
  return in;
}
std::ostream& operator <<(std::ostream&out, __int128 x) {
  if(x < 0) {out << "-"; out << -x; return out;}
  if(x == 0) {out << "0"; return out;}
  if(x > 10) out << x / 10;
  out << "0123456789"[x % 10];
  return out;
}
int read() {
	int x = 0; char c = getchar();
	for(; c < '0' || c > '9'; c = getchar()) ;
	for(; c >= '0' && c <= '9'; c = getchar())
		x = x * 10 + (c & 15);
	return x;
}
void out(int x) {
	if(x > 9) out(x / 10);
	putchar(x % 10 + '0');
}
```

## 1.2 STL

### bitset

```cpp
// 动态长度bitset实现
const int N = 1e6 + 5;
template <int len = 1>
void bitset_(int sz) {
	if (len < sz) {
		bitset_<min(len * 2, N)>(sz);
		return;
	}
	bitset<len + 1> dp;
	// 具体实现
}
bitset<5>b;//坐标从后往前计数，高位在前
bitset<5>b(13);
bitset<5>b("1101");
b.count();//count函数用来求bitset中1的位数，一共3
b.size();//size函数用来求bitset的大小，一共5
b.any();//any函数检查bitset中是否有１
b.none();//none函数检查bitset中是否没有１
b.all();//all函数检查bitset中是全部为１
foo.flip();//flip函数不指定参数时，将bitset每一位全部取反
foo.set();//set函数不指定参数时，将bitset的每一位全部置为１
foo.reset();//reset函数不传参数时将bitset的每一位全部置为０
string s = foo.to_string();//将bitset转换成string类型
unsigned long a = foo.to_ulong();//将bitset转换成unsigned long类型
unsigned long long b = foo.to_ullong();//将bitset转换成unsigned long long类型 
```

## 1.3 取模

```cpp
// assume -P <= x < 2P
int norm(int x) {
    if (x < 0) {
        x += mod;
    }
    if (x >= mod) {
        x -= mod;
    }
    return x;
}
template<class T>
T power(T a, ll b) {
    T res = 1;
    for (; b; b /= 2, a *= a) {
        if (b % 2) {
            res *= a;
        }
    }
    return res;
}
struct Z {
    int x;
    Z(int x = 0) : x(norm(x)) {}
    Z(ll x) : x(norm(x % mod)) {}
    int val() const {
        return x;
    }
    Z operator-() const {
        return Z(norm(mod - x));
    }
    Z inv() const {
        assert(x != 0);
        return power(*this, mod - 2);
    }
    Z &operator*=(const Z &rhs) {
        x = ll(x) * rhs.x % mod;
        return *this;
    }
    Z &operator+=(const Z &rhs) {
        x = norm(x + rhs.x);
        return *this;
    }
    Z &operator-=(const Z &rhs) {
        x = norm(x - rhs.x);
        return *this;
    }
    Z &operator/=(const Z &rhs) {
        return *this *= rhs.inv();
    }
    friend Z operator*(const Z &lhs, const Z &rhs) {
        Z res = lhs;
        res *= rhs;
        return res;
    }
    friend Z operator+(const Z &lhs, const Z &rhs) {
        Z res = lhs;
        res += rhs;
        return res;
    }
    friend Z operator-(const Z &lhs, const Z &rhs) {
        Z res = lhs;
        res -= rhs;
        return res;
    }
    friend Z operator/(const Z &lhs, const Z &rhs) {
        Z res = lhs;
        res /= rhs;
        return res;
    }
    friend std::istream &operator>>(std::istream &is, Z &a) {
        ll v;
        is >> v;
        a = Z(v);
        return is;
    }
    friend std::ostream &operator<<(std::ostream &os, const Z &a) {
        return os << a.val();
    }
};
```

## 1.4 随机数

```cpp
mt19937 rng(chrono::steady_clock::now().time_since_epoch().count());
ll rnd(ll l, ll r) { return uniform_int_distribution<ll>(l, r)(rng); }
// rnd(1, n) 生成[1, n]之间的随机数
```

## 1.5 Hash

```cpp
struct hash_map {
	struct data {
		long long u;
		int v, nxt;
	};
	data e[SZ << 1];
	int cnt, h[SZ]; // SZ 为const int的大小
	hash_map() {
		cnt = 0;
		memset(h, -1, sizeof(h));
	}
	int hash (long long u) {
		return (u % SZ + SZ) % SZ;
	}
	int& operator[] (long long u) {
		int a = hash(u);
		for (int i = h[a]; ~i; i = e[i].nxt) {
			if (e[i].u == u) return e[i].v;
		}
		e[cnt] = (data){u, 0, h[a]};
		h[a] = cnt++;
		return e[cnt - 1].v;
	}
};
```

# 2 数据结构

## 2.1 线段树

```cpp
struct SegmentTree {
	ll sum, add;
} tr[N * 4];

void pushdown(int u, int l, int r) {
	int mid = (l + r) >> 1;
	tr[u << 1].add += tr[u].add;
	tr[u << 1 | 1].add += tr[u].add;
	tr[u << 1].sum += 1ll * (mid - l + 1) * tr[u].add;
	tr[u << 1 | 1].sum += 1ll * (r - mid) * tr[u].add;
	tr[u].add = 0;
}
void pushup(int u) {
	tr[u].sum = tr[u << 1].sum + tr[u << 1 | 1].sum;
}
void build(int u, int l, int r) {
	if(l == r) {
		tr[u].sum = b[l];
		return ;
	}
	int mid = (l + r) >> 1;
	build(u << 1, l, mid);
	build(u << 1 | 1, mid + 1, r);
	pushup(u);
}

void modify(int u, int l, int r, int x, int y, int d) {
	// if(l > y || r < x) return;
	if(l >= x and r <= y) {
		tr[u].sum += 1ll * (r - l + 1) * d;
		tr[u].add += d;
		return;
	}
	pushdown(u, l, r);
	int mid = (l + r) >> 1;
	if(x <= mid) modify(u << 1, l, mid, x, y, d);
	if(y > mid) modify(u << 1 | 1, mid + 1, r, x, y, d);
	pushup(u);
}

ll query(int u, int l, int r, int x, int y) {
    // if(l > y || r < x) return 0;
	if(l >= x and r <= y)
		return tr[u].sum;
	pushdown(u, l, r);
	int mid = (l + r) >> 1;
	ll res = 0;
	if(x <= mid) res += query(u << 1, l, mid, x, y);
	if(y > mid) res += query(u << 1 | 1, mid + 1 , r, x, y);
	return res;
}
```

## 2.2 RMQ/ST表

```cpp
int f[N][30], lg[N];
int a[N];
void init(int n) {
	lg[0] = -1;
	for(int i = 1; i <= n; i++) {
		lg[i] = lg[i - 1] + (i & (i - 1) ? 0 : 1);
		f[i][0] = a[i];
	}
	for(int j = 1; j <= lg[n]; j++)
		for(int i = 1; i + (1 << j) - 1 <= n; i++)
			f[i][j] = max(f[i][j - 1], f[i + (1 << (j - 1))][j - 1]);
}
int query(int l, int r) {
	int k = lg[r - l + 1];
	return max(f[l][k], f[r - (1 << k) + 1][k]);
}
```

## 2.3 并查集

```cpp
struct DSU {
	vector<int> f, sz;
	DSU(int n): f(n), sz(n, 1) { iota(f.begin(), f.end(), 0); }
	int find(int x) {
		if(x == f[x]) return x;
		return f[x] = find(f[x]);
	}
    bool same(int x, int y) { return find(x) == find(y); }
	void merge(int x, int y) {
		x = find(x);
		y = find(y);
		if(x == y) return;
		if(sz[x] < sz[y]) swap(x, y);
		f[y] = x;
		sz[x] += sz[y];
		sz[y] = 0;
	}
};
```

## 2.4 树状数组

```cpp
template <typename T>
struct Fenwick {
	vector<T> tr;
	const int n;
	Fenwick(int n): n(n), tr(n) {}
	void insert(int x, T d) {
		for(; x < n; x += x & (-x))
			tr[x] += d;
	}
	T sum(int x) {
		T res = 0;
		for(; x; x -= x & (-x))
			res += tr[x];
		return res;
	}
	T RangeSum(int l, int r) {
		return sum(r) - sum(l - 1);
	}
};
```

## 2.5 分块

```cpp
struct Part
{
    vector<ll> a, s, add;
    vector<int> L, R, id;
    int n, t;
    Part(int n):n(n)
    {
        L.resize(n);
        R.resize(n);
        id.resize(n);
        a.resize(n);
        s.resize(n);
        add.resize(n);
        init();
    }
    void init()
    {
        t = sqrt(n);
        for(int i = 1; i <= t; i++)
        {
            L[i] = (i - 1) * t + 1;
            R[i] = i * t;
        }
        if(R[t] < n) t++, L[t] = R[t - 1] + 1, R[t] = n;
        for(int i = 1; i <= t; i++)
            for(int j = L[i]; j <= R[i]; j++)
                id[j] = i, s[i] += a[j];    
    }
    void modify(int l, int r, ll d)
    {
        int p = id[l], q = id[r];
        if(p == q)
        {
            for(int i = l; i <= r; i ++)
                a[i] += d;
            s[p] += d * (r - l + 1);
        }
        else
        {
            for(int i = p + 1; i <= q - 1; i++)
                add[i] += d;

            for(int i = l; i <= R[p]; i++)
                a[i] += d;
            s[p] += d * (R[p] - l + 1);

            for(int i = L[q]; i <= r; i++)
                a[i] += d;
            s[q] += d * (r - L[q] + 1);
        }
    }

    ll query(int l, int r)
    {
        int p = id[l], q = id[r];
        ll ans = 0;
        if(q == p)
        {
            for(int i = l; i <= r; i++)
                ans += a[i];
            ans += add[p] * (r - l + 1);
        }
        else
        {
            for(int i = p + 1; i <= q - 1; i++)
                ans += s[i] + add[i] * (R[i] - L[i] + 1);
            for(int i = l; i <= R[p]; i++)
                ans += a[i];
            ans += add[p] * (R[p] - l + 1);
            for(int i = L[q]; i <= r; i++)
                ans += a[i];
            ans += add[q] * (r - L[q] + 1);
        }
        return ans;
    }
};
```

## 2.6 主席树

求第k小数

```cpp
int lc[N << 5], rc[N << 5], rt[N], tot;
ll sum[N << 5];
int build(int l, int r)
{
	int root = ++tot;
	if(l < r)
	{
		int mid = (l + r) >> 1;
		lc[root] = build(l, mid);
		rc[root] = build(mid + 1, r);
	}
	return root;
}

int modify(int last, int l, int r, int x)
{
	int root = ++tot;
	lc[root] = lc[last], rc[root] = rc[last], sum[root] = sum[last] + 1;
	if(l < r)
	{
		int mid = (l + r) >> 1;
		if(x <= mid) lc[root] = modify(lc[root], l, mid, x);
		else rc[root] = modify(rc[root], mid + 1, r, x);
	}
	return root;
}
// 返回的是第k小数的对应的数的等级（在所有数中的等级）
int query(int u, int v, int l, int r, int k)
{
	if(l >= r) return l;
	int mid = (l + r) >> 1;
	int x = sum[lc[v]] - sum[lc[u]];

	if(k <= x) return query(lc[u], lc[v], l, mid, k);
	else return query(rc[u], rc[v], mid + 1, r, k - x);
}

int a[N], b[N];

void solve()
{
	int n, m;
	cin >> n >> m;
	for(int i = 1; i <= n; i++)
	{
		cin >> a[i];
		b[i] = a[i];
	}
	sort(b + 1, b + 1 + n);
	int len = unique(b + 1, b + 1 + n) - b - 1;
	rt[0] = build(1, len);
	for(int i = 1; i <= n; i++)
	{
		int p = lower_bound(b + 1, b + 1 + len, a[i]) - b;
		rt[i] = modify(rt[i - 1], 1, len, p);
	}
	while(m--)
	{
		int l, r, k;
		cin >> l >> r >> k;
		cout << b[query(rt[l - 1], rt[r], 1, len, k)] << "\n";
	}
}
```

# 3 数学

## 3.1 高精度

数组存储均为倒序存储

```cpp
// 高精度加法
// C = A + B, A >= 0, B >= 0
vector<int> add(vector<int> &A, vector<int> &B) {
    if (A.size() < B.size()) return add(B, A);
    vector<int> C;
    int t = 0;
    for (int i = 0; i < A.size(); i ++ ) {
        t += A[i];
        if (i < B.size()) t += B[i];
        C.push_back(t % 10);
        t /= 10;
    }
    if (t) C.push_back(t);
    return C;
}
// 高精度减法
// C = A - B, 满足A >= B, A >= 0, B >= 0
vector<int> sub(vector<int> &A, vector<int> &B) {
    vector<int> C;
    for (int i = 0, t = 0; i < A.size(); i++) {
        t = A[i] - t;
        if (i < B.size()) t -= B[i];
        C.push_back((t + 10) % 10);
        if (t < 0) t = 1;
        else t = 0;
    }
    while (C.size() > 1 && C.back() == 0) C.pop_back();
    return C;
}
// 高精乘低精
// C = A * b, A >= 0, b >= 0
vector<int> mul(vector<int> &A, int b) {
    vector<int> C;
    int t = 0;
    for (int i = 0; i < A.size() || t; i ++) {
        if (i < A.size()) t += A[i] * b;
        C.push_back(t % 10);
        t /= 10;
    }
    //去除前导零
    while (C.size() > 1 && C.back() == 0) C.pop_back();
    return C;
}
// 高精度乘高精度
vector<int> mul(vector<int> a, vector<int> b) {
	int t = 0 ;
	int na = a.size(), nb = b.size();
	vector<int> c(na + nb);
	for(int i = 0; i < na; i++)
		for(int j = 0; j < nb; j++) {
			c[i + j] += a[i] * b[j];
			c[i + j + 1] += c[i + j] / 10;
			c[i + j] %= 10; 
		}
	while(c.size() > 1 and c.back() == 0) c.pop_back();
	return c;
}
```

## 3.2 质数

约数个数估计：
$$
r(n) = n ^ {\Large \frac{1.066}{\Large\ln \Large \ln n}}
$$


### 3.2.1 质因数分解

试除法 $O(\sqrt N)$

```cpp
// p[] : 存储质因子 c[] : 存储质因子对应的次数
void divide(int n) {
    m = 0;
    for(int i = 2; i * i <= n; i++) {
        if(n % i == 0) {
            p[++m] = 0, c[m] = 0;
            while(n % i == 0) n /= i, c[m]++;
		}
	}
    if(n > 1) p[++m] = n, c[m] = 1; // n是质数
}
```

### 3.2.2 欧拉筛

```cpp
int primes[N], cnt;
bool st[N]; // true：筛掉的合数 false ：为质数
void init(int n) {
    for(int i = 2; i <= n; i++) {
        if(!st[i]) primes[cnt++] = i;
        for(int j = 0; primes[j] * i <= n; j++) {
            st[primes[j] * i] = true;
            if(i % primes[j] == 0) break;
        }
    }
}
```

## 3.3  扩展欧几里得

费马小定理 ： $gcd(a,p) \equiv 1$，则 $a^{p-1} \equiv 1(mod \ p), a ^ p \equiv a(mod \ p)$

$ax+by=c$  有解条件：$d|c$

$ax+by=d$ 求出特解$x_0,y_0$ 后，两边同时乘 $\frac{c}{d}$ 即可推出 $ax+by = c$ 的特解

特解：$\frac{c}{d}x_0, \frac{c}{d}y_0$ ， （$x_0, y_0$ 为 $ax + by = d$ 的特解）

通解：$\begin{cases} x = \frac{c}{d}x_0 + k \frac{b}{d} \\ y =\frac{c}{d} y_0 - k\frac{a}{d} \end{cases}$（周期还是为$\frac{b}{d},\frac{a}{d}$）

通解是所有模$b/gcd(a,b)$与x同余的值

```cpp
//返回的是gcd(a,b) 求出一组特解(x0, y0)
ll exgcd(ll a,ll b,ll &x,ll &y) {
	if(b==0) {x = 1, y = 0; return a;}
	ll g = exgcd(b, a % b, x, y);
	ll temp = x;
	x = y;
	y = temp - (a / b) * y;
	return g;
}
```

逆元

```cpp
int inv[N]; // 逆元数组
// 线性求逆元
inv[0] = inv[1] = 1;
for(int i = 2; i < N; i++)
	inv[i] = inv[mod % i] * (mod - mod / i) % mod;
// 阶乘逆元
for(int i = 2; i < N; i++)
	inv[i] = inv[i - 1] * inv[i] % mod;
```

同余相关性质：
$$
除法性质：ac \equiv bc \pmod d \Leftrightarrow a \equiv b \pmod {\frac{d}{gcd(c, d)}} \\
同余相加(乘)： a \equiv b \pmod m, c \equiv d \pmod m \Rightarrow a \pm(\times) c \equiv b \pm(\times) d \pmod m \\
ac \equiv bc \pmod m, gcd(c, m)=1 \Rightarrow a \equiv b \pmod m
$$
完全剩余系：给定一个正整数 $n$ ，有 $n$ 个不同的模 $n$ 的剩余类，从这 $n$ 个不同的剩余类中各取出一个元素，总共 $n$ 个数，将这些数构成一个新的集合，则称这个集合为模 $n$ 的完全剩余系。

定理：对于一个模 $n$ 的完全剩余系 $r$ ，若有 $a\in Z,\ b\in Z$ ，且 $gcd(n, a) = 1$ ，则 $a \times r_i + b, i \in [0, n -1]$ 也构成一个模 $n$ 的完全剩余系。

或者 若 $gcd(a, n) = 1$ ， 那么在 $x$ 在模 $n$ 的完全剩余系 $[0, n - 1]$ 内 $ax \equiv b \pmod n$ 有唯一解 $x$ ，或者说恰好有 $d = gcd(a, n)$ 个解。例若 $d=1,x 在 [0, n -1]$ 中有唯一解。

## 3.4 欧拉函数

欧拉定理： $gcd(a, n) =1, 则 a^{\varphi (n)} \equiv 1(mod \ n)$

扩展欧拉定理：

$ a^b \equiv \begin{cases} a^{b \ \bmod\  \varphi(m)}, &\gcd(a,m) = 1, \\ a^b, &\gcd(a,m)\ne 1, b < \varphi(m), \\ a^{(b \  \bmod \  \varphi(m)) + \varphi(m)}, &\gcd(a,m)\ne 1, b \ge \varphi(m). \end{cases} \pmod m $

单个欧拉函数的值 $O(\sqrt N)$

```cpp
int euler_phi(int n) {
  int ans = n;
  for (int i = 2; i * i <= n; i++)
    if (n % i == 0)
    {
       ans = ans / i * (i - 1);
       while (n % i == 0) n /= i;
    }
  if (n > 1) ans = ans / n * (n - 1);
  return ans;
}
```

多个欧拉函数的值 $O(N)$

```cpp
int primes[N], phi[N], cnt;
bool st[N];
void init(int n) {
    phi[1] = 1;
    for (int i = 2; i <= n; i ++ ) {
        if (!st[i]) {
            primes[cnt ++ ] = i;
            phi[i] = i - 1;
        }
        for (int j = 0; primes[j] * i <= n; j ++ ) {
            st[i * primes[j]] = true;
            if (i % primes[j] == 0) {
                phi[i * primes[j]] = phi[i] * primes[j];
                break;
            }
            phi[i * primes[j]] = phi[i] * (primes[j] - 1);
        }
    }
}
```

## 3.5 矩阵乘法

```cpp
//a是第一个乘数，b是第二个乘数，t是结果最后存储的数组
void mul(int a[][N],int b[][N],int t[][N]) {
	static int c[N][N];
	memset(c,0,sizeof c);
	for(int i=0;i<N;i++)
		for(int j=0;j<N;j++)
			for(int k=0;k<N;k++)
				c[i][j]=(c[i][j] + 1ll * a[i][k]*b[k][j]+m)%m;
	memcpy(t,c,sizeof c);//复制数组
}
```

## 3.6 组合数

含重复元素排列方案数：共有 $n$ 个元素， $c_1$ 个 $a_1$ ，$c_2$ 个 $a_2$ ，...，$c_k$ 个 $a_k$ ，这 $n$ 个元素的排列数为 $\frac{n!}{c_1! c_2! \cdots c_k!}$

## 3.7 高斯消元

```cpp
double b[N][N];
void gauss()
{
	//化为上三角矩阵
	for(int r=1,c=1;c<=n;r++,c++)//主循环每次查一个对角元素。按列查，主要要看对角元素，r=c
	{
		//找主元，找该列绝对值最大的一个数，将那行和本行交换
		int t = r;
		for(int i=r+1;i<=n;i++)
			if(fabs(b[i][c]) > fabs(b[t][c]))
				t = i;
		//交换，行的交换
		for(int i=c;i<=n+1;i++)	swap(b[r][i],b[t][i]);
		//主元归一，将对角元素化为1，即该行所有值除以该行对应的对角元素
		for(int i=n+1;i>=c;--i)	b[r][i] /= b[r][c];
		//消元，即对角元素下面的值都要变为0，那么需要下面的每一行的所有值减去对角元素那一行元素的一个倍数（b[i][c]）
		for(int i=r+1;i<=n;i++)
			for(int j=n+1;j>=c;j--)
				b[i][j] -= b[r][j] * b[i][c];
	}
	//化为对角阵（只有对角线有元素且为1）
	for(int i=n;i>=1;i--)//按列消，对角元素行=列
		for(int j=i-1;j>=1;j--)//消去第i行上面所有的元素
		{
			b[j][n+1] -= b[i][n+1]*b[j][i];//只对右边的值做变化
			b[j][i] = 0;//最后一定消完为0
		} 
}
```

卡特兰数列 $Cat_n = \frac{C_{2n}^{n}}{n + 1}$ $,\hspace{2em} $ 错排数$d[i] = (i - 1)*(d[i - 1] + d[i - 2])$

## 3.8 中国剩余定理

```cpp
// x = a[i] (mod mi[i])
// Mi[i] = mu / mi[i]
ll Mi[N], mi[N], mu = 1, a[N];
ll crt() {
	ll ans = 0;
	for(int i = 1; i <= n; i++)
		mu *= mi[i];
	for(int i = 1; i <= n; i++) {
		Mi[i] = mu / mi[i];
		ll x = 0, y = 0;
		exgcd(Mi[i], mi[i], x, y);
		ans += a[i] * Mi[i] * (x < 0 ? x + mi[i] : x);
	}
	return ans % mu;
}
```

**扩展CRT**

$x\equiv c_{1}\left( mod\ m_{1}\right) \\ x\equiv c_{2}\left( mod\ m_{2}\right)$

得到

$c=(inv(\frac{m_1}{(m_1,m_2)},\frac{m_2}{(m_1,m_2)}) \mathop{\times} \frac{(c_2-c_1)}{(m_1,m_2)})\mathop{\%}\frac{m_2}{(m_1,m_2)}*m_1+c_1$

$m={m_1m_2\over (m_1,m_2)}$

```cpp
ll mul(ll a,ll b,ll mod) {
    ll res=0;
    while(b>0) {
        if(b&1) res=(res+a)%mod;
        a=(a+a)%mod;
        b>>=1;
    }
    return res;
}
ll exgcd(ll a, ll b, ll &x, ll &y) {
    if (b == 0) {x = 1, y = 0; return a;}
    ll r = exgcd(b, a % b, x, y), tmp;
    tmp = x; x = y; y = tmp - (a / b) * y;
    return r;
}
// x = bi[i](mod ai[i])
ll excrt() {
    ll x, y, k;
    ll M = bi[1],ans = ai[1];//第一个方程的解特判
    for(int i=2;i<=n;i++) {
        ll a = M,b = bi[i], c = (ai[i] - ans % b + b) % b;//ax≡c(mod b)
        ll gcd=exgcd(a,b,x,y),bg=b/gcd;
        if(c%gcd!=0) return -1; //判断是否无解
   
        x=mul(x,c/gcd,bg);
        ans+=x*M;//更新前k个方程组的答案
        M*=bg;//M为前k个m的lcm
        ans=(ans%M+M)%M;
    }
    return (ans%M+M)%M;
}
```

## 3.9 多项式

```cpp
const int N = (1 << 21) + 10;
const double PI = acos(-1);
struct comp {
	double x, y;
	comp(double xx = 0, double yy = 0) { x = xx, y = yy; }
	comp operator +(const comp& b) { return comp(x + b.x , y + b.y);}
	comp operator -(const comp& b) { return comp(x - b.x , y - b.y);}
	comp operator *(const comp& b) { return comp(x * b.x - y * b.y , x * b.y + y * b.x);}
	comp& operator *=(const comp& b) { *this = *this * b; return *this; }
	comp& operator +=(const comp& b) { *this = *this + b; return *this; }
} a[N], b[N];
int n, m, lim, r[N]; //F(x)的系数个数n+1,G(x)的系数m+1,从低位到高位
void fft(comp *a, int type) {
	for(int i = 0; i < lim; i ++)
		if(i < r[i]) swap(a[i], a[r[i]]);
	for(int i = 1; i < lim; i <<= 1) {
		comp x(cos(PI / i), type * sin(PI / i));
		for(int j = 0; j < lim; j += (i << 1)) {
			comp y(1, 0);
			for(int k = 0; k < i; k ++, y *= x) {
				comp p = a[j + k], q = y * a[j + k + i];
				a[j + k] = p + q; a[j + k + i] = p - q;
			}
		}
	}
}
int main() {
	n = read(), m = read();
	for(int i = 0; i <= n; i ++) a[i].x = read();
	for(int i = 0; i <= m; i ++) b[i].x = read();
	int l = 0;
	for(lim = 1; lim <= n + m; lim <<= 1) ++ l;
	for(int i = 0; i < lim; i ++)
		r[i] = (r[i >> 1] >> 1) | ((i & 1) << (l - 1));
	fft(a, 1), fft(b, 1);
	for(int i = 0; i <= lim; i ++) a[i] *= b[i];
	fft(a, -1);
	for(int i = 0; i <= n + m; i ++)
		printf("%d ", (int)(0.5 + a[i].x / lim));
}

const int N = 3 * 1e6 + 10, P = 998244353, G = 3, Gi = 332748118; 
int n, m, limit = 1, L, r[N];
LL a[N], b[N];
LL fastpow(LL a, LL k) {
	LL base = 1;
	while(k) {
		if(k & 1) base = (base * a ) % P;
		a = (a * a) % P;
		k >>= 1;
	}
	return base % P;
}
void ntt(LL *A, int type) {
	for(int i = 0; i < limit; i++) 
		if(i < r[i]) swap(A[i], A[r[i]]);
	for(int mid = 1; mid < limit; mid <<= 1) {	
		LL Wn = fastpow( type == 1 ? G : Gi , (P - 1) / (mid << 1));
		for(int j = 0; j < limit; j += (mid << 1)) {
			LL w = 1;
			for(int k = 0; k < mid; k++, w = (w * Wn) % P) {
				 int x = A[j + k], y = w * A[j + k + mid] % P;
				 A[j + k] = (x + y) % P,
				 A[j + k + mid] = (x - y + P) % P;
			}
		}
	}
}
int main() {
	n = read(); m = read();
	for(int i = 0; i <= n; i++) a[i] = (read() + P) % P;
	for(int i = 0; i <= m; i++) b[i] = (read() + P) % P;
	while(limit <= n + m) limit <<= 1, L++;
	for(int i = 0; i < limit; i++) r[i] = (r[i >> 1] >> 1) | ((i & 1) << (L - 1));	
	ntt(a, 1); ntt(b, 1);	
	for(int i = 0; i < limit; i++) a[i] = (a[i] * b[i]) % P;
	ntt(a, -1);	
	LL inv = fastpow(limit, P - 2);
	for(int i = 0; i <= n + m; i++)
		printf("%lld ", (a[i] * inv) % P);
}
```



# 4.图论

链式前向星：

```cpp
int h[N], ne[N], e[N], idx;
void add(int a, int b) {
	e[++idx] = b, ne[idx] = h[a], h[a] = idx;
}
```

## 4.1 最短路

### floyd

```cpp
int d[105][105];
memset(d, 0x3f, sizeof d);
for(int k = 1; k <= n; k++)//k在最外层，
    for(int i = 1; i <= n; i++)
        if(d[i][k] != 0x3f3f3f3f)
            for(int j = 1; j <= n; j++) {
                if(d[i][j] > d[i][k] + d[k][j])
                    d[i][j] = d[i][k] + d[k][j];
            }
```

### dijkstra

```cpp
int dijkstra(int s, int t) {
    priority_queue<pair<int, int>> q;
    dis[s] = 0;
    q.push({-dis[s], s});
    while(!q.empty()) {
        auto t = q.top(); q.pop();
 		int u = t.second;
        if(vis[u]) continue;
        vis[u] = 1;
        for(auto [v, w]: g[u]) {
            if(dis[v] > dis[u] + w) {
                dis[v] = dis[u] + w;
                q.push({-dis[v], v});
            }
        }
    }
    return dis[t];
}
```

### spfa

对边不断松弛优化，如果该点被松弛就加入队列，同时标记数组记为true，标记数组代表该点是否在队列中。

```cpp
bool spfa() {
	queue<int> q;
	memset(dis, 0x3f, sizeof dis);
	q.push(s);
	inq[s] = true, dis[s] = 0;
	while(!q.empty()) {
		int u = q.front(); q.pop();
		inq[u] = false;		
		for(auto [v, w]: g[u]) {
			if(dis[v] > dis[u] + w) {
				dis[v] = dis[u] + w;
                cnt[v] = cnt[u] + 1;// 判负环
                if(cnt[v] >= n) return true;//大于等于节点个数
				if(!inq[v]) {
					inq[v] = true;
					q.push(v);
				}
			}
		}
	}
    return false;
}
```

## 4.2 树上问题

### 树上启发式合并

```cpp
// 颜色平衡树：一个树中的每种颜色的结点个数相等，求多少个子树是颜色平衡树
using pii = pair<int, int>;
const int N = 2e5;
int main() {
	ios::sync_with_stdio(false);
	cin.tie(0);
	int n; cin >> n;
	vector<int> color(n + 1);
	vector<vector<int>> g(n + 1);
	for(int i = 1; i <= n; i++) {
		int fa;
		cin >> color[i] >> fa;
		if (fa != 0) {
			g[fa].push_back(i);
			g[i].push_back(fa);
		}
	}
    // sum[i]:颜色出现次数为i的个数, cnt[i]:颜色i对应的个数
	vector<int> cnt(N + 1), L(n + 1), R(n + 1), big(n + 1), sz(n + 1), node(n + 1), sum(n + 1); 
	int dfn = 0;
	int ans = 0, mx = 0, mn = 1e9; // 颜色出现次数的最大值和最小值
	function<void(int, int)> dfs1 = [&](int u, int fa) {
		sz[u] = 1;
		L[u] = ++dfn;
		node[dfn] = u;
		for (auto v : g[u]) {
			if (v != fa) {
				dfs1(v, u);
				sz[u] += sz[v];
				if (!big[u] || sz[big[u]] < sz[v]) {
					big[u] = v;
				}
			}
		}
		R[u] = dfn;
	};
	auto add = [&](int u) {
		sum[cnt[color[u]]]--;
		if(sum[cnt[color[u]]] == 0 && mn == cnt[color[u]]) {
			mn = cnt[color[u]] + 1;
		} else {
			mn = min(mn, cnt[color[u]] + 1);
		}
		cnt[color[u]]++;
		sum[cnt[color[u]]]++;
		mx = max(mx, cnt[color[u]]);
	};
	auto del = [&](int u) {
		mx = 0, mn = 1e9;
		sum[cnt[color[u]]] = 0;
		cnt[color[u]] = 0;
	};
	function<void(int, int, bool)> dfs2 = [&](int u, int fa, bool keep) {
		for(auto v : g[u]) {
			if (v != fa && v != big[u]) {
				dfs2(v, u, false);
			}
		}
		if (big[u]) {
			dfs2(big[u], u, true);
		}
		for (auto v : g[u]) {
			if (v != fa && v != big[u]) {
				for (int i = L[v]; i <= R[v]; i++) {
					add(node[i]);
				}
			}
		}
		add(u);
		if (mx == mn) ans++;
		if (keep == false) {
			for (int i = L[u]; i <= R[u]; i++) {
				del(node[i]);
			}
		}
	};
	dfs1(1, -1);
	dfs2(1, -1, false);
	cout << ans << "\n";
	return 0;
}
```

### 树链剖分

```cpp
using ll = long long;
const int N = 1e5 + 5, M = 2 * N;

int n, m, r, p;

int w[N];

struct Segment {
	ll add, sum;
}tr[N * 4];

int dep[N], fa[N], son[N], sz[N];
int cnt, nw[N], top[N], id[N];

int e[M], h[N], ne[M], idx;
void add(int a, int b) {
	e[idx] = b, ne[idx] = h[a], h[a] = idx++;
}

void pushup(int u) {
	tr[u].sum = (tr[u << 1].sum + tr[u << 1 | 1].sum) % p;
}
void pushdown(int u, int l, int r) {
	int mid = (l + r) >> 1;
	if(tr[u].add) {
		tr[u << 1].add += tr[u].add;
		tr[u << 1].sum += 1ll * (mid - l + 1) * tr[u].add;
		tr[u << 1].sum %= p;
		tr[u << 1 | 1].add += tr[u].add;
		tr[u << 1 | 1].sum += 1ll * (r - mid) * tr[u].add;
		tr[u << 1 | 1].sum %= p;
		tr[u].add = 0;
	}
}

void build(int u, int l, int r) {
	if(l == r) {
		tr[u].sum = nw[l];
		if(tr[u].sum > p) tr[u].sum %= p;
		return;
	}
	int mid = (l + r) >> 1;
	build(u << 1, l, mid);
	build(u << 1 | 1, mid + 1, r);
	pushup(u);
}

void modify(int u, int l, int r, int x, int y, int d) {
	if(l >= x && r <= y) {
		tr[u].sum += 1ll * (r - l + 1) * d;
		tr[u].sum %= p;
		tr[u].add += d;
		return;
	}
	pushdown(u, l, r);
	int mid = (l + r) >> 1;
	if(x <= mid) modify(u << 1, l, mid, x, y, d);
	if(y > mid) modify(u << 1 | 1, mid + 1, r, x, y, d);
	pushup(u);
}

ll query(int u, int l, int r, int x, int y) {
	if(l >= x && r <= y)
		return tr[u].sum % p;
	pushdown(u, l, r);
	int mid = (l + r) >> 1;
	ll ans = 0;
	if(x <= mid) ans = query(u << 1, l, mid, x, y) % p;
	if(y > mid) ans = (ans + query(u << 1 | 1, mid + 1, r, x, y)) % p;
	return ans;
}

//预处理dep[],fa[],sz[],son[](重儿子节点)
void dfs1(int x, int f, int depth) { //x : 当前节点, f：父亲, depth：深度 
	dep[x] = depth;
	fa[x] = f;
	sz[x] = 1;
	int mxson = -1;
	for(int i = h[x]; ~i; i = ne[i]) {
		int y = e[i];
		if(y == f) continue;
		dfs1(y, x, depth + 1);
		sz[x] += sz[y];
		if(sz[y] > mxson) { // 记录重儿子编号
			son[x] = y;
			mxson = sz[y];
		}
	}
}

// 标新序号 求id[], nw[], top[] 新id-新节点权重-链顶端
void dfs2(int x, int topf) {
	id[x] = ++cnt;
	nw[cnt] = w[x];
	top[x] = topf;
	if(!son[x]) return;//无儿子返回
	dfs2(son[x], topf);
	for(int i = h[x]; ~i; i = ne[i]) {
		int y = e[i];
		if(y == fa[x] || y == son[x])
			continue;
		dfs2(y, y);
	}
}

ll queryRange(int x, int y) {
	ll ans = 0;
	while(top[x] != top[y]) { //不在同一条链上
		if(dep[top[x]] < dep[top[y]])
			swap(x, y);
		ans += query(1, 1, n, id[top[x]], id[x]);
		ans %= p;
		x = fa[top[x]];
	}
	if(dep[x] > dep[y])
		swap(x, y);
	ans = (ans + query(1, 1, n, id[x], id[y])) % p;
	return ans;
}

void modifyRange(int x, int y, int d) {
	d %= p;
	while(top[x] != top[y]) {
		if(dep[top[x]] < dep[top[y]])
			swap(x, y);
		modify(1, 1, n, id[top[x]], id[x], d);
		x = fa[top[x]];
	}
	if(dep[x] > dep[y])
		swap(x, y);
	modify(1, 1, n, id[x], id[y], d);
}
ll querySon(int x) {
	return query(1, 1, n, id[x], id[x] + sz[x] - 1);	
}
void modifySon(int x, int d) {
	modify(1, 1, n, id[x], id[x] + sz[x] - 1, d);
}
```

### LCA最近公共祖先

```cpp
// 树上倍增法
// f[i][j]：i节点向根走2^j到达的节点
// 初始化 f[i][0] : 父节点
void init() {
	for(int j = 1; j <= k; j++)
		for(int i = 1; i <= n; i++)
			f[i][j] = f[f[i][j - 1]][j - 1];
}
int lca(int x, int y) {
	if(d[x] > d[y]) swap(x, y);//保证x深度小于等于y
	for(int i = k; i >= 0; i--)//y走到和x同一深度
		if(d[f[y][i]] >= d[x])
			y = f[y][i];
	if(x == y) return x;
	for(int i = k; i >= 0; i--)//x,y一起向上走
		if(f[x][i] != f[y][i])
			x = f[x][i], y = f[y][i];
	return f[x][0];
}
// 树链剖分法
struct Tree {
    std::vector<int> sz, top, dep, parent, in;
    int cur;
    std::vector<std::vector<int>> e;
    Tree(int n) : sz(n), top(n), dep(n), parent(n, -1), e(n), in(n), cur(0) {}
    void addEdge(int u, int v) {
        e[u].push_back(v);
        e[v].push_back(u);
    }
    void init() {
        dfsSz(0);
        dfsHLD(0);
    }
    void dfsSz(int u) {
        if (parent[u] != -1)
            e[u].erase(std::find(e[u].begin(), e[u].end(), parent[u]));
        sz[u] = 1;
        for (int &v : e[u]) {
            parent[v] = u;
            dep[v] = dep[u] + 1;
            dfsSz(v);
            sz[u] += sz[v];
            if (sz[v] > sz[e[u][0]])
                std::swap(v, e[u][0]);
        }
    }
    void dfsHLD(int u) {
        in[u] = cur++;
        for (int v : e[u]) {
            if (v == e[u][0]) {
                top[v] = top[u];
            } else {
                top[v] = v;
            }
            dfsHLD(v);
        }
    }
    int lca(int u, int v) {
        while (top[u] != top[v]) {
            if (dep[top[u]] > dep[top[v]]) {
                u = parent[top[u]];
            } else {
                v = parent[top[v]];
            }
        }
        if (dep[u] < dep[v]) {
            return u;
        } else {
            return v;
        }
    }
};
```



## 4.3 差分约束

$x_u + w \ge x_v$ 转化为最短路中的 $dis[u] + w \ge dis[v]$ 

- 用SPFA时需要建立一个总源点代表一个值，使所有点可达，可通过这个点连边限制每个变量的最大值和最小值
- 求最大值用最短路，求最小值用最长路
- $x_a + c = x_b$ 加边 $(a, b, c), (b, a, -c)$

```cpp
const int N = 1e5 + 5, M = 3 * N;
int e[M], h[N], ne[M], w[M], idx, cnt[N];
ll dis[N];
bool st[N];

bool spfa() {
	stack<int> q;
	memset(dis, -0x3f, sizeof dis);

	dis[0] = 0;
	q.push(0);
	st[0] = true;
	while(!q.empty()) {
		int t = q.top();
		q.pop();
		st[t] = false;
		for(int i = h[t]; ~i; i = ne[i]) {
			int v = e[i];
			if(dis[t] + w[i] > dis[v]) {
				dis[v] = dis[t] + w[i];
				cnt[v] = cnt[t] + 1; // 判负环
				if(cnt[v] >= n + 1) return false;
				if(!st[v]) {
					q.push(v);
					st[v] = true;
				}
			}
		}
	}
	return true;
}
```

## 4.4 最小生成树

```cpp
struct DSU {
	vector<int> f, sz;
	DSU(int n): f(n), sz(n, 1) { iota(f.begin(), f.end(), 0); }
	int find(int x) {
		if(x == f[x]) return x;
		return f[x] = find(f[x]);
	}
    bool same(int x, int y) { return find(x) == find(y); }
	void merge(int x, int y) {
		x = find(x);
		y = find(y);
		if(x == y) return;
		if(sz[x] < sz[y]) swap(x, y);
		f[y] = x;
		sz[x] += sz[y];
		sz[y] = 0;
	}
};
```



```cpp
void prim() {
    priority_queue<pii, vector<pii>, greater<pii>> q;  // dis, node
	vector<int> vis(m + 1);
	q.push({0, 1});
	while (!q.empty() && cnt <= m) {
		auto tmp = q.top();
		q.pop();

		int u = tmp.second;
		if (vis[u]) continue;
		vis[u] = 1;

		cnt++;
		ans += tmp.first; // 处理
		for (auto v : g[u]) {
			if (!vis[v]) {
				q.push({dis(u, v), v});
			}
		}
	}
}
```

## 4.5 tarjan

### 无向图

点双，求割点

```cpp
// 无向图求割点 点双
int low[N], dfn[N], stk[N], top, ts, dcc_cnt, root = 1;
vector<int> dcc[N]; // 点双连通分量数组
bool cut[N]; // 是否为割点
void tarjan(int u) {
	dfn[u] = low[u] = ++ts;
	stk[++top] = u;

	int flag = 0;
	for(auto v : e[u]) {
		if(!dfn[v]) {
			tarjan(v);
			low[u] = min(low[u], low[v]);
			if(dfn[u] <= low[v]) {
				flag++;
				dcc_cnt++;
				if(u != root || flag > 1) cut[u] = 1;
				int x;
				do {
					x = stk[top--];
					dcc[dcc_cnt].push_back(x);
				} while(x != v);
				dcc[dcc_cnt].push_back(u);
			}
		} else {
         	low[u] = min(low[u], dfn[v]);   
        }
	}
}
```

### 有向图

缩点

```cpp
// stk栈, scnt:强连通分量的编号, c[i]:i节点对应的强连通分量编号
int stk[N], dfn[N], low[N], c[N], tid, top, scnt;
bool ins[N];
void tarjan(int u) {
	dfn[u] = low[u] = ++tid;
	stk[++top] = u, ins[u] = 1;
	for(int i = h[u]; ~i; i = ne[i]) {
		int v = e[i];
		if(!dfn[v]) {
			tarjan(v);
			low[u] = min(low[u], low[v]);
		} else if(ins[v]) {
			low[u] = min(low[u], dfn[v]);
        }
	}
	if(dfn[u] == low[u]) {
		++scnt;
		int v;
		do {
			v = stk[top--], ins[v] = 0;
			c[v] = scnt;
			// sz[scnt]++;
		} while(u != v);
	}
}
```

### Two-sat

```cpp
struct TwoSat {
    int n;
    std::vector<std::vector<int>> e;
    std::vector<bool> ans;
    TwoSat(int n) : n(n), e(2 * n), ans(n) {}
    void addClause(int u, bool f, int v, bool g) {
        e[2 * u + !f].push_back(2 * v + g);
        e[2 * v + !g].push_back(2 * u + f);
    }
    bool satisfiable() {
        std::vector<int> id(2 * n, -1), dfn(2 * n, -1), low(2 * n, -1);
        std::vector<int> stk;
        int now = 0, cnt = 0;
        std::function<void(int)> tarjan = [&](int u) {
            stk.push_back(u);
            dfn[u] = low[u] = now++;
            for (auto v : e[u]) {
                if (dfn[v] == -1) {
                    tarjan(v);
                    low[u] = std::min(low[u], low[v]);
                } else if (id[v] == -1) {
                    low[u] = std::min(low[u], dfn[v]);
                }
            }
            if (dfn[u] == low[u]) {
                int v;
                do {
                    v = stk.back();
                    stk.pop_back();
                    id[v] = cnt;
                } while (v != u);
                ++cnt;
            }
        };
        for (int i = 0; i < 2 * n; ++i) if (dfn[i] == -1) tarjan(i);
        for (int i = 0; i < n; ++i) {
            if (id[2 * i] == id[2 * i + 1]) return false;
            ans[i] = id[2 * i] > id[2 * i + 1];
        }
        return true;
    }
    std::vector<bool> answer() { return ans; }
};
```



## 4.6 二分图

二分图最大匹配：匈牙利算法

```cpp
// vis和match针对均为右部节点, u针对左部节点
int id = 0; // 优化vis数组,用在全局,防止多样例冲突
bool dfs(int u) {
    for (auto v: g[u]) {
        if (vis[v] != id) { //!vis[v]
            vis[v] = id; // vis[v] = 1;
            if (!match[v] || dfs(match[v])) {
                match[v] = u;
                return true;
            }
        }
    }
    return false;
}
int ans = 0; // 二分图最大匹配数
for (int i = 1; i <= n; i++) {
    id++; // memset(vis, 0, sizeof(vis));
    if (dfs(i)) ans++;
}
```

## 4.7 网络流

```cpp
template<class T>
struct Flow {
    const int n;
    struct edge {
        int to;
        T cap;
        edge(int to, T cap) : to(to), cap(cap) {}
    };
    vector<edge> e;
    vector<vector<int>> g;
    vector<int> c, h;
    Flow(int n) : n(n), g(n) {}
 
    bool bfs(int s, int t) {
        h.assign(n, -1);
        queue<int> que;
        h[s] = 0;
        que.push(s);
        while (!que.empty()) {
            const int u = que.front();
            que.pop();
            for (int i : g[u]) {
                auto [v, cap] = e[i];
                if (cap > 0 && h[v] == -1) {
                    h[v] = h[u] + 1;
                    if (v == t) {
                        return true;
                    }
                    que.push(v);
                }
            }
        }
        return false;
    }
 
    T dfs(int u, int t, T f) {
        if (u == t) {
            return f;
        }
        auto r = f;
        while (c[u]++ < int(g[u].size())) {
            int j = g[u][c[u] - 1];
            auto [v, cap] = e[j];
            if (cap > 0 && h[v] == h[u] + 1) {
                auto a = dfs(v, t, min(r, cap));
                e[j].cap -= a;
                e[j ^ 1].cap += a;
                r -= a;
                if (r == 0) {
                    return f;
                }
            }
        }
        return f - r;
    }
    void add(int u, int v, T cap) {
        g[u].push_back(e.size());
        e.emplace_back(v, cap);
        g[v].push_back(e.size());
        e.emplace_back(u, 0);
    }
    T maxFlow(int s, int t, T lim = numeric_limits<T>::max()) {
        T ans = 0;
        while (bfs(s, t) && ans < lim) {
            c.assign(n + 1, 0);
            ans += dfs(s, t, lim - ans);
        }
        return ans;
    }
};
```

# 5 字符串

## 5.1 hash

$$
f[i] = f[i - 1] * 131 + (s[i] - 'a'); \\\
hash(l,r) = f[r] - f[l - 1] * 131^{r - l + 1};
$$

## 5.2 KMP

```cpp
char s[N], p[N];
int ne[N];
cin >> s + 1 >> p + 1;
int n = strlen(s + 1), m = strlen(p + 1);
for (int i = 2, j = 0; i <= m; i++) {
    while (j && p[i] != p[j + 1]) j = ne[j];//回退
    if (p[i] == p[j + 1]) j++;//最长公共前后缀最多增加一
    ne[i] = j;//对当前下标的next数组赋值为最长长度
}

for (int i = 1, j = 0; i <= n; i++) {
    while (j && (j == n || s[i] != p[j + 1])) j = ne[j];
    if (s[i] == p[j + 1]) j++;
    if (j == m) {
        j = ne[j]; //匹配成功，后面必然不能再匹配，所以回退一步 
        cout << i - m + 1 << "\n";  //匹配成功后的逻辑
    }
}
```

## 5.3 Trie

```cpp
struct Trie {
	vector<vector<int>> trie;
	vector<int> cnt;
	int idx = 0;
	Trie(int n) {
		trie.resize(n, vector<int>(26, 0));
		cnt.resize(n, 0);
	}
	void insert(string s) {
		int p = 0;
		for(int i = 0; i < (int)s.size(); i++) {
			int x = s[i] - 'a';
			if(!trie[p][x]) trie[p][x] = ++idx;
			p = trie[p][x];
		}
		cnt[p++];
	}
	int find(string s) {
		int p = 0;
		for(int i = 0; i < int(s.size()); i++) {
			int x = s[i] - 'a';
			if(!trie[p][x]) return 0;
			p = trie[p][x];
		}
		return cnt[p];
	}
};
```



## 5.4 Manacher

```cpp
// #a#b#c#b# 返回对应位置最长回文串向前(后)的长度, 包括当前位置 时间复杂度：O(N)
std::vector<int> manacher(std::string s) {
    std::string t = "#";
    for (auto c : s) {
        t += c;
        t += '#';
    }
    int n = t.size();
    std::vector<int> r(n);
    for (int i = 0, j = 0; i < n; i++) {
        if (2 * j - i >= 0 && j + r[j] > i) {
            r[i] = std::min(r[2 * j - i], j + r[j] - i);
        }
        while (i - r[i] >= 0 && i + r[i] < n && t[i - r[i]] == t[i + r[i]]) {
            r[i] += 1;
        }
        if (i + r[i] > j + r[j]) {
            j = i;
        }
    }
    return r;
}
```

## 5.5 SAM后缀自动机

```cpp
struct SuffixAutomaton {
    static constexpr int ALPHABET_SIZE = 26, N = 1e5;
    struct Node {
        int len;
        int link;
        int next[ALPHABET_SIZE];
        Node() : len(0), link(0), next{} {}
    } t[2 * N];
    int cntNodes;
    SuffixAutomaton() {
        cntNodes = 1;
        std::fill(t[0].next, t[0].next + ALPHABET_SIZE, 1);
        t[0].len = -1;
    }
    void init(string s) {
        int p = 1;
        for(auto x : s)
            p = extend(p, x - 'a');        
    }
    int extend(int p, int c) {
        if (t[p].next[c]) {
            int q = t[p].next[c];
            if (t[q].len == t[p].len + 1)
                return q;
            int r = ++cntNodes;
            t[r].len = t[p].len + 1;
            t[r].link = t[q].link;
            std::copy(t[q].next, t[q].next + ALPHABET_SIZE, t[r].next);
            t[q].link = r;
            while (t[p].next[c] == q) {
                t[p].next[c] = r;
                p = t[p].link;
            }
            return r;
        }
        int cur = ++cntNodes;
        t[cur].len = t[p].len + 1;
        while (!t[p].next[c]) {
            t[p].next[c] = cur;
            p = t[p].link;
        }
        t[cur].link = extend(p, c);
        return cur;
    }
} sam;
```

# 6 动态规划

## 6. 数位DP

```cpp
// [l, r] 中有多少个圆数(2进制表示中0的个数不小于1的个数)
// 状态复用：f[pos][][] 表示[1,pos]任意填,[pos+1,len]已经填好的情况,此时memset可以最开始多组样例前
// 此时需要简单改动代码 if (~v && !lim) return v; 以及 if (!lim) v = ans; return ans;
// lead:是否有前导零 lim:前面的数是否贴着边界 
const int N = 35;
int a[N], len;
ll f[N][2][2][30][30];

ll dfs(int pos, int lim, int lead, int cnt0, int cnt1) {
	if (!pos) return (cnt0 >= cnt1);
	auto &v = f[pos][lim][lead][cnt0][cnt1];
    if (~v) return v;
	int up = lim ? a[pos] : 1;
	ll ans = 0;
	for (int i = 0; i <= up; i++) {
		int t0 = cnt0 + (!lead && i == 0);
		ans += dfs(pos - 1, lim && i == up, lead && i == 0, t0, cnt1 + (i == 1));
	}
	return f[pos][lim][lead][cnt0][cnt1] = ans;
}
ll calc(ll x) {
	len = 0; memset(f, -1, sizeof(f)); 
	while (x) {
		a[++len] = x % 2;
		x /= 2;
	}
	return dfs(len, 1, 1, 0, 0);
}
void solve() {
	ll l, r;
	cin >> l >> r;
	cout << calc(r) - calc(l - 1) << "\n";
}
```



# 7. 计算几何

## 7.1 点

```cpp
int sgn(double x){
    if(fabs(x)<eps)return 0;
    if(x<0)return -1;
    return 1;
}
double cmp(double a,double b){return sgn(a-b);}
double sqr(double x){return x*x;}
double inmid(double x,double l,double r){return sgn(x-l)>=0&&sgn(r-x)>=0;}
struct Point{
    double x,y;
    Point(){}
    Point(double xx,double yy){x=xx;y=yy;}
    void input(){scanf("%Lf %Lf",&x,&y);}
    void output(){printf("%.0f %.0f\n",x,y);}
    bool operator ==(const Point &p)const{return sgn(x-p.x)==0&&sgn(y-p.y)==0;}
    bool operator !=(const Point &p)const{return sgn(x-p.x)!=0||sgn(y-p.y)!=0;}
    bool operator < (const Point &p)const{
        return sgn(x-p.x)<0||(sgn(x-p.x)==0&&sgn(y-p.y)<0);
    }
    Point operator + (const Point &p)const{
        return {x+p.x,y+p.y};
    }
    Point operator - (const Point &p)const{
        return {x-p.x,y-p.y};
    }
    Point operator * (double k)const{
        return {x*k,y*k};
    }
    Point operator / (const double &k)const{
        return {x/k,y/k};
    }
    double dot(Point p) const{return p.x*x+p.y*y;}
    double cross(Point p) const {return x * p.y - y * p.x;}
    double dis(Point p) const {return sqrt(sqr(x - p.x) + sqr(y - p.y));}
    double abs() const{return hypot(x,y);}
    double abs2() const{return sqr(x)+sqr(y);}
    double rad(Point a,Point b)const{
        Point k1=a-(*this),k2=b-(*this);
        return atan2l(k1.cross(k2), k1.dot(k2));
    }
};
struct Point { // 极角排序的点
    ll x, y;
    Point(ll x, ll y): x(x), y(y) { }
    int area() const {
        if (y > 0 || y == 0 && x > 0) return 0;
        return 1;
    }
    ll cross(const Point& rhs) const { return x * rhs.y - rhs.x * y; }
    bool operator < (const Point& rhs) const { return area() < rhs.area() || area() == rhs.area() && cross(rhs) > 0; }
    bool operator == (const Point& rhs) const { return area() == rhs.area() && cross(rhs) == 0; }
};
```
