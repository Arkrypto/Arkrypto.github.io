---
title: 可搜索加密仿真 in JPBC
date: 2024-7-23
tags:
  - SearchableEncryption
---

臭打工的

## JPBC

外部 jar 包导入`jpbc-api-2.0.0.jar`以及`jpbc-plaf-2.0.0.jar`，在项目根目录下复制进加密参数配置`a.properties`

### 双线性验证

验证
$$
e(u^a, v^b)=e(u, v)^{ab}
$$

```java
Pairing bp = PairingFactory.getPairing("a.properties");
Field G1 = bp.getG1();
Field G2 = bp.getG2();
Field Zr = bp.getZr();

Element u = G1.newRandomElement().getImmutable();
Element v = G2.newRandomElement().getImmutable();
Element a = Zr.newRandomElement().getImmutable();
Element b = Zr.newRandomElement().getImmutable();
System.out.println(u);
System.out.println(v);
System.out.println(a);
System.out.println(b);

// 计算等式左半部分 e(u^a, v^b)
Element ua = u.powZn(a);
Element vb = v.powZn(b);
Element left = bp.pairing(ua,vb);

// 计算等式右半部分 e(u, v)^ab
Element euv = bp.pairing(u,v).getImmutable();
Element ab = a.mul(b);
Element right = euv.powZn(ab);

if (left.isEqual(right)) {
    System.out.println("Yes");
} else {
    System.out.println("No");
}
```

### 哈希嵌入

将哈希值`byte[]`嵌入到群 G1 中

```java
try{
    byte[] md5 = DigestUtils.md5Digest(left.toBytes());
    Element hash = G1.newElement().setFromHash(md5, 0, md5.length);
    System.out.println(hash);
}catch (Exception e){
    e.printStackTrace();
}
```

其中 MD5 哈希调用 spring 内置的工具类

```java
import org.springframework.util.DigestUtils;
```

### 双线性群的运算

乘方、乘、加法以及配对运算

## 算法实现

### 系统初始化

### 身份双向认证

### 索引构建

### 陷门生成

### 密文检索

### 密文解密
