---
title: 皓的学前考察
date: 2024-3-6
---

## 算法考察

> [爬楼梯](https://leetcode.cn/problems/climbing-stairs/)：假设你正在爬楼梯。需要 n 阶你才能到达楼顶。每次你可以爬 1 或 2 个台阶。问多少种不同的方法可以爬到楼顶

显然，可以使用动态规划来解决问题，对于第 i 层阶梯，其登上的方式有两种，即

- 从`i-2`层登两步
- 从`i-1`层登一步

于是有状态转移方程
$$
dp[i]=
\begin{cases}
1&i=0\\\\
2&i=1\\\\
dp[i-1]+dp[i-2]&i\geq2
\end{cases}
$$
依此思路，可得

```c
class Solution {
public:
    int climbStairs(int n) {
        vector<int> dp;
        dp.push_back(1); dp.push_back(2);
        for(int i = 2; i < n; i++){
            dp.push_back(dp[i-1]+dp[i-2]);
        }
        return dp[n-1];
    }
};
```

<img src="./assets/image-20240307202659652.png">

<div style="page-break-after:always;"></div>

## 论文笔记

> 阅读论文《Attention Is All You Need》或者《BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding》，做好论文阅读笔记并尽可能代码复现、解读代码逻辑

### 注意力机制

注意力机制（Attention Mechanism）是机器学习中的一种**数据处理方法**

- 严格来说，注意力机制更像是一种方法论。没有严格的数学定义，而是根据具体任务目标，**对关注的方向和加权模型进行调整**
- 简单的理解就是，在神经网络的隐藏层，增加注意力机制的加权，使不符合注意力模型的内容弱化或者遗忘

《Attention Is All You Need》中对注意力的公式定义如下（分为三步）：涉及查询向量 Q，键向量 K 以及值向量 K

计算注意力分数
$$
Attention(q,k_i)=\frac{q\cdot k_i}{\sqrt{d_k}}
$$
d 为键向量的深度，q 为查询向量

计算注意力权重：使用`softmax`作为激活函数
$$
Attention(q,K) = softmax(Attention(q,k_1),...,Attention(q,k_n))
$$
计算改组查询在值向量 V 下的加权和
$$
Attention(Q,K,V)=\sum_{i=1}^nAttention(q,k_i)\cdot v_i
$$
从而得到这组查询的注意力

> 原文：An attention function can be described as mapping a query and a set of key-value pairs to an output, where the query, keys, values, and output are all vectors. The output is computed as a weighted sum of the values, where the weight assigned to each value is computed by a compatibility function of the query with the corresponding key.
>
> 翻译：一个注意力函数可以被描述为将一个查询和一组键值对映射到一个输出，其中查询、键、值和输出都是向量。输出被计算为值的加权和，其中分配给每个值的权重由查询与相应键的兼容性函数计算得出。

注意力机制的应用

1. 机器视觉中的应用（精细分类、图像分割、图像焦点）：例如，识别鸟类的品种问题。对于鸟品种的精细分类，对结果影响最大的可能是鸟类的头部，通过注意力机制将头部的特征强化，而忽略其他部分（羽毛、爪子），以实现区分鸟类的具体品种

2. 机器翻译中的应用（LSTM+注意力模型）：LSTM（Long Short Term Memory）是RNN（循环神经网络）的一种应用。可以简单理解为，每一个神经元都具有输入门、输出门、遗忘门

   其中输入门、输出门将 LSTM 神经元首尾连接，而遗忘门将无意义内容弱化或遗忘。注意力机制就应用在 LSTM 的遗忘门，使得机器阅读更加贴近于人类阅读的习惯，也使得翻译结果具有上下文联系

### Transformer 

基于这种自注意力机制，《Attention Is All You Need》提出了一种新的模型架构：Transformer，它完全基于注意力机制来处理序列数据

Transformer 模型由编码器和解码器组成，其中

- 每个编码器由6层堆叠的自注意力层和6层堆叠的全连接前馈神经网络组成
- 解码器由6层堆叠的自注意力层、编码器-解码器注意力层和全连接前馈神经网络组成

编码器和解码器本质上都是神经网络（基于注意力机制的神经网络）

- 编码器负责将输入序列编码为一系列的上下文向量表示
- 而解码器则将这些表示解码成目标序列

它们共同用于各种序列到序列（sequence-to-sequence）的任务

<img src="./assets/687474703a2f2f696d6775722e636f6d2f316b72463252362e706e67.png">

#### 编码器

编码器（Encoder）的组成

1. 输入嵌入层（Input Embedding）：将输入序列中的每个单词或符号映射为一个高维向量表示。通常使用词嵌入（Word Embeddings）或字符嵌入（Character Embeddings）进行这样的映射
2. 位置编码（Positional Encoding）：由于Transformer模型不包含递归或卷积操作，因此需要一种方式来保留输入序列的顺序信息。位置编码向输入嵌入中添加了关于每个位置的位置信息
3. 多头自注意力机制（Multi-Head Self-Attention）：这是Transformer模型的核心机制之一。自注意力机制允许编码器在处理输入序列时同时关注序列中的不同位置，并学习不同位置之间的依赖关系。多头注意力机制则允许模型同时使用多个注意力头，以便学习不同的注意力方面
4. 注意力池化（Attention Pooling）：每个注意力头产生一个注意力值的向量，编码器在这些向量上执行池化操作，通常是求取平均值或者加权求和
5. 前馈神经网络（Feedforward Neural Network）：每个位置的向量在通过一层前馈神经网络后进行非线性变换。这个网络由全连接层和激活函数组成
6. 残差连接（Residual Connection）和层归一化（Layer Normalization）：在每个子层（自注意力和前馈神经网络）之后，模型使用残差连接将输入与输出相加，并对结果进行层归一化，以减少训练过程中的梯度消失问题

编码器负责将输入序列转换为一系列上下文丰富的表示

#### 解码器

解码器（Dec0oder）的组成

1. 自注意力机制（Self-Attention）：解码器中的自注意力机制仅关注已生成的标记，以确保生成的每个标记都考虑到了前面已生成的标记
2. 编码器-解码器注意力机制（Encoder-Decoder Attention）：解码器中的每个位置都会关注输入序列的所有位置，这样可以确保在生成目标序列时考虑到输入序列的所有信息
3. 前馈神经网络（Feedforward Neural Network）、残差连接（Residual Connection）和层归一化（Layer Normalization）：解码器中也包含前馈神经网络、残差连接和层归一化，与编码器类似
4. 输出嵌入层（Output Embedding）：将解码器输出的向量表示转换为目标标记的表示形式
5. 位置编码（Positional Encoding）：与编码器一样，解码器也使用位置编码来保留生成序列的顺序信息

解码器使用编码器转的表示来生成目标序列，捕捉到序列中不同位置之间的依赖关系，从而在各种序列到序列的任务中取得了良好的性能

### 编码器复现

[Coding a Transformer from scratch on PyTorch, with full explanation, training and inference. (youtube.com)](https://www.youtube.com/watch?v=ISNdQcPhsts)

<img src="./assets/687474703a2f2f696d6775722e636f6d2f316b72463252362e706e67.png">

输入嵌入层 - 位置编码 - 多头自注意力层 - 层归一化 - 前馈神经网络

其中

- 输入层、位置编码以及归一层做的都是数据处理工作
- 多头注意力层实现所谓注意力机制
- 前馈神经网络处理多头注意力层的输出

#### 输入嵌入与位置编码

获取句子输入处理为向量

```python
# 输入器
class InputEmbeddings(nn.Module):

    def __init__(self, d_model: int, vocab_size: int):
        super().__init__()
        self.d_model = d_model
        self.vocab_size = vocab_size
        self.embedding = nn.embedding(vocab_size, d_model)

    # 提供字典类型的层
    def forward(self, x):
        return self.embedding(x) * math.sqrt(self.d_model)
```

句子位置向量的构建

对于偶数位，有
$$
PE(pos,2i) = \sin\frac{pos}{10000^{\frac{2i}{d_model}}}
$$
对于奇数位，有
$$
PE(pos,2i) = \cos\frac{pos}{10000^{\frac{2i}{d_model}}}
$$
代码实现

```python
# 创建矩阵
pe = torch.zeros(seq_len, d_model)

# 如何构建向量
position = torch.arange(0, seq_len, dtype=torch.float).unsqueeze(1)
div_term = torch.exp(torch.arange(0, d_model, 2).float) * (-math.log(10000.0) / d_model)

# sin 函数对偶数处理
pe[:, 0::2] = torch.sin(position * div_term)
# cos 函数对奇数处理
pe[:, 1::2] = torch.cos(position * div_term)
pe = pe.unsqueeze(0)
```

#### 层归一化

层归一化处理
$$
\hat{x_j}=\frac{x_j-\mu_j}{\sqrt{\sigma_j^2+\epsilon}}
$$
加一个 ε 防止 σ 过于贴近 0

```python
class LayerNormalization(nn.Module):

    def __init__(self, eps: float = 10**-6) -> None:
        super().__init__()
        self.eps = eps
        self.alpha = nn.Parameter(torch.ones(1))
        self.bias == nn.Parameter(torch.zeros(1))

    def forward(self, x):
        mean = x.mean(dim = -1, keepdim = True)
        std = x.std(dim = -1, keepdim = True)
        return self.alpha * (x-mean) / (std + self.eps)
```

#### 前馈神经网络

前馈模块：Position-wise Feed-Forward Networks
$$
FFN(x) = max(0,xW_1+b_1)W_2+b_2
$$
输入的`d(model) = 512`并且`d(ff) = 2048`，长度要从 512 构建到 2048

```python
class FeedFordwardBlock(nn.Module):
    def __init__(self, d_model: int, d_ff: int, dropout: float) -> None
        super().__init__()
        self.linear_1 = nn.Linear(d_model, d_ff) # w1 和 b1
        self.dropout = nn.Dropout(dropout)
        self.linear_2 = nn.Linear(d_ff, d_model) # w2 和 b2
    
    def forward(self, x):
        # 张量的转换：d_model -> d_ff -> d_model
        return self.linear_2(self.dropout(torch.relu(self.linear_1(x))))
```

#### 多头自注意力

> 最重要的模块，得到编码器的输入**并使用它三次**，分别为查询、键和值，对应之前提到的注意力公式中的三个重要参数
>
> 相当于相同的输入，应用了三次

注意力公式
$$
Attention(Q,K,V) = softmax(\frac{QK^T}{\sqrt{d_k}})V
$$
头注意力计算
$$
head_i = Attention(QW_i^Q, KW_i^K, VW_i^V)
$$
代码

```python
class MultiHeadAttentionBlock(nn.Module):

    def __init__(self, d_model: int, h: int, dropout: float) -> None:
        super().init()
        self.d_model = d_model
        self.h = h
        assert d_model % h == 0, "d_model is not divisible by h"

        self.d_k = d_model // h
        self.w_q = nn.Linear(d_model, d_model) # Wq 查询
        self.w_k = nn.Linear(d_model, d_model) # Wk 键
        self.w_v = nn.Linear(d_model, d_model) # Wv 值

        self.w_o = nn.Linear(d_model, d_model) # Wo
        self.dropout = nn.Dropout(dropout)


    # 输出我们想要的注意力分数
    @staticmethod
    def attention(query, key, value, mask, dropout: nn.Dropout):
        d_k = query.shape[-1]

        attention_scores = (query @ key.transpose(-2, -1)) / math.sqrt(d_k)
        if mask is not None:
            attention_scores.masked_fill_(mask == 0, -1e9)
        attention_scores = attention_scores.softmax(dim = -1)
        if dropout is not None:
            attention_scores = dropout(attention_scores)
        
        return (attention_scores @ value), attention_scores


    def forward(self, q, k, v, mask):
        query = self.w_q(q)
        key = self.w_k(k)
        value = self.w_v(v)

        # 矩阵处理，令三个查询的矩阵和 d_k 相关
        query = query.view(query.shape[0], query.shape[1], self.h, self.d_k).transpose(1, 2)
        key = key.view(key.shape[0], key.shape[1], self.h, self.d_k).transpose(1, 2)
        value = value.view(value.shape[0], value.shape[1], self.h, self.d_k).transpose(1, 2)

        x, self.attention_scores = MultiHeadAttentionBlock.attention(query, key, value, mask, self.dropout)

        # (batch, h, Seq_Len, d_k) --> (batch, Seq_Len, h, d_k) --> (batch, Seq_Len, d_model)
        x = x.transpose(1, 2).contiguous().view(x.shape[0], -1, self.h * self.d_k)

        return self.w_o(x)
```

<div style="page-break-after:always;"></div>

## 大模型概述

> 说一下当前较为流行的大模型，国内外各三种，且说出他们主要针对的领域（通用 or 专有，专有的话针对哪个垂直领域）

国内大模型

1. ChatGLM：ChatGLM 是由清华大学 KEG 实验室和智谱 AI 基于千亿基座模型 GLM-130B 开发的对话语言模型。ChatGLM 在 GLM-130B 的基础上持续进行文本和代码预训练并通过有监督微调等技术实现人类意图对齐，具备文案写作、信息抽取、角色扮演、问答、对话等能力。 开源版本 ChatGLM-6B 自 2023 年 3 月 14 号发布以来受到了广大开发者和用户的喜爱，连续 12 天居 HuggingFace 全球大模型下载榜第一名
2. 百度的ERNIE：百度提出的基于知识增强的语言表示模型，主要用于自然语言处理领域，包括文本分类、情感分析、命名实体识别等
3. 中文BERT（BERT-wwm）：这是对Google的BERT模型进行了改进和优化，使其更适合中文语境，通常应用于通用自然语言处理任务，如问答系统、语义理解等

国外大模型

1. OpenAI 的 GPT（Generative Pre-trained Transformer）系列：包括 GPT-3.5 等版本，主要应用于自然语言处理领域，如文本生成、对话系统、文本分类等，其强大的生成能力备受关注
2. Google 的 BERT（Bidirectional Encoder Representations from Transformers）：作为一种预训练的语言表示模型，BERT 在自然语言处理领域表现出色，广泛用于文本分类、语义理解、命名实体识别等任务
3. Facebook 的 RoBERTa：RoBERTa 是对 BERT 进行了改进的模型，通过更大规模的数据集和更长的预训练时间来提高性能，同样应用于自然语言处理领域的各种任务

这些大模型可以在各种领域发挥作用，包括但不限于通用自然语言处理、计算机视觉、推荐系统等。有些模型对特定领域更加适用，如 ERNIE 在中文语境下的表现更好，而 GPT 系列在文本生成任务上独领风骚

> 请说一下大模型训练、微调的手段有哪些

大型模型的训练和微调通常涉及到以下几种主要手段

1. 预训练（Pre-training）：在大规模数据集上进行的初始训练，目的是使模型学习到丰富的语言表示。预训练通常采用无监督或半监督的方式，在文本数据上进行预测任务，如语言建模（预测下一个词）、掩码语言建模（预测掩码词）、预测下一个句子等
2. 微调（Fine-tuning）：将预训练好的模型在特定任务的有标签数据集上进行进一步的训练，以使其适应该任务的特定要求。微调可以是在整个模型上进行，也可以只在模型的一部分层次上进行
3. 自适应学习率（Adaptive Learning Rate）：由于大型模型参数数量庞大，学习率的设置尤为重要。自适应学习率算法可以根据参数的梯度情况动态调整学习率，以保证训练的稳定性和收敛性
4. 正则化（Regularization）：用于减少模型的过拟合风险。常见的正则化技术包括L1正则化和L2正则化，它们通过对模型参数进行惩罚来限制参数的大小
5. 批量归一化（Batch Normalization）：在深度神经网络中，批量归一化可以加速模型的收敛，减少训练时间，并且有助于模型的泛化性能
6. 参数初始化（Parameter Initialization）：好的参数初始化策略可以加速模型的收敛并提高模型的性能。常见的参数初始化方法包括随机初始化、Xavier初始化和He初始化等
7. 数据增强（Data Augmentation）：在微调阶段，通过对训练数据进行变换、旋转、剪裁等操作，可以增加数据的多样性，提高模型的泛化能力
8. 迁移学习（Transfer Learning）：利用预训练好的模型在特定领域进行微调，可以加速模型的收敛并提高模型的性能，尤其是在数据量有限的情况下

这些手段可以单独或组合使用，并且根据具体任务和数据情况来选择合适的训练和微调策略

> 如果有优化和部署经验，请进一步解说其中的技术点

在本地不同笔记本电脑上（Windows11 / Manjaro / ArchLinux）部署过清华的开源语言大模型 ChatGLM-6B 并分别以 32G/16G CPU 和 6G GPU 成功运行

- Github：[THUDM/ChatGLM-6B: 开源双语对话语言模型](https://github.com/THUDM/ChatGLM-6B)
- Hugging Face：[THUDM/chatglm-6b · Hugging Face](https://huggingface.co/THUDM/chatglm-6b)

采用 Web 可视化操作微调过相关参数，但对于其中优化细节及相关技术点并不十分了解，以下为搜索得到

1. 模型压缩和量化（Model Compression and Quantization）：针对大型模型的参数数量庞大和计算需求高的问题，可以采用模型压缩和量化技术来减少模型的大小和计算量。例如，剪枝（Pruning）可以去除模型中冗余的连接和参数，量化（Quantization）可以将模型参数从浮点数转换为较低位数的整数，从而减少存储和计算量
2. 硬件加速器的使用（Hardware Acceleration）：利用专门的硬件加速器（如GPU、TPU等）来加速大型模型的推理和训练过程。这些硬件加速器通常能够提供比通用处理器更高的计算性能和能效比，从而加速模型的运行
3. 模型量化和量化训练（Quantization-aware Training）：在训练过程中考虑到模型量化后的精度损失，采用量化感知的训练方法，从而在量化后保持模型的性能
4. 分布式训练（Distributed Training）：利用多个计算节点或者多个设备进行模型训练，加速训练过程并处理大规模数据。分布式训练需要设计合适的通信和同步机制，以确保模型参数的一致性
5. 模型蒸馏（Model Distillation）：利用较小、高效的模型来“蒸馏”（distill）大型模型的知识，从而在保留性能的情况下减少模型的大小和计算需求
6. 缓存优化和预取优化（Cache and Prefetch Optimization）：利用硬件缓存和预取机制来优化模型的内存访问模式，减少内存访问延迟，提高模型的运行效率
7. 模型并行和数据并行（Model Parallelism and Data Parallelism）：将模型参数或训练数据分布到多个设备或计算节点上，并行地进行模型计算和训练，以提高训练速度和计算效率
8. 模型部署的优化（Deployment Optimization）：将训练好的模型部署到生产环境中时，需要考虑到模型的性能、延迟、吞吐量等方面的要求，并对模型进行相应的优化，以满足实际应用的需求

这些技术点通常会结合使用，以优化和部署大型模型，在保持模型性能的同时，提高模型的效率和可用性

> 请说一下目前大模型急待解决的缺陷在哪里

目前大型模型的缺陷包括但不限于

1. 能源消耗和计算资源需求高：大型模型需要庞大的计算资源和能源来进行训练和推理，这给环境造成了负担，也限制了大型模型的广泛应用
2. 模型的可解释性差：大型模型通常具有数以亿计的参数，其内部机理复杂，导致模型的预测结果难以解释，这在一些应用场景下不利于模型的应用和部署
3. 数据隐私和安全性问题：大型模型通常需要大量的数据进行训练，在数据隐私和安全性方面存在一定的风险，例如模型可能会记住训练数据中的敏感信息
4. 样本偏差和数据分布偏移：大型模型在训练过程中往往对数据分布敏感，当面临新领域或新任务时，可能会出现样本偏差和数据分布偏移的问题，导致模型性能下降
5. 社会和伦理问题：大型模型的应用可能会引发社会和伦理方面的问题，例如模型生成的内容可能包含有害信息、歧视性言论等，需要制定相应的政策和规范来管理模型的应用
6. 通用性和泛化能力有限：虽然大型模型在许多任务上表现出色，但其泛化能力仍有待改进，特别是在面对不同领域、不同语种或低资源语种的情况下

解决这些问题需要多学科的合作，譬如算法研究、硬件优化、数据管理、隐私保护等方面的工作。同时，也需要制定相关法律规范，确保大型模型的应用符合社会和伦理的要求
