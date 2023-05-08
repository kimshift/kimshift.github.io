### 介绍

- 使用 vue-press 搭建的个人博客网站

### KimShift 博客

- 记得要奔走在自己的热爱里 🌹

### `Vuepress`博客预览

> gitee 预览地址：https://piante.gitee.io/vuepress

> 琴时博客地址：https://www.kim-shift.cn

**白嫖有罪，如有帮助，点赞收藏！**

### 项目架构

- 采用 vuepress 和主题 reco 二次构建

```lua
##需要自己写主题样式的话，在.vuepress/ 下新建theme文件夹并按如下目录布局
Dev
├─── docs
│   └── .vuepress   // 配置目录
│   │    ├── public // 静态资源
│   │    ├── theme  // 主题
│   │    │   ├── components // 组件
│   │    │   ├── global-components // 全局组件
│   │    │   ├── layouts // 布局(包括首页在内)
│   │    │   ├── styles  // 样式
│   │    │   ├── util 	 // 工具
│   │    │   ├── index.js // 入口配置
│   │    │   ├── noopModule.js // 依赖注入
│   │    │   ├── package.json  // 主题依赖
│   │    │   ├── README.md     // 主题说明
│   │    └── config.js
│   ├── about   // 项目模块
│   ├── views   // 项目模块
│   └── README.md   // 首页
└── package.json //项目依赖
```

### 约定路由模式

| 文件的相对路径     | 页面路由地址   |
| ------------------ | -------------- |
| `/README.md`       | `/`            |
| `/guide/README.md` | `/guide/`      |
| `/config.md`       | `/config.html` |

### 项目介绍

- 知识点复习和经验总结（不断完善中，欢迎加入！）
- 技术栈知识点笔记总结（知识小结）
- 个人牢骚发布点（生活随笔）
- 其它...

### 开始编写 markdown

- 参考示例：

```yaml
---
title: 文章标题
date: 2020-02-02
tags:
 - 标签
categories:
 - 分类
keys:
 - '123456' //文章加密密码
sticky: 1   //文章置顶 1, 2, 3, ...
sidebar: false //是否关闭侧边栏[默认开启]
isShowComments: false //是否开启评论
publish: true //文章是否发布
---

<Boxx/> //随机展示名人名言

[[toc]] //目录链接

- 这里可以写`摘要`等其它

<!-- more --> //在<!-- more -->之前的内容会展示为文章摘要

## 正式开始你的markdown

- 正文内容...
```

### 项目运行

- 在项目文件夹下执行命令，安装依赖：`npm install`
- 在项目文件夹下执行命令，运行项目：`npm start`
- 编译完成访问：[http://localhost:8080](http://localhost:8080)`
