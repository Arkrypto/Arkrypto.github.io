---
title: Hacker 101
date: 2023-5-20
tags:
  - Hacking
---

[Hacker101 CTF](https://ctf.hacker101.com/ctf)

## XSS

跨站脚本漏洞

<img src="./assets/6230889-834e76bc8c471138.jpg">

### Micro-CMS v1

CMS（Content Management System）：网站内容管理系统

通过js脚本直接注入html，这是最简单常用的POC（Proof of Concept，漏洞验证）

```html
<script>alert(\xss)</script>
```

通过 img 标签的错误事件（随便请求一张图片）注入js事件

```html
<img src=x onerror=alert(xss)> 
```

### Micro-CMS v2
