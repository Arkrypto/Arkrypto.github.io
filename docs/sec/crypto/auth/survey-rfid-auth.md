---
title: RFID 认证
date: 2024-9-17
tags:
  - Authentication
categories:
  - Crypto
---
## RFID 概述

下图为 RFID 系统的一般结构，由标签、读头、应用系统组成

<img src="./assets/rfid-system.png">

说白了，就是一个表单验证，只不过提交的方式不一样，不像 Web 程序通过 HTTP/Post 请求去打，而是通过电磁波进行数据交换

一些应用

- 商场用的防盗的牌，过安检门他会触发警报（独位的检测）
- 二代身份证
- 一卡通（NFC 是 RFID 的子集）

那么和所有的登录验证一样，在传输过程存在一定的安全问题（需要加密传输），并且认证中存在一定的算力限制，因为标签存储的数据量是有限的，密文不能过长、计算量不能过大

类比常见的 Web 协议，如果把 RFID 视作一个 HTTP 的表单提交（他自身是一个很轻量的协议，半双工、不具备安全性、没有状态维护等等），我们的工作大概就是需要在其上再套一层用于实现安全性的协议，如同把 SSL、TSL 套在 HTTP 上（这种类比似乎适用于所有的认证场景）

对于 RFID 而言，主要区别在于硬件资源严重受限，通常标签的存储空间在几字节到几千字节不等，故采用的加密算法和协议仅限于低成本实现，其一系列安全协议并被划分为：完备、简单、轻量级和超级轻量级四类。其中前两类（即完备和简单）协议主要针对有源 RFID 系统，而后两类（即轻量级和超轻量级）则主要针对无源 RFID 系统

- 完备协议
  - 非对称加密：ECC 为主流，较于 RSA 更加轻量
  - 对称加密：AES、XTEA
- 简单协议：轻量化的密码算法并且基于单向散列函数，最明显的特征是此类安全认证协议研究的重点是双向认证
- 轻量协议：主要包括循环冗余校验（Cyclic Redundancy Check, CRC）和随机数生成器（Random Number Generator，RNG）等
- 超轻量协议：如 LAMP、HB 协议族，多为按位运算

由于超轻量为 RFID 系统的独有特点

## 超轻量协议

### HB 协议族

> Secure human identification protocols
>
> HB 协议族最初由 **Hughes** 和 **Boudot** 在 2004 年提出，用于在低计算资源的设备（如 RFID 标签）中实现安全的身份认证。HB 协议族以其高效和简单的设计而闻名，适合在对计算和存储资源有限的环境中使用


#### LPN 问题

> LPN（Learning Parity with Noise），噪声环境下的学习校验，基于格的加密

LPN 的向量元素均为二进制，即 LPN 系统是为模 2 的，其轻量性来源于此

形式化描述

- 设有秘密向量 s，和一组长度为 n 的随机生成的向量 ai
- 对于每个 i，我们计算 s · ai，即 s 和 ai 的内积，并且在计算结果上加入某种噪声 ei，其中 ei 是一个服从某个噪声分布（常为伯努利分布）（通常是以一定概率为 1，即翻转）的随机变量

基于此，我们可以获得一些观测值
$$
y_i=a_i\cdot s+e_i
$$
其中 yi 是一组长度为 n 的带有噪声的观测值，破解的目标是通过这些观测值 yi，恢复出秘密向量 s

在具体的密码系统中，s 作为发送 / 接收方共享的密钥，ai 是一组公开的随机向量，对于明文 m，常与观测值 yi 中的一项如 y1 进行异或（模 2 加法），构成本次传输的密文 c（将明文 m 嵌入有噪声的观测值 y 中）
$$
c = (y_0,\hat{y}，y_2,...,y_n)
$$
其中
$$
\hat{y}=y_1\oplus m
$$
接收方收到密文后，由于已知 s 和 ai，可以还原出没有噪声的观测值
$$
y_i'=a_i\cdot s
$$
根据这个未经噪声的观测值 y' 与密文 c，对 y1' 与 ŷ 进行比对，就能够得到明文 m，我想想
$$
y_1'\oplus \hat{y}=y_1'\oplus y_1\oplus m = (a_1\cdot s)\oplus(a_1\cdot s+e_1)\oplus m
$$

- 若 e1 为 0 向量，则前两项异或为 0，与 m 异或为 m
- 若 e1 为 1 向量，则前两项异或为 1，与 m 异或为 m’（m 的非）

