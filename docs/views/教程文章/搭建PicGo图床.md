---
title: 利用PicGo+Gitee搭建图床
date: 2024-04-02 12:23:06
categories:
  - 教程文章
tags:
  - PicGo图床
---

### 介绍

利用 Gitee+PicGo+Typora+Snipaste 实现图床搭建、编写文档笔记

### 使用教程

1.  安装
    - 首先下载好 PicGo，下载地址：[https://github.com/Molunerfinn/PicGo/releases/tag/v2.3.1](https://github.com/Molunerfinn/PicGo/releases/tag/v2.3.1)
    - 下载并安装一个 Node.js
    - 在 PicGo 里面搜索"Gitee"，下载前面那个即可。

![image-20240328145528581](../../../../figure/image-20240328145528581.png)

2. 建立 gitee（码云）图床库
   - 在 Gitee 上新建一个仓库。选择【公开】仓库，勾选【使用 Readme 文件初始化这个仓库】
   - 选择【单分支模型（只创建 master 分支）】，之后点击【创建】

![image-20240328175129136](../../../../figure/image-20240328175129136.png)

3. 配置 PicGo

> 注：如何获取 token：【头像】->【设置】->【私人令牌】->【+生成新令牌】->仅勾选【projects】->【提交】->生成 token，一定要在这时将其复制到插件中，因为它仅出现一次，忘记后需要重新生成。

![image-20240329092527104](../../../../figure/image-20240329092527104.png)

- owner：所有者，写上你的 Gitee 账号名。如果你不知道你的账号名，进入你刚才的仓库，浏览器 url 里面有。
- repo：仓库名，比如我自己的仓库【figure】。
- path：写上路径（可不填默认仓库根路径），这几个项都不用加“ / “符号。
- token：刚才你获取的 Gitee 个人令牌 token 值。
- message：不用填。
- 填写完成后，点击设置默认图床和确定

### PicGo 软件上传

- 选择任意一张图片通过剪贴板、直接拖入或选择文件等方式上传。
- 上传成功之后默认复制链接，可见其直接粘贴到 markdown 文档里面（也可以选择默认复制的格式，如 Markdown 格式、URL 格式、HTML 格式等）
- 可以 Typora + PicGo + Snipaste[截图工具]来使用。Typora 写文档，Snipaste 一键截图，PicGo 一键上传图片返回链接。

### Typora 中自动上传图片到图床

- 进入 Typora->【偏好设置】->【插入图片时】选择【上传图片】->勾选【对本地位置的图片应用上述规则】
- 【上传服务设定】中的【上传服务】选择【PicGo(app)】->【PicGo 路径】PicGo 的安装路径即可->最后点击【验证图片上传选项】
- 出现下图的【验证成功】即可。

![image-20240329093724051](../../../../figure/image-20240329093724051.png)

![image-20240329093931502](../../../../figure/image-20240329093931502.png)

![image-20240329094123182](../../../../figure/image-20240329094123182.png)
