---
title: react学习笔记
date: 2023-06-05 13:49:15
categories:
  - 前端开发
tags:
  - react
---

## react 基础

关于虚拟 DOM：

- 本质是 Object 类型的对象（一般对象）
- 虚拟 DOM 比较“轻”，真实 DOM 比较“重”，因为虚拟 DOM 是 React 内部在用，无需真实 DOM 上那么多的属性。
- 虚拟 DOM 最终会被 React 转化为真实 DOM，呈现在页面上。

☆ 当虚拟 DOM 发生改变时，利用 diffing 算法对比发生前后的虚拟 DOM,将发生变化的部分重新渲染到真实 DOM 上

### jsx 语法规则：

1. 定义虚拟 DOM 时，不要写引号。
2. 标签中混入 JS 表达式时要用{}。
3. 样式的类名指定不要用 class，要用 className。
4. 内联样式，要用 `style={{`key:value`}}` 的形式去写。
5. 只有一个根标签
6. 标签必须闭合
7. 标签首字母
   1. 若小写字母开头，则将该标签转为 html 中同名元素，若 html 中无该标签对应的同名元素，则报错。
   2. 若大写字母开头，react 就去渲染对应的组件，若组件没有定义，则报错。

```
一定注意区分：【js语句(代码)】与【js表达式】
        1.表达式：一个表达式会产生一个值，可以放在任何一个需要值的地方
              下面这些都是表达式：
                  (1). a
                  (2). a+b
                  (3). demo(1)
                  (4). arr.map()
                  (5). function test () {}
        2.语句(代码)：
              下面这些都是语句(代码)：
                  (1).if(){}
                  (2).for(){}
                  (3).switch(){case:xxxx}
```

### 函数式组件

1. 创建函数式组件

```javascript
function MyComponent() {
  console.log(this) //此处的this是undefined，因为babel编译后开启了严格模式
  return <h2>我是用函数定义的组件(适用于【简单组件】的定义)</h2>
}
```

2. 渲染组件到页面

```js
ReactDOM.render(<MyComponent />, document.getElementById('test'))
/**
     执行了ReactDOM.render(<MyComponent/>.......之后，发生了什么？
         1.React解析组件标签，找到了MyComponent组件。
         2.发现组件是使用函数定义的，随后调用该函数，将返回的虚拟DOM转为真实DOM，随后呈现在页面中。
   **/
```

### 类式组件

1. 创建类式组件

```javascript
class MyComponent extends React.Component {
  render() {
    //render是放在哪里的？—— MyComponent的原型对象上，供实例使用。
    //render中的this是谁？—— MyComponent的实例对象 <=> MyComponent组件实例对象。
    console.log('render中的this:', this)
    return <h2>我是用类定义的组件(适用于【复杂组件】的定义)</h2>
  }
}
```

2. 渲染组件到页面

```javascript
ReactDOM.render(<MyComponent />, document.getElementById('test'))
/**
      执行了ReactDOM.render(<MyComponent/>.......之后，发生了什么？
          1.React解析组件标签，找到了MyComponent组件。
          2.发现组件是使用类定义的，随后new出来该类的实例，并通过该实例调用到原型上的render方法。
          3.将render返回的虚拟DOM转为真实DOM，随后呈现在页面中。
    **/
```

### 组件三大属性：props、refs、state

#### state 属性的使用

- state 标准写法

