---
title: 可搜索加密仿真 in JPBC
date: 2024-7-23
tags:
  - SearchableEncryption
---

臭打工的

## JPBC

### 基本使用

外部 jar 包导入`jpbc-api-2.0.0.jar`以及`jpbc-plaf-2.0.0.jar`，在项目根目录下导入加密参数配置文件`a.properties`

双线性验证

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

