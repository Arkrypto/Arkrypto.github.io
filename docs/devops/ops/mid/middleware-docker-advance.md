---
title: Docker Advance
date: 2021-5-17
categories:
  - WebDevOps
tags:
  - Middleware
---

## 进阶命令

挂载数据卷

~~~bash
docker run -v /myDataVolume:/containerVolume 镜像名称
~~~

拷贝指定文件到指定目录

~~~
docker cp 容器名:/containerVolume/  /myDataVolume/
~~~

~~~bash
docker cp /myVolume/  容器名:/containerVolume/
~~~

监听容器状态

~~~bash
docker stats --no-stream --format "{}" 容器名
~~~

- --no-stream：不持续输出，即打印当前状态
- --format：自定义输出格式（json）

重连容器

~~~bash
exec -it 容器名 /bin/bash
~~~

将Web项目挂在tomcat容器内

- 启动 tomcat 容器，将 war 包复制进容器 /usr/local/tomcat/webapps/ 目录即可
- 容器会自动解压war包，然后通过 ip:8080/NEUQHelper 即可访问项目

~~~bash
docker cp /java/NEUQHelper.war de9dc1076633:/usr/local/tomcat/webapps/
~~~

## Docker+

### MySQL

1、拉取镜像

~~~bash
docker pull mysql:5.7
~~~

- 也可指定其他版本

2、生成容器

~~~bash
docker run -it --name My-mysql -p 13306:3306 -e MYSQL_ROOT_PASSWORD=123456 84164b03fa2e（镜像id）
~~~

- --name 自定义设置容器名称

- -p 后为映射端口 从linux上的 13306 映射为容器中的 3306端口

- -e 后设置 mysql 登录密码

3、连接容器

~~~bash
docker exec -it 064c6bea326d /bin/bash
~~~

4、登录

~~~bash
mysql -h localhost -u root -p
~~~

- 输入密码，登录成功


### Tomcat 部署 war 包

1、拉取镜像

~~~bash
docker pull tomcat
~~~

2、生成容器

~~~bash
docker run -it -d --name mycat -p 8080:8080 tomcat
~~~

- --name 自定义设置容器名称

- -d 后台启动

- -p 设置端口（8080）

3、本地访问tomcat

~~~bash
localhost:8080
~~~

4、Issue

通常情况下，8080端口访问的首页找不到，即显示404，原因是tomcat容器中默认ROOT目录在`webapps.dist`文件夹中，而`webapps`目录为空，但配置文件又约定在 `webapps/ROOT/`中去找首页`index.html`，于是报错

- 其实他这样是为了方便给你放自己的网页

解决办法：

进入tomcat容器

~~~bash
docker exec -it mycat /bin/bash
~~~

将`webapps.dist`目录名修改为`webapps`

~~~bash
mv webapps webapps1
mv webapps.dist webapps
~~~

ctrl+p+q退出容器，重新访问8080端口

### ProjectorDocker

1、拉取镜像

~~~bash
docker pull projectorimages/projector-idea-c
~~~

2、运行容器

~~~bash
docker run --rm -p 8887:8887 -it projectorimages/projector-idea-c
~~~

- 我尝试挂载一个目录，目录下放了jdk1.8以及一个项目文件，不幸的是，配置jdk1.8后，idea报错无法修改配置，在数据卷中创建项目同样不成功，报错“read only”，即使我设置了读写权限


3、通过ip:8887访问idea

4、将容器内数据拷贝

~~~bash
docker cp 容器名:目录 宿主机目录
~~~

## Docker API 开发

