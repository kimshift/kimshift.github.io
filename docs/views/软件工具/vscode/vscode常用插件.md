---
title: vscode常用插件
date: 2023-05-11 09:07:02
categories:
  - 软件工具
tags:
  - vscode
  - 插件

isShowComments: false
---

## vscode 常用插件

- **Chinese**:中文语言包（输入 Chinese 就可以找到）

- Code Runner:运行选中代码段（支持大量语言，我一般用于执行 JavaScript)

- npm Intellisense:导入模块时，提示已安装模块名称

- Code Spell Checker:代码拼写检查器

- **Prettier**:格式化代码-JavaScript / TypeScript / CSS //一般使用这个

  ```
  ★ 安装 Prettier 后，可在 vscode 设置保存后自动格式化（根据个人喜好，不想保存自动格式化的可以不配置这个）
  	1.点击设置
  	2.在搜索框输入 Format 或者 save
  	3.找到：Editor: Format On Save，将复选框踢 √
  ```

  ![o_2101251410491](../../../../figure/o_2101251410491.png)

- Vetur:语法高亮，智能提示，emmet，错误提示，格式化，自动补全，debugger;vscode 官方钦定 Vue 插件，Vue 开发者必备。

- ESLint:js 语法纠错

- HTML CSS Support:智能提示 CSS 类名以及 id

- JavaScript (ES6) code snippets: ES6 代码片段

- open in browser:该插件支持快捷键与鼠标右键快速在浏览器中打开 html 文件

- Live Server:实时服务器

- Path Intellisense:自动提示文件路径，支持各种快速引入文件

- Material Icon Theme:目录图标主题

- One Dark Pro:vscode 主题

- Auto Close Tag:自动闭合 HTML 标签 【已内置】

- Auto Rename Tag:自动重命名 HTML 标签

- Element-UI-Snippets-VSCode 插件代码提示快捷键

- CSS Peek:CSS 速览

- Git Blame:显示文件的每一行最后修改的版本和作者

- Git History:查看 git 提交历史

- GitLens: 方便查看git日志，git重度使用者必备

- cssrem:将 px 单位数据转换成 rem 单位

- Easy LESS：只要保存一下 Less 文件，会自动生成 CSS 文件(将 less 文件转化成 css 文件)

- any-rule：正则表达式插件，安装使用快捷键：Ctrl+shift+p,在输入框输入你想要的正则比如：手机，找到后鼠标点击或者回车即可生成

