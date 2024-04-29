---
title: vue开发相关问题
date: 2024-04-28 17:55:06
categories:
  - 前端开发
tags:
  - vite
  - vue
  - 问题
---

## Vite 不支持 require 解决方案

> 首先，Vite 中没有 require 相关方法，因为它默认支持 ESM 方式加载模块！所以，我们要理清如下两个方法：

1. 方法 require()

   - Node.JS 原生方法 ，以 CommonJS 方式加载模块/文件/图片
   - Webpack 默认支持 ，Vite 不支持

2. 方法 require.context()
   - Webpack 特定方法，此方法可实现自定义上下文
   - Vite 不支持

### require加载模块/图片：报错 require 未定义

> Uncaught (in promise) ReferenceError: require is not defined

```js
// CommonJS 方式加载模块---报错
const packageName = require('packageName');
// CommonJS 方式加载图片---报错
const image = require('@/assets/image/test.png');
<img :src="image" alt="">
```

**解决方案**

- 使用 [EMS import()](https://wangdoc.com/es6/module#import)【<font color="#c7254e">推荐</font>】
- 插件方法`vite-plugin-require-transform`---后面说明

```js
// import 方式加载模块
import packageName from 'packageName';
// import 方式加载图片
import image from '@/assets/image/test.png'
// 或者，加载图片另外一种方式
const image = '/src/assets/image/test.png'
<img :src="image" alt="">
```

### require.context批量加载文件：报错 require 未定义

> Uncaught (in promise) ReferenceError: require is not defined

```js
const modulesFiles = require.context('./src/components', true, /\.vue$/);
```

**解决方案**

- 注意 `import.meta.globEager`【<font color="#c7254e">已经弃用</font>】
- 使用 `import.meta.glob`【<font color="#c7254e">推荐</font>】
- 插件方法`vite-plugin-require-context-lerna`---后面统一说明

```js
# 异步导入
const modules = import.meta.glob('@/components/**/*.vue');
// 组件遍历
for (const path in modules) {
    modules[path]().then((mod) => {
        console.log('遍历输出组件：', mod.default);
    })
}

# 同步方式多了配置参数 { eager: true }
const modules = import.meta.glob('@/components/**/*.vue', { eager: true });
// 组件遍历
for (const path in modules) {
    console.log('遍历输出组件：', modules[path].default);
}
```

### 使用插件方式解决 require 未定义

> 不建议用，因为意义不大，因为在vite中不需要添加require， 使用[EMS import()](https://wangdoc.com/es6/module#import)足够解决了

1. 安装依赖插件

```sh
# 解决require加载模块/图片未定义问题
npm i vite-plugin-require-transform --save-dev
```

2. 配置vite.config.js

```js
import { defineConfig } from 'vite'
// 引入插件
import requireTransform from 'vite-plugin-require-transform';
 
export default defineConfig({
  plugins: [
    requireTransform({
      fileRegex: /.js$|.vue$/
    }),//使用插件
  ],
});
```