[DockerClient API Docs](https://docs.docker.com/engine/api/)

> 调用`DockerClient API`，用Java代码远程创建并使用容器

### DockerRunner

导包并设置内置属性

~~~java
package com.docker;

import com.spotify.docker.client.*;
import com.spotify.docker.client.messages.*;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URI;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

public class DockerRunner implements Runner {

    private final String DOCKER_CONTAINER_WORK_DIR = "/usr/codeRun";
    private final String getMemory = "sh -c docker stats --no-stream --format \"memory:{{.MemUsage}}\"";;
    private Map<Integer, String> imageMap = new HashMap<>();
    private DockerClient docker;
    private String id;
    //private List<Image> Images = new ArrayList<>();
    private ContainerConfig containerConfig;
}
~~~

初始化 docker 容器

~~~java
//初始化
public long init(int type) {

    long startTime = System.currentTimeMillis();
    System.out.println("开始初始化docker");

    imageMap.put(25695, "hello-world:latest");
    imageMap.put(10730, "gcc:7.3");
    imageMap.put(20800, "openjdk:8");
    imageMap.put(21100, "openjdk:11");
    imageMap.put(30114, "golang:1.14");

    System.out.println("开始初始化");
    try{
        //初始化docker代理
        docker = DefaultDockerClient.builder()
                .uri(URI.create("https://39.106.160.174:2375"))
                .dockerCertificates(new DockerCertificates(Paths.get("src/main/resources/certs")))
                .build();
        System.out.println("docker_client初始化成功");

         //记录已有镜像信息
         /*
         System.out.println("开始记录docker_client_images");
         Images = docker.listImages();
         Iterator<Image> i = Images.listIterator();
         while(i.hasNext()){
             System.out.println(i.next());
         }
         System.out.println("images记录完毕");
         */

         //开始创建容器
        System.out.println("开始创建docker容器");
        containerConfig = ContainerConfig.builder()
                 //让容器持续开启
                .openStdin(true)
                 //添加卷
                .addVolume(DOCKER_CONTAINER_WORK_DIR)
                 //设置docker工作卷
                .workingDir(DOCKER_CONTAINER_WORK_DIR)
                .image(imageMap.get(type))
                .build();
        ContainerCreation creation = docker.createContainer(containerConfig);

        // 记录容器id，用于之后连接
        id = creation.id();

        // 打印容器信息
        final ContainerInfo info = docker.inspectContainer(id);
        System.out.println(info.toString());


        System.out.println("容器创建完毕");
    }catch (Exception e) {
        e.printStackTrace();
    }finally {
        long endTime = System.currentTimeMillis();
        return endTime - startTime;
    }
}
~~~

停止并销毁容器

~~~java
//停止容器：记录停止时间
public long kill(){
	long startTime = System.currentTimeMillis();
	try{
        //停止容器
        docker.stopContainer(id, 0);
        System.out.println("停止容器成功");
        //移除容器
        docker.removeContainer(id);
        System.out.println("已移除容器");
        //关闭docker代理
        docker.close();
        System.out.println("docker代理已关闭");
    }catch(Exception e) {
        e.printStackTrace();
    }finally{
        System.out.println("本次判题结束，正在返回结果...");
        long endTime = System.currentTimeMillis();
        return endTime - startTime;
    }
}
~~~

覃辉学长的 test 方法

~~~java
//测试运行
public HashMap<String, Object> test(int imageType){
    init(imageType);
    HashMap<String, Object> res = new HashMap<String, Object>();
    try{
        //启动container
        docker.startContainer(id);


        //开始在容器内部执行命令执行
        System.out.println("正在执行命令...");

        //将文件拷贝至容器内部
        docker.copyToContainer(new java.io.File("src/main/resources/myCode").toPath(), id, "/usr/codeRun/");


        //开始执行
        final String[] command1 = {"javac", "Solution.java"};
        ExecCreation execCreation1 = docker.execCreate(
                id, command1, DockerClient.ExecCreateParam.attachStdout(),
                DockerClient.ExecCreateParam.attachStderr());

        final String[] command2 = {"java", "Solution"};
        ExecCreation execCreation2 = docker.execCreate(
                id, command2, DockerClient.ExecCreateParam.attachStdout(),
                DockerClient.ExecCreateParam.attachStderr());

        //获取命令的运行结果
        final LogStream output1 = docker.execStart(execCreation1.id());
        final String execOutput1 = output1.readFully();
        final LogStream output2 = docker.execStart(execCreation2.id());
        final String execOutput2 = output2.readFully();

        //获取运行状态
        final ExecState state1 = docker.execInspect(execCreation1.id());
        final ExecState state2 = docker.execInspect(execCreation2.id());

        //等待运行完成
        System.out.println("正在运行...");
        while(state1.running()){};
        while(state2.running()){};

        String ans = execOutput2.substring(0, execOutput2.indexOf('_'));
        String time = execOutput2.substring(ans.length()+1);

        //将运行结果存于res（map）中返回
        res.put("第一条命令的运行结果", execOutput1);
        res.put("第一条命令的返回值", state1.exitCode());
        res.put("第二条命令的运行结果", ans);
        res.put("第二条命令的返回值", state2.exitCode());
        res.put("程序运行时间", time);

        System.out.println("执行结束");

    }catch(Exception e) {
        e.printStackTrace();
    }finally {
        kill();
    }
    return res;
}
~~~

我的 run 方法

~~~java
//去除了时间的单位ms（为了累计计算总时间）
public HashMap<String, Object> run(String[][] commandLine, int imageType, long timeLimit, long memoryLimit){
    HashMap<String, Object> res = new HashMap<>();
    res.put("创建容器时间", init(imageType) + "ms");
    try{
        //连接container
        System.out.println("连接容器");
        docker.startContainer(id);

        //将本地文件夹共享至容器内部
        docker.copyToContainer(new java.io.File
                ("src/main/resources/myCode").toPath(), id, "/usr/codeRun/");


        //开始在容器内部执行命令执行
        //编译java文件
        //commandLine[0]是编译命令，commandLine[1]是执行命令
        System.out.println("开始编译...");
        final ExecCreation execCompile = docker.execCreate(
                id, commandLine[0], DockerClient.ExecCreateParam.attachStdout(),
                DockerClient.ExecCreateParam.attachStderr());
        ExecState compileState = docker.execInspect(execCompile.id());
        //执行编译命令
        docker.execStart(execCompile.id());
        while(compileState.running()){};
        System.out.println("编译成功");



        //编译完成，执行class文件
        final ExecCreation execCreation = docker.execCreate(
                id, commandLine[1], DockerClient.ExecCreateParam.attachStdout(),
                DockerClient.ExecCreateParam.attachStderr());

         //获取命令的运行结果
        LogStream output = docker.execStart(execCreation.id());
        String execOutput = output.readFully();



        //获取运行状态
        ExecState state = docker.execInspect(execCreation.id());


        //等待运行完成
        System.out.println("正在运行程序..");

        while(state.running()){};
        System.out.println("运行结束");


        //获取运行结果
        //String ans = execOutput;
        String ans = execOutput.substring(0, execOutput.indexOf('_'));


        //获取运行时间
        //String time = execOutput;
        String time = execOutput.substring(ans.length()+1);


        // Inspect container
        /*
        final ContainerInfo info = docker.inspectContainer(id);
        String getMemory = "bash\t-c\tdocker\tstats\t--no-stream";
        ExecState state1 =  docker.execInspect("getMemory");
        String memory = state1.toString();

        //获得容器内存占用
        ContainerStats containerstats = docker.stats(id);
        MemoryStats memorystats = containerstats.memoryStats();
        long memory = memorystats.usage()/1024;
        */
        //获得内存使用
        /*
        TopResults set = docker.topContainer(id);
        set.processes();
        long memory = docker.stats(id).memoryStats().usage()/1024;
        */

        //在容器外，即服务器主机上执行shell命令 docker stats --no-stream --format "memory:{{.MemUsage}}" + 容器id，获取容器内存占用
        Process pro = Runtime.getRuntime().exec(getMemory + id);
        BufferedReader buf = new BufferedReader(new InputStreamReader(pro.getInputStream()));
        StringBuffer mem = new StringBuffer();
        String str;
        while ((str = buf.readLine()) != null) {
            mem.append(str);
        }
        String memory = "0MiB";
        if(mem.length()!=0){
            memory = mem.substring(mem.indexOf(":"), mem.indexOf("/"));
        }



        res.put("运行结果", ans);
        res.put("运行时间", time + "ms");
        res.put("内存使用", memory);


        //记录是否超时
        if(Integer.parseInt(time) > timeLimit) {
            res.put("超时", true);
        } else{
            res.put("超时", false);
        }

        if(Integer.parseInt(memory.substring(0, memory.indexOf("M"))) > memoryLimit){
            res.put("超出内存限制", true);
        }else{
            res.put("超出内存限制", false);
        }


    }catch(Exception e) {
        e.printStackTrace();
    }finally {
        res.put("停止容器时间", kill() + "ms");
    }
    return res;
}
~~~

### 判题测试

~~~java
package com.docker;

import java.util.HashMap;

// 10730 gcc:7.3 |  20800 openjdk:8 | 21100 openjdk:11 | 30114 golang:1.14

public class RunnerTest {
    public static void main(String[] args) {

        DockerRunner docker = new DockerRunner();
        String[][] command1 = {{"javac", "HelloWorld.java"}, {"java", "HelloWorld"}};
        String[][] command2 = {{"gcc", "main.c", "-o", "main", "main"}};
        String[][] command3 = {{"javac", "-d", ".", "Solution.java"}, {"java", "test/Solution"}};

        HashMap<String, Object> res = docker.run(command3,20800, 2, 50);

        System.out.println();
        for(String str: res.keySet()){
            if(str == "运行结果"){
                System.out.println("\n运行结果：" + res.get(str));
            }else{
                System.out.print(str + ":" + res.get(str) + "    ");
            }
        }
        System.out.println("\nfinished!");

    }
}


//测试创建、运行、停止时间
/*
        long initTime = Integer.parseInt(res.get("创建容器时间").toString());
        long stopTime = Integer.parseInt(res.get("停止容器时间").toString());
        long runningTime = Integer.parseInt(res.get("运行时间").toString());

        for (int i = 0; i < 499; i++) {
            HashMap<String, Object> temp = docker.run(command1, 20800, 0, 252);
            initTime += Integer.parseInt(temp.get("创建容器时间").toString());
            stopTime += Integer.parseInt(temp.get("停止容器时间").toString());
            runningTime += Integer.parseInt(temp.get("运行时间").toString());
            System.out.println(i+2);
        }
        System.out.println("总创建容器时间：" + initTime + "   总运行时间：" + runningTime + "    总停止容器时间：" + stopTime);
        System.out.println();
*/
~~~

### 测试用例

1、HelloDocker

`HelloDocker.java ——> comandLine1`

~~~java
import java.io.BufferedReader;

import java.io.InputStreamReader;


public class HelloWorld{
	public static void main(String[] args){

		long startTime = System.currentTimeMillis();

		int j = 1;
		for(int i = 1; i < 12000; i++){
			j *= i;
		}
		System.out.println("Hello Docker!");		

		long endTime = System.currentTimeMillis();
		long time = endTime - startTime;
		System.out.print("_" + time);
	}
}
~~~

结果

~~~shell
开始初始化docker
开始初始化
01:15:21.302 [main] DEBUG com.spotify.docker.client.DockerCertificates - Generated private key from spec using the 'RSA' algorithm
01:15:22.596 [main] DEBUG com.spotify.docker.client.DockerConfigReader - Using configfile: C:\Users\NorthBoat\.docker\config.json
docker_client初始化成功
开始创建docker容器
容器创建完毕
连接容器
01:15:25.805 [main] INFO com.spotify.docker.client.DefaultDockerClient - Starting container with Id: 4a2bebba027acbebc81faf7451afb481dceeeecfdf8dfe1f2fb0d6af8f86bdc1
开始编译...
编译成功
正在运行程序..
运行结束
停止容器成功
已移除容器
docker代理已关闭
本次判题结束，正在返回结果...

超时:false    超出内存限制:false    创建容器时间:5174ms    内存使用:0MiB    运行时间:1ms    停止容器时间:704ms    
运行结果：
Hello Docker!


finished!

Process finished with exit code 0
~~~

2�m>o�e���E���:K�I+�N	^x$��xE���_Ə�� h�i>�j����w��nt��.ບ�XY�dh� � 9q������־���`E|���-�f9� `����4a����I�ȵ�b'���08�K36W''���!t4�O)v$��bXs�>l���VP��%�̧�9]lu�]O��42���,��i���TK+�q��q�(�t3K1�s;�Q�@J���� ?)P8#4߇zͥ���[��{]F�=F5��ǲ�TdV�@�ܘc�i �+�]RO��$z���G𵽻]�h��Os$�\Ȳ��dpJƀ��A�tc-� �Zkg�0�$�p_�^�zż��r�]6�;����,��0�epd1
�F�.y��x�N��ͤ��:�yv���,0�<ls�v�J�꣞ ����u[5��ŔW7�:��+��$}F9dV�In�+���95�x�Q�}��$3�R�-m�5)&�3�e!��T� �|�#8�')ʴ]��}\��J��>{���>Cmm�lj�pH� ����|���D�� ��#<�� ���}v� l����<H���.��%]�����\`u�qt�F%�:7`��K�Q����\ [###��V���Bm=�:�h��>F�Α,d��>��  �N:橸���0�hCN��]aV7vv$�;N{1�$���4�c���e�YV+�1��A+�$U��Yƫ��H�E|�@� ē��1$��O+�'d������v���D8򥌾�P�?օCT�*W9<g��|wIuv�%��h��i%H�L��Q�U�CH���PH��A�O�5���I�W7
��2��>��=J���'�b����,�5�	 k�%���`�ڧ#O 3r��e{�Z^�oBC"I�0F�h����b�q�;���8���F7	�yehG�X<�Į��p8 u�5���-�26^;������0;2ɌdW-�!�
B���sC����&Wl�E!�`��t57orZ��<_ȩl�ur2���ܛ@\�w|�`t>K�.�Kk�<>c�-ړq��K�A���䒠�v5^|j�?ռE�D�_� �`��pI,Ai�<LvD�,��ǉ�Ƌ�F`�8��M+��ws����vKa��&F��O�1�P�����вw!���-��Λc��w@�����	�ՓLɅ���� ���'� w⑬Ib"�!'����R1R�H�N9#w��U'f�3���{�hmD����ɸ��@Z+�PA2��.	����8�R�cA,B_���T��.���;�3V�b�d��4M�*�l���B� ��:�励�I��E�E��s1��HNA��p��NMT�]���A&�*��ܬ��㗔�'�y
�6_�U_�T�;t:���s��u�����f�\y���P�$�g`FqҮh��6���|�m�[,67�w��3�)��L�S�8������2���X�����g�UEPIx�����I��~�FnH���`����T����rq�8#�N��|˹M��_t�2�������f1�_�[%��f�	@�X� s$��IȈ��f ��<�\�ok�F��d�..�@bCd�\� ���w��rM��A�A|�wo;������y�V � 0�� �N:&�m�W%�u�Wx�R̤��)�'�09�B�\�n�-
��g�y $#������ |������1 ��s�UG�TT "X�K+�p28�-r��b⹟+!�	c��LQ�x�[�Q�la��%I �@H�f���	OG��b��iVER�X��� 
��n� S]v�����"'���΍c�CL
);� �����4F��[<��$���8�]�G?<�1��(�	�n1M7mK�nIw9It,ʳ��]��Ak-��(��VHط��
��
ONޏ
�zM��L�ooz�$�Q[�����1B��0щv$��p��6�E��