---
title: 自建私有git发布博客
top: false
cover: false
toc: true
mathjax: true
tags:
  - git
categories:
  - 开发知识
abbrlink: 3211658549
date: 2023-12-16 18:41:02
password:
summary:
---

# 自建私有git进行项目发布

之前尝试过通过建立私有git仓库，来发布自己的hexo静态博客，但是失败了，今天尝试了一下午，算是有了结果。下面记录我的过程。

我的需求：

我有一个服务器，希望在服务器端建一个`git`仓库，本地部署时会同时往GitHub，服务器多个地方部署，但是主要的访问是通过服务器端的 `nginx` 。

即本地 `hexo d` 命令能够往服务器 `git` 的进行部署，同时在 `github` 留有备份。服务器中 `nginx` 会设置网站根目录为指定的某个目录。

# 整体思路

本地项目通过`git` 上传至服务器端建立的 裸仓库`git` ，`push` 操作会触发 `git` 的钩子函数， 钩子函数进入在我们的项目目标目录，执行 `pull` 操作，将所有的改变拉取到项目目录并合并。

`nginx` 会将网站根目录设置为项目目录，就可以正常访问了。

# 服务器端

建议使用有 `sudo` 权限的用户新建 `git` 用户，而不是 `root` 用户。

## 1 新建一个Git用户

> 首先需要安装 `git` ，具体方法根据自己系统搜索进行安装。

```bash
sudo useradd git
```

## 2 配置访问权限

我们需要无需密码验证登录 `git` 账户，需要将本机的公钥文件内容 `C:\Users\用户名\.ssh\id_rsa.pub` 复制到 `/home/git/.ssh/authorized_keys` 中。

这样就能无密码登录 `git` 用户，可以使用 ` ssh -T git@101.35.203.216` 命令进行验证。

## 3 建立裸仓库

选定目录建立裸仓库，我的是 `/home/git/blog.git` ，在 `/home/git` 目录下执行命令：

```bash
sudo git init --bare blog.git
# 同时还要将仓库所属用户修改为git
sudo chown -R git:git blog.git
```

> 裸仓库没有工作区，也就是你根本没法看到上传上来的文件。之后我所有的静态博客文件即 `public` 目录下的文件都会上传到裸仓库。那如何拿到文件呢？
>
> 我采用 `git` 钩子函数的特性，当有本地有 `push` 代码到裸仓库的操作时，便自动执行一个脚本，把仓库中的文件拉取到我的项目目录 `/home/git/public` 中，这样我就可以正常的用 `nginx` 访问我的博客项目了。

## 4 添加钩子函数

在裸仓库 `/home/git/blog.git/hooks` 目录中，新建 `post-receive` 文件

```bash
vim post-receive # 新建文件
```

输入内容

```bash
#!/bin/bash
unset GIT_DIR # 似乎挺重要的，可能与环境变量有关
DIR=/home/git/public # 项目目录
echo "Starting Upadte!" # 调试用的
git config --global --add safe.directory /home/git/public # 中途代码提示建议我添加的，我就加上了
cd $DIR # 进入项目目录
git pull /home/git/blog.git main # 拉取裸仓库并与本地分支合并
echo "Update Sucess!" # 调试用的
```

> 其实这里大部分操作和 `git` 命令和 `bash` 环境相关，看来还是需要去学习下了。

注意还要将 `post-receive` 文件所属用户改为 `git` ，且添加执行权限，不然无权访问。

```bash
sudo chown -R git:git post-receive
sudo chmod +x post-receive
```

## 5 禁止Git用户登录Shell

编辑 `/etc/passwd` 文件，找到下面类似内容：

```bash
git:x:1009:1009:git daemon user:/:/bin/bash
```

修改为：

```bash
git:x:1009:1009::/home/git:/usr/bin/git-shell
```

这样 `git` 用户就无法登录shell了。

## 6 添加项目目录

在自己想要的地方添加项目目录，我的是 `/home/git/public` ， 在目录中需要进行仓库初始化，因为这个目录之后要执行 `pull` 操作

```bash
git init # 初始化仓库
```

> 还要注意，这个项目文件要让 git 用户有权限访问

```bash
sudo chown -R git:git /home/git/public # 让git所有
```

# 本地客户端

## 1 本地调试

本地可以新建一个文件夹进行调试。

```bash
git init
git remote add origin git@101.35.203.216:/home/git/blog.git
git add .
git commit -m "test"
git push -u origin main
```

> 注意调试之后还要让服务器端的项目commit记录为空，因为正式使用时会有 git 记录不一致的情况。
>
> 当然如果 `git` 操作一流，能够处理此种情况，算我没说。

## 2 博客配置

本地Hexo博客项目配置文件 `_config.yml` 中我进行了修改：

```bash
deploy:
- type: git
  repository:
    github: git@github.com:anda522/anda522.github.io.git
    gitee: git@gitee.com:wyqz/wyqz.git
  branch: master
- type: git
  repository: git@101.35.203.216:/home/git/blog.git
  branch: main
```

执行 `hexo d` 命令后，就会将生成的前端文件上传至自建的裸仓库。



# 注意点

- 各种权限问题，登录账户为 `git` ，需要时刻注意某些文件能不能用 `git` 用户访问
- `git` 的各种命令的理解， `pull push` 等，需要了解
- `bash` 的环境变量问题，没有了解过很容易出问题

> 参考：
>
> - https://52gvim.com/post/git-server
>
> - https://blog.csdn.net/Shen_Junxiao/article/details/85245390



