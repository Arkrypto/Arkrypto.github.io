---
title: PyTorch 基础
date: 2023-2-26
---

> 下载与安装：[pytorch.org](https://pytorch.org/get-started/locally/)
>
> [60分钟快速入门 PyTorch - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/66543791)

测试安装

```python
from __future__ import print_function
import torch
x = torch.rand(5, 3)
print(x)

import torch
print(torch.cuda.is_available())
```

## 张量 Tensor

### 定义

```python
from __future__ import print_function
import torch

empty_tensor = torch.empty(5,3)
print("empty_tensor:", empty_tensor)

rand_tensor = torch.rand(5,3)
print("rand_tensor:", rand_tensor)

zeros_tensor = torch.zeros(5,3)
print("zeros_tensor:", zeros_tensor)

ones_tensor = torch.ones(5,3)
print("ones_tensor:", ones_tensor)


tensor1 = torch.tensor([2.5, 3])
print("tensor1:", tensor1)

tensor2 = tensor1.new_ones(5, 3, dtype=torch.double)
print("tensor2:", tensor2)

tensor3 = torch.randn_like(tensor2, dtype=torch.float)
print("tensor3:", tensor3)

size = tensor3.size()
print("size:", size)
```

### 操作

矩阵加法

```python
from __future__ import print_function
import torch

tensor1 = torch.ones(5,3)
tensor2 = torch.rand(5,3)

print("tensor1:", tensor1)
print("tensor2:", tensor2)
print("tensor1 + tensor2 =", tensor1 + tensor2)

tensor3 = torch.empty(5,3)
torch.add(tensor1, tensor2, out=tensor3)
print("result = tensor1 + tensor2 =", tensor3)

tensor1.add_(tensor2)
print("tensor1 += tensor2 =", tensor1)
```

指定列 / 行访问

```python
# 访问 tensor3 第一列数据
print("tensor3第一列:", tensor3[:, 0])
# 访问第二行数据
print("tensor3第二行:", tensor3[1, :])
```

修改矩阵形状：－1 表示自动做除法然后填入，如以下代码，`z1`处填入的实际上就是`(2=16/8, 8)`，`z2`填入`(4, 4=16/4)`

```python
x = torch.rand(4,4)
y = x.view(16);
z1 = x.view(-1,8)
z2 = y.view(4,-1)

print("x:", x)
print("y:", y)
print("z1:", z1)
print("z2:", z2)
```

### 张量 Tensor 和 Numpy 矩阵

Tensor 转换 numpy 矩阵：`y = x.numpy()`，x 为一个 tensor 矩阵

numpy 矩阵转换 Tensor：`b = torch.from_numpy(a)`，a 是一个 numpy 矩阵

```python
from __future__ import print_function
import torch

x = torch.rand(4, 4)
y = x.numpy()

print(y)
print("\n")

# x与y共享内存
x.add_(1)
print(x)
print(y)
print("\n")

# view讲返回一个全新的tensor，这里x将指向新的tensor，不与y共享内存
x = x.view(-1, 8)
print(x)
print(y)
print("\n")

import numpy as np
a = np.ones(4)
# 共享内存地址
b = torch.from_numpy(a)
np.add(a, 2, out=a)
print(a)
print(b)
print("\n")
```

这里由`numpy()`创建的 numpy 矩阵和由`torch.from_numpy()`创建的 tensor 矩阵和原先矩阵都是共享内存，这意味着修改原矩阵，其相应的 numpy 和 tensor 都会改变（软连接）

但是注意，tensor 经过 view 操作并把 view 结果赋给自己时，他会指向一个全新的 tensor，而不是原先的地址，自然不会和其对应的 numpy 共享内存，我想 numpy 的变换同理

选择运行设备：Pytorch cuda 支持利用 GPU 算力计算 Tenser 张量，以下张量 d 便（有可能）运行在 GPU 上

```python
device = torch.device("cpu")
if torch.cuda.is_available():
	device = torch.device("cuda")
c = torch.rand(4,4)
d = c.to(device, dtype=torch.double)
print(d)
```

## 自动梯度 AutoGrad

Terson 矩阵将把其自身计算的梯度存在自身属性 requires_grad 中，便于后续计算

```python
from __future__ import print_function
import torch

x = torch.rand(4, 4, requires_grad=True)
print(x)
y = x + 4
print(y)
print(y.grad_fn)
```
