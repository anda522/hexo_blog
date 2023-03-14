---
title: Git|详解|命令
top: false
cover: false
toc: true
mathjax: true
tags:
  - git
categories:
  - 知识总结
abbrlink: 1843856130
date: 2022-06-30 10:14:41
password:
summary:
---

# Git命令 | 详解

# 概念

Git是基于树进行维护的，每一个节点都是一个历史版本，可以进行代码管理。

![Git图示](1843856130/webp.webp)

> 工作区（Workspace） 
>
> 暂存区（Index / Stage）  
>
> 本地仓库（Repository）  
>
> 远程仓库（Remote）



# 常用命令

`git config [--global] user.name xxx`：设置全局用户名，信息记录在`~/.gitconfig`文件中

`git config [--global] user.email xxx@xxx.com`：设置全局邮箱地址，信息记录在`~/.gitconfig`文件中

`git init`：将当前目录配置成git仓库，信息记录在隐藏的`.git`文件夹中

`git status`：显示有变更的文件

`git add .`：将当前工作区的所有文件的修改信息加入**暂存区**

`git log`：查看当前分支的所有版本

`git remote add origin git@github.com:XXX/XXX.git`：将本地仓库关联到远程仓库

`git clone git@github.com:XXX/XXX.git`：将远程仓库XXX下载到当前目录下

`git branch --set-upstream-to=origin/branch_name1 branch_name2`：将远程的branch_name1分支与本地的branch_name2分支对应

`git push -u ` （第一次需要-u以后不需要）：将当前分支推送到远程仓库

`git pull`：将远程仓库的当前分支与本地仓库的当前分支合并



# 配置

Git的设置文件为`.gitconfig`，它可以在用户主目录下（全局配置），也可以在项目目录下（项目配置）。

`git init`：将当前目录配置成git仓库，信息记录在隐藏的`.git`文件夹中

`git config --list` : 显示当前的Git配置

`git config -e [--global]` : 编辑Git配置文件

`git config [--global] user.name xxx`：设置全局用户名，信息记录在`~/.gitconfig`文件中

`git config [--global] user.email xxx@xxx.com`：设置全局邮箱地址，信息记录在`~/.gitconfig`文件中

`git config --global init.defaultBranch <defaultBranch>`：配置初始默认的分支名

# 工作区

`git status`：显示有变更的文件

`git restore XXX` : 将工作区的XXX文件的修改（该修改未添加到暂存区）恢复

`git add XX`：将XX文件的 **修改信息** 添加到**暂存区**

`git add .`：将当前工作区的所有文件的修改信息加入**暂存区**

`git rm [file1] [file2] ...` : 删除工作区文件，并把这次删除加入到暂存区

`git diff XX`：查看XX文件相对于暂存区修改了哪些内容

`git checkout — XX`或`git restore XX`：将XX文件尚未加入暂存区的修改全部撤销

> 更多撤销操作见下文 【撤销回退】

#  暂存区

`git rm --cached XX`：将文件XX从暂存区中删掉，停止追踪指定文件，但该文件会保留在工作区

`git restore --staged XXX` ： 将**暂存区**的XXX清空，工作区**不变**

`git commit -m "给自己看的备注信息"`：将**暂存区**的内容提交到当前分支（可持久化）

`git checkout [file] `: 恢复暂存区的指定文件到工作区（工作区文件发生改变）

`git reset [file]` : 重置暂存区的指定文件，与上一次commit保持一致，但工作区不变

> 更多撤销操作见下文 【撤销回退】

# 分支

- 查看分支

`git branch `: 查看本地分支

`git branch -r` : 列出所有远程分支

`git branch -a` ： 列出所有本地分支和远程分支

- 删除分支

`git branch -d branch_name`：删除本地的branch_name分支

`git push origin --delete [branch-name]` ： 删除远程分支

- 切换分支

`git checkout branch_name`：切换到branch_name这个分支

`git checkout -b branch_name`：创建并切换到branch_name这个分支

## 本地分支

`git branch `: 列出所有本地分支

`git branch branch_name`：创建新分支，但依然停留在当前分支

`git checkout branch_name`：切换到branch_name这个分支，并更新工作区

`git checkout -b branch_name`：创建并切换到branch_name这个分支

`git branch -m oldBranchName newBranchName` ： 修改本地分支名字

