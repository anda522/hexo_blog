---
title: C++多线程
top: false
cover: false
toc: true
mathjax: true
abbrlink: 2668140628
date: 2023-03-18 09:57:44
password:
summary:
tags:
categories:
---

# C++多线程

> 参考：
>
> C++11 thread多线程：https://blog.csdn.net/sjc_0910/article/details/118861539
>
> C++11 左右值引用：https://blog.csdn.net/Jacky_Feng/article/details/120742414
>
> C++11 移动构造函数：https://zhuanlan.zhihu.com/p/365412262

# C++11 std::thread

在C中已经有一个叫做`pthread`的东西来进行多线程编程，但是并不好用 ，所以c++11标准库中出现了一个叫作`std::thread`的东西。

## 1 成员函数

构造函数和析构函数

| 函数                                                         | 类别           | 作用                                       |
| ------------------------------------------------------------ | -------------- | ------------------------------------------ |
| `thread() noexcept`                                          | 默认构造函数   | 创建一个线程， 什么也不做                  |
| `template <class Fn, class… Args> explicit thread(Fn&& fn, Args&&… args)` | 初始化构造函数 | 创建一个线程， 以`args`为参数 执行`fn`函数 |
| `thread(const thread&) = delete`                             | 复制构造函数   | （已删除）                                 |
| `thread(thread&& x) noexcept`                                | 移动构造函数   | 构造一个与`x` 相同的对象,会破坏`x`对象     |
| `~thread()`                                                  | 析构函数       | 析构对象                                   |

成员函数

|               函数                |                             作用                             |
| :-------------------------------: | :----------------------------------------------------------: |
|           `void join()`           |               等待线程结束并清理资源（会阻塞）               |
|         `bool joinable()`         |                 返回线程是否可以执行join函数                 |
|          `void detach()`          | 将线程与调用其的线程分离，彼此独立执行（此函数必须在线程创建时立即调用，且调用此函数会使其不能被join） |
|    `std::thread::id get_id()`     |                          获取线程id                          |
| `thread& operator=(thread &&rhs)` | 见移动构造函数（如果对象是joinable的，那么会调用`std::terminate()`结果程序） |

## 2 示例

- `lambda`表达式传参

```cpp
#include<iostream>
#include<thread>

void func() {
	std::cout << "HiHiHi";
}
int main() {
	std::thread td1([] {
		std::cout << "Hello,";
	}), td2([] {
		std::cout << "World!";
	}), td3(func);

	td1.join();
	td2.join();
	td3.join();
	return 0;
}
```

多线程运行时是以异步方式执行的，异步方式可以同时执行多条语句。

在上面的例子中，我们定义了3个thread，这3个thread在执行时并不会按照一定的顺序。

输出可能以任意一个顺序输出。

- 传入的函数带参数

```cpp
#include<iostream>
#include<thread>

void func(int a, int b) {
	std::cout << "Answer: " << a + b;
}
int main() {
	std::thread td3(func, 1, 2);

	td3.join();
	return 0;
}
```

- 执行带引用参数的函数

注意观察构造函数：`Args&&... args`

很明显的右值引用，那么我们该如何传递一个左值呢？`std::ref`和`std::cref`很好地解决了这个问题。

`std::ref` 可以包装按引用传递的值。

`std::cref` 可以包装按`const`引用传递的值。

```cpp
#include<iostream>
#include<thread>

template<class T>
void changeValue(T& x, T val) {
	x = val;
}

int main() {
	std::thread t[20];
	int nums[20];

	// 调用构造函数
	for(int i = 0; i < 20; i++) {
		t[i] = std::thread(changeValue<int>, std::ref(nums[i]), i + 1);
	}

	for(int i = 0; i < 20; i++) {
		t[i].join();
		std::cout << nums[i] << "\n";
	}
	return 0;
}
```

## 3 注意

- 线程是在thread对象被定义的时候开始执行的，而不是在调用join函数时才执行的，调用join函数只是阻塞等待线程结束并回收资源。
- 分离的线程（执行过detach的线程）会在调用它的线程结束或自己结束时释放资源。
- 线程会在函数运行完毕后自动释放，不推荐利用其他方法强制结束线程，可能会因资源未释放而导致内存泄漏。

- **没有执行`join`或`detach`的线程在程序结束时会引发异常**

# C++11 std::mutex

多线程操作同一变量



