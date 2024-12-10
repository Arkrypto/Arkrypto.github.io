---
title: RabbitMQ
date: 2021-5-8
categories:
  - Dev
tags:
  - Middleware
---

## 部署

manjaro 安装

```bash
yay -S rabbitmq rabbitmqadmin
```

启动

```bash
sudo rabbitmq-plugins enable
sudo rabbitmq-server
```

默认端口

- 管理界面：15672
- 客户端：5672

后台运行

```bash
rabbitmq-server -detached
```