`git merge branch_name`：将分支branch_name合并到当前分支上

`git checkout - `： 切换到上一个分支

`git cherry-pick [commit]` ： 选择一个commit，合并进当前分支

`git branch -d branch_name`：删除本地仓库的branch_name分支

## 远程分支

`git branch -r` : 列出所有远程分支

`git branch [branch] [commit] `： 新建一个分支，指向指定commit

`git push origin --delete [branch-name]` ： 删除远程分支

`git branch -dr [remote/branch]` ： 删除远程分支

## 本地和远程

`git branch -a` ： 列出所有本地分支和远程分支

`git branch --track [branch] [remote-branch]` ： 新建一个分支，与指定的远程分支建立追踪关系

`git branch --set-upstream [branch] [remote-branch]` ： 建立追踪关系，在现有分支与指定的远程分支之间 （现在已经不支持）

`git branch --set-upstream-to=origin/branch_name1 branch_name2`：将远程的branch_name1分支与本地的branch_name2分支对应

# 信息查看

`git log`：查看当前分支的所有版本

`git reflog`：查看HEAD指针的移动历史（包括被回滚的版本）

`git status` : 显示有变更的文件

`git log --stat` : 显示commit历史，以及每次commit发生变更的文件

`git log -S [keyword] `: 搜索提交历史，根据关键词

`git log [tag] HEAD --pretty=format:%s` : 显示某个commit之后的所有变动，每个commit占据一行

`git log [tag] HEAD --grep feature` : 显示某个commit之后的所有变动，其"提交说明"必须符合搜索条件

`git log --follow [file] `: 显示某个文件的版本历史，包括文件改名

`git whatchanged [file]` : 显示某个文件的版本历史，包括文件改名

`git log -p [file]` : 显示指定文件相关的每一次diff

`git log -5 --pretty --oneline `: 显示过去5次提交

`git shortlog -sn` : 显示所有提交过的用户，按提交次数排序

`git blame [file]` : 显示指定文件是什么人在什么时间修改过

`git diff` : 显示暂存区和工作区的差异

`git diff --cached [file]` : 显示暂存区和上一个commit的差异

`git diff HEAD `: 显示工作区与当前分支最新commit之间的差异

`git diff [first-branch]...[second-branch] `: 显示两次提交之间的差异

`git diff --shortstat "@{0 day ago}"` : 显示今天你写了多少行代码

`git show [commit]` : 显示某次提交的元数据和内容变化

`git show --name-only [commit] `: 显示某次提交发生变化的文件

`git show [commit]:[filename]` : 显示某次提交时，某个文件的内容

# 远程同步

`git remote add origin git@github.com:xxx/XXX.git`：将本地仓库关联到远程仓库

`git push -u ` （第一次需要-u以后不需要）：将当前分支推送到远程仓库

`git push origin branch_name`：将本地的某个分支推送到远程仓库

`git clone git@github.com:anda522/XXX.git`：将远程仓库XXX下载到当前目录下

`git pull`：将远程仓库的当前分支与本地仓库的当前分支合并

`git pull origin branch_name`：将远程仓库的branch_name分支与本地仓库的当前分支合并

`git push --set-upstream origin branch_name`：设置本地的branch_name分支对应远程仓库的branch_name分支

`git push -d origin branch_name`：删除远程仓库的branch_name分支

`git checkout -t origin/branch_name`: 将远程的branch_name分支拉取到本地

# 撤销回退

`git reset --hard `: 重置暂存区与工作区，与上一次commit保持一致

`git reset --hard HEAD^` 或 `git reset --hard HEAD~`：将代码库回滚到上一个版本

`git reset --hard HEAD^^`：往上回滚两次，以此类推

`git reset --hard HEAD~100`：往上回滚100个版本

`git reset --hard 版本号`：回滚到某一特定版本

`git stash`：将工作区和暂存区中尚未提交的修改存入栈中

`git stash apply`：将栈顶存储的修改恢复到当前分支，但不删除栈顶元素

`git stash drop`：删除栈顶存储的修改

`git stash pop`：将栈顶存储的修改恢复到当前分支，同时删除栈顶元素

`git stash list`：查看栈中所有元素

`git checkout [file] `: 恢复暂存区的指定文件到工作区

`git checkout [commit] [file]` : 恢复某个commit的指定文件到暂存区和工作区

