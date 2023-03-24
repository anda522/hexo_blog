---
title: AtCoder Beginner Contest 266 A-G
top: false
cover: false
toc: true
mathjax: true
tags:
  - Atcoder
categories: 
  - Atcoder
abbrlink: 2022907814
date: 2022-08-30 09:07:31
password:
summary:
---

# AtCoder Beginner Contest 266 A-G

# A 

直接输出字符串中间字符即可。

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
using db = double;
using ld = long double;
using pii = pair<int, int>;
using pll = pair<ll, ll>;
using arr = array<int, 3>;
using vi = vector<int>;
using vl = vector<ll>;
template <class T> void Min(T &a, const T b) { if (a > b) a = b; }
template <class T> void Max(T &a, const T b) { if (a < b) a = b; }
const int dx[] = {-1, 0, 1, 0}, dy[] = {0, 1, 0, -1};
const int N = 1e5 + 5, M = N;
const int mod = 1e9 + 7;
const ld eps = 1e-8;

void solve()
{
	string s;
	cin >> s;
	cout << s[s.size() / 2];
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(0);

	int t;
	t = 1;
	// cin >> t;
	while(t--)
		solve();
	return 0;
}
```

# B

令 $m = 998244353$ 。
$$
N - x = k \times m, k \in Z
$$

$$
x = N - k \times m, 0 \leq x \leq m - 1
$$

$$
x = (N \bmod m + m) \bmod m
$$

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
using db = double;
using ld = long double;
using pii = pair<int, int>;
using pll = pair<ll, ll>;
using arr = array<int, 3>;
using vi = vector<int>;
using vl = vector<ll>;
template <class T> void Min(T &a, const T b) { if (a > b) a = b; }
template <class T> void Max(T &a, const T b) { if (a < b) a = b; }
const int dx[] = {-1, 0, 1, 0}, dy[] = {0, 1, 0, -1};
const int N = 1e5 + 5, M = N;
const int mod = 998244353;
const ld eps = 1e-8;
// x = n - k mod
void solve()
{
	ll n;
	cin >> n;
	cout << (n % mod + mod) % mod << "\n";
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(0);

	int t;
	t = 1;
	// cin >> t;
	while(t--)
		solve();
	return 0;
}
```

# C

直接暴力判断叉积是否小于等于0即可。

> 叉积计算的是三角形面积，当在右手系的情况下， 叉积计算出来的值就是三角形的正面积，如果计算出的值为负值，即三角形不存在。
>
> $A,B,C$ 三个点，$\frac {\overrightarrow {AB} \times \overrightarrow {AC}}{2}$ 即为对应的三角形面积， 只需判断上面分母的叉积是否小于等于 0 即可。两个向量分别为 $(x1, y1),(x2, y2)$ ，则 $S_{\triangle ABC} = x1 \cdot y2  - x2 \cdot y1$

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
using db = double;
using ld = long double;
using pii = pair<int, int>;
using pll = pair<ll, ll>;
using arr = array<int, 3>;
using vi = vector<int>;
using vl = vector<ll>;
template <class T> void Min(T &a, const T b) { if (a > b) a = b; }
template <class T> void Max(T &a, const T b) { if (a < b) a = b; }
const int dx[] = {-1, 0, 1, 0}, dy[] = {0, 1, 0, -1};
const int N = 1e5 + 5, M = N;
const int mod = 1e9 + 7;
const ld eps = 1e-8;


void solve()
{
	vector<pii> p(10);
	for(int i = 0; i < 4; i++)
		cin >> p[i].first >> p[i].second;

	for(int i = 0; i < 4; i++)
	{
		pii a = {p[(i + 1) % 4].first - p[i].first, p[(i + 1) % 4].second - p[i].second};
		pii b = {p[(i - 1 + 4) % 4].first - p[i].first, p[(i - 1 + 4) % 4].second - p[i].second};
		if(a.first * b.second - b.first * a.second <= 0)
		{
			cout << "No\n";
			return;
		}
	}
	cout << "Yes\n";
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(0);

	int t;
	t = 1;
	// cin >> t;
	while(t--)
		solve();
	return 0;
}
```

# D

$f[i]$ 代表前 $i$ 个蛇， 抓了第 $i$ 个，得到的最大价值。

可以发现，当抓了第 $i$ 个蛇后， 那么位置必须处于 $p[i]$ 处，那么首先可以暴力的想怎么转移， 就是我们可以两层循环， 对于每一个 $f[i]$ ，我们找前面的可以进行转移（即在时间限制内可以到达 $f[j]$ ）的位置 $j,j \lt i$ ，每一个位置进行判断。 复杂度 $O(n^2)$

但是本题有一个特点，位置数极少，只有5个，那么 $i$ 位置往前5个之后一定是可以转移的位置（在时间限制内一定可以到达 $i$）。 所以我们暴力判断 $i$ 位置的前几个，然后对此进行转移即可。



```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
using db = double;
using ld = long double;
using pii = pair<int, int>;
using pll = pair<ll, ll>;
using arr = array<int, 3>;
using vi = vector<int>;
using vl = vector<ll>;
template <class T> void Min(T &a, const T b) { if (a > b) a = b; }
template <class T> void Max(T &a, const T b) { if (a < b) a = b; }
const int dx[] = {-1, 0, 1, 0}, dy[] = {0, 1, 0, -1};
const int N = 1e5 + 5, M = N;
const int mod = 1e9 + 7;
const ld eps = 1e-8;

