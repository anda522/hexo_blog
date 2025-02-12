## 介绍
本博客基于 Hexo 静态博客框架，主题修改自 [hexo-theme-matery](https://github.com/blinkfox/hexo-theme-matery)。在原主题的基础上，修复了一些已知问题，并进行了个性化定制，使其更符合个人需求。

### 博客演示
你可以访问我的博客演示站点：[https://wyqz.top](https://wyqz.top)

## 环境安装与配置

### 1. 安装 Node.js 和 Git

在开始之前，确保你的系统已经安装了 Node.js 和 Git。

- **Node.js**: [下载地址](https://nodejs.org/)，注意安装20.x版本，高版本可能存在不兼容问题。

然后配置镜像地址，使用 `npm config set registry http://mirrors.cloud.tencent.com/npm/` 命令配置腾讯云镜像地址。

- **Git**

### 2. 安装 Hexo

在终端中运行以下命令来全局安装 Hexo：

```bash
npm install -g hexo
```

### 3. 克隆本仓库

将本仓库克隆到本地：

```bash
git clone https://github.com/anda522/hexo_blog.git
```
然后进入该仓库目录。

### 4. 安装依赖

由于仓库中没有上传 `node_modules` 目录，你需要在项目根目录下运行以下命令来安装依赖：

```bash
npm install
```

### 5. 创建博客文章

`source/_posts`目录为子仓库，用于存储博客内容。你需要先手动创建或使用 `hexo new post 'name'` 命令生成文章。你可以使用以下命令创建新的博客文章：

```bash
hexo new post "文章标题"
```

### 6. 预览网页

创建完文章之后，使用 `hexo s` 命令预览网页，如果网页可以成功预览，基本就完成了搭建。

### 7. 修改配置

注意本仓库各个配置均为我的配置，如果你需要自定义博客，需要修改为你的配置。如不蒜子配置，评论系统配置，谷歌分析，网页介绍等。

## 其他功能

### 1. 修改 `run.sh` 脚本

`run.sh` 脚本用于一键部署博客。你可以根据自己的需求修改此脚本，定义一键搭建的功能。

### 2. 添加水印

根目录下的 `watermark.py` 文件用于给文章中的图片添加水印。你可以使用以下命令为文章添加水印：

- 为单篇文章添加水印：

  ```bash
  python watermark.py postname
  ```

- 为所有文章添加水印：

  ```bash
  python watermark.py all
  ```

### 3. 博客特性

- 文章详细界面目录自定义滚动
- 显示文章的更新日期
- 主页随机诗词
- ...


## 常用命令

以下是一些常用的 Hexo 命令：

- **启动本地服务器**：通过 `http://localhost:4000` 访问博客。

  ```bash
  hexo s
  ```

- **清除 `public` 文件夹**：

  ```bash
  hexo clean
  ```

- **生成静态文件**：

  ```bash
  hexo g
  ```

- **部署到远程仓库**：

  ```bash
  hexo d
  ```

## 注意事项

1. **`source/_posts` 目录**：此目录为子仓库，用于存储博客内容。你需要手动创建或使用 `hexo new post` 命令生成文章。

2. **依赖管理**：确保在每次拉取代码后运行 `npm install` 以安装最新的依赖。

3. **水印脚本**：在使用 `watermark.py` 脚本时，确保你的图片路径正确，并且已经安装了所需的 Python 依赖。


## 参考内容

### 评论

- Valine评论系统官方API：https://valine.js.org/configuration.html

- 评论邮箱通知参考：https://aeneag.xyz/articles/2021/11/14/1636875468621.html

- leancloud评论唤醒：https://www.pudn.com/news/62810fc09b6e2b6d558f96c7.html

- 流控问题：https://www.aimtao.net/slef-wake-leancloud/

### 一些Hexo博客搭建教程

- 基于Matery主题：https://v20blog.17lai.site/posts/40300608/#%E7%B3%BB%E5%88%97%E6%95%99%E7%A8%8B

- markdown公式渲染：https://blog.csdn.net/subtitle_/article/details/130004464

- 关于代码高亮：https://hexo.io/zh-cn/docs/syntax-highlight#preprocess

## 结语

通过本指南，你应该能够成功搭建并运行你的 Hexo 博客。如果你有任何问题或建议，欢迎在 Issues 中提出。

**Happy Blogging!** 🚀