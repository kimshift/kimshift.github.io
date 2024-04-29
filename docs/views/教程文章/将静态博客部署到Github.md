---
title: 将静态博客部署到Github
date: 2024-04-29 15:48:45
sticky: 1
categories:
  - 教程文章
tags:
  - 博客部署
---

### 介绍

> 将 vuepress 打包并部署到 Github Pages

### 部署到 Gihub 根路径下

1. 创建仓库，仓库名必须是【用户名.github.io】

   ![image-20240429155231847](https://gitee.com/gzcc_kims/figure/raw/master/image-20240429155231847.png)

2. 然后打包重复执行之前的命令行即可：

   ```sh
   npm run build
   cd dist
   git init
   git add -A
   git commit -m '初始化项目'
   #关联远程仓库[即刚刚创建的仓库]
   git remote add origin git@github.com:kimshift/kimshift.github.io.git
   #将dist部署文件推送至github仓库---pages分支
   git push -u origin "pages" -f
   ```

3. 打包且成功推送到 gihub 后，第一次 GitHub 将会自动构建部署站点

4. 可前往 GitHub 仓库的 action 查看：https://github.com/kimshift/kimshift.github.io/actions

5. 部署完成后，即可正常访问：`https://kimshift.github.io`
