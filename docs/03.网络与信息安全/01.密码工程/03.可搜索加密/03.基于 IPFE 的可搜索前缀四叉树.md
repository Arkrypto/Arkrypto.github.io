---
title: 基于 IPFE 的可搜索前缀四叉树
date: 2024-11-18 00:00:00
tags: 
  - SearchableEncryption
permalink: /pages/6ba8e2/
author: 
  name: northboat
  link: https://github.com/northboat
---

## IPFE

### Setup

选取生成元
$$
g,h\in G
$$
选取 l 长的随机数组
$$
s_i,t_i\in Z_p\quad i\in[1,l]
$$
计算数组
$$
h_i=g^{s_i}h^{t_i}\quad i\in[1,l]
$$
则系统公钥为
$$
mpk:=(G,Z_p,g,h,\{h_i\}_{i=1}^l)
$$
私钥
$$
msk:=(\{s_i\}_{i=1}^l,\{t_i\}_{i=1}^l)
$$

### Keygen

计算数组 x 的对应私钥
$$
sk_x=(s_x,t_x)=(\sum_{i=1}^ls_i\cdot x_i, \sum_{i=1}^lt_i\cdot x_i)
$$
实际上就是两个内积和

### Encrypt

对于要加密的数据 y，一个 l 长的整数数组，选取随机数 r，加密如下
$$
C = g^r\quad D=h^r
$$

$$
E_i=g^{y_i}h_i^r\quad i\in[1,l]
$$

密文 Cy 为
$$
C_y=(C,D,E_i)
$$

### Decrypt

根据主公钥，私钥 x 和查询 Cy 进行解密
$$
E_x=\frac{\Pi_{i=1}^lE_i^{x_i}}{C^{s_x}\cdot D^{t_x}}
$$
"The inner product of the vectors x and y can be recovered from computing the discrete logarithm of Ex as regards the base g"

不知所云

## 索引构建

### Z 阶前缀编码

这里要进行加密存储的数据是一个个二维坐标，即 (x, y) 数据对，通过 z 阶码进行前缀编码，其规则如下

```java
public class TreeUtil{
    public static String toZCode(int x1, int y1, int x2, int y2){
        if(x1 <= x2){
            if(y1 >= y2){
                return "00";
            } else {
                return "01";
            }
        } else if(y1 >= y2){
            return "10";
        }
        return "11";
    }

    public static String toZCode(Location p1, Location p2){
        return toZCode(p1.getX(), p1.getY(), p2.getX(), p2.getY());
    }
}
```

即给定一个原点，若点在原点左上，则编为 00，若在左下，则编为 01，若在右上，则编为 10，若在右下，则编为 11

所以这里编码的思路为，根据一个个原点，不断增加点 P 的前缀，而后对这个前缀码进行 IPFE 加密，并构造相应四叉树节点

### 节点构造

节点结构

- p：节点原始坐标，在构造中使用
- x：节点前缀编码映射的整数数组
- s、t：x 经过 ipfe 加密的密文
- subtree：子树，四叉树

```java
public class QuadTree {
    private Location p;
    private Element[] x;
    private Element s_x, t_x;
    private QuadTree[] subtree;

    public QuadTree(){
        subtree = new QuadTree[4];
    }

    public QuadTree(Location o){
        this.p = o;
        subtree = new QuadTree[4];
    }

    public QuadTree(Location p, Element[] x, Element s_x, Element t_x){
        this.p = p;
        this.x = x;
        this.s_x = s_x;
        this.t_x = t_x;
        subtree = new QuadTree[4];
    }

    public void setSubtree(QuadTree t, int i){
        this.subtree[i] = t;
    }
}
```

通过 x 数组构造节点

```java
public class IPFEUtil{
    public static QuadTree keyGen(Element[] x, Location p){
        System.out.println("====== KeyGen ======");
        Element s1 = Zr.newZeroElement();
        Element s2 = Zr.newZeroElement();
        for(int i = 0; i < l; i++){
            s1.add(s[i].mul(x[i]));
            s2.add(t[i].mul(x[i]));
        }
        Element s_x = s1.getImmutable();
        Element t_x = s2.getImmutable();
        return new QuadTree(p, x, s_x, t_x);
    }
}
```