该如何分辨解出来的到底是 m 还是 m‘ 呢？核心思想为：通过其他观测值或校验机制验证 m 是否正确，确定 m 还是 m' 更符合实际情况

- 结合实际应用的上下文或先验知识进行试探
- 在一些协议中，可能会使用错误修正码来纠正噪声带来的错误
- 在某些协议中，密文可能包含额外的校验信息（如校验和、哈希值等），用来验证解密结果的正确性

还有个疑问，那这样 y2 到 yn 是不是都是冗余计算了，还是作为迷惑信息存在

- 正如猜测，主要是为了增加系统的安全性，这样的冗余显然能够增加破解难度
- LPN 系统的安全性部分来自噪声的随机性，这样的随机性需要向量来实现
- 单个加密中没用到，在整个系统中或许有用，比如用于多用户的认证、验证数据完整性

HB 族协议主要包括 HB、HB+ 和 HB#

#### HB+ 协议

> Authenticating Pervasive Devices with Human Protocols

以 HB+ 协议为例，其采用**提交-挑战-响应-认证**的双密钥结构应用 LPN 问题，其流程大致如下

1. 初始化：认证双方共享两个密钥 X 和 Y（长为 k 的向量）
2. 提交：标签发送随机向量 b 给读写器
3. 挑战：读写器发送随机向量 a 给标签
4. 认证：标签根据概率模型生成独位的噪声 r
   - 标签计算`z = ax+by+r`，并将 z 发回读写器
   - 读写器通过解出`r = ax+by+z`（这样的认证将进行 k 轮），最后对 k 长的噪声 R 进行检验，以判断标签是否合法

显然这是一个读写器对标签的单向认证

#### GRS 攻击

> An Active Attack Against HB+: A Provably Secure Lightweight Authentication Protocol

LPN 问题被证明是抗量子的，其主要的被攻击方式是中间人攻击

因为单边认证在大多数 HB 协议族中执行（如 HB+）。标签阅读器通信总是被认为是安全的，只有 RFID 标签模拟的可能性。然而，物联网需要相互认证。使用两个独立的认证协议会导致中继攻击、重放攻击、非同步攻击、会话劫持等的风险更高

GRS（一种针对 RFID 系统的中间人攻击）攻击的步骤：

1. 被动监听：攻击者被动监听标签和读写器之间的认证交互，收集多个挑战向量`a`和响应值`z`
2. 主动篡改挑战向量：攻击者修改某些挑战向量，并监听相应的响应
3. 噪声消除：利用收集到的数据，攻击者通过统计分析的方式，逐步消除噪声`r`的影响，恢复出密钥`x`

常见的抵抗中间人攻击的方式是基于 HB 协议实现双向认证，这样可以很大程度避免中间人攻击，同时采用距离边界协议

### UMAP 协议族

> Ultralightweight Mutual Authentication Protocol，由 Lopez 等人提出，包括 MMAP（Minimalist Mutual Authentication Protocol）、LMAP（Lightweight Mutual Authentication Protocol）和 EMAP（Efficient Mutual Authentication Protocol）三个协议

基于极简密码学（minimalist cryptography）的思想，作者认为能通过此提升低成本 RFID 的安全性

#### LMAP

> LMAP: A real lightweight mutual authentication protocol

HB 协议在 05 年提出，而这篇论文在 06 年，并且在第一种绪论中有提到：这种最具有前途的协议 (HB, HB+) 的安全性与噪声问题 (LNP) 的学习奇偶校验有关，其对随机实例的难度仍然仍然是一个悬而未决的问题

Our protocol is based on the use of pseudonyms, concretely on index-pseudonyms (IDSs)

#### EMAP

> EMAP: An Efficient Mutual-Authentication Protocol for Low-Cost RFID Tags

#### MMAP

> M2AP A Minimalist Mutual-Authentication Protocol for Low-Cost RFID Tags

### SASI 协议

> SASI: A New Ultralightweight RFID Authentication Protocol Providing Strong Authentication and Strong Integrity

## 简单协议

## 完备协议

## 前沿研究

基于 HB 协议族、LPN 问题的一个双向认证方案（抗 GRS 攻击）：An Ultra-Lightweight Mutual Authentication Protocol Based on LPN Problem with Distance Fraud Resistant（2021）
