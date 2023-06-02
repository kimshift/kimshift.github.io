---
title: ajax语法
date: 2023-06-02 09:07:24
categories:
  - 前端开发
tags:
  - ajax
---

## 1. Ajax 基础

### 1.1 传统网站中存在的问题

- 网速慢的情况下，页面加载时间长，用户只能等待
- 表单提交后，如果一项内容不合格，需要重新填写所有表单内容
- 页面跳转，重新加载页面，造成资源浪费，增加用户等待时间

### 1.2 Ajax 概述

它是浏览器提供的一套方法，可以实现页面无刷新更新数据，提高用户浏览网站应用的体验。

### 1.3 Ajax 的应用场景

1. 页面上拉加载更多数据

2. 列表数据无刷新分页

3. 表单项离开焦点数据验证

4. 搜索框提示文字下拉列表

### 1.4 Ajax 的运行环境

Ajax 技术**需要运行在网站环境中才能生效**，当前素材会使用 Node 创建的服务器作为网站服务器。

素材代码文件:https://gitee.com/zhif97/ajax-learning-materials.git

## 2. Ajax 运行原理及实现

### 2.1 Ajax 运行原理

Ajax 相当于浏览器发送请求与接收响应的代理人，以实现在不影响用户浏览页面的情况下，局部更新页面数据，从而提高用户体验。

