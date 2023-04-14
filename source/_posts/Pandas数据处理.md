---
title: Pandas数据处理
top: false
cover: false
toc: true
mathjax: true
tags:
  - Pandas
  - 数据处理
  - Python
categories:
  - 人工智能
  - Python
abbrlink: 2946568862
date: 2023-03-24 16:29:49
password:
summary:
---

# Pandas

# 读取数据

```python
import pandas as pd
df = pd.read_csv(path) # path为读取数据的路径
```

# 查看数据

```python
>>> import numpy as np
>>> mport pandas as pd
 
df = pd.DataFrame(data = [['lisa','f',22], ['joy','f',22], ['tom','m','21']],
                  index = [1,2,3],
                  columns = ['name','sex','age']) # 测试数据。
>>> df
   name sex age
1  lisa   f  22
2   joy   f  22
3   tom   m  21
```

## 1 head和tail

```python
df.head() # 打印数据的前5行
df.head(10) # 打印数据的前10行

df.tail() # 打印数据的后5行
df.tail(10) # 打印数据的后10行

df.loc[8] # 打印id = 8的这一行 loc[]下标从0开始，故是打印第9行数据（排除首行的属性名）
df.loc[range(1, 3)] # 打印id=1和2的这两行
df.loc[[1, 3]] # 打印id=1，3的这两行
```

## 2 df['column_name']

```python
df['name']
df['gender']
df[['name','gender']] #选取多列，多列名字要放在list里
```

## 3 df[row_start_index, row_end_index] 

```python
df[0:]	#第0行及之后的行，相当于df的全部数据，注意冒号是必须的
df[:2]	#第2行之前的数据（不含第2行）
df[0:1]	#第0行
df[1:3] #第1行到第2行（不含第3行）
df[-1:] #最后一行
df[-3:-1] #倒数第3行到倒数第1行（不包含最后1行即倒数第1行，这里有点烦躁，因为从前数时从第0行开始，从后数就是-1行开始，毕竟没有-0）
```

## 4 df.loc[index,column]

```python
# df.loc[index, column_name],选取指定行和列的数据
df.loc[0,'name']
df.loc[0:2, ['name','age']] # 选取第0行到第2行，name列和age列的数据, 注意这里的行选取是包含下标的。
df.loc[[2,3],['name','age']] # 选取指定的第2行和第3行，name和age列的数据
df.loc[df['gender']=='M','name'] # 选取gender列是M，name列的数据
df.loc[df['gender']=='M',['name','age']] # 选取gender列是M，name和age列的数据
```

## 5 iloc[row_index, column_index]

```python
df.iloc[0,0]		#第0行第0列的数据
df.iloc[1,2]		#第1行第2列的数据，32
df.iloc[[1,3],0:2]	#第1行和第3行，从第0列到第2列（不包含第2列）的数据
df.iloc[1:3,[1,2]	#第1行到第3行（不包含第3行），第1列和第2列的数据
```

# 添加数据

## 1 按列添加

```python
citys = ['ny','zz','xy']
df.insert(0,'city',citys) #在第0列，加上column名称为city，值为citys的数值。
jobs = ['student','AI','teacher']
df['job'] = jobs #默认在df最后一列加上column名称为job，值为jobs的数据。
df.loc[:,'salary'] = ['1k','2k','2k','2k','3k'] #在df最后一列加上column名称为salary，值为等号右边数据。
```



## 2 按行添加

```python
df.loc[4] = ['zz','mason','m',24,'engineer’]#若df中没有index为“4”的这一行的话，该行代码作用是往df中加一行index为“4”，值为等号右边值的数据。若df中已经有index为“4”的这一行，则该行代码作用是把df中index为“4”的这一行修改为等号右边数据。
df_insert = pd.DataFrame({'name':['mason','mario'],'sex':['m','f'],'age':[21,22]},index = [4,5])
ndf = df.append(df_insert,ignore_index = True) #返回添加后的值，并不会修改df的值。ignore_index默认为False，意思是不忽略index值，即生成的新的ndf的index采用df_insert中的index值。若为True，则新的ndf的index值不使用df_insert中的index值，而是自己默认生成。
```



# 修改数据

## 1 loc

```python
>>> df.loc[1,'name'] = 'aa' #修改index为‘1’，column为‘name’的那一个值为aa。
>>> df.loc[1] = ['bb','ff',11] #修改index为‘1’的那一行的所有值。
>>> df.loc[1,['name','age']] = ['bb',11]    #修改index为‘1’，column为‘name’的那一个值为bb，age列的值为11。
```



## 2 iloc[row_index, column_index]

```python
df.iloc[2, 1] = 12 # 将3行2列的数据更新为12
df.iloc[:,2] = [11, 22, 33] #修改一整列
df.iloc[0,:] = ['lily', 'F', 15] #修改一整行
```

# 删除数据

## 1 删除行

```python
df.drop([1,3],axis = 0,inplace = False)#删除index值为1和3的两行，
```

## 2 删除列

```python
df.drop(['name'],axis = 1,inplace = False) # 删除name列。
del df['name'] # 删除name列。
ndf = df.pop('age’) # 删除age列，操作后，df都丢掉了age列,age列返回给了ndf。
```

# 数据分析

# 与numpy的转换

- `dataframe`转化为`array`：

`df.to_numpy()`返回的是一个 array 类型：

```python
df.to_numpy()
```

- `array`转换为`dataframe` ：

```python
import pandas as pd
df = pd.DataFrame(array)
```