```javascript
//1.创建组件
class Weather extends React.Component {
  //构造器调用几次？ ———— 1次
  constructor(props) {
    console.log('constructor')
    super(props)
    //初始化状态
    this.state = { isHot: false, wind: '微风' }
    //解决changeWeather中this指向问题
    this.changeWeather = this.changeWeather.bind(this) //改变this指向并挂载到原型对象上
  }
  //render调用几次？ ———— 1+n次 1是初始化的那次 n是状态更新的次数
  render() {
    console.log('render')
    //读取状态
    const { isHot, wind } = this.state
    return (
      <h1 onClick={this.changeWeather}>
        今天天气很{isHot ? '炎热' : '凉爽'}，{wind}
      </h1>
    )
  }
  //changeWeather调用几次？ ———— 点几次调几次
  changeWeather() {
    //changeWeather放在哪里？ ———— Weather的原型对象上，供实例使用
    //由于changeWeather是作为onClick的回调，所以不是通过实例调用的，是直接调用
    //类中的方法默认开启了局部的严格模式，所以changeWeather中的this为undefined
    //获取原来的isHot值
    const isHot = this.state.isHot
    //严重注意：状态必须通过setState进行更新,且更新是一种合并，不是替换。
    this.setState({ isHot: !isHot })
    //严重注意：状态(state)不可直接更改，下面这行就是直接更改！！！
    //this.state.isHot = !isHot //这是错误的写法
  }
}
//2.渲染组件到页面
ReactDOM.render(<Weather />, document.getElementById('test'))
```

- state 简写方式

```javascript
//1.创建组件
class Weather extends React.Component {
  //初始化状态
  state = { isHot: false, wind: '微风' }
  render() {
    const { isHot, wind } = this.state
    return (
      <h1 onClick={this.changeWeather}>
        今天天气很{isHot ? '炎热' : '凉爽'}，{wind}
      </h1>
    )
  }
  //自定义方法————要用赋值语句的形式+箭头函数
  changeWeather = () => {
    const isHot = this.state.isHot
    this.setState({ isHot: !isHot })
  }
}
//2.渲染组件到页面
ReactDOM.render(<Weather />, document.getElementById('test'))
```

#### props 属性的使用

- props 基本使用

```javascript
class Person extends React.Component {
  render() {
    // console.log(this);
    const { name, age, sex } = this.props
    return (
      <ul>
        <li>姓名：{name}</li>
        <li>性别：{sex}</li>
        <li>年龄：{age + 1}</li>
      </ul>
    )
  }
}
//渲染组件到页面
ReactDOM.render(
  <Person name='jerry' age={19} sex='男' />,
  document.getElementById('test1')
)
ReactDOM.render(
  <Person name='tom' age={18} sex='女' />,
  document.getElementById('test2')
)
const p = { name: '老刘', age: 18, sex: '女' }
ReactDOM.render(<Person {...p} />, document.getElementById('test3'))
```

- props 使用简写

```javascript
//创建组件
​  class Person extends React.Component{	//在一般开发中构造器几乎可以不使用
​    constructor(props){
​      //构造器是否接收props，是否传递给super，取决于：是否希望在构造器中通过this访问props
​      // console.log(props);
​      super(props)
​      console.log('constructor',this.props);
​    }
​    //对标签属性进行类型、必要性的限制
​    static propTypes = {
​      name:PropTypes.string.isRequired, //限制name必传，且为字符串*
​      sex:PropTypes.string,//限制sex为字符串*
​      age:PropTypes.number,//限制age为数值*
​    }
​    //指定默认标签属性值
​    static defaultProps = {
​      sex:'男',//sex默认值为男
​      age:18 //age默认值为18
​    }
​    render(){
​      // console.log(this);
​      const {name,age,sex} = this.props
​      //props是只读的
​      //this.props.name = 'jack' //此行代码会报错，因为props是只读的
​      return (
​        <ul>
​          <li>姓名：{name}</li>
​          <li>性别：{sex}</li>
​          <li>年龄：{age+1}</li>
​        </ul>
​      )
​    }
 }
​  //渲染组件到页面
​  ReactDOM.render(<Person name="jerry"/>,document.getElementById('test1'))
```

#### refs 的使用

- 字符串定义 refs

