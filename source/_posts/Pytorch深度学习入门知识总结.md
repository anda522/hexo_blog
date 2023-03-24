---
title: Pytorch入门知识总结
top: false
cover: false
toc: true
mathjax: true
tags:
  - Pytorch
categories:
  - 人工智能
abbrlink: 1888017128
date: 2022-12-14 21:53:28
password:
summary:
---

# Pytorch深度学习入门知识总结

# GPU相关

检查GPU是否工作

```python
import torch
torch.cuda.is_available()
```

# Dataset

可以继承Dataset来制作自己的数据类

```python
from torch.utils.data import Dataset
from PIL import Image
import os


class MyData(Dataset):
    """
    For example:
    root_dir: D:/code/data
    label_dir: ants
    """
    def __init__(self, root_dir, label_dir):
        # 图片根路径
        self.root_dir = root_dir
        # 图片标签名称
        self.label_dir = label_dir
        # 数据根路径 + 标签名（标签下存有对应的图片）
        self.path = os.path.join(root_dir,label_dir)
        # 获取文件夹下的所有文件名，生成列表
        self.img_path = os.listdir(self.path)

    def __getitem__(self, idx):
        img_name = self.img_path[idx]
        img_item_path = os.path.join(self.path,img_name)
        img = Image.open(img_item_path)
        label = self.label_dir
        return img, label

    def __len__(self):
        return len(self.img_path)
```

可以使用使用数组中的索引操作等

```python
# flower_photos下有多个目录，每个目录的名称都是数据的标签,然后每个目录下都有该标签的对应数据
root_dir = "D:\\code\\data\\flower_photos"

# daisy数据集
daisy_label_dir = "daisy"
daisy_dataset = MyData(root_dir, daisy_label_dir)
# roses数据集
roses_label_dir = "roses"
roses_dataset = MyData(root_dir, roses_label_dir)

# 可以进行数据集合并操作
dataset = daisy_dataset + roses_dataset

# 可以进行索引索引操作，取最后一个数据
roses_img , label = dataset[-1]

# 返回的数据roses_img是PIL类型
```

# Tensorboard

初始化

```python
from torch.utils.tensorboard import SummaryWriter
import numpy as np
from PIL import Image
writer = SummaryWriter("logs")  # 在当前目录logs目录下生成文件
```

最后需要对writter进行关闭

```python
writer.close()
```

可视化查看文件，在当前CMD工作目录下（必须具有对应的python环境）输入以下命令打开

```
tensorboard --logdir=logs
```

或者添加参数指定打开端口

```
tensorboard --logdir=logs --port=6006
```

## 1 添加单张图片

添加`ndarray`型图片

```python
image_path = "./flower_photos/daisy/5673728_71b8cb57eb.jpg" #  用户需要自己设置成电脑上图片的路径
# 打开图片，转化为PIL类型
img_PIL = Image.open(image_path)
# 将PIL类型图片转化为numpy型图片
img_array = np.array(img_PIL)
# shape为HWC(高 宽 颜色)
print(img_array.shape)  # (332, 500, 3)
# title 传入图片  步长  shape形式
writer.add_image("ndarray", img_array, global_step=1, dataformats="HWC")
```

添加`tensor`类型图片

```python
image_path = "./flower_photos/daisy/5673728_71b8cb57eb.jpg" #  用户需要自己设置成电脑上图片的路径
img_PIL = Image.open(image_path)
trans_totensor = transforms.ToTensor()
tensor_img = trans_totensor(img_PIL)
writer.add_image("tensor", tensor_img)
```

## 2 添加公式图像

```python
# 添加函数图像,显示函数图像
for i in range(100):
    # 标题 y轴 x轴
	writer.add_scalar("y = x", i, i)  # value, step
```

## 3 添加多个图片

```python
# 图片已经通过transform转变为tensor类型，transform可见下文
test_data = torchvision.datasets.CIFAR10("./dataset", train=False, transform=torchvision.transforms.ToTensor())
test_loader = DataLoader(dataset=test_data, batch_size=64, shuffle=True, num_workers=0, drop_last=False)
writer = SummaryWriter("logs")
step = 0
for data in test_loader:
    imgs, targets = data
    writer.add_images("epoch", imgs, step)  # 将64张图片添加进去
    step = step + 1
writer.close()
```

# Transforms

```python
writer = SummaryWriter("logs")
img = Image.open("./flower_photos/daisy/5673728_71b8cb57eb.jpg")
```

## 1 ToTensor

```python
trans_totensor = transforms.ToTensor()
tensor_img = trans_totensor(img)
writer.add_image("tensor", tensor_img)
```

## 2 Normalize归一化

