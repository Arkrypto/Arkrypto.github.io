---
title: 双线性配对的可搜索加密
date: 2024-9-4
tags:
  - SearchableEncryption
categories:
  - sec
---

## 原理

主公钥和主私钥
$$
mpk = (G_1,G_2,G_T,g_1,g_2,h,(h_1,h_2,...,h_n))\\\\
msk = (v,(s_1,s_2,...,s_n),(t_1,t_2,...,t_n))
$$
其中

- n 是一个定长，用于将不同的关键字进行映射（填充）
- G1、G2、GT 均为 type a 的循环群
- g1、g2 分别是 G1 和 G2 上的元素，作为生成元
- v 是整数循环群 Zr 上的随机数，h = g1^v
- hi、si、ti 均为 Zr 上的随机数

等式匹配原理

<img src="./assets/image-20240904132459194.png">

## 实现

### 引包

在`maven`中添加配置

```xml
<dependency>
    <groupId>jpbc.api</groupId>
    <artifactId>api</artifactId>
    <version>2.0.0</version>
    <scope>system</scope>
    <systemPath>${pom.basedir}/lib/jpbc-api-2.0.0.jar</systemPath>
</dependency>

<dependency>
    <groupId>jpbc-plaf</groupId>
    <artifactId>plaf</artifactId>
    <version>2.0.0</version>
    <scope>system</scope>
    <systemPath>${pom.basedir}/lib/jpbc-plaf-2.0.0.jar</systemPath>
</dependency>
```

在项目根目录新建目录 lib，将`jpbc-api-2.0.0.jar`和`jpbc-plaf-2.0.0.jar`放入，然后在 IDEA 添加外部包`File -> Project Structure -> Libraries`，点击 + 号，选择 Java，将 lib 目录添加，即可

### Setup

### Enc

### KeyGen

### Dec

## 测试
