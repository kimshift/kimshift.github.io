---
title: vscode配置
date: 2023-05-11 09:07:12
categories:
  - 软件工具
tags:
  - vscode
  - 配置
isShowComments: false
---

### 常用配置

```json
{
  "workbench.iconTheme": "material-icon-theme", //目录图标主题
  "terminal.integrated.defaultProfile.windows": "Command Prompt", //默认终端
  "workbench.editor.enablePreview": false, //预览|编辑模式
  "editor.formatOnSave": true, //保存自动格式化
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
    "autoAdd": false,
    "autoAddLine": 30,
    "autoAlready": true,
    "supportAutoLanguage": [],
    "prohibitAutoAdd": ["json", "md", "vue"],
    "prohibitItemAutoAdd": ["项目的全称, 整个项目禁止自动添加头部注释, 可以使用快捷键添加"],
    "folderBlacklist": ["node_modules"],
    "wideSame": false,
    "wideNum": 13,
    "functionWideNum": 0,
    "headInsertLine": {
      "php": 2,
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
    },
    "moveCursor": true,
    "dateFormat": "YYYY-MM-DD HH:mm:ss",
    "atSymbol": ["@", "@"],
    "atSymbolObj": {
      "文件后缀": ["头部注释@符号", "函数注释@符号"]
    },
    "colon": [": ", ": "],
    "colonObj": {
      "文件后缀": ["头部注释冒号", "函数注释冒号"]
    },
    "filePathColon": "路径分隔符替换",
    "showErrorMessage": false,
    "writeLog": false,
    "CheckFileChange": false,
    "createHeader": false,
    "useWorker": false,
    "designAddHead": false,
    "headDesignName": "random",
    "headDesign": false,
    "cursorModeInternalAll": {},
    "openFunctionParamsCheck": true,
    "functionParamsShape": ["{", "}"],
    "functionBlankSpaceAll": {},
    "functionTypeSymbol": "*",
    "typeParamOrder": "type param",
    "customHasHeadEnd": {},
    "throttleTime": 60000,
    "language": {
      "js": {
        "head": "/**",
        "middle": " * @",
        "end": " */",
        "functionSymbol": {
          "head": "/******* ",
          "middle": " * @",
          "end": " */"
        }
      },
      "h/hpp/cpp": {
        "head": "/*** ",
        "middle": " * @",
        "end": " */"
      },
      "blade.php": {
        "head": "<!--",
        "middle": " * @",
        "end": "-->"
      }
    },
    "annotationStr": {
      "head": "/*",
      "middle": " * @",
      "end": " */",
      "use": false
    }
  },
  /* 文件格式化配置 */
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.defaultFormatter": "Vue.volar"
  },
  "git.confirmSync": false,
  "[less]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "security.workspace.trust.untrustedFiles": "open",
  "[json]": {
    "editor.defaultFormatter": "vscode.json-language-features"
  },
  "workbench.startupEditor": "none",
  "vsicons.dontShowNewVersionMessage": true,
  "explorer.confirmDelete": false,
  "settingsSync.ignoredExtensions": [],
  "update.showReleaseNotes": false,
  "database-client.autoSync": true,
  "explorer.confirmPasteNative": false,
  "terminal.integrated.commandsToSkipShell": [
    "\"-c\", \"export LANG=en_US.UTF-8; export LC_ALL=en_US.UTF-8;\""
  ],
  "cssrem.fixedDigits": 5,
  "cssrem.rootFontSize": 39,
  "cssrem.wxssDeviceWidth": 750,
  "cSpell.userWords": ["pinia"],
  "code-runner.executorMapByGlob": {
    "pom.xml": "cd $dir && mvn clean package"
  },
  "vue.autoInsert.dotValue": true, //ref参数自动追加value
  "vue.splitEditors.layout.left": ["script", "scriptSetup", "styles"],
  "prettier.jsxSingleQuote": true, //jsx单引号
  "prettier.semi": false, //不保留分号
  "prettier.singleQuote": true, //使用单引号
  "prettier.printWidth": 100, //代码限制长度
  "backgroundCover.randomImageFolder": "E:\\records\\image\\vscode", //背景图目录
  "backgroundCover.imagePath": "E:\\records\\image\\vscode\\003.jpg", //背景图路径
  "editor.autoClosingBrackets": "always", //输入自动插入右括号
  "editor.autoClosingDelete": "never", //删除时-不删除相邻的右引号或右方括号
  "terminal.integrated.fontSize": 14, //终端字体大小
  "editor.fontSize": 14, //代码字体大小
  "vue.inlayHints.vBindShorthand": true,
  "javascript.preferences.importModuleSpecifierEnding": "auto", //导入js是否保留后缀
  "files.associations": {
    "*.vue": "vue"
  }
}
```

### 切换编辑模式

- 搜索框搜索： enablePreview （取消踢 √）==>取消单击预览功能

### 快捷键

- 单行注释：Ctrl + /
- 多行注释：Shift + Alt + A
- 复制当前行：Shift + Alt + ↓
- 查看方法参数：Ctrl + Shift + 空格

### 可能会出现的问题

运行 tsc 命令时报错，错误信息如下：

法加载文件 C:\Users\xxx\AppData\Roaming\npm\tsc.ps1，因为在此系统上禁止运行脚本。有关详细信息，请参阅 ht tps:/go.microsoft.com/fwlink/?LinkID=135170 中的 about_Execution_Policies。

解决方式：

1. win+X 启动 windows PowerShell（管理员）
2. 输入 set-ExecutionPolicy RemoteSigned 命令，敲回车
3. 提示输入内容时，输入 Y ，再敲回车即可。
