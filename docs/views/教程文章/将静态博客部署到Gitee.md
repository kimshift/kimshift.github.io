---
title: 将静态博客部署到Gitee
date: 2024-04-16 17:40:05
sticky: 1
categories:
  - 教程文章
tags:
  - 博客部署
---

### 介绍

> 将 vuepress 打包并部署到 Gitee Pages

1.  部署到项目仓库路径下：`https://<USERNAME>.gitee.io/<REPO>/`

2.  部署到用户 Gitee 根路径下：`https://<USERNAME>.gitee.io/`

### 方式一：部署到项目仓库路径下

1. 首先创建一个 gitee 仓库，例：vuepress

![image-20240417092153109](../../../image/image-20240417092153109.png)

2. 修改 vuepress 项目配置，将 base 的值修改成与仓库名路径一致即：/vuepress/

![image-20240417092858861](../../../image/image-20240417092858861.png)

3. 将 vuepress 项目打包->执行命令：npm run build，打包完成

4. 在终端 cd dist 进入文件目录，分别执行以下命令初始化本地 git 仓库以及推送至 gitee 等操作

   ```sh
   #例如：我配置的dist目录在项目根目录下
   cd dist
   git init
   git add -A
   git commit -m '初始化项目'
   #关联远程仓库[即刚刚创建的vuepress仓库]
   git remote add origin git@gitee.com:kimshift/vuepress.git
   #将dist部署文件推送至gitee仓库
   git push -u origin "master" -f
   ```

5. 在浏览器访问 gitee->vuepress 仓库，前往 Gitee Pages 部署项目

![image-20240417094513002](../../../image/image-20240417094513002.png)

![image-20240417094610831](../../../image/image-20240417094610831.png)

6. 等等启动完成，即可正常访问：`https://kimshift.gitee.io/vuepress`

   ![image-20240417094737480](../../../image/image-20240417094737480.png)

### 方式二：部署到 Gitee 根路径下

1. 修改 vuepress 的 Gitee 仓库地址，将地址后缀修改成跟用户名一致

   ![image-20240417095404721](../../../image/image-20240417095404721.png)

2. 修改 vuepress 项目配置文件的 base 值，将之前的【/vuepress/】改成更路径【/】

3. 然后打包重复执行之前的命令行即可：

   ```sh
   npm run build
   cd dist
   git init
   git add -A
   git commit -m '初始化项目'
   #关联远程仓库[即刚刚修改后的vuepress仓库]
   git remote add origin git@gitee.com:kimshift/kimshift.git
   #将dist部署文件推送至gitee仓库
   git push -u origin "master" -f
   ```

4. 打包且成功推送到 gitee 后，前往部署界面更新部署文件即可

5. 更新完成后，即可正常访问：`https://kimshift.gitee.io`

![image-20240417151702791](../../../image/image-20240417151702791.png)

### 博客预览

![image-20240417152156895](../../../image/image-20240417152156895.png)
