---
title: 可搜索加密算法仿真 in JPBC
date: 2024-7-23
tags:
  - SearchableEncryption
---

臭打工的

## JPBC

外部 jar 包导入`jpbc-api-2.0.0.jar`以及`jpbc-plaf-2.0.0.jar`，在项目根目录下复制进加密参数配置`a.properties`

### 双线性验证

验证公式
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

**但注意，对于 Type A1 来说，这个代码无法指定哈希到指定子群 G 中。解决方法是将`byte[]`先哈希到Z群，然后利用`G, GT`的生成元计算幂指数，从而达到哈希到`G, GT`上的效果，正确的代码如下**

```java
public static Element hash(byte[] bytes){
    Element hash = null;
    try{
        byte[] md5 = DigestUtils.md5Digest(bytes);
        // 映射到 Zr 整数群
        Element x = Zr.newElement().setFromHash(md5, 0, md5.length);
        // 通过 G1 上的生成元 g 幂运算映射到 G1 群上
        hash = g.powZn(x).getImmutable();
    }catch (Exception e){
        e.printStackTrace();
    }
    return hash;
}
```

### 双线性群的运算

乘方、乘、加法以及配对运算

```java
Element g = G1.newRandomElement();
Element h = G1.newRandomElement();
Element x = Zr.newRandomElement();

Element g1 = g.add(h);
Element g2 = g.mul(h);
Element g3 = g.powZn(x);
Element g4 = bp.pairing(g, h);
```

注意这里若直接运算，会改变原有的元素 g，即 g 在`g1 = g.add(h)`后，不仅 g1 为 g 和 h 之和，g 本身也会变成二者之和

解决这个问题有两种办法

1. 在定义 g 时取`getImmutable()`，令其不可变

   ```java
   Element g = G1.newRandomElement().getImmutable();
   
   Element x = Zr.newRandomElement();
   Element g5 = g.powZn(x);
   ```

2. 在计算时取`duplicate()`，复制一份进行计算而不影响其自身

   ```java
   Element g = G1.newRandomElement();
   Element x = Zr.newRandomElement();
   
   Element g6 = g.duplicate().powZn(x)
   ```

一定要注意，避免产生一些难以寻找的错误

## 算法仿真

### 系统初始化

初始化两个循环群，对应的整数群，配对函数，以及四份密钥对

```java
public class SEUtil {
    // 系统初始化

    //循环群 G1,GT, 整数群 Zr
    private static final Field G1, GT, Zr;
    // 两个生成元
    private static final Element g, h;
    private static final Pairing bp;
    // 全局变量初始化
    static{
        bp = PairingFactory.getPairing("a.properties");
        G1 = bp.getG1();
        GT = bp.getGT();
        Zr = bp.getZr();
        g = G1.newRandomElement().getImmutable();
        h = G1.newRandomElement().getImmutable();
    }

    // 密钥生成中心密钥对kgc, 搜索服务器密钥对svr, 数据所有者密钥对co, 数据用户密钥对tu
    private static KeyPair kgc, svr, co, tu;
    // 密钥对初始化
    public static void systemKeyInit(){
        Element x = Zr.newRandomElement().getImmutable();
        Element t = Zr.newRandomElement().getImmutable();
        Element s = Zr.newRandomElement().getImmutable();
        Element r = Zr.newRandomElement().getImmutable();
        

        kgc = new KeyPair(x, g.powZn(x).getImmutable());
        svr = new KeyPair(t, g.powZn(t).getImmutable());
        co = new KeyPair(s, g.powZn(s).getImmutable());
        tu = new KeyPair(r, g.powZn(r).getImmutable());
    }
}
```

### 身份双向认证

使用同一个整数 x，计算参与认证的双方的密钥对
$$
sk_i = H(ID_i)^x\quad pk_i = H(ID_i)
$$
H 为哈希函数，ID 为用户 ID，是一个在整数群 Zr 中的元素

- 注意这里哈希函数的处理为上文`哈希嵌入`中的方式：即先将哈希值嵌入 Zr 群，再通过生成元幂运算嵌入 G1 群

计算双线性配对值 k
$$
k = e(sk_{ao},pk_{au})=e(sk_{au},pk_{ao})
$$

```java
// 数据私有者和数据用户的 ID
private static Element id_o, id_u, k;
// 用于身份验证（数据私有者和数据用户之间）的两个密钥对
private static KeyPair ao, au;
public static void authKeyInit(){
    id_o = Zr.newRandomElement().getImmutable();
    id_u = Zr.newRandomElement().getImmutable();

    Element x = Zr.newRandomElement();

    ao = new KeyPair(hash(id_o.toBytes()).powZn(x).getImmutable(), hash(id_o.toBytes()));
    au = new KeyPair(hash(id_u.toBytes()).powZn(x).getImmutable(), hash(id_u.toBytes()));

    k = bp.pairing(ao.getSk(), au.getPk()).getImmutable();
}
```

计算 hash
$$
hash = H(pk_{ao},pk_{au},k)
$$
这里对于多个元素进行哈希值得计算，采用的方式是将三个比特数组参数前后拼接然后通过上述的哈希嵌入得到群 G1 中的元素

```java
// 连接三个比特数组
public static byte[] joinByteArray(byte[] byte1, byte[] byte2, byte[] byte3) {
    return ByteBuffer.allocate(byte1.length + byte2.length + byte3.length)
        .put(byte1)
        .put(byte2)
        .put(byte3)
        .array();
}
```

计算 CID，这里的`sk_{co}`是第一步中系统生成的数据所有者的私钥
$$
CID = hash^{sk_{co}}\cdot h
$$
计算 TID，同样的这里的`sk_{tu}`也是第一步中数据用户的私钥，`pk_{co}`是第一步中数据所有者的公钥
$$
TID = e(hash^{sk_{tu}},pk_{co})
$$

```java
// 获取 CID
public static Element getCID(){
    Element k1 = bp.pairing(ao.getSk(), au.getPk()).getImmutable();
    // 注意这里的命名要和生成元 h 区分开
    Element h1 = hash(joinByteArray(ao.getPk().toBytes(), au.getPk().toBytes(), k1.toBytes())).getImmutable();
    return h1.powZn(co.getSk()).mul(h).getImmutable();
}

// 获取 TID
public static Element getTID(){
    Element k2 = bp.pairing(au.getSk(), ao.getPk()).getImmutable();
    Element h2 = hash(joinByteArray(ao.getPk().toBytes(), au.getPk().toBytes(), k2.toBytes())).getImmutable();
    return bp.pairing(h2.powZn(tu.getSk()), co.getPk()).getImmutable();
}
```

双线性验证，若相等则认证通过
$$
e(CID,pk_{tu})==TID\cdot e(pk_{tu},h)
$$

```java
public static boolean auth(Element CID, Element TID){
    Element left = bp.pairing(CID, tu.getPk());
    Element right = TID.mul(bp.pairing(tu.getPk(), h));
    return left.isEqual(right);
}
```

### 索引构建

采用 BM25 算法构建索引矩阵

### 陷门生成

### 密文检索

### 密文解密
