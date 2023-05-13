---
title: 本地生成SSH公钥
date: 2023-05-13 13:20:23
tags:
  - ssh
categories:
  - Git知识
isShowComments: false
---

## SSH 公钥配置

### 打开本地终端

- 笔记本/台式：CMD 窗口或者 git 的 bash 窗口等等
- 云服务器/linux 系统的终端

### 在命令行输入命令生成 ssh 秘钥

> 参数 -t rsa 表示使用 rsa 算法进行加密，执行后，会在/home/当前用户/.ssh 目录下找到 id_rsa(私钥)和 id_rsa.pub(公钥)
> 并按回车 3 下（为什么按三下，是因为有提示你是否需要设置密码，如果设置了每次使用 Git 都会用到密码，一般都是直接不写为空，直接回车就好了）。
> 会在一个文件夹里面生成一个私钥 id_rsa 和一个公钥 id_rsa.pub。（可执行 start ~ 命令，生成的公私钥在 .ssh 的文件夹里面）

- 邮箱改成你自己的
- 下一步**连续回车**即可

```sh
ssh-keygen -t rsa -C "710429093@qq.com"
```

### 生成秘钥后输入命令查看秘钥

- 将生成的秘钥全部内容复制到需要的地方操作即可

```sh
cat ~/.ssh/id_rsa.pub
```
