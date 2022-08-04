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

# Git | 详解 | 命令

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

`git config --list` : 显示当前的Git配置

`git config -e [--global]` : 编辑Git配置文件

`git config [--global] user.name xxx`：设置全局用户名，信息记录在`~/.gitconfig`文件中

`git config [--global] user.email xxx@xxx.com`：设置全局邮箱地址，信息记录在`~/.gitconfig`文件中

`git init`：将当前目录配置成git仓库，信息记录在隐藏的`.git`文件夹中

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



