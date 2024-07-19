---
sticky: 1
categories:
  - 文章例子
tags:
  - 例子
date: 2021-05-20
---

# 编写第一篇文章

在`docs`文件夹下创建文章，文章的格式为`.md`，例如`start.md`。

## 配置关键词

在文章的`frontmatter`中，可以添加以下关键词，用于控制文章的展示。

| 关键字          | 注释                                 |
| --------------- | ------------------------------------ |
| title           | 文章名字[不填则默认与一级标题名一致] |
| author          | 作者                                 |
| date            | 发布日期，如：2021-05-20             |
| tags            | 文章标签                             |
| categories      | 文章分类                             |
| showComment     | 是否开启评论                         |
| cover           | 文章封面图                           |
| sticky          | 文章置顶 1, 2, 3, ...                |
| hot             | 精选文章 1, 2, 3, ...                |
| publish         | 文章是否发布                         |
| sidebar         | 是否开启侧边栏-相关推荐              |
| outline         | 生成目录大纲                         |
| description     | 文章描述                             |
| descriptionHTML | 文章描述代码形式                     |
| `[[toc]]`       | 生成目录及链接                       |

**注意**：`cover`封面图地址请使用线上图片地址 或者 将图片放置在 public 目录下。

**例子**

```yaml
# 在md文件中头部添加以下内容
---
title: 编写第一篇文章
author: 琴时
date: 2021-05-20
tags:
  - 标签名
categories:
  - 分类名
showComment: true
cover: 背景图片url地址
sticky: 1 #置顶文章
hot: 1 #精选文章
publish: true #发布文章
sidebar: true #开启侧边栏
---
```

## 编写正文

在文章中，可以使用 markdown 语法进行编写，例如：

```markdown
# 一级标题

## 二级标题

正文内容
```
