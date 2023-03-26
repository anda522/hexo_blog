---
title: matplotlib画图
top: false
cover: false
toc: true
mathjax: true
abbrlink: 3804173379
date: 2023-03-26 10:51:42
password:
summary:
tags:
  - Python
  - 画图
categories:
  - 人工智能
  - Python
---

# matplotlib.pyplot

# 折线图绘制



# 子图操作

```python
import matplotlib.pyplot as plt
fig = plt.figure()
# fig = plt.figure(figsize=(4, 3)) 画的图大小宽4高3
# 在 2 * 2 图像中显示在第1,2,4个位置(从1开始)
ax1 = fig.add_subplot(2, 2, 1)
ax2 = fig.add_subplot(2, 2, 2)
ax3 = fig.add_subplot(2, 2, 4)
plt.show()
```

对子图分别进行操作

```python
ax1.plot()
ax2.plot()
plt.show()
```

