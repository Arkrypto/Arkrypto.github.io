---
title: 皓的学前考察
date: 2024-3-6
---

## 算法考察

[爬楼梯](https://leetcode.cn/problems/climbing-stairs/)：假设你正在爬楼梯。需要 n 阶你才能到达楼顶。每次你可以爬 1 或 2 个台阶。问多少种不同的方法可以爬到楼顶

显然，对于第 i 层阶梯，其登上的方式有两种，即

- 从`i-2`层登两步
- 从`i-1`层登一步

于是有状态转移方程
$$
dp[i]=
\begin{cases}
1&i=0/1\\\\
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

## 论文笔记

阅读论文《Attention Is All You Need》或者《BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding》

## 大模型概述

说一下当前较为流行的大模型，国内外各三种，且说出他们主要针对的领域（通用 or 专有，专有的话针对哪个垂直领域）

- ChatGPT
- LLama
- ChatGML

请说一下大模型训练、微调的手段有哪些

如果有优化和部署经验，请进一步解说其中的技术点

请说一下目前大模型急待解决的缺陷在哪里
