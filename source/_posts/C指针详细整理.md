---
title: C/C++指针操作详细整理
top: false
cover: false
toc: true
mathjax: true
tags:
  - CPP
categories:
  - CPP
abbrlink: 360366309
date: 2023-12-08 18:42:58
password:
summary:
---

# C/C++指针操作整理

> 面向曾经学习过指针的人，并非针对究极初学者。

# 一维指针

数据类型存储的地址，指向数据存储的地址，可以使用 `&`运算符取变量的地址，将其赋给指针变量。

```cpp
int a = 2;
int *p = &a;
```

同时因为C/C++中数组是连续存储的，所以一个指针可以间接访问一个数组，可以通过指针的**解引用**访问该地址处存储的值。

知识点：

- 一个数组的数组名默认代表这个数组的地址。
- 可以通过 `地址加减` 和 `下标法` 访问连续存储的数据。

```cpp
int a[4] = {1, 2, 3, 4};
int *p = a;
for (int i = 0; i < 4; ++i) {
    // 下面两行代码等价,
//    std::cout << p[i] << " ";
    std::cout << *(p + i) << " ";
}
```

同样的，对于 `char` 类型，也有：

```cpp
char s[] = "ABCDEF";
char *p = s; // s代表字符串首地址
for (int i = 0; i < int(strlen(s)); ++i) {
    // std::cout << p[i];
    std::cout << *(p + i); // 输出单个字符
}
std::cout << "\n";
std::cout << p << "\n"; // 输出整个字符串
```

特别的：针对 `char` 类型，可以直接输出首地址，编译器会自动将地址加一往后输出，直到遇到 `\0` 字符，即字符串结尾字符。（注意 `string` 类型没有 `\0` 结尾字符）

其他数据类型基本同理。

# 二维指针

即指针的指针，就是指针存储的是一个指针变量的存储地址，输出的时候就需要两层解引用了。

```cpp
int val = 4;
int *p1 = &val;
int **p2 = &p1;
std::cout << **p2 << "\n";
```



# 数组指针和指针数组

## 1 数组指针

即数组的指针，代表整个数组的地址。由于 `[]` 优先级大于 `*`， 所以需要使用 `()` 代表 `p` 存储一个长度为 `3` 的数组的地址。

``` cpp
int (*p)[3];
```

## 2 指针数组

即数组中存储的是指针变量， `*` 首先和 `int` 结合。

```cpp
int *p[2];
```

# 一些指针操作

> 需要了解下new操作

## 1 创建二维动态数组

- 方法一：利用**二维指针**，C++ new操作

定义一个二维指针，二维指针指向的是长度为 `n` 的数组（数组中存储的是指针变量）的地址，即定义 `f` 时就指向了一个数组的首地址，而这个数组中的每个指针元素代表了二维数组每一行的首地址。

> 可以这样理解：一个 `*` 代表的是地址，去掉这个 `*` 剩下的就是这个地址指向值的类型，那么 `int **f` 去掉一个 `*` 就剩下了 `int *` ，也就是这个指针指向值的类型为 `int*` 。

然后利用循环，对二维指针进行操作，每维申请一个长度为 `m` 的数组，刚好 `new` 操作返回的就是一个数组的首地址，就可以赋给 `f[i]`

```cpp
int **f = new int*[n];
for (int i = 0; i < n; ++i) {
    f[i] = new int[m];
}
// 同样可以以数组形式输出
for (int i = 0; i < n; ++i) {
	for (int j = 0; j < m; ++j) {
		f[i][j] = i * n + j;
		std::cout << f[i][j] << " \n"[j == m - 1];
	}
}
```

- 方法二：利用**二维指针**，C malloc操作

```c
int **f = (int**)malloc(sizeof(int*) * n);
for (int i = 0; i < n; ++i) {
    f[i] = (int*)malloc(sizeof(int) * m);
}
```

- 方法三：使用**数组指针**

直接定义个数组指针指向整个二维数组

