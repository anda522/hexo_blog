---
title: Python实用库记录
top: false
cover: false
toc: true
mathjax: true
tags:
  - Python
categories:
  - Python
abbrlink: 7384120
date: 2024-01-29 16:08:30
password:
summary:
---

# tqdm

作用：实时显示迭代、循环的执行的进度条

`trange(i)` 是对`tqdm(range(i))` 特殊优化过的实例：

```python
from tqdm import tqdm, trange
ans = 0
for i in tqdm(range(1000)):
	for j in range(20000):
        ans += 1
for i in trange(1000):
    for j in range(20000):
        ans += 1
```

# loguru

一个日志模块，用来给程序打日志信息。

参考：https://cloud.tencent.com/developer/article/2295354