构造树

```java
public class TreeUtil{
    
    public static QuadTree enc(String str, Location p){
        Element[] x = IPFEUtil.hashStr2ZrArr(str);
        return IPFEUtil.keyGen(x, p);
    }

    public static boolean insert(String pre, Location p, QuadTree root){
        Location o = root.getP();
        String z = toZCode(p, o); // 增加的前缀
        int i = switch (z) { // 找下标
            case "00" -> 0;
            case "01" -> 1;
            case "10" -> 2;
            case "11" -> 3;
            default -> -1;
        };
        if(i == -1){
            return false;
        }
        QuadTree n = enc(pre + z, p); // 当前前缀总和
        QuadTree cur = root.getSubtree()[i];
        if(cur == null){
            root.setSubtree(n, i);
            return true;
        }
        return insert(pre+z, p, root.getSubtree()[i]);
    }


    public static QuadTree build(Location[] P){
        Location o = new Location(0, 0);
        QuadTree root = new QuadTree(o);
        for(Location p: P){
            insert("", p, root);
        }
        return root;
    }
}
```

## 加密搜索

## 测试

### 索引构建

手造 100000 个坐标数据

```java
static Location[] O;

public static void genPoint() {
    double centerX = 0; // 圆心的横坐标
    double centerY = 0; // 圆心的纵坐标
    double radius = 900; // 圆半径
    int numPoints = 100000; // 生成的点数

    Random random = new Random();
    O = new Location[numPoints];
    double[] x = new double[numPoints];
    double[] y = new double[numPoints];

    // 生成圆内的点
    for (int i = numPoints - 1; i >= 0; i--) {
        x[i] = centerX + random.nextDouble() * radius;
        y[i] = centerY + random.nextDouble() * radius;
        O[i] = new Location((int)x[i], (int)y[i]);
    }
    // 输出点坐标
    for (int i = 0; i < numPoints; i++) {
        System.out.println("["+x[i]+","+y[i]+"]");
    }

    for(Location o: O){
        System.out.println(o);
    }
}
```

多线程构造索引

- 这里的多线程还有封装空间，先这样用了，如果想双线程，则再开辟一个 thread1，然后用一个 lock1，主线程同时等待 lock 和 lock1 释放即可

```java
static int n = 7;
static long s, e;
static QuadTree root = null;

public static void main(String[] args) {
    Object lock = new Object();

    Thread thread = new Thread(new Runnable() {
        @Override
        public void run() {
            s1 = System.currentTimeMillis();
            for(int i = 0; i < n; i++){
                root = TreeUtil.build(O);
            }
            e1 = System.currentTimeMillis();
            synchronized (lock1) {//获取对象锁
                lock.notify();//子线程唤醒
            }
        }
    });

    thread.start();

    try {
        synchronized (lock) { //锁住子线程
            lock.wait(); //主线程等待
        }
    } catch (InterruptedException e) {
        e.printStackTrace();
    }
	
    // 遍历树 root
    bfs(root);
    System.out.println((e-s)/n + " ms");
}
```

层序遍历四叉树

```java
public static void printTree(QuadTree t){
    if(t != null) {
        System.out.print(t.getP() + "\tX: ");
        System.out.print(Arrays.toString(t.getX()) + "\ts_x: ");
        System.out.print(t.getS_x() + "\tt_x: ");
        System.out.print(t.getT_x());
        System.out.println();
    }
}

public static void bfs(QuadTree root){
    List<QuadTree> list = new ArrayList<>();
    if(root != null){
        list.add(root);
    }
    while(!list.isEmpty()){
        QuadTree cur = list.get(0);
        printTree(cur);
        for(int i = 0; i < 4; i++){
            if(cur.getSubtree()[i] != null){
                list.add(cur.getSubtree()[i]);
            }
        }
        list.remove(0);
    }
}
```

