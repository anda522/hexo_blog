---
title: C++11 多线程
top: false
cover: false
toc: true
mathjax: true
abbrlink: 2668140628
date: 2023-03-18 09:57:44
password:
summary:
tags:
  - C++
  - 多线程
categories:
  - C++
---

# C++11 多线程

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
|           `void join()`           |              等待子线程结束并清理资源（会阻塞）              |
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

> `join`函数是等待子线程完成，然后主线程再继续执行

- 分离的线程（执行过detach的线程）会在调用它的线程结束或自己结束时释放资源。
- 线程会在函数运行完毕后自动释放，不推荐利用其他方法强制结束线程，可能会因资源未释放而导致内存泄漏。
- **没有执行`join`或`detach`的线程在程序结束时会引发异常**

# C++11 std::mutex与std::atomic

## 1 std::mutex

多线程操作同一变量

```cpp
#include<iostream>
#include<thread>

int val = 0;
void increase() {
	for(int i = 1; i <= 100000; i++) {
		val++;
	}
}

int main() {
	std::thread t[20];

	for(int i = 0; i < 20; i++) {
		t[i] = std::thread(increase);
	}
	for(int i = 0; i < 20; i++) {
		t[i].join();
	}
	std::cout << val << "\n";	
	return 0;
}
```

可以发现此代码输出并不是正常情况下的`2000000`，原因就是多线程访问并修改一个变量时造成了冲突，所以mutex派上用场

|       函数        |                             作用                             |
| :---------------: | :----------------------------------------------------------: |
|   `void lock()`   | 将mutex上锁。 <br />如果mutex已经被其它线程上锁， 那么会阻塞，直到解锁；<br /> 如果mutex已经被同一个线程锁住， 那么会产生死锁。 |
|  `void unlock()`  | 解锁mutex，释放其所有权。 如果有线程因为调用lock()不能上锁而被阻塞，则调用此函数会将mutex的主动权随机交给其中一个线程； 如果mutex不是被此线程上锁，那么会引发未定义的异常。 |
| `bool try_lock()` | 尝试将mutex上锁。 如果mutex未被上锁，则将其上锁并返回true； <br />如果mutex已被锁则返回false。 |

可以利用mutex进行改进：

```cpp
#include<iostream>
#include<thread>
#include<mutex>

std::mutex mtx;
int val = 0;

void increase() {
	for(int i = 1; i <= 100000; i++) {
		mtx.lock();
		val++;
		mtx.unlock();
	}
}

int main() {
	std::thread t[20];

	for(int i = 0; i < 20; i++) {
		t[i] = std::thread(increase);
	}
	for(int i = 0; i < 20; i++) {
		t[i].join();
	}
	std::cout << val << "\n";
	return 0;
}
```

## 2 std::atomic

mutex每次循环都要加锁解锁，比较慢，而atomic比较快。将上述代码改成下面代码同样也可。

```cpp
#include<iostream>
#include<thread>
#include<atomic>

std::atomic_int val = 0;

void increase() {
	for(int i = 1; i <= 100000; i++) {
		val++;
	}
}

int main() {
	std::thread t[20];

	for(int i = 0; i < 20; i++) {
		t[i] = std::thread(increase);
	}
	for(int i = 0; i < 20; i++) {
		t[i].join();
	}
	std::cout << val << "\n";
	return 0;
}
```

`std::atomic_int`只是`std::atomic<int>`的别名。

即使是多线程，也要像同步进行一样**同步操作**atomic对象，从而省去了mutex上锁、解锁的时间消耗。

|              构造函数              |      类型      |                            作用                             |
| :--------------------------------: | :------------: | :---------------------------------------------------------: |
|   `atomic() noexcept = default`    |  默认构造函数  | 构造一个atomic对象（未初始化，可通过atomic_init进行初始化） |
| `constexpr atomic(T val) noexcept` | 初始化构造函数 |           构造一个atomic对象，用`val`的值来初始化           |

# C++11 std::async

## 1 async

> 头文件`<future>`

**大多数情况下使用async而不用thread**

- thread可以快速、方便地创建线程，但在async面前，就是小巫见大巫了。
- async可以根据情况选择同步执行或创建新线程来异步执行，当然也可以手动选择。对于async的返回值操作也比thread更加方便。

**std::async参数：**

不同于thread，async是一个函数，所以没有成员函数。

| 重载版本                                                     | 作用                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| template <class Fn, class… Args> <br />future<typename result_of<Fn(Args…)>::type>  <br />`async (Fn&& fn, Args&&… args)` | 异步或同步（根据操作系统而定）以args为参数执行fn<br/>同样地，传递引用参数需要`std::ref`或`std::cref` |
| template <class Fn, class… Args><br/> future<typename result_of<Fn(Args…)>::type><br/>  `async (launch policy, Fn&& fn, Args&&… args);` | 异步或同步（根据`policy`参数而定（见下文））以args为参数执行fn，引用参数同上 |

## 2 std::launch强枚举类（enum class）

std::launch有2个枚举值和1个特殊值：

| 标识符                                    | 实际值   | 作用                                                         |
| ----------------------------------------- | -------- | ------------------------------------------------------------ |
| 枚举值：launch::async                     | 0x1（1） | 异步启动                                                     |
| 枚举值：launch::deferred                  | 0x2（2） | 在调用`future::get`、`future::wait`时同步启动（std::future见后文） |
| 特殊值：launch::async \| launch::deferred | 0x3（3） | 同步或异步，根据操作系统而定                                 |

```cpp
#include<iostream>
#include<thread>
#include<future>

int main() {
	std::async(std::launch::async, [](const char* message) {
		std::cout << message;
	}, "Hello, ");
	std::cout << "World\n";
	return 0;
}
```

编译器可能会有警告，因为编译器不想让你丢弃async的返回值std::future，不过在这个例子中不需要它，忽略这个警告就行了。

## 3 std::future

使用它获取函数返回值

```cpp
#include<iostream>
#include<thread>
#include<future>

template<class... Args>
decltype(auto) sum(Args&&... args) {
	return (0 + ... + args);
}

int main() {
	std::future<int> val = std::async(std::launch::async, sum<int, int, int>, 1, 2, 3);
	std::cout << val.get() << "\n";
	return 0;
}
```

输出

```cpp
6
```

