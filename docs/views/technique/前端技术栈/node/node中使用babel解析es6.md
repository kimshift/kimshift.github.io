---
title: node中使用babel解析es6
date: 2023-06-01 10:47:41
categories:
  - 前端开发
tags:
  - node
sidebar: false
---

1. 安装依赖

   ```sh
    npm install -D @babel/core @babel/cli @babel/preset-env  @babel/node
   ```

   - @babel/core 是 Bable 进行代码转换的核心，@babel/cli,@babel/node 都依赖他
   - @babel/cli 是一个内置的 CLI，可以通过命令行编译文件
   - @babel/preset-env 是一个预设集合，允许您使用最新的 JavaScript，他会根据目标环境对代码降级处理
   - @babel/node 是一个与 Node.js CLI 完全相同的 CLI，在运行之前使用 Babel 预设和插件进行编译，执行的时候会占用大量内存空间，Babel 官方不建议在生产环境使用

2. 新增配置文件：.babelrc 文件

   ```js
   {
     "presets": [
       "@babel/preset-env"
     ]
   }
   ```

3. 修改 package.json 中 script 的启动命令命令

   ```js
   {
        "start": "babel-node app.js"
   }
   ```

4. nodemon 方式的启动修改

   ```js
   {
       "start": "nodemon --exec babel-node app.js",
   }
   ```
