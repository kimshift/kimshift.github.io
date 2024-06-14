---
hot: 1
showComment: false
sidebar: false
---

# 运行 API 例子

::: tip 摘要

本页演示了 VitePress 提供的一些运行时 API 的用法。

`useData()` API 可用于访问当前页面的网站、主题和页面数据。它适用于以下两个文件：`.md` 和 `.vue`
:::

[[toc]]

<!-- more -->

```md
<script setup>
import { useData } from 'vitepress'

const { theme, page, frontmatter } = useData()
</script>

## Results

### Theme Data

<pre>{{ theme }}</pre>

### Page Data

<pre>{{ page }}</pre>

### Page Frontmatter

<pre>{{ frontmatter }}</pre>
```

<script setup>
import { useData } from 'vitepress'

const { site, theme, page, frontmatter } = useData()
</script>

## Results

### Theme Data

<pre>{{ theme }}</pre>

### Page Data

<pre>{{ page }}</pre>

### Page Frontmatter

<pre>{{ frontmatter }}</pre>

## More

Check out the documentation for the [full list of runtime APIs](https://vitepress.dev/reference/runtime-api#usedata).
