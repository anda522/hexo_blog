---
title: 2022杭电多校2 Static Query on Tree|树链剖分
top: false
cover: false
toc: true
mathjax: true
tags:
  - 树链剖分
categories:
  - 图论
abbrlink: 3388199031
date: 2022-07-22 22:28:33
password:
summary:
---



# [Static Query on Tree](http://acm.hdu.edu.cn/showproblem.php?pid=7150)

下面介绍树链剖分做法（即题解的第二种做法）

![题目描述](3388199031/image-20220722223108042.png)



> 题目大意：
>
> 一棵内向树，三个集合A，B，C，每个集合里面有一些点，求特定点的个数，满足从A集合和B集合可以到达该特定点，且可以从该特定点到达C集合。



可以把从A集合到达根节点路径中都打上A标记，把从B集合到达根节点路径中都打上B标记，那么树中被打上A和B标记的就是A和B集合都可以到达的点。（因为是内向树，所以向根节点方向走）

只需要判断这些打上A和B标记的点能否到达C节点即可，方法也是同样的，将C集合中的每个点和其子树上的点都打上C标记，只要统计树中同时被打上ABC标记的点的个数即可（此时可以用线段树维护标记）。



**线段树记录变量**

- $tr[u].cnt[i]$

$tr[u].cnt[i]$中的$i$有三个值，0，1，2，分别代表被打上A标记的点，被打上AB标记的点，被打上ABC标记的点。

则$tr[u].cnt[i]$则共可以表示在对应的线段树节点表示的区间上被打上A标记的点的个数（$i = 0$），被打上AB标记的点的个数（$i = 1$），被打上ABC标记的点的个数（$i = 2$）。

- $tr[u].flag[i]$

共有三个值`-1`，`0`， `1`

初始值等于`-1`，为`0`代表对应的区间置为0

懒标记下传方法：

在下传懒标记A时，因为A是第一次标记，无需其他条件，直接下传，记录一下`cnt`变量即可。

```cpp
tr[u << 1].cnt[i] = tr[u].flag[i] * (mid - l + 1);
tr[u << 1 | 1].cnt[i] = tr[u].flag[i] * (r - mid); 
```

下传懒标记B和C时，就需要有限制条件了，下传懒标记B我们需要有A标记才能求被标记A和B的节点，即被标记AB的节点的数量等于被标记A节点的数量乘对应的懒标记。

```cpp
tr[u << 1].cnt[i] = tr[u].flag[i] * tr[u << 1].cnt[i - 1];
tr[u << 1 | 1].cnt[i] = tr[u].flag[i] * tr[u << 1 | 1].cnt[i - 1];
```



接下来就是树链剖分的板子了，可以看下面链接

[树链剖分模板题](../shupou1000)

# 代码

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
const int N = 2e5 + 5, M = 2 * N;
const int p = 1e9 + 7;

int n, q;

struct Segment
{
    int cnt[3], flag[3];
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
    for(int i = 0; i < 3; i++)
    	tr[u].cnt[i] = tr[u << 1].cnt[i] + tr[u << 1 | 1].cnt[i];

}
void pushdown(int u, int l, int r)
{
    int mid = (l + r) >> 1;

    for(int i = 0; i < 3; i++)
    {
    	if(tr[u].flag[i] == -1)
    		continue;
    	tr[u << 1].flag[i] = tr[u].flag[i];
    	tr[u << 1 | 1].flag[i] = tr[u].flag[i];
    	if(i == 0)
    	{
    		tr[u << 1].cnt[i] = tr[u].flag[i] * (mid - l + 1);
    		tr[u << 1 | 1].cnt[i] = tr[u].flag[i] * (r - mid); 
    	}
    	else
    	{
    		tr[u << 1].cnt[i] = tr[u].flag[i] * tr[u << 1].cnt[i - 1];
    		tr[u << 1 | 1].cnt[i] = tr[u].flag[i] * tr[u << 1 | 1].cnt[i - 1];
    	}
    	tr[u].flag[i] = -1;
    }
}

void build(int u, int l, int r)
{
    if(l == r)
    {
        for(int i = 0; i < 3; i++)
        	tr[u].cnt[i] = 0;
	    for(int i = 0; i < 3; i++)
        	tr[u].flag[i] = -1;
        return;
    }
    int mid = (l + r) >> 1;
    build(u << 1, l, mid);
    build(u << 1 | 1, mid + 1, r);
    pushup(u);
}

void modify(int u, int l, int r, int x, int y, int d, int v)
{
    if(l >= x && r <= y)
    {
        tr[u].flag[d] = v;
        if(d == 0)
        	tr[u].cnt[0] = (r - l + 1) * v;
        else tr[u].cnt[d] = tr[u].cnt[d - 1] * v;
        return;
    }
    pushdown(u, l, r);
    int mid = (l + r) >> 1;
    if(x <= mid) modify(u << 1, l, mid, x, y, d, v);
    if(y > mid) modify(u << 1 | 1, mid + 1, r, x, y, d, v);
    pushup(u);
}

ll query(int u, int l, int r, int x, int y)
{
    if(l >= x && r <= y)
    	return tr[u].cnt[2] % p;
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

void modifyRange(int x, int y, int d, int v)
{
    v %= p;
    while(top[x] != top[y])
    {
        if(dep[top[x]] < dep[top[y]])
            swap(x, y);
        modify(1, 1, n, id[top[x]], id[x], d, v);
        x = fa[top[x]];
    }
    if(dep[x] > dep[y])
        swap(x, y);
    modify(1, 1, n, id[x], id[y], d, v);
}
ll querySon(int x)
{
    return query(1, 1, n, id[x], id[x] + sz[x] - 1);  
}
void modifySon(int x, int d, int v)
{
    modify(1, 1, n, id[x], id[x] + sz[x] - 1, d, v);
}


int tot[3], node[4][N];

void solve()
{
    cin >> n >> q;
    int r = 1;
    memset(h, -1, sizeof h);
    for(int i = 2; i <= n; i++)
    {
    	int to;
    	cin >> to;
        add(to, i);
        add(i, to);
    }
    dfs1(r, -1, 1);
    dfs2(r, r);
    build(1, 1, n);
    while(q--)
    {
    	for(int i = 0; i < 3; i++)
    		cin >> tot[i];
    	for(int i = 0; i < 3; i++)
    		for(int j = 1; j <= tot[i]; j++)
    		{
    			cin >> node[i][j];
    			if(i != 2)
    				modifyRange(1, node[i][j], i, 1);
    			else
    				modifySon(node[i][j], i, 1);
    		}
    	cout << querySon(1) << "\n";
    	modifySon(1, 0, 0);
    	modifySon(1, 1, 0);
    	modifySon(1, 2, 0);
    }
}

int main()
{
    // ios::sync_with_stdio(false);
    // cin.tie(0);
    int t;
    cin >> t;
    // t = 1;
    while(t--)
        solve();
    return 0;
}
```

