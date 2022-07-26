---
title: 树链剖分|模板题
top: false
cover: false
toc: true
mathjax: true
date: 2022-07-22 18:27:24
password:
summary:
tags:
  - 树链剖分
  - DFS
categories:	
  - 图论
---



# 树链剖分模板题

题目链接：

[https://www.luogu.com.cn/problem/P3384](https://www.luogu.com.cn/problem/P3384)

![问题描述](f09feafcf66f44c0b0e215ff94c1ca40.png)





# 代码

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
const int N = 1e5 + 5, M = 2 * N;

int n, m, r, p;

int w[N];

struct Segment
{
	ll add, sum;
}tr[N * 4];

int dep[N], fa[N], son[N], sz[N];
int cnt, nw[N], top[N], id[N];

int e[M], h[N], ne[M], idx;
void add(int a, int b)
{
	e[idx] = b, ne[idx] = h[a], h[a] = idx++;
}

void pushup(int u)
{
	tr[u].sum = (tr[u << 1].sum + tr[u << 1 | 1].sum) % p;
}
void pushdown(int u, int l, int r)
{
	int mid = (l + r) >> 1;
	if(tr[u].add)
	{
		tr[u << 1].add += tr[u].add;
		tr[u << 1].sum += 1ll * (mid - l + 1) * tr[u].add;
		tr[u << 1].sum %= p;
		tr[u << 1 | 1].add += tr[u].add;
		tr[u << 1 | 1].sum += 1ll * (r - mid) * tr[u].add;
		tr[u << 1 | 1].sum %= p;
		tr[u].add = 0;
	}
}

void build(int u, int l, int r)
{
	if(l == r)
	{
		tr[u].sum = nw[l];
		if(tr[u].sum > p) tr[u].sum %= p;
		return;
	}
	int mid = (l + r) >> 1;
	build(u << 1, l, mid);
	build(u << 1 | 1, mid + 1, r);
	pushup(u);
}

void modify(int u, int l, int r, int x, int y, int d)
{
	if(l >= x && r <= y)
	{
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

ll query(int u, int l, int r, int x, int y)
{
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
void dfs1(int x, int f, int depth)//x : 当前节点, f：父亲, depth：深度
{
	dep[x] = depth;
	fa[x] = f;
	sz[x] = 1;
	int mxson = -1;
	for(int i = h[x]; ~i; i = ne[i])
	{
		int y = e[i];
		if(y == f) continue;
		dfs1(y, x, depth + 1);
		sz[x] += sz[y];
		if(sz[y] > mxson)// 记录重儿子编号
		{
			son[x] = y;
			mxson = sz[y];
		}
	}
}

// 标新序号 求id[], nw[], top[] 新id-新节点权重-链顶端
void dfs2(int x, int topf)
{
	id[x] = ++cnt;
	nw[cnt] = w[x];
	top[x] = topf;
	if(!son[x]) return;//无儿子返回
	dfs2(son[x], topf);
	for(int i = h[x]; ~i; i = ne[i])
	{
		int y = e[i];
		if(y == fa[x] || y == son[x])
			continue;
		dfs2(y, y);
	}
}

ll queryRange(int x, int y)
{
	ll ans = 0;
	while(top[x] != top[y])//不在同一条链上
	{
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

void modifyRange(int x, int y, int d)
{
	d %= p;
	while(top[x] != top[y])
	{
		if(dep[top[x]] < dep[top[y]])
			swap(x, y);
		modify(1, 1, n, id[top[x]], id[x], d);
		x = fa[top[x]];
	}
	if(dep[x] > dep[y])
		swap(x, y);
	modify(1, 1, n, id[x], id[y], d);
}
ll querySon(int x)
{
	return query(1, 1, n, id[x], id[x] + sz[x] - 1);	
}
void modifySon(int x, int d)
{
	modify(1, 1, n, id[x], id[x] + sz[x] - 1, d);
}

void solve()
{
	cin >> n >> m >> r >> p;
	for(int i = 1; i <= n; i++)
		cin >> w[i];
	memset(h, -1, sizeof h);
	for(int i = 1; i < n; i++)
	{
		int u, v;
		cin >> u >> v;
		add(u, v);
		add(v, u);
	}
	dfs1(r, -1, 1);
	dfs2(r, r);
	build(1, 1, n);

	while(m--)
	{
		int op, x, y, z;
		cin >> op >> x;
		if(op == 1)
		{
			cin >> y >> z;
			modifyRange(x, y, z);
		}
		else if(op == 2)
		{
			cin >> y;
			cout << queryRange(x, y) << "\n";
		}
		else if(op == 3)
		{
			cin >> z;
			modifySon(x, z);
		}
		else 
			cout << querySon(x) << "\n";
	}
}

int main()
{
	ios::sync_with_stdio(false);
	cin.tie(0);
	int t;
	// cin >> t;
	t = 1;
	while(t--)
		solve();
	return 0;
}

```