![img](https://s2.loli.net/2022/08/15/f3uI4xgbCRNUDad.png)

### 2.2 Ajax 的实现步骤

1. 创建 Ajax 对象

```
var xhr = new XMLHttpRequest() ;
```

2. 告诉 Ajax 请求地址以及请求方式

```
xhr.open ('get','http://www.example.com') ;
```

3. 发送请求

```
xhr.send() ;
```

4. 获取服务器端给与客户端的响应数据

```
hr.onload = function () {
    console.log(xhr.responseText);
}
```

**PS:**案例见 Ajax 笔记素材 01Ajax 入门.html

### 2.3 服务器端响应的数据格式

在真实的项目中，服务器端**大多数情况下会以 JSON 对象作为响应数据的格式**。当客户端拿到响应数据时，要将 JSON 数据和 HTML 字符串进行拼接，然后将拼接的结果展示在页面中。

可以发现服务器端响应给浏览器端的数据是以 **JSON 对象的格式**发送的，但浏览器控制台最终获得的是**字符串格式**的 JSON 对象

在 http 响应的过程中，无论是请求参数还是响应内容，如果是对象类型。**最终都会被转换为对象字符串进行传输**。因次在客户端我们需要将 JSON 字符串转换为 JSON 对象类型。

```javascript
JSON.parse() // 将json字符串转换为json对象
```

响应的数据就变成 json 对象了。

**PS:**案例见 02.处理服务器端返回的 JSON 数据.html

### 2.4 请求参数传递

- 传统网站表单提交

```
<form method="get" action="http: //www.example.com">
    <input type="text" name="username" />
    <input type="password" name="password">
</form>
<!- http://www.example.com?username=zhangsan&password=123456-->
```

- GET 请求方式

```
xhr.open('get', 'http://www.example.com?name=zhangsan&age=20')
```

**PS:**案例见 03.传递 GET 请求参数.html

- POST 请求方式

```
xhr.setRequestHeader('content-Type', 'application/x-www-form-urlencoded')
xhr.send('name=zhangsan&age=20');
```

setRequestHeader：设置报文信息

### 2.5 请求报文

请求报文：在 http 请求和响应的过程中传递的数据块就是报文。
请求报文包括要传送的数据和一些附加信息，这些数据和信息要遵守规定好的格式。

![20201028094648668](https://s2.loli.net/2022/08/15/YmqN2nGOCAHl6vb.png)

请求报文包括**报文头**以及**报文体**，比如 Content-Type 就是报文头，请求参数以及一些存储的内容就是请求体，在请求的过程中，报文会被整体发送给服务器端。

**PS:**案例见 04.传递 post 请求参数.html

### 2.6 请求参数的格式

- 客户端向服务端传递请求参数的另外一种方式

请求参数的格式

1. application/x-www-form-urlencoded

```
name=zhangsan&age=20&sex=男
```

2. application/json

```
{name:'zhangsan',age:'20',sex:'男'}
```

在请求头中指定 Content-Type 属性的值是 application/json，告诉服务器端当前请求参数的格式是 json。

```
JSON.stringify() //将json对象转换为json字符串
```

**注意**: get 请求是不能提交 json 对象数据格式的，传统网站的表单提交也是不支持 json 对象数据格式的。592

**PS:**案例见 05.向服务器端传递 JSON 格式的请求参数.html

### 2.7 获取服务器端的响应

- Ajax 状态码

在创建 ajax 对象，配置 ajax 对象，发送请求，以及接收完服务器端响应数据，这个过程中的每一个步骤都会对应一个数值，这个数值就是 ajax 状态码。

0∶ 请求未初始化(还没有调用 open())

1∶ 请求已经建立，但是还没有发送(还没有调用 send())

2∶ 请求已经发送

3∶ 请求正在处理中，通常响应中已经有部分数据可以用了

4∶ 响应已经完成，可以获取并使用服务器的响应了

```
xhr.readystate //获取Ajax状态码
```

- onreadystatechange 事件

当 Ajax 状态码发生变化时将自动触发该事件

**onreadystatechange 事件**

当 Ajax 状态码发生变化时将自动触发该事件。在事件处理函数中可以获取 Ajax 状态码并对其进行判断，当状态码为 4 时就可以通过 xhr.responseText 获取服务器端的响应数据了。

```
//当Ajax状态码发生变化时
xhr.onreadystatechange = function () {
    //判断当Ajax状态码为4时
    if (xhr.readystate == 4) {
        //获取服务器端的响应数据
        console.log(xhr.responseText);
    }
}
```

- 两种获取服务器端响应方式的区别

| 区别描述                 | onload 事件 | onreadystatechange 事件 |
| ------------------------ | ----------- | ----------------------- |
| 是否兼容 IE 低版本       | 不兼容      | 兼容                    |
| 是否需要判断 Ajax 状态码 | 不需要      | 需要                    |
| 被调用次数               | —次         | 多次                    |

**PS:**案例见 06.获取服务器端响应数据的另外一种方式.html

### 2.8 Ajax 错误处理

1. 网络畅通，服务器端能接收到请求，服务器端返回的结果不是预期结果。

可以判断服务器端返回的状态码，分别进行处理。xhr.status 获取 http 状态码

2. 网络畅通，服务器端没有接收到请求，返回 404 状态码。

检查请求地址是否错误。

3. 网络畅通，服务器端能接收到请求，服务器端返回 500 状态码。

服务器端错误，找后端程序员进行沟通。

4.  网络中断，请求无法发送到服务器端。
    会触发 xhr 对象下面的 onerror 事件，在 onerror 事件处理函数中对错误进行处理。

- 第一种错误

将 HTTP 状态码设置会 400（请求参数错误），向浏览器端发送 'not ok’

```
console.log(xhr.status);
```

刷新后可以看到 http 状态码：400，这样的话就可以对 http 状态码是否为 400 进行条件判断，这样浏览器会弹出提示信息。

**PS:**案例见 07.Ajax 错误处理.html

- 第二种错误（请求地址错误，服务器端接收不到浏览器端发送的请求，404）
  将请求地址改为 http://localhost:3000/error123，而 后端没有这个路由的，此时浏览器端会显示错误信息：

- 第三种错误（网络畅通，服务器端能接收到请求，服务器端返回 HTTP 状态码 500）

  500 状态码代表服务器端错误，服务器端程序执行错误，需要调试代码

- 第四种错误（网络错误，请求无法发送到服务器端）
  这种情况会触发 xhr 对象下面的 onerror 事件，在 onerror 事件处理函数中对错误进行处理。
  我们可以在 浏览器 network 中将网络状态设置为 offline，此时点击发送 Ajax 请求按钮的时候，可以看到：

- 关于 Ajax 状态码以 HTTP 状态码的理解：

  **Ajax 状态码**：表示 Ajax 请求的过程状态 ajax 对象返回的
  **Http 状态码**：表示请求的处理结果 是服务器端返回的

### 2.9 低版本 IE 浏览器的缓存问题

**问题 ∶**在低版本的 E 浏览器中，Ajax 请求有严重的缓存问题，即在请求地址不发生变化的情况下，只有第一次请求会真正发送到服务器端，后续的请求都会从浏览器的缓存中获取结果。即使服务器端的数据更新了，客户端依然拿到的是缓存中的旧数据。

**解决方案 ∶**在请求地址的后面加请求参数，保证每一次请求中的请求参数的值不相同。

```
xhr.open('get', 'http://www.example.com?t=' + Math.random());
```

低版本的浏览器是不支持 onload 事件的，可以使用 onreadystatechange 事件来监听，当浏览器成功接收了服务器端的数据（此时的 Ajax 状态码为 4），同时 http 状态码为 200，可以在浏览器中显示出服务器端响应的数据。

重新发送请求，发现浏览器响应的内容是不变的。这是因为多次发送请求地址一样的请求，低版本的浏览器存在缓冲，会记录第一次响应的内容。

为了解决低版本浏览器的缓存问题，可以在请求地址后面加上请求参数，保证每一次请求中的请求参数的值不同。

Math.random()：每次产生一个随机变化的 0-1 之间的小数。这样可以保证请求参数每次都不一样。

再次打开 html 文件，发送 Ajax 请求可以看到低版本的 IE 浏览器也能避免缓存带来的问题了。

**PS:**案例见 08.Ajax 缓存.html

## 3. Ajax 异步编程

### 3.1 同步异步概述

**同步**

- 一个人同一时间只能做一件事情，只有一件事情做完，才能做另外—件事情。

**异步**

- 一个人一件事情做了一半，转而去做其他事情，当其他事情做完以后，再回过头来继续做之前未完成的事情。
- 落实到代码上，就是异步代码虽然需要花费时间去执行，但程序不会等待异步代码执行完成后再继续执行后续代码，而是直接执行后续代码，当后续代码执行完成后再回头看异步代码是否返回结果，如果已有返回结果，再调用事先准备好的回调函数处理异步代码执行的结果。

```
console.log('before');
setTimeout(() => {
    console.log('last');
}, 2000);
console.log('after');
```

**PS**:案例见 09.Ajax 异步请求.html

### 3.2 封装 Ajax

问题：发送一次请求代码过多，发送多次请求代码冗余且重复。

解决方法：将代码封装到函数中，发送请求调用函数即可。

```
ajax({
    type: 'get',
    url: 'http://www.example.com',
    success: function (data) {
        console.log(data);
    }
})
```

- type：请求方法
- url：请求地址
- success：请求成功后处理请求结果的函数
- data：success 中的形参 data 就是处理后的结果

> **请求参数要考虑的问题**：
>
> ​ 1. 请求参数位置的问题
>
> ​ 将请求参数传递到 ajax 函数内部，在函数内部根据请求方式的不同将请求参数放到不同的位置
>
> ​ get ：放在请求地址的后面
>
> ​ post： 放在 send（）方法中
>
> ​ 2. 请求参数格式的问题
>
> ​ application/x-www-form-urlencoded
>
> ​ 参数名称=参数值&参数名称=参数值
>
> ​ name=zhangsan&age=20
>
> ​ application/json
>
> ​ {name: "zhangsan", age: 20}
>
> ​ 1. 传递对象数据类型对于函数的调用者更加友好
>
> ​ 2. 在函数内部对象数据类型转换为字符串数据类型纪更为方便

**封装一个简单的 ajax 函数**：

- 进一步封装，如何在浏览器向服务器发送请求的时候传递请求参数

我们可以根据不同的请求方式将请求参数放到不同的地方。

如果请求方式为 GET，可以直接拼接到 请求地址 url 的后面
如果请求方式为 POST，可以将请求参数通过 xhr.send()发送给服务器端。

将 get 修改为 post：

进一步进行封装 post 请求报文请求头的数据格式，在 data 对象中加入 header 属性，用户可以设置 post 请求报文 请求头的 请求参数格式的类型。可以设置为

```
application/x-www-form-urlencoded
```

或者为：

```
application/json
```

由于 header 中 Content-Type 的属性值为 application/josn 因此向客户端发送的数据格式为 json 类型：

进一步完善请求成功后这一部分的代码：

当触发了 onload 事件的时候只能说这次的 ajax 请求完成了，不能代表请求一定是成功的，还是需要加上 http 状态码来做判断。当 http 状态码为 200 时，我们再调用 success 函数。否则，调用其他函数，也即实现对请求成功与请求失败的分别处理。

利用 Ajax 向服务器端发送请求，它一般都会返回 json 类型的数据。我们要对这个返回的数据类型做判断，如果这个数据类型里面包含 application/json ，就说明服务器端返回的是 json 类型的数据，我们可以将 json 字符串用 JSON.parse( )方法转换为 JSON 对象。然后将转换的结果重新赋值给 responseText 这个变量。

- 简化 Ajax 封装函数的传参复杂性问题
  上面我们所封装的函数实现了 ajax 的很多功能，但是这也增加了我们调用 ajax 函数时的复杂度，因此我们可以将一些参数进行参数默认化的处理。

**最后改造封装函数：**

定义了 defaults 对象来保存 ajax 函数默认的参数值，比如默认的请求方式为 get，默认的请求参数类型为普通的字符串，其他的都会空。用户在调用 ajax 函数的时候传入的对象参数会通过 Object.assign（）方法与 defaults 对象进行属性合并

PS:案例见 10.ajax 函数封装.html

```html
<script>
  // 定义一个函数来发送Ajax请求
  function ajax(options) {
    // 配置的是默认值
    var defaults = {
      type: 'get',
      url: '',
      data: '',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      success: function () {},
      error: function () {},
    }
    // 使用 options 对象中的属性覆盖 defaults 对象中的属性
    Object.assign(defaults, options)
    // 创建ajax对象
    var xhr = new XMLHttpRequest()
    // params 是拼接请求参数的变量
    var params = ''
    // 循环用户传递过来的参数
    for (var attr in defaults.data) {
      // 将参数装换为字符串格式
      params += `${attr}=${defaults.data[attr]}&`
    }
    // 将参数最后面的’&‘截取掉，将截取后的结果重新赋值给 params 变量
    params = params.substr(0, params.length - 1)
    console.log(params)

    // 判断请求方式
    if (defaults.type == 'get') {
      defaults.url = `${defaults.url}?${params}`
    }
    // console.log(defaults.url)
    // 配置ajax对象
    xhr.open(defaults.type, defaults.url)
    // 如果请求方式为 post
    if (defaults.type == 'post') {
      var contentType = defaults.header['Content-Type']
      // 设置请求参数格式的类型
      xhr.setRequestHeader('Content-Type', contentType)
      // 判断用户希望的请求参数格式的类型
      // 如果类型为json
      if (contentType == 'application/json') {
        // 向服务器端传递json数据格式的参数
        xhr.send(JSON.stringify(defaults.data))
      } else {
        // 先服务器端传递普通类型的请求参数
        xhr.send(params)
      }
    } else {
      xhr.send() // 发送请求
    }
    // 监听 xhr对象下面的onload事件,当xhr对象接收完响应数据后触发
    xhr.onload = function () {
      // xhr.getResponseHeader : 获取响应头中的数据
      var contentType = xhr.getResponseHeader('Content-Type')
      // 服务器端返回的数据
      var responseText = xhr.responseText
      // 如果响应类型中包含 application/json
      if (contentType.includes('application/json')) {
        // JSON字符串转换成JSON对象
        responseText = JSON.parse(responseText)
      }
      // 当 http 状态码为 200 的时候
      if (xhr.status == 200) {
        // 请求成功，调用请求成功情况的函数
        defaults.success(responseText, xhr)
      } else {
        // 请求失败，调用请求失败情况的函数
        defaults.error(responseText, xhr)
      }
    }
  }
  // 调用了ajax函数，传递了一个实参，这个实参是一个对象
  ajax({
    // 请求方式
    type: 'get',
    // 请求地址
    url: 'http://localhost:3000/responseData',
    data: {
      name: 'zhangsan',
      age: 20,
    },
    success: function (data, xhr) {
      // 将请求成功后的结果与一段字符串进行拼接（对响应结果做进一步的处理，封装成函数更方便进行处理
      console.log('这里是success函数:', data)
    },
  })
</script>
```

## 4. 模板引擎

### 1. 模板引擎概述

1. 作用：使用模板引擎提供的模板语法，可以将数据与 HTML 拼接起来。
2. [官方地址](https://aui.github.io/art-template/zh-cn/index.html):https://aui.github.io/art-template/zh-cn/

### 2. 使用步骤

1. 下载 art-template 模板引擎库文件并在 HTML 页面中引入库文件

```html
<script src="./js/template-web.js"></script>
```

- 准备 art-template 模板

```
<script id="tpl" type="text/html">
        <div class='box'></div>
</script>
```

- 告诉模板引擎将哪一个模板和哪一个数据进行拼接

```
var html = template('tpl', { username: 'zhangsan', age: '20' });
```

- 将拼接好的 html 字符串添加到页面中

  ```
  document.getElementById('container').innerHTML = html;
  ```

- 通过模板语法告诉模板引擎，数据和 html 字符串要如何拼接

  ```
  <script id="tpl" type="text/html">
          <div class='box'>{{username}}</div>
  </script>
  ```

**PS**:案例见 11.客户端模板引擎.html

## 5. 3 个小案例

### **PS1**：验证邮箱地址的唯一性，实现步骤：

1. 获取文本框并为其添加离开焦点事件

2. 离开焦点时，检测用户输入的邮箱地址是否符合规则（使用正则表达式验证即可）

3. 如果用户输入的邮箱地址不符合规则，阻止程序向下执行，同时给出提示信息

4. 如果用户输入的邮箱地址符合规则，则向服务器端发送请求，检测邮箱地址是否被别人注册

5. 根据服务器端返回值决定客户端显示何种提示信息

   **案例见 ps/01.检测邮箱地址唯一性.html**

### **PS2**: 搜索框内容自动提示，实现步骤：

1. 获取搜索框并为其添加用户输入事件

2. 获取用户输入的关键字

3. 向服务器发送请求并携带关键字作为请求参数

4. 将响应数据显示在搜索框底部

   **案例见 ps/02.搜索框内容自动提示.html**

PS3：省市区三级联动，实现步骤：

1. 通过接口获取省份信息

2. 使用 javascript 获取到省市区下拉框元素

3. 将服务器端返回的省份信息显示在下拉框中

4. 为下拉框元素添加表单值改变事件（onchange）

5. 当用户选择省份时，根据省份 id 获取城市信息

6. 当用户选择城市时，根据城市 id 获取县城信息

   **案例见 ps/03.省市区联动.html**

## 6. formData 对象

### 1. formData 对象的作用

1. 模拟 HTML 表单，相当于将 HTML 表单映射成表单对象，自动将表单对象中的数据拼接成请求参数的格式。
2. 异步上传二进制文件

### 2.formData 对象的使用

1. 准备 HTML 表单

```html
<form id="form">
  <input type="text" name="username" />
  <input type="password" name="password" />
  <input type="button" value="提交" id="btn" />
</form>
```

2. 将 html 表单转化为 formData 对象

```javascript
var form = document.getElementById('form')
var formData = new FormData(form)
```

3. 提交表单对象

```
xhr.send(formData)
```

- 注意：

1. Formdata 对象不能用于 get 请求，因为对象需要被传递到 send 方法中，而 get 请求方式的请求参数只能放在请求地址的后面。
2. 服务器端 bodyParser 模块不能解析 formData 对象表单数据，我们需要使用 formidable 模块进行解析。

### 3. formData 对象实例方法

1. 获取表单对象中的属性值

```javascript
formData.get('key')
```

2. 设置表单对象中的属性值

```javascript
formData.set('key', 'value')
```

3. 删除表单对象中属性的值

```javascript
formData.delete('key')
```

4. 向表单中追加属性值

```javascript
formData.append('key', 'value')
```

**注意**: set 方法与 append 方法的区别是，在属性名已存在的情况下，set 会覆盖已有键名的值，append 会保留两个值。

**PS**:formData 对象的简单使用见:12.formData 表单的使用方法.html

### 4. FormData 二进制文件上传

客户端的核心代码

```html
<input type="file" id="file" />
```

```javascript
var file = document.getElementById('file');
// 当用户选择文件的时候
file.onchange = function () {
	// 创建空表单对象
	var formData = new FormData();
	// 将用户选择的二进制文件追加到表单对象中
	formData.append("attrName", this.files[0];
	// 配置ajax对象，请求方式必须为post
	xhr.open('post', 'www.example.com');
	xhr.send();
}
```

**PS:案例见 13.FormData 对象实现二进制文件上传.html**

### 5.FormData 文件上传进度展示

核心代码：

```javascript
// 当用户选择文件的时候
file.onchange = function () {
  // 文件上传过程中持续触发 onprogress 事件
  xhr.upload.onprogress = function () {
    // 当前上传文件大小/文件总大小，再将结果转换为百分比
    // 将结果赋值给进度的宽度属性
    bar.style.width = (ev.onload / ev.total) * 100 + '%'
  }
}
```

在 ajax 对象 xhr 中有 upload 属性，upload 属性中有关于文件上传的一些事件，在文件上传的过程中可以持续触发 onprogress 事件，在这个事件的事件对象中我们可以看到 ev.loaded 以及 ev.total 这两个事件对象的属性，分别代表当前文件上传的大小以及上传文件的总大小，我们可以据此计算出文件上传的进度并以百分比的形式显示在页面中。

**PS:案例见 13.FormData 对象实现二进制文件上传.html**

### 6.ForaData 文件上传图片及时预览

在我们将图片上传到服务器端义后，服务器端通常都会将圉片地址做为响应数据传递到客户端，客户端可以从响应数据中获取图片地址。然后将图片再显示在页面中。

## 7. 同源政策

### 1. Ajax 请求限制

Ajax 只能向自己的服务器发送请求。比如现在有一个 A 网站、有一个 B 网站，A 网站中的 HTML 文件只能向 A 网站服务器中发送 Ajax 请求，B 网站中的 HTML 文件只能向 B 网站中发送 Ajax 请求，但是 A 网站是不能向 B 网站发送 Ajax 请求的，同理，B 网站也不能向 A 网站发送 Ajax 请求。

### 2. 什么是同源

如果两个页面拥有相同的协议、域名和端口，那么这两个页面就属于同一个源，其中只要有一个不相同，就是不同源。

http://www.example.com/dir/page.html（以此为例子相对比）

http://www.example.com/dir2/other.html:同源

http://example.com/dir/other.html :不同源（域名不同)

http://v2.www.example.com/dir/other.html :不同源(域名不同)

http://www.example.com:81/dir/other.html :不同源（端口不同)

https://www.example.com/dir/page.html :不同源(协议不同)

### 3. 同源政策的目的

同源政策是为了保证用户信息的安全，防止恶意的网站窃取数据。最初的同源政策是指 A 网站在客户端设置的 Cookie，B 网站是不能访问的。
随着互联网的发展，同源政策也越来越严格，在不同源的情况下，其中有一项规定就是无法向非同源地址发送 Ajax 请求，如果请求，浏览器就会报错。

### 4.使用 JSONP 解决同源限制问题

jsonp 是 json with padding 的缩写，它不属于 AJax 请求，但它可以模拟 ajax 请求。

1. 将不同源的服务器端请求地址写在 script 标签的 src 属性中

```
<script src="www.example.com"></script>
<script src="https:cdn.bootcss.com/jquery/3.3.1/jquery.min.js"><script>
```

因为 script 标签的 src 属性是不受同源限制的。

2. 服务器端响应的数据必须是一个函数的调用，真正要发送给客户端的数据需要作为函数调用的参数。

```
const data = 'fn ({name: 'zhangsan', age:'20'})';
res.send(data);
```

函数以字符串的形式响应给客户端，函数是在客户端被调用的。

3. 在客户端全局作用下定义函数 fn

```
function fn （data） { }
```

注意：函数的定义要放在 script 标签前面，同时定义在全局作用域

4. 在 fn 函数内部对服务器返回的数据进行处理

```
function (data) {
	console.log(data);
}
```

**PS:案例见 15.使用 jsonp 向非同源服务器端请求数据(1).html**

- 总结：客户端在加载完响应内容之后，函数就会在客户端被调用，此时客户端在提前准备好函数的定义，通过这个函数来接收服务器端返回的数据。
- jsonp 的理解：将 json 数据作为填充内容（padding：填充），在服务器端将 json 数据作为函数的参数，将 json 数据填充到函数中。

### 5.JSONP 代码优化

1. 客户端需要将函数名称传递到服务器端
2. 将 script 请求的发送变成动态请求（比如点击按钮再发送请求）

实现思路：我们只需要在想要发送请求的时候，使用 javascript 代码动态创建 script 标签，然后将 script 标签追加到页面中。这样请求也是可以发送的，请求是在 script 标签被追加到页面时发送的

16.使用 jsonp 向非同源服务器端请求数据(2).html

### 6. CORS 跨域资源共享

CORS：全称是 Cross-origin resource sharing，即跨域资源共享，它允许浏览器向跨域服务器发送 Ajax 请求，客服了 Ajax 只能同源使用的限制。

![image-20210303152827179](https://s2.loli.net/2022/08/15/ubU8IGjRY4dtPQT.png)

```
origin: http://localhost:3000
Access-Control-Allow-origin:'http://localhost:3000'//设置允许访问的客户端白名单
Access-control-Allow-Origin: '*'//允许所有客户端
```

服务器端允许你跨域访问它你就可以跨域访问它，服务器端不允许你跨域访问它你就不能访问它，这种解决方案主要就是在服务器端做一些配置，客户端保持原有的 Ajax 代码不变即可。

整个跨域的请求过程：
当客户端向服务器端发送请求时，如果浏览器检测到这个请求时跨域的，就会自动在请求头中加入 origin 字段，字段的值就是当前发送请求的域信息，也就是你当前网站的页面地址，比如 A 网站向 B 网站发送请求，origin 中存储的就是 A 网站中的域名信息，这个域名信息包含协议、域名和端口号。服务器端会根据这个字段的值来决定是否同意这次请求，但不论服务器端是否同意这次请求，服务器端都会给客户端一个 正常的 http 响应。浏览器端如何判断服务器端同意这次请求呢？如果服务器端同意这次请求，会在响应头中加入 Access-Control-Allow-Origin 字段。如果服务器端不同意这次请求，就不会在响应头加入这个字段，所以浏览器端会根据响应头中是否有这个字段来判断服务器端是否同意这次请求。当然了客户端的这个判断是浏览器自动完成的，不需要开发人员来参与。

Access-Control-Allow-Origin 字段保存的是客户端的信息，是被允许访问当前服务器端的客户端信息，你可以理解为他就是一个白名单，如果你的网站信息被存储在服务器端的这个白名单当中，你就可以访问它的服务器端，这个字段的值通常是当前访问服务器端的客户端的原信息，或者是 ‘’，’'就代表允许所有的客户端访问这个服务器端。这就是跨来域访问的整个请求过程。

具体的代码要如何实现呢？客户端的代码还是我们原来的 Aiax 代码，不需要做出任何的改变，客户端需要做的事情浏览器会自动帮我们做好。对于服务器端而言，我们要设置两项内容，一项是允许哪些客户端访问服务器端，另一项是设置客户端可以通过那些请求方法来访问服务器端，是使是用 get 方法还是 post 方法，还是两种方法都可以，这个需要根据具体的需求来决定。这两项信息要设置在上面地方呢？实际上设置在响应头中。

### 7. 访问非同源数据，服务器端解决方案

同源政策是浏览器给予 Ajax 技术的限制，服务器端是不存在同源政策限制。

![20201112181830417](https://s2.loli.net/2022/08/15/i1WbvSR6CUsgruB.png)

服务器端开发语言可以直接获取非同源服务器端的数据，所以作为客户端来讲，当你想要访问非同源服务器网站中的数据时，你可以先让自己的网站服务端去获取非同源服务器网站中的数据，等待自己服务器端获取完数据以后自己网站的服务器端再将数据响应给自己网站中的客户端，这样就绕开了浏览器的同源政策限制。

例子：（1 号网站跨域访问 2 号网站服务器中的数据）

用 1 号网站的客户端访问 1 号网站的服务器端，由 1 号网站的服务器端去访问 2 号网站服务器端提供的数据，1 号服务器端把获取过来的数据再响应给 1 号网站的客户端。

### 8. cookie

![20201112212505527](https://s2.loli.net/2022/08/15/f268NKGSk5UlgDp.png)

如何才能实现登录功能呢？如何才能让服务器端识别客户端的身份呢？这个时候 cookie 就闪亮登场了，cookie 就是用来实现服务器端与客户端身份识别的一种技术。如何进行身份识别呢？当客户端第一次访问服端的时候，服务器端检测到当前这个客户端我并不认识，这个时候服务器端在对客户端做出响应的同时还会给客户端发一个“小卡片”，这个“小卡片”你可以把它理解为服务器端发给客户端的身份证，有了这个身份证客户端就能够证明它是谁了，这个身份证我们就可以理解为 cookie。此时在客户端的浏览器中就有了这个身份证了，当客户端再一次访问服务器端，这个身份证也就是 cookie 会随着请求被自动发送到服务器端，服务器端拿到这个身份证服务器端就知道这个客户端是谁了，这样就建立了与服务器端持久的联系。

### 9.withCredentials 属性

在使用 Ajax 技术发送跨域请求时，默认情况下不会在请求中携带 cookie 信息。

withCredentials：指定在涉及跨域请求时，是否携带 cookie 信息，默认值为 false。

Access-Control-Allow-Credentials：true，允许客户端发送请求时携带 cookie。

我们可以通过实现跨域登录功能来验证：

我们可以在 1 号网站当前准备一个登录表单，登录表单中会包含用户名和密码输入框，还包含两个按钮：登录、检测登录状态。登录的请求地址被设置在了 2 号网站当中。

## 8. $.ajax()

### 1. $.ajax()方法概述

#### 作用:发送 Ajax 请求

```javascript
$.ajax({
  type: 'get', //请求类型
  url: 'http://www.exzample.com', //请求路径
  data: {
    name: 'zhangsan',
    age: '20',
  }, //请求参数
  contentType: 'application/x-www-form-urlencoded', //请求头格式类型
  beforesend: function () {
    return false
  }, //发送请求前回调函数
  success: function (response) {}, //发送请求成功后回调函数
  error: function (xhr) {}, //发送请求失败后回调函数
})
```

- 当 contentType 为 application/x-www-form-urlencoded 时，data 的数据格式可以为 name=zhangsan&age=20,也可以为{name: 'zhangsan', age: '20'},最终都会被解析成这种格式：name=zhangsan&age=20，发送给服务器
- 当 contentType: 'application/json',data 的数据格式需要将 json 对象转化成 Json 字符串才能发送给服务器：JSON.stringify(params)
- 当 data 为 Formdata 对象是，需要添加

#### serialize 方法

作用:将表单中的数据自动拼接成字符串类型的参数

```javascript
var params = $('#form').serialize()
//name=zhangsan&age=30
```

#### 作用:发送 jsonp 请求。

```
$.ajax({
            url: 'http://www.exzample.com',
            //指定当前发送jsonp请求
            dataType: 'jsonp',
            //修改callback参数名称
            jsonp: 'cb',
            //指定函数名称
            jsoncallback: 'fnName',
            success: function (response) { },//发送请求成功后回调函数
        })
```

### 2. $.get()、$.post()方法概述

作用: $.get方法用于发送get请求，$.post 方法用于发送 post 请求。

```
$.get('http://www.example.com', { name: 'zhangsan', age: 18 }, function (response) { });
$.post('http://www.example.com', { name: 'lisi', age: 18 }, function (response) { });
```

### 3.Ajax 全局事件

只要页面中有 Ajax 请求被发送，对应的全局事件就会被触发

```
.ajaxstart ()//当请求开始发送时触发
.ajaxcomplete() //当请求完成时触发
```

### 4.NProgress 插件

官宣:纳米级进度条，使用逼真的涓流动画来告诉用户正在发生的事情!

ricostacruz.com/nprogress/

```
<link href="https://cdn.bootcdn.net/ajax/libs/nprogress/0.2.0/nprogress.css" rel="stylesheet">
<script src="https://cdn.bootcdn.net/ajax/libs/nprogress/0.2.0/nprogress.js"></script>
```

```
NProgress.start; //进度条开始运动
NPrOgress.done(); //进度条结束运动
```

## 9. XML 基础

### 1.XML 是什么

XML 的全称是 extensible markup language，代表可扩展标记语言，它的作用是传输和存储数据。

```
<message>
    <title>消息标题</title>
    <content>消息内容</content>
</message>
```

### 2.XML DOM

XMLDOM 即 XML 文档对象模型，是 w3c 组织定义的一套操作 XML 文档对象的 API。浏览器会将 XML 文档解析成文档对象模型。