```javascript
class Demo extends React.Component {
  //展示左侧输入框的数据
  showData = () => {
    const { input1 } = this.refs
    alert(input1.value)
  }
  //展示右侧输入框的数据
  showData2 = () => {
    const { input2 } = this.refs
    alert(input2.value)
  }
  render() {
    return (
      <div>
        <input ref='input1' type='text' placeholder='点击按钮提示数据' />
        &nbsp;
        <button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
        <input
          ref='input2'
          onBlur={this.showData2}
          type='text'
          placeholder='失去焦点提示数据'
        />
      </div>
    )
  }
}
```

- 回调函数形式的 refs

```javascript
class Demo extends React.Component {
  state = { isHot: false }
  showInfo = () => {
    const { input1 } = this
    alert(input1.value)
  }
  changeWeather = () => {
    //获取原来的状态
    const { isHot } = this.state
    //更新状态
    this.setState({ isHot: !isHot })
  }
  saveInput = c => {
    this.input1 = c
    console.log('@', c)
  }
  render() {
    const { isHot } = this.state
    return (
      <div>
        <h2>今天天气很{isHot ? '炎热' : '凉爽'}</h2>
        {/* 内联式函数 */}
        {/*<input ref={(c)=>{this.input1 = c;console.log('@',c);}} type="text"/><br/><br/>*/}
        <input ref={this.saveInput} type='text' />
        <br />
        <br />
        <button onClick={this.showInfo}>点我提示输入的数据</button>
        <button onClick={this.changeWeather}>点我切换天气</button>
      </div>
    )
  }
}
```

- 创建 refs 容器形式

```javascript
class Demo extends React.Component {
  /* 
				React.createRef调用后可以返回一个容器，该容器可以存储被ref所标识的节点,该容器是“专人专用”的
			 */
  myRef = React.createRef()
  myRef2 = React.createRef()
  //展示左侧输入框的数据
  showData = () => {
    alert(this.myRef.current.value)
  }
  //展示右侧输入框的数据
  showData2 = () => {
    alert(this.myRef2.current.value)
  }
  render() {
    return (
      <div>
        <input ref={this.myRef} type='text' placeholder='点击按钮提示数据' />
        &nbsp;
        <button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
        <input
          onBlur={this.showData2}
          ref={this.myRef2}
          type='text'
          placeholder='失去焦点提示数据'
        />
        &nbsp;
      </div>
    )
  }
}
```

### 事件处理

(1).通过 onXxx 属性指定事件处理函数(注意大小写)

a.React 使用的是自定义(合成)事件, 而不是使用的原生 DOM 事件 —————— 为了更好的兼容性

b.React 中的事件是通过事件委托方式处理的(委托给组件最外层的元素) ————————为了的高效

(2).通过 event.target 得到发生事件的 DOM 元素对象 ——————————不要过度使用 ref

### 收集表单数据

#### 非受控组件

```javascript
class Login extends React.Component {
  handleSubmit = event => {
    event.preventDefault() //阻止表单提交
    const { username, password } = this
    alert(
      `你输入的用户名是：${username.value},你输入的密码是：${password.value}`
    )
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        用户名：
        <input ref={c => (this.username = c)} type='text' name='username' />
        密码：
        <input ref={c => (this.password = c)} type='password' name='password' />
        <button>登录</button>
      </form>
    )
  }
}
```

#### 受控组件

```javascript
//创建组件
class Login extends React.Component {
  //初始化状态
  state = {
    username: '', //用户名
    password: '', //密码
  }
  //保存用户名到状态中
  saveUsername = event => {
    this.setState({ username: event.target.value })
  }
  //保存密码到状态中
  savePassword = event => {
    this.setState({ password: event.target.value })
  }
  //表单提交的回调
  handleSubmit = event => {
    event.preventDefault() //阻止表单提交
    const { username, password } = this.state
    alert(`你输入的用户名是：${username},你输入的密码是：${password}`)
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        用户名：
        <input onChange={this.saveUsername} type='text' name='username' />
        密码：
        <input onChange={this.savePassword} type='password' name='password' />
        <button>登录</button>
      </form>
    )
  }
}
```

#### 利用高阶函数和函数柯里化

