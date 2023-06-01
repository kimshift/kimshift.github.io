---
title: jQuery其他方法
date: 2023-06-01 17:14:54
categories:
  - 技术文章
tags:
  - javascript
  - jQuery
---

## 1. jQuery 对象拷贝

如果想要把某个对象拷贝（合并） 给另外一个对象使用，此时可以使用 $.extend() 方法

语法：

```
$.extend([deep], target, object1, [objectN])
```

1. deep: 如果设为 true 为深拷贝， 默认为 false 浅拷贝

2. target: 要拷贝的目标对象

3. object1:待拷贝到第一个对象的对象。

4. objectN:待拷贝到第 N 个对象的对象。

5. 浅拷贝是把被拷贝的对象**复杂数据类型中的地址**拷贝给目标对象，修改目标对象**会影响**被拷贝对象。

6. 深拷贝，前面加 true， 完全克隆(拷贝的对象,而不是地址)，修改目标对象**不会影响**被拷贝对象。

## 2. jQuery 多库共存

问题概述：

jQuery 使用$作为标示符，随着jQuery的流行,其他 js 库也会用这$作为标识符， 这样一起使用会引起冲突。

客观需求：

需要一个解决方案，让 jQuery 和其他的 js 库不存在冲突，可以同时存在，这就叫做多库共存。

jQuery 解决方案：

1. 把里面的 $ 符号 统一改为 jQuery。 比如 jQuery(''div'')

2. jQuery 变量规定新的名称：$.noConflict() var xx = $.noConflict();

## 3. jQuery 插件

jQuery 功能比较有限，想要更复杂的特效效果，可以借助于 jQuery 插件完成。

注意: 这些插件也是依赖于 jQuery 来完成的，所以必须要先引入 jQuery 文件，因此也称为 jQuery 插件。

### jQuery 插件常用的网站：

1. jQuery 插件库 http://www.jq22.com/

2. jQuery 之家 http://www.htmleaf.com/

### jQuery 插件使用步骤：

1.  引入相关文件。（jQuery 文件 和 插件文件）
2.  复制相关 html、css、js (调用插件)。

### jQuery 插件演示：

1. 瀑布流
2. 图片懒加载（图片使用延迟加载在可提高网页下载速度。它也能帮助减轻服务器负载）
   当我们页面滑动到可视区域，再显示图片。
   我们使用 jquery 插件库 EasyLazyload。 注意，此时的 js 引入文件和 js 调用必须写到 DOM 元素（图片）最后面
3. 全屏滚动（fullpage.js）
   gitHub： https://github.com/alvarotrigo/fullPage.js
   中文翻译网站： http://www.dowebok.com/demo/2014/77/

### bootstrap JS 插件：

bootstrap 框架也是依赖于 jQuery 开发的，因此里面的 js 插件使用 ，也必须引入 jQuery 文件。
