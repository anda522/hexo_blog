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

相关设置：

如果是在notebook中想使用**嵌入式绘图**，需添加

```python
%matplotlib inline
```

如果想使用**交互式绘图**，需添加

```python
%matplotlib notebook
```



# 折线图绘制



# 子图操作

`figure`相当于一张画布，画布中可以添加子图

```python
import matplotlib.pyplot as plt
fig = plt.figure()
# fig = plt.figure(figsize=(4, 3)) 画的图大小宽4高3

# 在 2*2 方格中（假设画布被分成了4个网格） 显示在第1,2,4个位置(从1开始)
ax1 = fig.add_subplot(2, 2, 1)
ax2 = fig.add_subplot(2, 2, 2)
ax3 = fig.add_subplot(2, 2, 4) # 还可以简写参数为224
plt.show() # 此时就可以显示出图像了，此时图像具有横纵坐标相关信息
```

对子图分别进行操作

```python
ax1.plot()
ax2.plot()
plt.show()
```

# 操作-显示图片

第一种：使用`IPython + PIL`进行显示

下面代码显示多张图片，多张图片在一列显示，看着可能不美观。

```python
from PIL import Image
from IPython.display import display

# 显示多张图像
for file_path in file_list:
    img = Image.open(file_path)
	# 同时还可以修改显示图片的尺寸 修改成180 * 180
    img.resize((180, 180))
    display(img)
```

第二种：使用`matplotlib` 子图功能进行显示

```python
import cv2
import matplotlib.pyplot as plt

path = ''
img = cv2.imread(path)
ax1 = fig.add_subplot(2, 2, 1)
ax1.imshow(img) # 此时第一个位置就显示出对应路径的图像了，此时具有坐标轴信息

ax2 = fig.add_subplot(2, 2, 2)
plt.imshow(img) # 也可以这样写，默认图像显示到最新子图的位置
ax3 = fig.add_subplot(2, 2, 4) # 还可以简写参数为224
```