```javascript
class Login extends React.Component {
  //初始化状态
  state = {
    username: '', //用户名
    password: '', //密码
  }
  //保存表单数据到状态中
  saveFormData = dataType => {
    return event => {
      this.setState({ [dataType]: event.target.value })
    }
  }
  //表单提交的回调
  handleSubmit = event => {
    event.preventDefault() //阻止表单提交
    const { username, password } = this.state
    alert(`你输入的用户名是：${username},你输入的密码是：${password}`)
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        用户名：
        <input
          onChange={this.saveFormData('username')}
          type='text'
          name='username'
        />
        密码：
        <input
          onChange={this.saveFormData('password')}
          type='password'
          name='password'
        />
        <button>登录</button>
      </form>
    )
  }
}
```

### 生命周期

#### 旧版生命周期

```
1. 初始化阶段: 由ReactDOM.render()触发---初次渲染
​     1. constructor()
​     2. componentWillMount()
​     3. render()
​     4. componentDidMount() =====> 常用
​          一般在这个钩子中做一些初始化的事，例如：开启定时器、发送网络请求、订阅消息
2. 更新阶段: 由组件内部this.setSate()或父组件render触发
​     1. shouldComponentUpdate()
​     2. componentWillUpdate()
​     3. render() =====> 必须使用的一个
​     4. componentDidUpdate()
3. 卸载组件: 由ReactDOM.unmountComponentAtNode()触发
​     1. componentWillUnmount() =====> 常用
​          一般在这个钩子中做一些收尾的事，例如：关闭定时器、取消订阅消息
```

- 旧版生命周期流程图

