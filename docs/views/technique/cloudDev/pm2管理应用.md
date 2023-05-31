---
title: pm2基础知识
date: 2023-05-31 14:10:03
categories:
  - 技术文章
tags:
  - pm2
isShowComments: false
---

## pm2 管理器

### pm2 安装

```
# 命令行安装 pm2
npm install -g pm2
```

### pm2 用法

```
pm2 start app.js --name demo # 启动带命名的进程(demo为自定义名称)
pm2 start npm -- run dev --name demo # 启动npm脚本
pm2 start app.js -i 4  #启动4个app.js
pm2 ls            # 显示所有进程状态
pm2 monit              # 监视所有进程
pm2 logs               #  显示所有进程日志
pm2 stop all           # 停止所有进程
pm2 restart all        # 重启所有进程
pm2 reload all         # 0秒停机重载进程 (用于 NETWORKED 进程)
pm2 stop id             # 停止指定的进程(id为pm2进程的id值)
pm2 restart id          # 重启指定的进程
pm2 startup            # 产生 init 脚本 保持进程活着
pm2 web                # 运行健壮的
pm2 delete id           # 删除指定的进程
pm2 delete all         # 删除全部进程
```

### 运行进程的不同方式：

```
pm2 start app.js -i max  # 根据有效CPU数目启动最大进程数目
pm2 start app.js -i 3      # 启动3个进程
pm2 start app.js -x        #用fork模式启动 app.js 而不是使用 cluster
pm2 start app.js -x -- -a 23   # 用fork模式启动 app.js 并且传递参数 (-a 23)
pm2 start app.js --name serverone  # 启动一个进程并把它命名为 serverone
pm2 stop serverone       # 停止 serverone 进程
pm2 start app.json        # 启动进程, 在 app.json里设置选项
pm2 start app.js -i max -- -a 23  #在--之后给 app.js 传递参数
pm2 start app.js -i max -e err.log -o out.log  # 启动并生成一个配置文件
```

#### 你也可以执行用其他语言编写的 app ( fork 模式):

```
pm2 start my-bash-script.sh    -x --interpreter bash
pm2 start my-python-script.py -x --interpreter python
```
