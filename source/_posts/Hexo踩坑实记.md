---
title: Hexo踩坑实记
top: false
cover: false
toc: true
mathjax: true
tags:
  - Hexo
categories:
  - 前端
abbrlink: 3418896117
date: 2024-01-12 12:39:14
password:
summary:
---

# Hexo踩坑实记

自从使用了Hexo框架搭建博客，我就经历了诸多苦难，很多需要修改的地方，一步步踩坑过来，今天希望一一进行记录。

# 主题自定义修改

## 1 代码块修改

由于我Hexo最近升级到了 `7.0` 版本，新版本自带了 `prismjs` 插件，所以对此进行修改。我希望进行代码高亮显示，不适用自带的 `highlight` 。

首先需要卸载掉 `hexo-prismjs-plugin` 插件

```bash
npm uninstall hexo-prism-plugin
```

然后修改博客根目录下的配置文件

```yaml
syntax_highlighter: prismjs
# highlight 不启用, 使用prismjs
# highlight:
#   auto_detect: false
#   line_number: false
#   line_threshold: 0
#   tab_replace: ''
#   exclude_languages:
#     - example
#   wrap: true
#   hljs: false
prismjs:
  preprocess: true
  line_number: true
  line_threshold: 0
  tab_replace: ''
```

然后再引入对应的 `js` 和 `css` 文件即可，我下载了我看着不错的对应的主题，在 [prismjs官网](https://prismjs.com/download.html) 下载两个文件，我将其放置在了 `source/libs/prism` 文件夹下了，然后还要在主题配置文件夹下配置路径：

```yaml
libs:
	css:
		prism:  /libs/prism/prism.css
	js:
		prism: /libs/prism/prism.js
```

`post.ejs` 文件末尾加入：

```html
<script src="<%- theme.libs.js.prism %>" defer></script>
<script src="https://cdn.bootcdn.net/ajax/libs/prism/1.9.0/plugins/line-numbers/prism-line-numbers.js" defer></script>
```

`head.ejs` 文件中加入 `css` ：

```html
<link rel="stylesheet" type="text/css" href="<%- theme.libs.css.prism %>">
<link rel="stylesheet" type="text/css" href="https://cdn.bootcdn.net/ajax/libs/prism/1.9.0/plugins/line-numbers/prism-line-numbers.css">
```

> 可以参考 [官方文档](https://hexo.io/zh-cn/docs/syntax-highlight#preprocess) 

## 2 目录添加背景框和滚动条

在 `post-detail-toc.ejs` 文件下修改对应代码：

最主要的两个属性：最大高度和纵向溢出，需要修改好。

```css
.toc-widget {
    width: 340px;
    padding-left: 20px;
    padding-bottom: 10px;
    padding-top: 10px;
    background-color: rgb(255, 255, 255, 0.9);
    border-radius: 10px;
    max-height: 70vh;
    overflow-y: auto;
    box-shadow: 0 10px 35px 2px rgba(0, 0, 0, .15), 0 5px 15px rgba(0, 0, 0, .07), 0 2px 5px -5px rgba(0, 0, 0, .1) !important;
}
```

## 3 添加文章更新日期

在 `post-detail.ejs` 文件下找到对应位置添加

```ejs
<div class="post-date info-break-policy">
    <i class="fa fa-calendar-minus-o fa-fw"></i><%- __('publishDate') %>:&nbsp;&nbsp;
    <%- date(page.date, 'YYYY-MM-DD') %>
</div>
<!-- 显示更新日期 -->
<div class="post-update-date info-break-policy">
    <i class="fa fa-history fa-fw"></i><%- __('updated') %>:&nbsp;&nbsp;
    <%- date(page.updated, 'YYYY-MM-DD') %>
</div>
```

我因为使用了 `updated` 解释，所以要在 `themes/matery/languages/zh-CN.yml` 中添加

```yaml
updated: 更新日期
```

## 4 Markdown数学公式支持

由于原有的 `Mathjax` 加载太慢，且对于繁杂的公式无法渲染，我果断更换。

- 卸载原来的 `hexo-renderer-marked`

```bash
npm uninstall hexo-renderer-marked --save
```

- 安装 `hexo-renderer-markdown-it-plus`

```bash 
npm install hexo-renderer-markdown-it-plus --save
```

- 最后安装hexo-math，否则会出现公式渲染下还有公式的情况。

```bash
npm install hexo-math --save
```

会发现，公式中的换行`//` 终于可以渲染了。

> 参考：[Markdown数学公式支持](https://blog.csdn.net/subtitle_/article/details/130004464)

## 5 valine评论系统

## 6 添加阅读背景图

## 7 文章永久链接

## 8 添加Google广告

## 9 主页文章卡片栏添加更新时间

我想要在主页文章的整体浏览上添加文章的更新时间，而不是只显示创建时间，因此进行修改。

我发现每个文章卡片在一个 `<div class='card'></div>` 标签下，而文章的创建日期和对应分类的信息在 `<div class="publish-info"></div>` 标签下，因此需要对该标签进行修改。

原内容为：

```html
<span class="publish-date">
    <i class="fa fa-clock-o fa-fw icon-date"></i><%= date(post.date, config.date_format) %>
</span>
```

我需要再添加一个更新日期，同时还要进行一番排版。我让发布日期和更新日期纵向排列，同时日期栏和分类信息栏横向排列，所以我采用 `flex` 布局，将时间放在 `time-section` 的 `div` 标签中，同时需要对 `css` 文件进行修改。

`index.ejs` 文件进行修改：

```html
<div class="time-section">
    <span class="publish-date">
        <i class="fa fa-clock-o fa-fw icon-date"></i><%= date(post.date, config.date_format) %>
    </span>
    <span class="update-date">
        <i class="fa fa-history fa-fw icon-date"></i><%= date(post.updated, config.date_format) %>
    </span>
</div>
```

`matery.css` 文件修改如下：

```css
/* 日期和分类信息横向排列 */
.publish-info {
    display: flex;
    justify-content: space-between; /* 空白只在子元素之间均匀分配,两端不分配 */
}
/* 发布日期和更新日期纵向排列 */
.publish-info .time-section {
    display: flex;
    flex-direction: column;
}
```

同时因为我加了新的图标，原来的**发布图标**有内间距描述，我仿照它添加我的新图标的间距描述，用来对齐。

```css
/* 已有的间距描述 */
.publish-date .icon-date {
    padding-right: 5px;
}
/* 新加的间距描述 */
.update-date .icon-date {
    padding-right: 5px;
}
```

> 注意：由于很多页面都有文章卡片的展示，所以也要同样对相应位置进行修改，其他出现文章卡片的位置：标签页、分类页、归档页、文章底部的前一篇和后一篇。

# 踩坑填坑

## 1 不蒜子计数文章阅读次数出错

发现是请求头的问题，在对应地方，添加 `<meta name="referrer" content="no-referrer-when-downgrade">` 代码

```ejs
<% if (theme.busuanziStatistics && theme.busuanziStatistics.enable) { %>
<script async src="<%- theme.libs.js.busuanzi %>"></script>
<meta name="referrer" content="no-referrer-when-downgrade">
<% } %>
```

> 参考：[解决不蒜子 (busuanzi) 文章计数出错问题](https://jdhao.github.io/2020/10/31/busuanzi_pv_count_error/)

# 网站加速优化

## 1 图片压缩

## 2 CDN优化

采用第三方CDN对 `js` 和 `css` 文件进行优化。如

- https://www.bootcdn.cn/

# 更新日志

2022-06-23：搭建该博客网站，采用Hexo博客框架，使用Github Page作为服务端

2022-06-24：采用Matery主题

2022-06-25：网站域名更新，变为[https://wyqz.top](https://wyqz.top)

2022-06-25：添加百度统计，统计网站流量

2022-06-30：记录更新日志内容（前面都是凭的记忆写的）

2022-07-02：添加鼠标指针特效，修改菜单栏文字显示

2022-07-04：添加动态线条背景，valine评论request失败bug修复（js版本过低）

2022-07-26：项目所有代码同步至GitHub

2022-08-02：网站添加背景图

2022-08-03：添加备案号，准备更新域名

2022-08-04：优化网站打开速度，压缩各种图片，网站链接更新为永久链接

2023-01-02：添加valine评论邮件通知系统，评论时必填邮箱

2023-01-23：修改网站字体，添加自定义js/css文件

2023-03-14：网站所有JS/CSS添加CDN加速，网站图片也添加CDN加速（jsdeliver加速）

2023-04-12：网站CSS、JS全部使用开源资源CDN加速，网站打开速度步上新台阶（jsdeliver全部转为本地存取）

2023-04-13：目录框添加白色背景，样式适配其他卡片样式（GPT真的太强了，没它我还真不一定会加这个功能）

2023-04-14：修改部分feature图片，将200-400k的图片进行了替换，压缩访问资源大小

2023-11-14：修改部分feature图片，提高观感，进一步压缩图片大小

2023-12-16：自建私有git服务，使用私有git进行项目部署，添加底部音乐栏，4首320K音质

2023-12-17：解决文章阅读次数统计问题，referrer头问题，在js引入处增加限制即可

2023-12-20：文章添加更新时间 & 鼠标移至评论区目录隐藏

2024-01-11：更新Hexo至7.0，出现诸多兼容性问题，已修复代码显示、图片显示、代码高亮、行号显示问题

2024-01-12：添加代码行号分隔线，添加目录滚动条，移除目录隐藏功能

2024-01-13：增加异步请求，优化博客访问速度，增加图片懒加载功能，文章卡片添加更新时间

# :star: 参考博客 :star: 

- [夜法之书](https://v20blog.17lai.site/posts/40300608/) 