![react生命周期(旧)](https://www.file.kim-shift.cn/markdown/react%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F(%E6%97%A7).png)

```javascript
//创建组件
class Count extends React.Component {
  //构造器
  constructor(props) {
    super(props)
    //初始化状态
    this.state = { count: 0 }
  }
  //加1按钮的回调
  add = () => {
    //获取原状态
    const { count } = this.state
    //更新状态
    this.setState({ count: count + 1 })
  }
  //卸载组件按钮的回调
  death = () => {
    ReactDOM.unmountComponentAtNode(document.getElementById('test'))
  }
  //强制更新按钮的回调
  force = () => {
    this.forceUpdate()
  }
  //组件将要挂载的钩子
  componentWillMount() {}
  //组件挂载完毕的钩子
  componentDidMount() {}
  //组件将要卸载的钩子
  componentWillUnmount() {}
  //控制组件更新的“阀门”（不写，默认为true）
  shouldComponentUpdate() {
    return true
  }
  //组件将要更新的钩子
  componentWillUpdate() {}
  //组件更新完毕的钩子
  componentDidUpdate() {}
  render() {
    const { count } = this.state
    return (
      <div>
        <h2>当前求和为：{count}</h2>
        <button onClick={this.add}>点我+1</button>
        <button onClick={this.death}>卸载组件</button>
        <button onClick={this.force}>
          不更改任何状态中的数据，强制更新一下
        </button>
      </div>
    )
  }
}
//父组件A
class A extends React.Component {
  //初始化状态
  state = { carName: '奔驰' }
  changeCar = () => {
    this.setState({ carName: '奥拓' })
  }
  render() {
    return (
      <div>
        <div>我是A组件</div>
        <button onClick={this.changeCar}>换车</button>
        <B carName={this.state.carName} />
      </div>
    )
  }
}
//子组件B
class B extends React.Component {
  //组件将要接收新的props的钩子
  componentWillReceiveProps(props) {
    console.log('B---componentWillReceiveProps', props)
  }
  //控制组件更新的“阀门”
  shouldComponentUpdate() {
    return true
  }
  //组件将要更新的钩子
  componentWillUpdate() {}
  //组件更新完毕的钩子
  componentDidUpdate() {}
  render() {
    console.log('B---render')
    return <div>我是B组件，接收到的车是:{this.props.carName}</div>
  }
}
```

#### 新版生命周期

```
1. 初始化阶段: 由ReactDOM.render()触发---初次渲
​                1. constructor()
​                2. getDerivedStateFromProps
​                3. render()
​                4. componentDidMount() =====> 常用
​                      一般在这个钩子中做一些初始化的事，例如：开启定时器、发送网络请求、订阅消息
​        2. 更新阶段: 由组件内部this.setSate()或父组件重新render触发
​                1. getDerivedStateFromProps
​                2. shouldComponentUpdate()
​                3. render()
​                4. getSnapshotBeforeUpdate
​                5. componentDidUpdate()
​        3. 卸载组件: 由ReactDOM.unmountComponentAtNode()触发
​                1. componentWillUnmount() =====> 常用
​                      一般在这个钩子中做一些收尾的事，例如：关闭定时器、取消订阅消息
```

![react生命周期(新)](https://www.file.kim-shift.cn/markdown/react%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F(%E6%96%B0).png)

## React 路由

### SPA 原理

1. 单页 Web 应用（single page web application，SPA）。

2. 整个应用只有一个完整的页面。

3. 点击页面中的链接不会刷新页面，只会做页面的局部更新。
4. 数据都需要通过 ajax 请求获取, 并在前端异步展现

### 路由原理

1. 什么是路由?

   1. 一个路由就是一个映射关系(key:value)
   2. key 为路径, value 可能是 function 或 component

2. 路由分类
   1. 后端路由：
      - 理解： value 是 function, 用来处理客户端提交的请求。
      - 注册路由： router.get(path, function(req, res))
      - 工作过程：当 node 接收到一个请求时, 根据请求路径找到匹配的路由, 调用路由中的函数来处理请求, 返回响应数据
   2. 前端路由：
   - 浏览器端路由，value 是 component，用于展示页面内容。
   - 注册路由: `<Route path="/test" component={Test}>`
   - 工作过程：当浏览器的 path 变为/test 时, 当前路由组件就会变为 Test 组件

### react-route-dom 原理

1. react 的一个插件库。

2. 专门用来实现一个 SPA 应用。

3. 基于 react 的项目基本都会用到此库。

### react-route-dom 相关 API

#### 5.2.1. 内置组件

1. `<BrowserRouter>`

2. `<HashRouter>`

3. `<Route>`

4. `<Redirect>`

5. `<Link>`

6. `<NavLink>`

7. `<Switch>`

#### 5.2.2. 其它

1. history 对象
2. match 对象
3. withRouter 函数

### 路由的基本使用

1. 明确好界面中的导航区、展示区
2. 导航区的 a 标签改为 Link 标签
   `<Link to="/xxxxx">Demo</Link>`
3. 展示区写 Route 标签进行路径的匹配
   `<Route path='/xxxx' component={Demo}/>`
4. `<App>`的最外侧包裹了一个`<BrowserRouter>`或`<HashRouter>`

#### 路由组件与一般组件

1. 写法不同：
   一般组件：`<Demo/>`
   路由组件：`<Route path="/demo" component={Demo}/>`

2. 存放位置不同：
   一般组件：components
   路由组件：pages

3. 接收到的 props 不同：
   一般组件：写组件标签时传递了什么，就能收到什么
   路由组件：接收到三个固定的属性
   history:
   go: ƒ go(n)
   goBack: ƒ goBack()
   goForward: ƒ goForward()
   push: ƒ push(path, state)
   replace: ƒ replace(path, state)
   location:
   pathname: "/about"
   search: ""
   state: undefined
   match:
   params: {}
   path: "/about"
   url: "/about"

### NavLink 与封装 NavLink

1. NavLink 可以实现路由链接的高亮，通过 activeclassName 指定样式名
2. 标签体内容是一个特殊的标签属性
3. 通过 this.props.children 可以获取标签体内容

### Switch 的使用

1. 通常情况下，path 和 component 是一一对应的关系。
2. Switch 可以提高路由匹配效率(单一匹配)。

### 解决多级路径刷新页面样式丢失的问题

1. public/index.html 中 引入样式时不写 ./ 写 / （常用）
2. public/index.html 中 引入样式时不写 ./ 写 %PUBLIC_URL% （常用）
3. 使用 HashRouter

### 路由的严格匹配与模糊匹配

1. 默认使用的是模糊匹配（简单记：【输入的路径含要【匹配的路径】，且顺序要一致）
2. 开启严格匹配：`<Route exact={true} patabout" component={About}/>`
3. 严格匹配不要随便开启，需要再开，有些时候开无法继续匹配二级路由

### Redirect 的使用

1.  一般写在所有路由注册的最下方，当所有路由都时，跳转到 Redirect 指定的路由
2.  具体编码：

        ```
        <Switch>
        	<Route path="/about" component={Ab/>
        	<Route path="/home" component={Home}/>
        	<Redirect to="/about"/>
        </Switch>
        ```

### 嵌套路由

1. 注册子路由时要写上父路由的 path 值
2. 路由的匹配是按照注册路由的顺序进行的

### 向路由组件传递参数

1. params 参数
   路由链接(携带参数)：`<Link to='/dtest/tom/18'}>`详情</Link>
   注册路由(声明接收)：`<Route path="/dtest/:name/:age" component={Test}/>`
   接收参数：this.props.match.params
2. search 参数
   路由链接(携带参数)：`<Link to='/dtest?name=tom&age=18'}>详情</Link>`
   注册路由(无需声明，正常注册`<Route path="/demo/test" compon{Test}/>`
   接收参数：this.props.location.search
   备注：获取到的 search 是 urlencoded 串，需要借助 querystring 解析
3. state 参数
   路由链接(携带参数)：`<Link {pathname:'/demo/test',state{name:'tom',age:18}}}>详情</Link>`
   注册路由(无需声明，正常注册`<Route path="/demo/test" compon{Test}/>`
   接收参数：this.props.location.state
   备注：刷新也可以保留住参数

### 编程式路由导航

借助 this.prosp.history 对象上的 API 对操作路由跳转、前进、后退

- this.prosp.history.push()
- this.prosp.history.replace()
- this.prosp.history.goBack()
- this.prosp.history.goForward()
- this.prosp.history.go()

### BrowserRouter 与 HashRouter 的区别

1. 底层原理不一样：
   BrowserRouter 使用的是 H5 的 history API，不兼容 I 以下版本。
   HashRouter 使用的是 URL 的哈希值。
2. path 表现形式不一样
   BrowserRouter 的路径中没有#,例如：localhost:30demo/test
   HashRouter 的路径包含#,例如：localhost:3000demo/test
3. 刷新后对路由 state 参数的影响
   (1).BrowserRouter 没有任何影响，因为 statehistory 对象中。
   (2).HashRouter 刷新后会导致路由 state 参数的丢！
4. 备注：HashRouter 可以用于解决一些路径错误相关的问题。

### antd 的按需引入+自定主题

1. 安装依赖：`yarn add react-app-rewired customize-cra babel-plugin-import leless-loader`
2. 修改 package.json

```
"scripts": {
			"start": "react-app-rewired start",
			"build": "react-app-rewired build",
			"test": "react-app-rewired test",
			"eject": "react-scripts eject"
		},
```

3. 根目录下创建 config-overrides.js

```
//配置具体的修改规则
const { override, fixBabelImports, addLessLoader } = require('customize-cra');
module.exports = override(
	fixBabelImports('import', {
		libraryName: 'antd',
		libraryDirectory: 'es',
		style: true,
	}),
	addLessLoader({
		lessOptions: {
			javascriptEnabled: true,
			modifyVars: { '@primary-color': '#d18904' },
		}
	}),
);
```

4. 备注：不用在组件里亲自引入样式了，即：import 'antd/dist/antd.css'应该删掉
