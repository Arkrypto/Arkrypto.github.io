---
title: 关于
date: 2019-12-25 14:27:01
permalink: /about/
sidebar: false
article: false
author:
  name: northboat
  link: https://github.com/northboat
---

## 📚Blog
这是一个知识库兼博客的个人网站 🥰

:::tip
文章内容仅是我个人的小总结，资历尚浅，如有误还请批评指正
:::

<!-- <div style="width: 300px;height: 300px;position: fixed;bottom: 0;left: 0;z-index: 1;">

  <script type="text/javascript" src="//rf.revolvermaps.com/0/0/8.js?i=5e4x5w8cxxb&amp;m=0&amp;c=ff0000&amp;cr1=ffffff&amp;f=arial&amp;l=33&amp;bv=80" async="async"></script>
</div> -->


## 🐼Biography
A graduate student at the State Key Laboratory of Integrated Service Networks at Xidian University, where he is pursuing his M.S. degree in Cybersecurity. He received his B.S. degree in Computer Science from Northeastern University, Qinhuangdao, China, in 2024. His research interests include IoT security and RFID authentication.

Xiong Zhoutong is with the State Key Laboratory of Integrated Service Networks, School of Cyber Engineering, Xidian University, Xi'an Shaanxi, 710126, China.

E-mail: northboat@163.com

### 🛠 Skills
* 熟悉 Java、Spring、SQL、JPBC 的拼写
* 了解 Linux 的开关机方式
* 擅长 JavaScript、HTML、CSS、Vue、React、Electron 的抄写
* 精通 Git 的 pull 和 push 以及 GitHub 的 star

## :email: Get in Touch

- WeChat or QQ: <a :href="qqUrl" class='qq'>{{ QQ }}</a>
- Email:  <a href="mailto:northboat@163.com">northboat@163.com</a>
- GitHub: <https://github.com/northboat>
- Vdoing主题文档：<https://doc.xugaoyi.com>

## 🎨Theme

[<img src="https://github-readme-stats.vercel.app/api/pin/?username=xugaoyi&amp;repo=vuepress-theme-vdoing" alt="ReadMe Card" class="no-zoom">](https://github.com/xugaoyi/vuepress-theme-vdoing)

本站主题是 [`Vdoing`](https://github.com/xugaoyi/vuepress-theme-vdoing)，这是一款简洁高效的VuePress 知识管理&博客 主题。旨在轻松打造一个`结构化`与`碎片化`并存的个人在线知识库&博客，让你的知识海洋像一本本书一样清晰易读。配合多维索引，让每一个知识点都可以快速定位！ [Github地址](https://github.com/xugaoyi/vuepress-theme-vdoing) | [在线vscode预览源码](https://github1s.com/xugaoyi/vuepress-theme-vdoing)

<script>
  export default {
    data(){
      return {
        QQ: '1543625674',
        qqUrl: `tencent://message/?uin=${this.QQ}&Site=&Menu=yes`
      }
    },
    mounted(){
      const flag =  navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
      if(flag){
        this.qqUrl = `mqqwpa://im/chat?chat_type=wpa&uin=${this.QQ}&version=1&src_type=web&web_src=oicqzone.com`
      }
    }
  }
</script>