void solve()
{
	int n;
	cin >> n;
	vi t(n + 1), p(n + 1), w(n + 1);
	for(int i = 1; i <= n; i++)
		cin >> t[i] >> p[i] >> w[i];

	vl f(n + 1, -2e18);
	f[0] = 0;
	for(int i = 1; i <= n; i++)
	{
		for(int j = max(0, i - 10); j < i; j++)
		{
			if(t[i] - t[j] >= abs(p[i] - p[j]))
				Max(f[i], f[j] + w[i]);
		}
	}
	ll ans = *max_element(f.begin() + 1, f.end());
	if(ans <= 0) cout << 0 << "\n";
	else cout << ans << "\n";
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(0);

	int t;
	t = 1;
	// cin >> t;
	while(t--)
		solve();
	return 0;
}
```

# E

$$
f[x] = \frac{1}{6}max(1, f[x - 1]) + \frac{1}{6}max(2, f[x - 1]) \\ + \frac{1}{6}max(3, f[x - 1]) + \frac{1}{6}max(4, f[x - 1]) \\ + \frac{1}{6}max(5, f[x - 1]) + \frac{1}{6}max(6, f[x - 1])
$$

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
using db = double;
using ld = long double;
using pii = pair<int, int>;
using pll = pair<ll, ll>;
using arr = array<int, 3>;
using vi = vector<int>;
using vl = vector<ll>;
template <class T> void Min(T &a, const T b) { if (a > b) a = b; }
template <class T> void Max(T &a, const T b) { if (a < b) a = b; }
const int dx[] = {-1, 0, 1, 0}, dy[] = {0, 1, 0, -1};
const int N = 1e5 + 5, M = N;
const int mod = 1e9 + 7;
const ld eps = 1e-8;


void solve()
{
	int n;
	cin >> n;
	db ans = 0;
	for(int i = 1; i <= n; i++)
	{
		db t = 0;
		for(int j = 1; j <= 6; j++)
			t += max(ans, (db)j) / 6;
		ans = t;
	}
	cout << fixed << setprecision(10) << ans << "\n";

}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(0);

	int t;
	t = 1;
	// cin >> t;
	while(t--)
		solve();
	return 0;
}
```

# F

> 一颗基环树， q个询问， 问两点之间是否存在单一路径。

我们首先需要找到这个环，标记一下环上的点，那么以环为树根，单颗子树上的节点（除环上的点）都有单一路径，我们使用并查集将他们连成一个集合即可。

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
using db = double;
using ld = long double;
using pii = pair<int, int>;
using pll = pair<ll, ll>;
using arr = array<int, 3>;
using vi = vector<int>;
using vl = vector<ll>;
template <class T> void Min(T &a, const T b) { if (a > b) a = b; }
template <class T> void Max(T &a, const T b) { if (a < b) a = b; }
const int dx[] = {-1, 0, 1, 0}, dy[] = {0, 1, 0, -1};
const int N = 1e5 + 5, M = N;
const int mod = 1e9 + 7;
const ld eps = 1e-8;

struct DSU
{
	vector<int> f, sz;
	DSU(int n): f(n), sz(n, 1) { iota(f.begin(), f.end(), 0); }
	int find(int x)
	{
		if(x == f[x]) return x;
		return f[x] = find(f[x]);
	}
    bool same(int x, int y) { return find(x) == find(y); }
	void merge(int x, int y)
	{
		x = find(x);
		y = find(y);
		if(x == y) return;
		if(sz[x] < sz[y]) swap(x, y);
		f[y] = x;
		sz[x] += sz[y];
		sz[y] = 0;
	}
};

