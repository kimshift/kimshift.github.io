### 介绍

- 使用 vuepress 搭建的个人博客网站

### KimShift 博客

- 记得要奔走在自己的热爱里 🌹

### `Vuepress`博客预览

> gitee 预览地址：https://kimshift.gitee.io

> 琴时博客地址：---

**白嫖有罪，如有帮助，点赞收藏！**

### 项目介绍

- 知识点复习和经验总结（不断完善中，欢迎加入！）
- 技术栈知识点笔记总结（知识小结）
- 个人牢骚发布点（生活随笔）
- 其它...

### 项目运行

- 在项目文件夹下执行命令，安装依赖：`npm install`
- 在项目文件夹下执行命令，运行项目：`npm start`
- 编译完成访问：[http://localhost:8080](http://localhost:8080)

### 项目架构

- 采用 vuepress 和主题 reco 二次构建

```lua
##需要自己写主题样式的话，在.vuepress/ 下新建theme文件夹并按如下目录布局
Dev
├─── docs
│   └── .vuepress   // 配置目录
│   │    ├── components // vue组件
│   │    ├── config     // 配置文件
│   │    │   ├── head.js    //网站头部配置
│   │    │   ├── nav.js     //导航栏配置
│   │    │   ├── plugins.js //插件配置
│   │    │   ├── theme.js   //主题配置
│   │    │   ├── valine.js  //评论配置
│   │    ├── plugins    // 自定义插件
│   │    ├── public     // 静态资源
│   │    ├── styles     // 主题样式修改
│   │    ├── theme      // 主题
│   │    │   ├── components // 组件
│   │    │   ├── global-components // 全局组件
│   │    │   ├── layouts // 布局(包括首页在内)
│   │    │   ├── styles  // 样式
│   │    │   ├── index.js // 入口配置
│   │    │   ├── noopModule.js // 依赖注入
│   │    │   ├── package.json  // 主题依赖
│   │    │   ├── README.md     // 主题说明
│   │    ├── config.js      // 配置文件入口
│   │    └── enhanceApp.js  // 百度统计注入
│   ├── about       // 关于博主
│   ├── order       // 友链模块
│   ├── views       // 内容模块
│   └── README.md   // 首页
├───deploy.sh    // 部署文件脚本
└── package.json // 项目依赖
```

### 约定路由模式

| 文件的相对路径     | 页面路由地址   |
| ------------------ | -------------- |
| `/README.md`       | `/`            |
| `/guide/README.md` | `/guide/`      |
| `/config.md`       | `/config.html` |

### 如何使用

对准备发布的文章（Markdown 格式），放置在项目`docs/views/`目录下，并在 Markdown 文件头部添加以下元素，项目发布后会自动识别文章标题、标签、分类、是否开启评论、是否加密、是否置顶、是否发布等一系列状态。

下面是关键字说明及参考示例：

### 关键字说明

| 序号 | 关键字          | 注释                                        |
| ---- | --------------- | ------------------------------------------- |
| 1    | title           | 文章标题                                    |
| 2    | date            | 日期，如：2020-02-02                        |
| 3    | tags            | 标签                                        |
| 4    | categories      | 分类                                        |
| 5    | keys            | 文章加密密码                                |
| 6    | sticky          | 文章置顶 1, 2, 3, ...                       |
| 7    | isShowComments  | 是否开启评论                                |
| 8    | publish         | 文章是否发布                                |
| 9    | `<Boxx/>`       | 只需引入这个标签即可，随机展示名人名言      |
| 10   | `[[toc]]`       | 生成目录及链接                              |
| 11   | `<!-- more -->` | 在`<!-- more -->`之前的内容会展示为文章摘要 |

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
 - '123456'
sticky: 1
sidebar: false
isShowComments: false
publish: true
---
<Boxx />

[[toc]]

- 这里可以写`摘要`等其它

<!-- more -->

## 正式开始你的markdown

- 正文内容...
```