- background-cover：设置 vscode 背景插件如下图

  ![image-20210914161710541](https://gitee.com/gzcc_kims/figure/raw/master/image-20210914161710541.png)

- JS JSX Snippets：react-jsx 语法快捷插件

- koroFileHeader：头部、函数注释插件使用快捷键，头部：Ctrl+Shift+i/函数：Ctrl+Shift+d,自定义配置：点击设置，1.配置头部注释：在搜索框输入 customMade，配置函数注释，搜索：cursorMode，详细配置看链接<br>[配置字段 · OBKoro1/koro1FileHeader Wiki · GitHub](https://github.com/OBKoro1/koro1FileHeader/wiki/配置字段)

```
  "fileheader.customMade": {
    //此为头部注释
    "Description": "",
    "Version": "1.0",
    "Author": "琴时", //设置后默认设置开发者名字
    "Date": "Do not edit", // 设置后默认设置文件生成时间
    "LastEditors": "琴时", // 设置后，保存文件更改默认更新最后编辑人
    "LastEditTime": "Do not edit" // 设置后，保存文件更改默认更新最后编辑时间
    // "FilePath": "Do not edit" // 设置后，默认生成文件相对于项目的路径
  },
  "fileheader.cursorMode": {
    //此为函数注释
    "description": "",
    "author": "琴时",
    "param": "",
    "return": ""
  },
  // 插件配置项
  "fileheader.configObj": {
    "createFileTime": true,
    "autoAdd": false, //检测文件没有头部注释，是否自动添加文件头部注释（默认是true）
    "autoAddLine": 100, // 文件超过多少行数 不再自动添加头部注释
    "autoAlready": true, //只添加插件支持的语言以及用户通过`language`选项自定义的注释
    "supportAutoLanguage": [], // 设置之后，在数组内的文件才支持自动添加
    "prohibitAutoAdd": ["json", "md"], // 禁止.json .md文件，自动添加头部注释
    "prohibitItemAutoAdd": [
      "项目的全称, 整个项目禁止自动添加头部注释, 可以使用快捷键添加"
    ],
    "folderBlacklist": ["node_modules"], //文件夹禁止自动添加头部注释
    "wideSame": false, // 头部注释等宽设置
    "wideNum": 13, // 头部注释字段长度 默认为13
    "functionWideNum": 0, //函数注释等宽设置 设为0 即为关闭
    // 头部注释第几行插入
    "headInsertLine": {
      "php": 2, // php文件 插入到第二行
      "sh": 2
    },
    "beforeAnnotation": {
      "文件后缀": "该文件后缀的头部注释之前添加某些内容"
    },
    "afterAnnotation": {
      "文件后缀": "该文件后缀的头部注释之后添加某些内容"
    },
    "specialOptions": {
      "特殊字段": "自定义比如LastEditTime/LastEditors"
    },
    "switch": {
      "newlineAddAnnotation": false
    }, // 默认遇到换行符(\r\n \n \r)添加注释符号
    "moveCursor": true, // 自动移动光标到Description所在行
    "dateFormat": "YYYY-MM-DD HH:mm:ss", //格式化时间
    "atSymbol": ["@", "@"], // 更改所有文件的自定义注释中的@符号
    "atSymbolObj": {
      "文件后缀": ["头部注释@符号", "函数注释@符号"]
    }, //  更改单独语言/文件的@
    "colon": [": ", ": "], // 更改所有文件的注释冒号
    "colonObj": {
      "文件后缀": ["头部注释冒号", "函数注释冒号"]
    }, //  更改单独语言/文件的冒号
    "filePathColon": "路径分隔符替换", //默认值： mac: / window是: \
    "showErrorMessage": false, // 是否显示插件错误通知 用于debugger
    "writeLog": false, // 错误日志生成
    "CheckFileChange": false, // 单个文件保存时进行diff检查
    "createHeader": true, // 新建文件自动添加头部注释
    "useWorker": false, // 是否使用工作区设置
    "designAddHead": false, // 添加注释图案时添加头部注释
    "headDesignName": "random", // 图案注释使用哪个图案
    "headDesign": false, // 是否使用图案注释替换头部注释
    // 自定义配置是否在函数内生成注释 不同文件类型和语言类型
    "cursorModeInternalAll": {}, // 默认为false 在函数外生成函数注释
    "openFunctionParamsCheck": true, // 开启关闭自动提取添加函数参数
    "functionParamsShape": ["{", "}"], // 函数参数外形自定义
    "functionBlankSpaceAll": {}, // 函数注释空格缩进 默认为空对象 默认值为0 不缩进
    "functionTypeSymbol": "*", // 参数没有类型时的默认值
    "typeParamOrder": "type param", //参数类型 和 参数的位置自定义
    // 自定义语言注释，自定义取消 head、end 部分
    // 不设置自定义配置language无效 默认都有head、end
    "customHasHeadEnd": {}, // "cancel head and function" | "cancel head" | "cancel function"
    "throttleTime": 60000, // 对同一个文件 需要过1分钟再次修改文件并保存才会更新注释
    // 自定义语言注释符号，覆盖插件的注释格式
    "language": {
      // js后缀文件
      "js": {
        "head": "/**",
        "middle": " * @",
        "end": " */",
        // 函数自定义注释符号：如果有此配置 会默认使用
        "functionSymbol": {
          "head": "/******* ", // 统一增加几个*号
          "middle": " * @",
          "end": " */"
        }
      },
      // 一次匹配多种文件后缀文件 不用重复设置
      "h/hpp/cpp": {
        "head": "/*** ", // 统一增加几个*号
        "middle": " * @",
        "end": " */"
      },
      // 针对有特殊要求的文件如：test.blade.php
      "blade.php": {
        "head": "<!--",
        "middle": " * @",
        "end": "-->"
      }
    },
    // 默认注释  没有匹配到注释符号的时候使用。
    "annotationStr": {
      "head": "/*",
      "middle": " * @",
      "end": " */",
      "use": false
    }
  },
```

- Error Lens ：错误提醒，诊断更加突出来增强语言诊断功能
- nested comments：代码嵌套注释 ，使用方式：ctrl + alt + /

- Todo Tree：待办事项树插件

```
//todo-tree settings
  "todo-tree.regex.regex": "((//|#|<!--|;|/\\*|^)\\s*($TAGS):|^\\s*- \\[ \\])",
  "todo-tree.general.tags": ["TODO", "FIXME", "tag", "done", "bug"],
  "todo-tree.regex.regexCaseSensitive": false,
  // "todo-tree.tree.showInExplorer": true,
  "todo-tree.highlights.defaultHighlight": {
    "foreground": "white",
    "background": "Orange",
    "icon": "checklist",
    "rulerColour": "Orange",
    "type": "tag",
    "iconColour": "Orange"
  },
  "todo-tree.highlights.customHighlight": {
    "FIXME": {
      "background": "red",
      "icon": "beaker",
      "rulerColour": "red",
      "iconColour": "red",
      "opacity": 50
    },
    "tag": {
      "background": "Magenta",
      "icon": "pin",
      "rulerColour": "Magenta",
      "iconColour": "Magenta",
      "rulerLane": "full",
      "opacity": 50
    },
    "done": {
      "background": "DarkTurquoise",
      "icon": "verified",
      "rulerColour": "DarkTurquoise",
      "iconColour": "DarkTurquoise",
      "opacity": 50
    },
    "bug": {
      "background": "green",
      "icon": "bug",
      "rulerColour": "green",
      "iconColour": "green",
      "opacity": 50
    }
  },
```
