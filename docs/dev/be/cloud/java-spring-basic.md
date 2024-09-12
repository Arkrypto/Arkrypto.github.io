---
title: Spring 基础
date: 2024-9-13
categories:
  - devops
tags:
  - Java
---

## 反射机制和注解

通过类名（字符串）去构建类本身，并且调用类中函数，这是一个反向构造的过程，在 Spring 中多用注解的形式，对所有的对象进行一个反向构造和统一管理，即 IoC 的实现

通过 invoke 函数对对象进行创建

## IoC

> 控制反转，目的用于解耦，底层使用的技术是反射 + 工厂模式

### 注册 Bean

@Bean

- @Component
- @Service
- @Repository
- @Controller

@Configuration

@RestController = @Controller + @ResponseBody

@RequestMapping

- @PathVariable
- @RequestParam

@GetMapping

junit 单元测试

- @SpringBootTest
- @Test

### 使用 Bean

@Autowired 在类中注入 Bean 对象，进行后续使用

变量注入（不推荐）

~~~java
@Autowired
JdbcTemplate jdbcTemplate
~~~

构造器注入

~~~java
final UserDao userDao;

@Autowired
public UserServiceImpl(UserDao userDao) {
    this.userDao = userDao;
}
~~~

set方法注入

~~~java
//set方法注入
private JdbcTemplate jdbcTemplate;
@Autowired
public void setJdbcTemplate(JdbcTemplate jdbcTemplate){
    this.jdbcTemplate = jdbcTemplate;
}
~~~

## AOP

面向切面编程，Aspect Oriented Programming

## 设计模式

在 Spring 的框架下，应用程序将被天然的设计为一个 MVC 架构，在架构之上，我们可以对软件、应用、编码的设计模式进行一定的考量

## 模板引擎

> Thymeleaf，耦合前端

引入

```html
<html lang="en" xmlns:th="http://www.thymeleaf.org"></html>
```

~~~xml
<!--thymeleaf依赖  -->
<dependency>
    <groupId>org.thymeleaf</groupId>
    <artifactId>thymeleaf-spring5</artifactId>
</dependency>
<dependency>
    <groupId>org.thymeleaf.extras</groupId>
    <artifactId>thymeleaf-extras-java8time</artifactId>
</dependency>
~~~

设置不缓存，修改立即生效，否则缓存将影响测试，部署时可改回

~~~yml
spring:
  thymeleaf:
    cache: false
~~~

判断并打印

~~~html
<div th:text="${msg}"><h1>cnm</h1></div>
~~~

提取公共元素

~~~html
<div th:insert="${commons/commons.html:topbar}"></div>
<div th:replace="${commons/commons.html:topbar}"></div>
~~~

传值

~~~html
<a th:href="@{/drop/}+${p.getMail().getNum()}" class="card-more" data-toggle="read" data-id="1"><i class="ion-ios-arrow-left"></i>删除<i class="ion-ios-arrow-right"></i></a>
~~~

## 中间件集成

### Mail

邮件发送

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-mail</artifactId>
</dependency>
```

### WebSocket

websocket 通信

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-websocket</artifactId>
</dependency>
```

### RabbitMQ

消息队列

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.amqp</groupId>
    <artifactId>spring-rabbit-test</artifactId>
    <scope>test</scope>
</dependency>
```

