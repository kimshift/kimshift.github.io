---
categories:
  - 文章例子
tags:
  - 示例
---

# API 示例

::: tip 摘要

本页演示了 VitePress 提供的一些运行时 API 的用法。

`useData()` API 可用于访问当前页面的网站、主题和页面数据。它适用于以下两个文件：`.md` 和 `.vue`
:::

[[toc]]

```md
<script setup>
import { useData } from 'vitepress'

const { theme, page, frontmatter } = useData()
</script>

## Results

### 主题信息

<pre>{{ theme }}</pre>

### 页面信息

<pre>{{ page }}</pre>

### 文档配置

<pre>{{ frontmatter }}</pre>
```

<script setup>
import { useData } from 'vitepress'

const { site, theme, page, frontmatter } = useData()
</script>

## Results

### 主题信息

<pre>{{ theme }}</pre>

### 页面信息

<pre>{{ page }}</pre>

### 文档配置

<pre>{{ frontmatter }}</pre>

## 更多

查看文档以获得 [运行时 api 的完整列表](https://vitepress.dev/zh/reference/runtime-api#usedata).
