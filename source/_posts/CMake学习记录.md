---
title: CMake命令总结
top: false
cover: false
toc: true
mathjax: true
tags:
  - CPP
categories:
  - CPP
abbrlink: 1592556892
date: 2024-02-08 14:58:33
password:
summary:
---

# CMake知识记录

![CMake和Make的关系](https://subingwen.cn/cmake/CMake-primer/image-20230309130644912.png)

# 不同环境下

## 1 Windows MinGW + CMake

Windows默认使用nmake编译，如果我们要使用 `MinGW` 来编译需要指定命令行参数。

```
cmake -G "MinGW Makefiles" ..
```

如果需要在 `cmake` 生成makefile文件的基础上构建项目，我们需要使用 `make` 命令，可以在 `MinGW` 编译器的 `bin` 文件夹下找到 `mingw32-make.exe` 文件，复制一份将名称重命名为 `make.exe` 。注意你也需要保证 `MinGW` 已经配置在环境变量中。

然后你就可以正常使用`cmake` 生成makefile文件和并且使用 `make` 来构建项目了。

一键命令，需要在Windows下，使用MinGW编译器，且命令行窗口为cmd：

```cmd
cd 项目根目录
rmdir /s/q build && mkdir build && cd build && cmake -G "MinGW Makefiles" .. && make
```



## 2 Linux

待补

# 一个简单的构建例子

在 `Demo` 文件夹下的目录树：

```
|─ CMakeLists.txt
|─ main.cpp
|─ utils.cpp
|─ utils.hpp
|─ build
```

utils.hpp：头文件，hpp是C++头文件的一种写法，此文件中不仅可以定义，也可以进行对应实现，不过下面没有体现。

```cpp
int add(int a, int b);
int sub(int a, int b);
int mul(int a, int b);
double divd(int a, int b);
```

utils.cpp

```cpp
int add(int a, int b) {
	return a + b;
}
int sub(int a, int b) {
	return a - b;
}
int mul(int a, int b) {
	return a * b;
}
double divd(int a, int b) {
	return (double)a / b;
}
```

main.cpp

```cpp
#include <iostream>
#include <stdio.h>
#include <stdlib.h>
#include "utils.hpp"

int main() {
	int a, b;
	std::cin >> a >> b;
	std::cout << add(a, b) << "\n";
	std::cout << sub(a, b) << "\n";
	std::cout << mul(a, b) << "\n";
	std::cout << divd(a, b) << "\n";
	system("pause");
	return 0;
}
```

CMakeLists.txt

```cmake
# 最小版本
cmake_minimum_required(VERSION 3.0)
# 声明一个工程
project(Demo)
# 定义工程会生成一个可执行程序
add_executable(app main.cpp utils.cpp)
```

一般我们会让cmake的结果存在另外一个新建的build目录，防止生成内容和已有项目产生混乱。在build目录中执行命令：（此时采用的是Windows MinGW编译器）

```
cmake -G "MinGW Makefiles" ..
```

然后在build文件夹中执行 `make` 命令即可构建可执行程序完成。

# 命令介绍

## 1 cmake_minimum_required

作用：指定使用的 cmake 的最低版本

```cmake
cmake_minimum_required(3.5)
```

## 2 project

作用：定义工程名称，并可指定工程的版本、工程描述、web主页地址、支持的语言（默认情况支持所有语言），如果不需要这些都是可以忽略的，只需要指定出工程名字即可。

```cmake
# PROJECT 指令的语法是：
project(<PROJECT-NAME> [<language-name>...])
project(<PROJECT-NAME>
       [VERSION <major>[.<minor>[.<patch>[.<tweak>]]]]
       [DESCRIPTION <project-description-string>]
       [HOMEPAGE_URL <url-string>]
       [LANGUAGES <language-name>...])
```

如：

```cmake
# 项目名称为Demo
project(Demo)
```

## 3 add_executable

作用：添加可执行程序名称和源文件

```cmake
add_executable(可执行程序名 源文件名称)
```

这样生成的可执行程序的名称就为指定的名称，源文件为 `.c .cpp` 文件，可以为多个，多个文件用空格或者 `;` 隔开。

## 4 set

作用：定义变量

```cmake
# SET 指令的语法是：
# [] 中的参数为可选项, 如不需要可以不写
SET(NAME [VALUE] [CACHE TYPE DOCSTRING [FORCE]])
# NAME：变量名   VALUE：变量值
```

定义之后就可以使用 `${}` 使用变量了。

```cmake
set(SRC_LIST utils.cpp main.cpp)
add_executable(app ${SRC_LIST})
```

## 5 搜索文件

### 5.1 aux_source_directory

作用：查找某个路径下的所有源文件

```cmake
# dir: 要搜索的目录
# variable: 将搜索到的源文件列表存在variable变量中
aux_source_directory(<dir> <variable>)
```

### 5.2 file

作用：搜索文件

```cmake
file(GLOB/GLOB_RECURSE 变量名 要搜索的文件路径和文件类型)
```

> 注意：通过file搜索出来的都是绝对路径

此处可以选两个参数：

- GLOB：将指定目录下搜索到的满足条件的所有文件名生成一个列表，并将其存储到变量中。
- GLOB_RECURSE：递归搜索指定目录，将搜索到的满足条件的文件名生成一个列表，并将其存储到变量中。

```cmake
file(GLOB MAIN_SRC ${CMAKE_CURRENT_SOURCE_DIR}/src/*.cpp)
file(GLOB MAIN_HEAD ${CMAKE_CURRENT_SOURCE_DIR}/include/*.h)
```

## 6 include_directories

作用：包含头文件，指定头文件路径，便可包含此路径下的头文件

```cmake
include_directories(headpath)
```

## 7 add_library

有些源代码我们不需要将其编译成可执行程序，而是制作成静态库或动态库文件让第三方使用。

### 7.1 制作动态库

```cmake
add_library(库名 SHARED 源文件1 [源文件2] ...) 
```

动态库的最终库名分为三部分：`lib` + `库名` + `.so` ，我们只需要指定库名即可。

### 7.2 制作静态库

```cmake
add_library(库名 STATIC 源文件1 [源文件2] ...) 
```

静态库的最终库名分为三部分：`lib` + `库名` + `.a` ，我们只需要指定库名即可。

## 8 加载库文件

动态库和静态库的区别：

- 静态库会在生成可执行程序的链接阶段被打包到可执行程序中，所以可执行程序启动，静态库就被加载到内存中了。
- 动态库在生成可执行程序的链接阶段不会被打包到可执行程序中，当可执行程序被启动并且调用了动态库中的函数的时候，动态库才会被加载到内存。所以在cmake中，**需要将动态库链接的命令写在生成了可执行文件（即add_executable）之后**

### 8.1 link_libraries 加载静态库

```cmake
# 静态库如果不是系统的，需要包含静态库路径
link_directories(<lib path>)
# 链接静态库
link_libraries(<static lib> [<static lib>...])
```

- 参数1：指定出要链接的静态库的名字
  - 可以是全名 `libxxx.a`
  - 也可以是掐头（`lib`）去尾（`.a`）之后的名字 `xxx`

- 参数2-N：要链接的其它静态库的名字

### 8.2 target_link_libraries 加载动态库

```cmake
# 动态库如果不是系统的，需要包含动态库路径，也是这个命令
link_directories(<lib path>)
# 链接动态库
target_link_libraries(
    <target> 
    <PRIVATE|PUBLIC|INTERFACE> <item>... 
    [<PRIVATE|PUBLIC|INTERFACE> <item>...]...)
```

> `target_link_libraries` 既可以链接动态库文件，也可以链接静态库文件。

## 9 message

作用：打日志信息。

```cmake
message([STATUS|WARNING|AUTHOR_WARNING|FATAL_ERROR|SEND_ERROR] "message to display" ...)
```

- (无) ：重要消息
- STATUS ：非重要消息
- WARNING：CMake 警告, 会继续执行
- AUTHOR_WARNING：CMake 警告 (dev), 会继续执行
- SEND_ERROR：CMake 错误, 继续执行，但是会跳过生成的步骤
- FATAL_ERROR：CMake 错误, 终止所有处理过程

```cmake
# 输出一般日志信息
message(STATUS "source path: ${PROJECT_SOURCE_DIR}")
# 输出警告信息
message(WARNING "source path: ${PROJECT_SOURCE_DIR}")
# 输出错误信息
message(FATAL_ERROR "source path: ${PROJECT_SOURCE_DIR}")
```

## 10 list

### 10.1 append拼接

```cmake
list(APPEND <list> [<element> ...])
```

`APPEND` 表示数据追加，把 `element` 追加到 `list` 中。

```cmake
cmake_minimum_required(VERSION 3.0)
project(TEST)
set(TEMP "hello,world")
file(GLOB SRC_1 ${PROJECT_SOURCE_DIR}/src1/*.cpp)
file(GLOB SRC_2 ${PROJECT_SOURCE_DIR}/src2/*.cpp)
# 追加(拼接)
list(APPEND SRC_1 ${SRC_1} ${SRC_2} ${TEMP})
message(STATUS "message: ${SRC_1}")
```

### 10.2 remove_item移除

```cmake
list(REMOVE_ITEM <list> <value> [<value> ...])
```



## 11 add_definitions

作用：添加宏定义

```cmake
add_definitions(-D宏名称)
```

```cmake
cmake_minimum_required(VERSION 3.0)
project(TEST)
# 自定义 DEBUG 宏
add_definitions(-DDEBUG)
add_executable(app ./test.c)
```



# 嵌套CMake

在通过CMake管理项目的时候如果只使用一个CMakeLists.txt，那么这个文件相对会比较复杂，有一种化繁为简的方式就是给每个源码目录都添加一个CMakeLists.txt文件。

嵌套的 CMake 是一个树状结构，最顶层的 CMakeLists.txt 是根节点，其次都是子节点。以下是关于 CMakeLists.txt 文件变量作用域的一些信息：

- 根节点`CMakeLists.txt`中的变量全局有效
- 父节点`CMakeLists.txt`中的变量可以在子节点中使用
- 子节点`CMakeLists.txt`中的变量只能在当前节点中使用

# 流程控制语句

## 1 条件判断

判断语句结构如下：

```cmake
if(<condition>)
  <commands>
elseif(<condition>) # 可选块, 可以重复
  <commands>
else()              # 可选块
  <commands>
endif()
```

条件判断方面：

- 有 `NOT, AND, OR` 逻辑运算符
- 有 `LESS, GREATER, EQUAL, LESS_EQUAL, GREATER_EQUAL` 数值比较运算符
- 还有文件相关的判断
  - `EXISTS path` ：判断 `path` 路径对应的文件或目录是否存在
  - `IS_DIRECTORY path` ：判断是不是目录，`path` 需要为绝对路径
  - `IS_ABSOLUTE path` ：判断是不是绝对路径

## 2 循环

### 2.1 foreach

结构：

```cmake
foreach(<loop_var> <items>)
    <commands>
endforeach()
```

- `foreach(var RANGE stop)` ：取值范围为 `[0, stop]` ，每次取值都会将值放到变量 `var` 中。
- `foreach(var RANGE start stop step)` ：取值范围为 `[start, stop]`，每次取值都会将值放到变量 `var` 中，步长为 `step` 。
- `foreach(var IN lists)` ：每次取`lists`中的值放到 `var` 中，`lists` 可以为多个。

### 2.2 while

结构：

```cmake
while(<condition>)
    <commands>
endwhile()
```

# 宏

## 1 预定义宏

列举cmake自带的宏，可以对宏进行指定变量，按照我们的意图去进行相关操作。

| 宏                       | 介绍                                                         |
| ------------------------ | ------------------------------------------------------------ |
| PROJECT_SOURCE_DIR       | 使用cmake命令时，后面紧跟的目录，一般是工程的根目录          |
| PROJECT_BINARY_DIR       | 执行cmake命令时的目录                                        |
| CMAKE_CURRENT_SOURCE_DIR | 当前处理的CMakeLists.txt所在的路径                           |
| CMAKE_CURRENT_BINARY_DIR | target 编译目录                                              |
| EXECUTABLE_OUTPUT_PATH   | 重新定义目标二进制可执行文件的存放位置，可以指定动态库生成路径 |
| LIBRARY_OUTPUT_PATH      | 重新定义目标链接库文件的存放位置，可以指定静态库和动态库生成路径 |
| PROJECT_NAME             | 返回通过PROJECT指令定义的项目名称                            |
| CMAKE_BINARY_DIR         | 项目实际构建路径，假设在 `build` 目录进行的构建，那么得到的就是这个目录的路径 |

也可以自定义指定上述宏的路径，如

```cmake
set(HOME /home/wyq/Demo)
set(EXECUTABLE_OUTPUT_PATH ${HOME}/bin)
```

## 2 其他宏

- CMAKE_CXX_STANDARD

项目编译的语言标准，可以进行指定

```cmake
# 指定C++20标准
set(CMAKE_CXX_STANDARD 20)
```







参考文章：

[1] CMake保姆级教程（上）https://subingwen.cn/cmake/CMake-primer/index.html

[2] CMake保姆级教程（下）https://subingwen.cn/cmake/CMake-advanced/
