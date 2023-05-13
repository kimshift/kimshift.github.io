---
title: Git基础知识
date: 2023-05-13 13:15:18
tags:
  - git命令
categories:
  - Git
isShowComments: false
---

## git 本地仓库命令

### 全局配置：

- 用户名：
  git config --global user.name "用户名"
- 用户邮箱：git config --global user.email "邮箱"
- ：git config --global --list

```sh
#查看全局配置
git config --global --list

#配置本地用户名和邮箱
git config --global user.name "用户名"
git config --global user.email "邮箱"

#例如
git config --global user.name "kims"
git config --global user.email "710429093@qq.com"


#删除配置
git config --global --unset user.emal
git config --global --unset user.name
```

### 初始化以及操作

- 初始化 git 仓库：git init
- 查看仓库当前的状态：git status
- 添加进入暂存区：git add 文件名
- 将所有文件添加进入暂存区：git add .
- 添加进入归档区：git commit -m "备注说明"
- 撤销修改内容：git checkout -- 文件名/ git restore -- 文件名
- 撤销暂存区内容：git reset HEAD 文件名

### 比较版本差异

- 查看工作区和版本库里面最新版本的区别：git diff HEAD -- 文件名
- 比较的是暂存区和工作区的差异 : git diff
- 比较的是暂存区和历史区的差异 : git diff --cached
- 比较的是历史区和工作区的差异（修改）: git diff master

### 版本穿梭

- 回退到上一个版本：git reset --hard HEAD^
- 回滚到指定版本(将归档区-暂存区-工作区进行回滚)：git reset --hard commitId
- 回滚到指定版本(将归档区-暂存区进行回滚)：git reset --mixed commitId
- 回滚到指定版本(将归档区进行回滚)：git reset --soft commitId
- 将某个版本删除：git revert commitId

### 版本信息

- 查看当前每个版本：git log 或者 git log --pretty=oneline（只查看每个版本 id 以及说明）
- 查看历史版本：git reflog

### 分支管理

- 创建分支 : git branch 分支名
- 切换分支 : git switch/checkout 分支名
- 创建分支并切换分支 : git checkout -b 分支名
- 删除分支 : git branch -d 分支名
- 合并分支 : git merge 分支名(将该分支合并到当前分支)
- 分支的合并后显示 : log:git log --oneline --graph --decorate
- 查看当前分支：git branch -v
- 克隆指定分支：git clone -b [分支名] [地址]

```
遇到多分支开发：先合并 a1 到 master 后再合并 a2 到 master;
如果遇到冲突，先回滚到前一个版本，再切换 a2 分支。
然后将 master 合并到 a2 进行修正
```

-