```python
# output[channel] = (input[channel] - mean[channel]) / std[channel] （输入 - 平均值） / 标准差
# 下例：(input - 0.5) / 0.5 = 2 * input - 1
trans_norm = transforms.Normalize([0.5, 0.5, 0.5], [0.5, 0.5, 0.5])
img_norm = trans_norm(tensor_img)
print(img_norm[0][0][0])
writer.add_image("Normalize", img_norm, 0)
```



## 3 Resize

```python
# print(img.size)  PIL图片类型具有size属性
# 改变图片的大小
trans_resize = transforms.Resize((512, 512))
img_resize = trans_resize(img)
img_resize = trans_totensor(img_resize)
writer.add_image("resize", img_resize, 0)
```

## 4 Compose

```python
# 将transform操作组合起来
trans_resize_2 = transforms.Resize(512)
# PIL -> PIL -> Tensor
trans_compose = transforms.Compose([trans_resize_2, trans_totensor])
img_resize_2 = trans_compose(img)
writer.add_image("resize", img_resize_2, 1)
```

## 5 RandomCrop

```python
# 随机裁剪
trans_random = transforms.RandomCrop((100, 100))  # 随机裁剪成100×100大小的图片
trans_compose_2 = transforms.Compose([trans_random, trans_totensor])
for i in range(10):
    img_crop = trans_compose_2(img)
    writer.add_image("RandomCrop", img_crop, i)
```

# Torchvision

```python
# 在datasets中获取官方数据集
train_data = torchvision.datasets.CIFAR10("./dataset", train=True, transform=torchvision.transforms.ToTensor(),
                                          download=True)
test_data = torchvision.datasets.CIFAR10("./dataset", train=False, transform=torchvision.transforms.ToTensor(),
                                         download=True)
```

# DataLoader

加载对应的数据集，可以对数据集进行打包，`batch_size` 指一次打包多少张图片。

```python
# 加载数据集 打包数据,压缩数据 为网络提供不同的数据形式
train_dataloader = DataLoader(train_data, batch_size=64, shuffle=True)
test_dataloader = DataLoader(test_data, batch_size=64)
```

可以对加载后的数据集进行`len`操作，数据集可迭代，迭代时的单个元素返回的是**数据**和**label**（都是以CIFAR10数据集为例）。

```python
for imgs, targets in train_dataloader:
    # imgs 为64张tensor类型的图片（进行上述操作之后）
    # targets 为64张图片对应的标签label值
```



# 损失函数和反向传播

```python
loss_fn = torch.nn.CrossEntropyLoss()
outputs = model(imgs)
# 计算loss误差
loss = loss_fn(outputs, targets)
# 反向传播
loss.backward()
```

# GPU训练

网络模型，损失函数，输入数据都要`to(device)`，见下面`CIFAR10`图片分类代码

```python
# 获取训练设备
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
# 例
model = MyModel()
model.to(device)
```



# CIFAR10图片分类练习

model.py

```python
from torch import nn
import torch
from torch.utils.tensorboard import SummaryWriter


class MyModel(nn.Module):
    def __init__(self):
        super(MyModel, self).__init__()
        self.model = nn.Sequential(
            nn.Conv2d(3, 32, 5, 1, 2),
            nn.MaxPool2d(2),
            nn.Conv2d(32, 32, 5, 1, 2),
            nn.MaxPool2d(2),
            nn.Conv2d(32, 64, 5, 1, 2),
            nn.MaxPool2d(2),
            nn.Flatten(),
            nn.Linear(64 * 4 * 4, 64),
            nn.Linear(64, 10)
        )

    def forward(self, x):
        x = self.model(x)
        return x
```

train.py

