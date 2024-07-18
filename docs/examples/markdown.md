---
hot: 1
categories:
  - 文章例子
tags:
  - 示例
  - markdown
---

# Markdown 扩展

这个页面展示了一些由 VitePress 提供的内置降价扩展。

## 语法高亮显示

VitePress 提供由[Shiki](https://github.com/shikijs/shiki)支持的语法高亮显示,附加功能，如行突出显示

**输入**

````md
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

**输出**

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

## 自定义容器

**输入**

```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

**输出**

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

## 任务复选框

**输入**

```md
- [x] 撰写博客
- [ ] 更新网站
- [ ] 联系媒体
```

**输出**

- [x] 撰写博客
- [ ] 更新网站
- [ ] 联系媒体

## tabs 面板

**输入**

````md
:::code-group

```md [页面1]
内容 1
```

```md [页面2]
内容 2
```

:::
````

**输出**

:::code-group

```md [页面1]
内容 1
内容 1
内容 1
```

```md [页面2]
内容 2
内容 2
内容 2
```

:::

## 更多

查看文档以获得 [markdown 扩展的完整列表](https://vitepress.dev/zh/guide/markdown).

```

```
