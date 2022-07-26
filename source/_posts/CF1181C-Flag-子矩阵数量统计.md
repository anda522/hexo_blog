---
title: CF1181C Flag-子矩阵数量统计
top: false
cover: false
toc: true
mathjax: true
date: 2022-06-29 16:03:02
password:
summary: 
tags: 
  - CF
  - DP
categories: 
  - DP
---



# CF1181C Flag子矩阵数量统计

## 题目介绍

题目链接：

[https://codeforces.com/problemset/problem/1181/C](https://codeforces.com/problemset/problem/1181/C)

![题目描述](image-20220629160509729.png)

## 思路

### 维护变量

统计子矩阵一般都需要维护一些数组，大部分都是纵向维护或者横向维护。

本题维护两个数组：

$d[i][j]$ : $(i, j)$位置向下最多延伸相同颜色的块数

$r[i][j]$：$(i, j)$位置向右最多延伸相同颜色的块数



我们先考虑宽度为$1$的情况，统计该列的贡献时再考虑该列横向向右能达到的最大贡献。

同时需要再维护两个横向延伸的最小值数组：

$r[i][j]$ ：**前缀**（横向数组）最小值，$(x, j)$到$(i, j),x < i$横向向右的延伸长度的最小值，保证$(x, j)$到$(i, j)$的颜色相同，只有在颜色相同时才会更新最小值

> $r[i][j]$和声明的一样，但是此$r[i][j]$是利用上述数组更新来的（具体见代码）

$lmn[i][j]$ : **后缀**（横向数组）最小值，$(x, j)$到$(i, j), x > i$横向向右的延伸长度的最小值，保证$(x, j)$到$(i, j)$的颜色相同，只有在颜色相同时才会更新最小值



---

### 实现

先考虑宽度为1时，在纵向方向上能否构成国旗

即下面的条件（满足的旗子共三行，如题要求）

- $i + 3 * d[i][j] - 1 <= n$  第三行的旗子不越界

- $d[i][j] == d[i + d[i][j]][j]$ 第二行和第一行的长度相同

- $d[i + 2 \* d[i][j]][j] >= d[i][j]$ 第三行的长度**大于等于**上面的行长度（大于等于请思考为什么，只要大于等于就能统计上）



纵向能够形成旗子，那么考虑改纵向旗子的贡献。

> 求贡献：
>
> 因为每一个满足条件的纵向旗子都会求贡献，所以每个纵向旗子求贡献只用向右求就行。
>
> 以下为举例：
>
> AAA
>
> BBB
>
> CCC
>
> 最左边一列，可形成3种情况
>
> 中间一列，可形成2种情况
>
> 最右边一列，可形成1种情况
>
> 包含了所有的情况，总贡献就是 3 + 2 + 1
>
> 其实就是$n(n + 1) / 2$，亦或是递推式$f[i] = f[i - 1] + i$，思想基本一样



那么就要求贡献了

我们肯定需要找**最小**的向右扩展的长度才能算当前整体的贡献，最小向右扩展长度需要是**上中下**三部分的最小值。

故需要用到上述最小值（前缀和后缀）数组。

>  为什么要用到后缀数组?
>
> 以下为举例：满足情况的列用粗体标明
>
> A （无关紧要行）
>
> **A**
>
> **A**
>
> **B**
>
> **B**
>
> **C**
>
> **C**
>
> C（无关紧要行）
>
> 但是上下各多出一个字母，如果统计最小值时，上面部分用到前缀最小值数组，就会把第一行向右扩展的长度统计上去，造成统计错误。下面部分同理。
>
> 故上面部分需要用到后缀数组，下面部分需要用到前缀数组，中间部分无所谓

则当前列能够造成的贡献为 $min(lmn[i][j], r[i + 2 \* d[i][j] - 1][j], r[i + 3 * d[i][j] - 1][j])$



具体整体实现见代码。

## 代码

```cpp
#include<bits/stdc++.h>
using namespace std;
using ll = long long;
using pii = pair<int, int>;
const int N = 1005, mod = 1e9 + 7;

int d[N][N], r[N][N], lmn[N][N];
char s[N][N];

void solve()
{
	int n, m;
	cin >> n >> m;
	for(int i = 1; i <= n; i++)
		cin >> (s[i] + 1);

	for(int i = n; i; i--)
	{
		for(int j = m; j; j--)
		{
			d[i][j] = d[i + 1][j], r[i][j] = r[i][j + 1];

			if(s[i][j] == s[i + 1][j])
				d[i][j] ++;
			else d[i][j] = 1;
			
			if(s[i][j] == s[i][j + 1])
				r[i][j] ++;
			else r[i][j] = 1;
		}
	}

	for(int i = n; i; i--)
		for(int j = 1; j <= m; j++)
		{
			lmn[i][j] = r[i][j];
			if(i < n && s[i + 1][j] == s[i][j])
				lmn[i][j] = min(lmn[i][j], lmn[i + 1][j]);
		}

	for(int i = 2; i <= n; i++)
		for(int j = 1; j <= m; j++)
		{
			if(s[i][j] == s[i - 1][j])
				r[i][j] = min(r[i][j], r[i - 1][j]);
		}


	ll ans = 0;

	for(int i = 1; i <= n; i++)
		for(int j = 1; j <= m; j++)
		{
			if(i + 3 * d[i][j] - 1 <= n && d[i][j] == d[i + d[i][j]][j] && d[i + 2 * d[i][j]][j] >= d[i][j])
				ans += min({lmn[i][j], r[i + 2 * d[i][j] - 1][j], r[i + 3 * d[i][j] - 1][j]});
		}

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



![](/medias/gzh.jpg)