`git checkout .` : 恢复暂存区的所有文件到工作区

`git reset [file]` : 重置暂存区的指定文件，与上一次commit保持一致，但工作区不变

`git reset [commit] `: 重置当前分支的指针为指定commit，同时重置暂存区，但工作区不变

`git reset --hard [commit]` : 重置当前分支的HEAD为指定commit，同时重置暂存区和工作区，与指定commit一致

`git reset --keep [commit]` : 重置当前HEAD为指定commit，但保持暂存区和工作区不变

`git revert [commit]` : 新建一个commit，用来撤销指定commit，后者的所有变化都将被前者抵消，并且应用到当前分支



# 序列化操作

## 1 基础上传操作

```bash
git add .
git commit -m "备注信息"
git push
```

## 2 新建仓库的初始化操作

1. 远程新建仓库，默认不添加`README.md`文件
2. 此时请注意远程仓库的主分支名为`main`还是`master`
3. 本地新建一个文件夹用来作为上传该远程仓库的文件（或者用已存在的文件夹也行），在该目录下使用`git init`命令初始化仓库
4. 将本地仓库主分支名字设为和远端一样，例如`git branch -M main`
5. 关联远程仓库，例如`git remote add origin https://github.com/anda522/bot.git`
6. 上传的操作：`git add .`，`git commit -m "提交代码的备注信息"`，`git push`

## 3 新建dev分支并上传

```bash
git checkout -b dev # 本地新建一个dev分支，并且切换到dev分支
git push --set-upstream origin dev # 本地在dev分支；需要上传在dev分支的操作；默认远端没有dev分支，远端将创建一个dev分支并进行push操作
```

## 4 删除久远的未被追踪的分支

有时候分支已经从远程分支中删除，但是本地分支并不知道当前这几个远程分支是否被删除，可以使用`git remote show origin`命令查看

```bash
git remote show origin #  会出现stale (use 'git remote prune' to remove)字样
# git branch -a 这个可以看到远程不存在的分支还能显示出来
git remote prune origin # 删除未被追踪的分支
```

## 5 打tag

- 以本地最后一个`commit`创建tag

```bash
git tag <tagName> # 基于本地最后一个commit创建一个tag
git push origin <tagName> # 将tag推送到远程仓库
git push origin --tags # 将所有tag推送到远程仓库
```

- 以特定的提交为tag

```bash
git log --pretty=oneline # 查看当前分支的提交历史 里面包含 commit id
git tag -a <tagName> <commitId>
```

- 查看信息

```bash
git show <tagName> # 查看tag的详细信息
git tag # 查看本地所有tag
git ls-remote --tag origin # 查看远程tag
```

- 删除tag

```bash
git tag -d <tagName> # 删除本地tag
git push origin :refs/tags/<tagName> # 删除远程tag
```

- 其他

```bash
git tag -a <tagname> -m "XXX..." # 指定标签信息
git tag -a v1.0 -m "release 0.1.0 version"  # 创建附注标签
git checkout [tagname] # 切换标签
```

## 6 git fetch和git pull

- `git fetch`：将远程更新信息全部取回本地

```bash
git fetch <远程主机名> //这个命令将某个远程主机的更新全部取回本地
```

如果只想取回特定分支，可以指定分支名

```bash
git fetch <远程主机名> <分支名> //注意之间有空格
```

常见命令：

取回`origin` 主机的`master` 分支：

```bash
git fetch origin master
```

取回更新后会返回一个`FETCH_HEAD` ，指的是某个branch在服务器上的最新状态，我们可以在本地通过它查看刚取回的更新信息：

```bash
git log -p FETCH_HEAD
```

可以看到返回的信息包括更新的文件名，更新的作者和时间，以及更新的代码。我们可以通过这些信息来判断是否产生冲突，以确定是否将更新merge到当前分支。 

- `git pull`：拉取并合并

可以理解为两个过程：

```bash
git fetch origin master //从远程主机的master分支拉取最新内容 
git merge FETCH_HEAD    //将拉取下来的最新内容合并到当前所在的分支中
```

完整命令：将远程主机的某个分支的更新取回，并与本地指定的分支合并

```bash
git pull <远程主机名> <远程分支名>:<本地分支名>
```

如果是与当前分支合并，则冒号后面的可以省略，例如：

```bash
git pull origin master
```

