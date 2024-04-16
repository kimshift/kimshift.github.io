---
title: vue开发配置笔记
date: 2023-05-31 17:13:05
categories:
  - 前端开发
tags:
  - vue
---

## 项目优化

1. 生成打包报告

   打包时，为了直观地发现项目中存在的问题，可以在打包时生成报告。生成报告的方式有两种:

   - 通过命令行参数的形式生成报告

     ```sh
     //通过vue-cli 的命令选项可以生成打包报告
     // --report选项可以生成report.html以帮助分析包内容
     //vue-cli-service build --report
     npm run build -- --report
     ```

   - 通过可视化的 UI 面板直接查看报告(推荐):vue ui 命令,在可视化的 UI 面板中，通过控制台和分析面板，可以方便地看到项目中所存在的问题。

2. 通过 vue.config.js 修改 webpack 的默认配置

   通过 vue-cli 3.0 工具生成的项目，默认隐藏了所有 webpack 的配置项，目的是为了屏蔽项目的配置过程，让程序员把工作的重心，放到具体功能和业务逻辑的实现上。

3. 如果程序员有修改 webpack 默认配置的需求，可以在项目根目录中，按需创建 vue.config.js 这个配置文件，从而对项目的打包发布过程做自定义的配置(具体配置参考https://cli.vuejs.org/zh/config/#vue-confiq-js)。

   ```javascript
   // vue.config.js
   //这个文件中，应该导出一个包含了自定义配置选项的对象
   module.exports = {
     //选项...
   }
   ```

4. configureWebpack 和 chainWebpack

   在 vue.config.js 导出的配置对象中，新增 configureWebpack 或 chainWebpack 节点，来自定义 webpack 的打包配置。
   在这里,configureWebpack 和 chainWebpack 的作用相同，唯一的区别就是它们修改 webpack 配置的方式不同:

   - chainWeblpack 通过链式编程的形式，来修改默认的 webpack 配置
   - configureWebpack 通过操作对象的形式，来修改默认的 webpack 配置

5. 通过 chainWebpack 自定义打包入口
   代码示例如下:

   ```javascript
   module.exports = {
   	chainwebpack: config => {
   		config.when (process.env.NODE_ENV === 'production ', config => {
               config.entry ('app').clear().add('./src/main-prod.js')
           })
   	config.when(process.env.NODE_ENV === 'development ',config =>{
           config.entry('app').clear().add('./src/main-dev.js')
       )}
     }
   }
   ```

6. 通过 externals 加载外部 CDN 资源
   默认情况下，通过 import 语法导入的第三方依赖包，最终会被打包合并到同一个文件中，从而导致打包成功后，单文件体积过大的问题。
   为了解决上述问题，可以通过 webpack 的 externals 节点，来配置并加载外部的 CDN 资源。凡是声明在 externals 中的第三方依赖包，都不会被打包。

   具体配置代码如下:

   ```javascript
   config.set('externals', {
     vue: 'Vue',
     'vue-router': 'VueRouter',
     axios: 'axios',
     lodash: '_',
     echarts: 'echarts',
     'vue-quill-editor': 'VueQuillEditor',
   })
   ```

   同时，需要在 public/index.html 文件的头部，添加如下的 CDN 资源引用:

   ```html
   <script src="https://cdn.jsdelivr.net/npm/vue-quill-editor@3.0.6/dist/vue-quill-editor.min.js"></script>
   ```

7. 首页内容定制
   不同的打包环境下，首页内容可能会有所不同。我们可以通过插件的方式进行定制，插件配置如下:

   ```javascript
   //发布模式 为html的htmlWebpackPlugin插件args添加新参数
   config.plugin('html').tap(args => {
     args[0].isProd = true
     return args
   })
   ```

   ```javascript
   //开发模式
   config.plugin('html').tap(args => {
     args[0].isProd = false
     return args
   })
   ```

   ```javascript
     <!-- 发布模式才引用下列资源 -->
     <% if(htmlWebpackPlugin.options.isProd){ %>
     <% } %>
   ```

8. 路由懒加载
   当打包构建项目时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。
   具体需要 3 步:

   - 安装@babel/plugin-syntax-dynamic-import 包。
   - 在 babel.config.js 配置文件中声明该插件。
   - 将路由改为按需加载的形式，示例代码如下:

   ```javascript
   const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
   const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
   const Baz = () => import(/* webpackChunkName: "group-foo" */ './Baz.vue')
   ```

   关于路由懒加载的详细文档，可参考如下链接:
   https://router.vuejs.org/zh/guide/advanced/lazy-loading.html

## 项目上线相关配置

1. 通过 node 创建 web 服务器

   创建 node 项目，并安装 express，通过 express 快速创建 web 服务器，将 vue 打包生成的 dist 文件夹，
   托管为静态资源即可，关键代码如下:

   ```javascript
   const express = require('express') //创建web服务器
   const app = express()
   //托管静态资源
   app.use(express.static('./dist'))

   //启动web服务器
   app.listen(80, () => {
     console.log('web server running at http://127.0.0.1:80')
   })
   ```

2. 开启 gzip 配置
   使用 gzip 可以减小文件体积，使传输速度更快。可以通过服务器端使用 Express 做 gzip 压缩。其配置如下:

   ```javascript
   //安装相应包
   npm install compression -D
   //启用中间件
   const compression = require ('compression') ;
   app.use(compression()) ;
   ```

3. 配置 https 服务

   申请 SSL 证书(https://freessl.org)

   - 进入https://freessl.cn/官网，输入要申请的域名并选择品牌。输入自己的邮箱并选择相关选项。
   - 验证 DNS(在域名管理后台添加 TXT 记录)。
   - 验证通过之后，下载 SSL 证书( full_chain.pem 公钥;private.key 私钥)。

   在后台项目中导入证书

4. 使用 pm2 管理应用
   在服务器中安装 pm2: npm i pm2 -g
   - 初次启动项目：pm2 start 脚本 --name 自定义名称
   - 启动 vue 项目：pm2 start npm -- run dev --name vue_shop_dev
   - 启动项目：pm2 start 自定义名称 (id)
   - 启动所有项目：pm2 start all
   - 查看运行项目： pm2 ls
   - 重启项目：pm2 restart 自定义名称(id)
   - 停止项目：pm2 stop 自定义名称(id)
   - 停止所有项目：pm2 stop all
   - 删除项目：pm2 delete 自定义名称(id)
