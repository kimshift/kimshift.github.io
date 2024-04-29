---
title: 将静态博客部署到Github
date: 2024-04-29 15:48:45
categories:
  - 教程文章
tags:
  - 博客部署
sticky: 2
---

### 介绍

> 将 vuepress 打包并部署到 Github Pages.
>
> GitHub 相比与 Gitee，只要在 GitHub 配置第一次后，下次更新博客推送不需要前往 GitHub 重新部署更新
>
> GitHub action 会监听 pages 分支，有新内容推送上来会自动构建部署

### 部署到 Github 根路径下

1. 创建仓库，仓库名必须是【用户名.github.io】

   ![image-20240429155231847](../../../image/image-20240429155231847.png)

2. 修改 vuepress 项目配置，将 base 的值修改成：`/`

3. 然后执行以下命令行：

   ```sh
   # 打包构建镜像文件
   npm run build
   # 进入打包好的文件目录
   cd dist
   # 初始化本地git仓库
   git init
   git add -A
   git commit -m '初始化项目'
   #关联远程仓库[即刚刚创建的GitHub仓库]
   git remote add origin git@github.com:kimshift/kimshift.github.io.git
   git checkout -b pages
   #将dist镜像文件推送至Github仓库---pages分支
   git push -u origin "pages" -f
   ```

4. 打包且成功推送到 github 后，前往 GitHub 仓库设置 pages 部署

   ![image-20240429161132822](../../../image/image-20240429161132822.png)

5. 可前往 GitHub 仓库的 action 查看部署结果：[https://github.com/kimshift/kimshift.github.io/actions](https://github.com/kimshift/kimshift.github.io/actions)

6. 部署完成后，即可正常访问：[https://kimshift.github.io](https://kimshift.github.io)