```cpp
int (*p)[3] = new int[2][3];
int cnt = 0;
for (int i = 0; i < 2; ++i) {
	for (int j = 0; j < 3; ++j) {
		// *(*(p + i) + j) = ++cnt;
		// std::cout << *(*(p + i) + j) << " \n"[j == 2];
		p[i][j] = ++cnt;
		std::cout << p[i][j] << " \n"[j == 2];
	}
}
```

- 方法四：使用C++ `vector` 

声明了等价于 `a[n][m]` 的数组

```cpp
vector<vector<int>> a(n, vector<int>(m, 0));
```

## 2 数组传参

> 注意：数组传参数会退化成指针，一维数组传递退化成指向数组首元素的指针。

### 2.1 一维数组传参

- 使用一维指针传参，传入数组首地址

```c
#include <stdio.h>
void print(int *b, int len) {
	for (int i = 0; i < len; ++i) {
		printf("%d ", *(b + i));
	}
}
int main() {
	int a[3] = {1, 2, 3};
	int length = sizeof(a) / sizeof(a[0]);
	print(a, length);
	return 0;
}
```

- 使用数组指针传参，传入数组地址

此时， `b` 指向了一个长度为 `3` 的数组，`*b` 先对第二维解引用，然后才是对第一维（即传入的 `a[3]` ）操作。 

```cpp
#include <stdio.h>
void print(int (*b)[3], int len) {
	for (int i = 0; i < len; ++i) {
		printf("%d ", *(*b + i));
	}
}
int main() {
	int a[3] = {1, 2, 3};
	int length = sizeof(a) / sizeof(a[0]);
	print(&a, length); // 注意此时传入了数组的地址
	return 0;
}
```

- 传入数组指针，传入数组的首地址

```cpp
#include <stdio.h>
void print(int b[], int len) {
	for (int i = 0; i < len; ++i) {
		printf("%d ", *(b + i));
	}
}
int main() {
	int a[3] = {1, 2, 3};
	int length = sizeof(a) / sizeof(a[0]);
	print(a, length);
	return 0;
}
```

- CPP：传引用

> 可以防止数组退化成指针

```cpp
#include <iostream>
void print(int (&b)[3], int len) {
	for (int i = 0; i < len; ++i) {
		printf("%d ", *(b + i));
	}
}
int main() {
	int a[3] = {1, 2, 3};
	int length = sizeof(a) / sizeof(a[0]);
	print(a, length);
	return 0;
}
```



### 2.2 二维数组传参

- 使用数组指针传参，传入第二维数组的首地址

> 同样会退化成指针，二维数组传递会退化成指向数组一维元素（即 `[3]` 这一维）的指针，指向的是一个长度为 3 的数组。
>
> 传参时，二维必须固定

```cpp
#include <iostream>
void print(int (*b)[3]) {
	for (int i = 0; i < 2; ++i) {
		for (int j = 0; j < 3; ++j) {
			printf("%d ", *(*(b + i) + j));
		}
	}
}
int main() {
	int a[2][3] = {{1, 2, 3}, {4, 5, 6}};
	print(a);
	return 0;
}
```

- 使用数组指针传参，传入第二维数组的首地址

> 传参时，一维可以不固定，二维必须固定。

```cpp
#include <iostream>
void print(int b[][3]) {
	for (int i = 0; i < 2; ++i) {
		for (int j = 0; j < 3; ++j) {
			printf("%d ", *(*(b + i) + j));
		}
	}
}
int main() {
	int a[2][3] = {{1, 2, 3}, {4, 5, 6}};
	print(a);
	return 0;
}
```

- CPP：使用引用传参

``` cpp
#include <iostream>
void print(int (&b)[2][3]) {
	for (int i = 0; i < 2; ++i) {
		for (int j = 0; j < 3; ++j) {
			printf("%d ", *(*(b + i) + j));
		}
	}
}
int main() {
	int a[2][3] = {{1, 2, 3}, {4, 5, 6}};
	print(a);
	return 0;
}
```

