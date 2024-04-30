---
title: 远程访问MySQL数据库篇
date: 2024-04-19 09:22:15
categories:
  - 教程文章
tags:
  - MySQL
---

### 本地连接远程数据库

> 记得先把 3306 端口开放

1. 使用 FinalShell 登录服务器，然后进入 mysql

   ```sh
   mysql -u root -p
   ```

2. 将数据设置允许远程访问

   ```sh
   # 查看
   use mysql; select user,host from user;
   # 更改
   update user set host='%' where host='localhost';
   # 刷新
   FLUSH PRIVILEGES;
   ```

   ![image-20240419105423167](../../../figure/image-20240419105423167.png)

3. 本地电脑使用 Navicat 测试

   ![image-20240419111014669](../../../figure/image-20240419111014669.png)

### 本地使用 cmd 访问远程 MySQL 数据库

```sh
# mysql -h <远程服务器ip> -u root -p
mysql -h 106.52.141.30 -u root -p
```

![image-20240419111123295](../../../figure/image-20240419111123295.png)