```python
import torch
import torchvision
from torch.utils.data import DataLoader
from torch.utils.tensorboard import SummaryWriter
from model import MyModel

# 使用对应设备进行训练
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# 获取每一个 img数据 和 label
# 训练数据集
train_data = torchvision.datasets.CIFAR10("./dataset/CIFAR", train=True, transform=torchvision.transforms.ToTensor(),
                                          download=True)
test_data = torchvision.datasets.CIFAR10("./dataset/CIFAR", train=False, transform=torchvision.transforms.ToTensor(),
                                         download=True)

print("训练数据集长度为:{}".format(len(train_data)))
print("测试数据集长度为:{}".format(len(test_data)))

# 加载数据集 打包数据,压缩数据 为网络提供不同的数据形式
train_dataloader = DataLoader(train_data, batch_size=64, shuffle=True)
test_dataloader = DataLoader(test_data, batch_size=64)

model = MyModel()
model.to(device)

# 损失函数
loss_fn = torch.nn.CrossEntropyLoss()
loss_fn.to(device)

# 设置优化器
learning_rate = 0.01
optimizer = torch.optim.SGD(model.parameters(), lr=learning_rate)

# 设置网络训练参数
total_train_step = 0
total_test_step = 0
epoch = 5

writer = SummaryWriter("./logs/scalar")

for i in range(epoch):
    print("----开始第{}轮训练----".format(i + 1))
    # 训练开始 对指定的层才有作用
    model.train()

    for data in train_dataloader:
        # 获取数据
        imgs, targets = data
        # 转换训练设备
        imgs, targets = imgs.to(device), targets.to(device)

        outputs = model(imgs)

        # 计算loss误差
        loss = loss_fn(outputs, targets)
        # 清空梯度
        optimizer.zero_grad()
        # 反向传播
        loss.backward()
        optimizer.step()

        total_train_step = total_train_step + 1

        if total_train_step % 100 == 0:
            print("训练次数：{},loss值：{}".format(total_train_step, loss.item()))  # 添加item是直接输出tensor对应的数字，不加输出tenso类型的数字
            writer.add_scalar("train_loss", loss.item(), total_train_step)

    # 每次训练一轮后跑一边测试
    # 验证测试
    model.eval()

    total_test_loss = 0
    total_accuracy = 0
    # 网络模型中的梯度都没有， 不发生变化
    with torch.no_grad():
        for img, target in test_data:
            img = torch.reshape(img, (1, 3, 32, 32))
            target = torch.tensor([target])

            img, target = img.to(device), target.to(device)
            # 计算输出
            output = model(img)
            loss = loss_fn(output, target)
            total_test_loss = total_test_loss + loss.item()

            """
            outputs:[0.1, 0.2] 两个类别的概率
                    [0.3, 0.4]
            targets:[0, 1] 目标类别
            predict:[1, 1] 预测类别
            result :[False, True]
            """
            # argmax求横向最大值所在的位置
            accuracy = (output.argmax(1) == target).sum()
            total_accuracy = total_accuracy + accuracy

    print("整体测试集的loss：{}".format(total_test_loss))
    print("整体正确率：{}".format(total_accuracy / len(test_data)))

    writer.add_scalar("test_loss", total_test_loss, total_test_step)
    writer.add_scalar("test_accuracy", total_accuracy / len(test_data), total_test_step)

    total_test_step = total_test_step + 1

    # 保存每一轮的模型
    torch.save(model, "./weights/model{}.pth".format(i + 1))
    # 也可以方式二
    print("模型已保存")

writer.close()
```

read_data.py

```python
import os
from PIL import Image
from torch.utils.data import Dataset


class MyData(Dataset):
    def __init__(self, root_dir, label):
        self.root_dir = root_dir
        self.label = label
        self.path = os.path.join(root_dir, label)
        self.img_names = os.listdir(self.path)

    def __getitem__(self, index):
        img_name = self.img_names[index]
        img_path = os.path.join(self.path, img_name)
        img = Image.open(img_path)
        label = self.label
        return img, label

    def __len__(self):
        return len(self.img_names)

```



test.py

```python
import torch
import torchvision
from PIL import Image
from model import MyModel
from read_data import MyData
import os

ans = ["airplane", "automobile", "bird", "cat", "deer", "dog", "frog", "horse", "ship", "truck"]

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

root_dir = "D:\\code\\pytorch_learning\\CIFAR10\\dataset\\val"
labels_dir = os.listdir(root_dir)

trans = torchvision.transforms.Compose([torchvision.transforms.Resize((32, 32)),
                                        torchvision.transforms.ToTensor()])

model = torch.load("./weights/model67.8.pth")

tot_num = 0
tot_accuracy = 0
for label in labels_dir:
    cur_accuracy = 0
    myData = MyData(root_dir, label)
    tot_num += len(myData)
    print("----------当前的图片类型为: {} ----------".format(label))

    for img, t_label in myData:
        # 将图片转换为为torch.Size([3, 32, 32])
        img = trans(img)
        # img = img.convert("RGB")
        img = torch.reshape(img, (1, 3, 32, 32))
        img = img.to(device)

        model.eval()
        with torch.no_grad():
            output = model(img)

        predict_result = ans[output.argmax(1).item()]
        cur_accuracy += (predict_result == label)
        print("预测结果: {}  ".format(predict_result), "正确" if predict_result == label else "错误")

    tot_accuracy += cur_accuracy
    print("当前种类预测准确率为: {}".format(cur_accuracy / len(myData)))
print("总预测准确率为: {}".format(tot_accuracy / tot_num))

```



> 所有代码： https://github.com/anda522/CIFAR10
>
> 参考视频：https://www.bilibili.com/video/BV1hE411t7RN/
>
> 参考Pytorch文档：https://pytorch.org/docs/stable/nn.html

![](https://wyqz.top/medias/gzh.jpg)