void solve()
{
	int n;
	cin >> n;
	vector<vi> g(n);
	for(int i = 1; i <= n; i++)
	{
		int u, v;
		cin >> u >> v;
		u--, v--;
		g[u].push_back(v);
		g[v].push_back(u);
	}

	vector<bool> cyc(n);
	vi fa(n, -1), vis(n, -1);
	int cur = 0;

	function<void(int)> dfs = [&](int u)
	{
		vis[u] = cur++;
		for(auto v : g[u])
		{
			if(v == fa[u]) continue;
			if(vis[v] == -1)
			{
				fa[v] = u;
				dfs(v);
			}
			else if(vis[v] < vis[u])
			{
				for(int i = u; i != v; i = fa[i])
					cyc[i] = 1;
				cyc[v] = 1;
			}
		}
	};
	dfs(0);

	DSU dsu(n);
	for(int i = 0; i < n; i++)
		for(auto j : g[i])
			if(!cyc[i] || !cyc[j])
				dsu.merge(i, j);

	int q;
	cin >> q;
	while(q--)
	{
		int u, v;
		cin >> u >> v;
		u--, v--;
		cout << (dsu.same(u, v) ? "Yes\n" : "No\n");
	}
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(0);

	int t;
	t = 1;
	// cin >> t;
	while(t--)
		solve();
	return 0;
}
```

# G

> 问有`R` 个字符 `R`，`G` 个字符 `G`，`B` 个字符 `B`，`K` 个字符 `RG`的字符串的个数。

排列组合知识。

首先安排G和B，共$C_{G+B}^{B}$ 种。

然后安排K个R，只能在G的前面填，共`G`个位置，凑成`RG`，共 $C_G^K$ 种。

剩下了 $R-K$ 个`R` ，需要填进去同时保证`RG`的数量不会增加，那么只能在`B` 和 `RG` 的前面以及最后一个位置填，共 $B+K+1$ 个位置。

即 $B+K+1$ 个位置填 $R-K$ 个`R` 。我们使用隔板法， 即等价于将 $B+K+1 + R-K$ 个`R`分成 $B+K+1$ 份， 答案为 $C_{B+R}^{B+K}$ 种。

> 以下为隔板法描述：

**一般隔板法：**

将 $n$ 个相同的元素分成 $k$ 部分，每部分至少分得一个元素， 即在 $n-1$ 个空隙中插入 $k-1$ 个隔板，情况数为 
$$
C_{n-1}^{k-1}
$$
等价于 $x_1+ x_2+x_3+...+x_k=n, x_i \geq 1$ 的可行解个数。

**添元素隔板法**：

将 $n$ 个相同的元素分成 $k$ 部分，每部分可以为空， 等价于我们先让元素个数添加上 $k$ 个，然后在 $n+k$ 个元素中分成 $k$ 部分， 最后再在 $k$ 部分的每一个部分都拿走一个元素，共拿走 $k$ 个元素。 即在 $n+k-1$ 个空隙中插入 $k-1$ 个隔板，情况数为 
$$
C_{n+k-1}^{k-1}
$$
等价于 $x_1+ x_2+x_3+...+x_k=n, x_i \geq 0$ 的可行解个数。

> 此时该式可以转化为一般隔板法， 我们让 $x_i \geq 1$ 即可，操作是将每一个 $x_i$ 元素加上 $1$ ，相当于等式两边同时加了 $k$ ，即 $x_1+x_2+...+x_k=n+k,x_i \geq 1$ ，即可转化为一般隔板法。

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
using db = double;
using ld = long double;
using pii = pair<int, int>;
using pll = pair<ll, ll>;
using arr = array<int, 3>;
using vi = vector<int>;
using vl = vector<ll>;
template <class T> void Min(T &a, const T b) { if (a > b) a = b; }
template <class T> void Max(T &a, const T b) { if (a < b) a = b; }
const int dx[] = {-1, 0, 1, 0}, dy[] = {0, 1, 0, -1};
const int N = 3e6 + 5, M = N;
const int mod = 998244353;
const ld eps = 1e-8;

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

void solve()
{
	int R, G, B, K;
	cin >> R >> G >> B >> K;

	vector<Z> fac(N), invfac(N);
	fac[0] = 1;
	for(int i = 1; i < N; i++)
		fac[i] = fac[i - 1] * i;

	invfac[N - 1] = fac[N - 1].inv();
	for(int i = N - 1; i; i--)
		invfac[i - 1] = invfac[i] * i;

	auto C = [&](int n, int m)
	{
		return fac[n] * invfac[m] * invfac[n - m];
	};
	Z ans = C(G + B, G) * C(G, K) * C(B + R, B + K);
	cout << ans << "\n";
}
int main()
{
	ios::sync_with_stdio(false);
	cin.tie(0);

	int t;
	t = 1;
	// cin >> t;
	while(t--)
		solve();
	return 0;
}
```



