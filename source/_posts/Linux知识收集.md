---
title: Linux知识收集
top: false
cover: false
toc: true
mathjax: true
date: 2024-01-30 08:52:06
password:
summary:
tags:
  - Linux
categories:	
  - 开发知识
---

> 本文记录一些Linux相关的知识点，用来精进自己的Linux操作。

# Shell输出输入重定向

默认情况下，总是有三个文件处于打开状态，标准输入(键盘输入)、标准输出（输出到屏幕）、标准错误（也是输出到屏幕），它们分别对应的**文件描述符**是0，1，2 。

## 重定向stderr到stdout

能够实现正确输出和错误输出都输出到文件中去，可以使用 `command > file 2>&1` 命令。

重定向stderr到stdout的另一种方法是使用 `&>` 构造，它具备 `2>&1` 的含义。

即 `command &> file`。

> 参考：
>
> - Shell重定向https://blog.csdn.net/u011630575/article/details/52151995
>
> - 鸟哥私房菜重定向：https://blog.csdn.net/kevinhanser/article/details/60983539
