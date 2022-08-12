---
title: CF1055C Lucky Days|裴蜀定理
top: false
cover: false
toc: true
mathjax: true
tags:
  - 数论
  - 裴蜀定理
categories:
  - 数论
abbrlink: 4188452413
date: 2022-08-08 19:45:25
password:
summary:
---



# [Lucky Days](https://codeforces.com/problemset/problem/1055/C)

> 给定 $l_a,r_a,t_a,l_b,r_b,t_b$，对于所有的非负整数 $k$，将区间 $[l_a+kt_a,r_a+kt_a]$ 打上标记 $1$，将区间 $[l_b+kt_b,r_b+kt_b]$ 打上标记 $2$。求出最长的连续区间使得该区间中的所有位置都被同时打上的 $1,2$ 标记。

样例一

```
0 2 5
1 3 5
```

```
2
```

样例二

```
0 1 3
2 3 6
```

```
1
```



![样例一](https://cdn.luogu.com.cn/upload/vjudge_pic/CF1055C/19d7a3762431cf8ed7d41c7aa787eb194dc6ab47.png)

![样例二](https://cdn.luogu.com.cn/upload/vjudge_pic/CF1055C/dee255111b7c12483568555df6c88766f900f855.png)





---

# 思路 

题目要求两个区间的重合度最大的长度。

首先第一个点我们要想到：要想使两个区间的重合度最高，需要让两个区间尽可能逼近。最优的情况就是两个区间的**左端点尽可能相等**，这样重合度是最大的。

即使 $la + x \* ta = lb + y * tb$

将式子进行移项得 $x \* ta - y * tb = lb - la$ （此时我们假设$la < lb$，代码中已做相关的操作，这样只是为了方便）

我们需要看式子是否有解，式子结构和**裴蜀定理**比较像，拿出来进行对比。

裴蜀定理 ： 存在整数 $x, y$，满足$a \* x + b * y = gcd(a,b)$

 该式子进行$y$符号变为正，表示$y$是整数，则 $x \* ta + y * tb = lb - la$

我们令$d = gcd(ta, tb)$

那么可以发现如果$d | (lb - la)$，则该式子有解，左端点可以重合。

---

但是如果左端点不能重合怎么办，尽可能逼近就行。

此时别忘了式子右边的$lb-la$代表的是什么，是 **区间a左端点移动的距离**，那么因为$x \* ta + y * tb = d$是存在解的，则**区间a移动的距离可进一步变为** $d$ 。

>  注意：我说的区间a可以移动，是指的一定存在某种状态，上下两个人有两个区间的距离发生了变化，叫为区间移动更容易理解。如
>
> $ta = 3,[1,4]->[4,7]->[7,10]->[10,13]$
>
> $tb = 4,[3,5]->[7,9]->[11,13]$
>
> $[1,4][3,5]$左端点相差$2$，这是一种区间状态，通过移动，会出现另一种区间状态$[10,13][11,13]$左端点相差$1$。移动了一步（$d = gcd(3,4) = 1$）

左端点不重合就尽可能逼近。

有两种状态可能是合适的。

> $dis$代表a区间左端点与b区间左端点相差的最小距离（a区间左端点我认为小于等于b区间左端点），即$dis = (lb - la) \% d$

- 区间a左端点移动到和区间b左端点相差$(lb-la) \% d$，可能是距离最近的
  -  $min(rb - lb + 1, ra - la + 1 - dis)$

- 然后是上面的情况在往后移一步，即区间a左端点超过区间b左端点$d-(lb-la)%d$
  - $dis = d - dis$ 
  - $min(ra - la + 1, rb - lb + 1 - dis)$

> 两个计算请画图领悟计算方法。
>
> 计算：左端点重合的情况可以合并在左端点能合并的代码里面，即左端点合并是左端点不合并的特殊情况。



# 代码

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
using pii = pair<int, int>;
const int N = 1e5 + 5, mod = 1e9 + 7;

// [l[a] + k * ta, r[a] + k * ta]
// 3 [1, 4] [4, 7] [7, 10] [10, 13] [13, 16] ---
// 4 [3, 5] [7, 9] [11, 13]         [15, 17] ---
// 起点尽可能相同
// 裴蜀定理：存在x,y 使 ax + by = gcd(a, b)
// la + x * ta = lb + y * tb
// x * ta - y * tb = lb - la
// gcd(ta, tb) | (lb - la)有解
// d = gcd(ta, tb) 看成相对移动的距离
// la -> la + d -> la + k * d    lb
// 差 = lb - la 
// dis = (lb - la) % d

void solve()
{
	int la, ra, ta, lb, rb, tb;
	cin >> la >> ra >> ta >> lb >> rb >> tb;
	if(la > lb)
	{
		swap(la, lb);
		swap(ra, rb);
		swap(ta, tb);
	}
	int d = __gcd(ta, tb);
	int dis = (lb - la) % d; // 左端点的差
	int ans = 0;
	ans = max(ans, min(rb - lb + 1, ra - la + 1 - dis));
	dis = d - dis; // 向右移动一步
	ans = max(ans, min(ra - la + 1, rb - lb + 1 - dis));
	cout << ans << "\n";
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

