---
title: We Chall
date: 2022-6-30
tags:
  - Hacking
---

[WeChall](https://www.wechall.net/)

## Training

### Training: Get Sourced

`F12`查看`HTML`源码，答案写在注释里，藏在`body`的右下方

~~~html
<!-- Now this is a comment! -->
<!-- You are looking for this password: html_sourcecode -->       
</body></html>
~~~

### Training: Stegano Ⅰ

通过`html`代码找到图片源下载，得到`btegano1.bmp`，直接用记事本或者`notepad++`打开，或修改后缀为`.txt`打开，可得到答案

~~~
BMf       6   (               0                   Look what the hex-edit revealed: passwd:steganoI
~~~

可以用`notepad++`等编辑器打开`bmp`文件，在末尾加入文字信息（若用记事本直接修改将损坏文件）

## SQL

### Training: MySQL Ⅰ

查看后端源码发现登录的`SQL`语句是这么写的，同时发现了管理员用户名`admin`

~~~php
$query = "SELECT * FROM users WHERE username='$username' AND password='$password'";
~~~

可以在传入用户名时动手脚

1、传入`admin'#`，这样`sql`语句的字符串将变成

~~~
"select * from users where username='admin''#..."
~~~

于是验证密码的部分被替换为`sql`注释，因为`admin`存在，返回一定为真

2、传入`admin' or '1`

~~~sql
select * from users where username='admin' or '1' and password='$password'
~~~

同样因为掺入了`1`，于是返回始终为真

## Crypto

### Training:  Crypto-Caesar Ⅰ

简单的古典密码解密，给定一串码

~~~
PDA MQEYG XNKSJ BKT FQILO KRAN PDA HWVU ZKC KB YWAOWN WJZ UKQN QJEMQA OKHQPEKJ EO BWCYZILHHNKW
~~~

合理猜测每个字母加上一个相同的数变为当前码，如`A+2=C, Z+1=A`

于是编写程序列出总共26种可能性，同时将大写转小写便于阅读

python 代码

~~~python
code = "LZW IMAUC TJGOF XGP BMEHK GNWJ LZW DSRQ VGY GX USWKSJ SFV QGMJ MFAIMW KGDMLAGF AK YZJJKAKWUUKH"
i = 0
while i < 26:
    print(i+1, end='.')
    for c in code:
        if c == ' ':
            print(c, end='')
            continue
        print(chr(97+(ord(c)-65+i)%26),end="")
    i += 1
    print('\n')
~~~

从 26 句中找到有意义的一行

~~~
the quick brown fox jumps over the lazy dog of caesar and your unique solution is ghrrsiseccsp
~~~

密码为

~~~
ghrrsiseccsp
~~~

## Encode

### Encodings: URL

给定一串`URL`码

~~~
%59%69%70%70%65%68%21%20%59%6F%75%72%20%55%52%4C%20%69%73%20%63%68%61%6C%6C%65%6E%67%65%2F%74%72%61%69%6E%69%6E%67%2F%65%6E%63%6F%64%69%6E%67%73%2F%75%72%6C%2F%73%61%77%5F%6C%6F%74%69%6F%6E%2E%70%68%70%3F%70%3D%64%64%6F%65%70%61%6C%68%65%61%73%68%26%63%69%64%3D%35%32%23%70%61%73%73%77%6F%72%64%3D%66%69%62%72%65%5F%6F%70%74%69%63%73%20%56%65%72%79%20%77%65%6C%6C%20%64%6F%6E%65%21
~~~

URL实际上就是16进制的ASCII码，每个字符通过%分隔开

直接在控制台用js当然也是可以的，调用`decodeURL()`函数

~~~js
url = '%59%69%70%70%65%68%21%20%59%6F%75%72%20%55%52%4C%20%69%73%20%63%68%61%6C%6C%65%6E%67%65%2F%74%72%61%69%6E%69%6E%67%2F%65%6E%63%6F%64%69%6E%67%73%2F%75%72%6C%2F%73%61%77%5F%6C%6F%74%69%6F%6E%2E%70%68%70%3F%70%3D%64%64%6F%65%70%61%6C%68%65%61%73%68%26%63%69%64%3D%35%32%23%70%61%73%73%77%6F%72%64%3D%66%69%62%72%65%5F%6F%70%74%69%63%73%20%56%65%72%79%20%77%65%6C%6C%20%64%6F%6E%65%21'
'%59%69%70%70%65%68%21%20%59%6F%75%72%20%55%52%4C%20%69%73%20%63%68%61%6C%6C%65%6E%67%65%2F%74%72%61%69%6E%69%6E%67%2F%65%6E%63%6F%64%69%6E%67%73%2F%75%72%6C%2F%73%61%77%5F%6C%6F%74%69%6F%6E%2E%70%68%70%3F%70%3D%64%64%6F%65%70%61%6C%68%65%61%73%68%26%63%69%64%3D%35%32%23%70%61%73%73%77%6F%72%64%3D%66%69%62%72%65%5F%6F%70%74%69%63%73%20%56%65%72%79%20%77%65%6C%6C%20%64%6F%6E%65%21'
answer = decodeURI(url)
'Yippeh! Your URL is challenge%2Ftraining%2Fencodings%2Furl%2Fsaw_lotion.php%3Fp%3Dddoepalheash%26cid%3D52%23password%3Dfibre_optics Very well done!'
~~~

### Training: ASCII

给定一串ASCII码

~~~
84, 104, 101, 32, 115, 111, 108, 117, 116, 105, 111, 110, 32, 105, 115, 58, 32, 98, 109, 97, 108, 114, 110, 114, 97, 103, 103, 115, 114
~~~

js 解码

```js
ascii = [84, 104, 101, 32, 115, 111, 108, 117, 116, 105, 111, 110, 32, 105, 115, 58, 32, 98, 109, 97, 108, 114, 110, 114, 97, 103, 103, 115, 114]
res = ""
for(let i in ascii){
    res += String.fromCodePoint(ascii[i])
}
console.log(res);
```

得到

```
The solution is:bmalrnraggsr
```

故密码为

```
bmalrnraggsr
```

