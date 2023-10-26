---
title: Google搜索语法
top: false
cover: false
toc: true
mathjax: true
tags:
  - Google搜索
categories:
  - 开发工具
abbrlink: 2127276366
date: 2023-10-26 19:14:19
password:
summary:
---

希望能够使用Google搜索进行精准搜索。

# Google搜索语法

# 1 内容搜索

## 标题相关

作用：限定标题内容。

### intitle

例：`intitle:Google搜索技巧` ，搜索出来的标题会包含 `Google搜索技巧` 相关内容。

### allintitle

例：`intitle:浙江大学 亚运会` ，搜索出来的标题必须包含 `浙江大学` 或 `亚运会` 两个相关内容。

## 文本相关

### intext

例：`intext:"浙江大学" "亚运会"` ，搜索出来的文章内容中必须包含 `浙江大学` 和 `亚运会` 两个关键词。

作用：限定文章内容。

### ""

例：`"Google搜索技巧"` ，链接中完全包含"Google搜索技巧"关键字

搜索结果中会完全包含英文双引号内的关键字

### -

有时候，我们搜索的内容可能有多层含义，或者不想看到和某个信息相关的搜索，就可以使用连字符进行排除。

比如，搜索JavaScript，排除维基百科中的相关内容：`JavaScript -wikipedia`

### *

使用星号填充内容（*），可以使用星号来填充文本之间的空格，比如在搜索时，只记得其中一部分内容，另一部分忘记了，就可以这样用。

例如，我们忘记了Git中撤销commit命令的第二个单词，可以这样搜索：`git * --soft HEAD^`。



## 链接相关

### inurl

例：`李子柒 inurl:cctv` ，搜索出来的链接中必须包含 `cctv` 。

作用：限定链接包含内容。

### site

例：`intitle:浙江大学 亚运会 site:www.zhihu.com` ，限定搜索的结果中全是知乎的链接，同时链接标题中包含 `浙江大学` 或 `亚运会` 两个相关内容。

作用：限定网址来源。

# 2 图片搜索

## 限定图片大小

例：`elon musk imagesize:2560x1440` ，搜索出来的图片的大小为所示大小，乘号为英文字母`x`，大小写均可。

# 3 文件搜索

## 文件类型

例：`filetype:pdf` ，搜索出来的文件类型为`PDF`。

还有其他：`filetype:png`， `filetype:jpg`

# 4 其他命令

## search

`search：网站域名 搜索内容` 在指定网站内搜索内容。

## and

如果我们查找的内容包含多个关键字，可以使用and命令。

## or

使用or来查询多个关键词中的一个。

## define

使用Define关键词来查搜索关键词的定义。

例如：`define: JavaScript`

## before/after

可以使用after来搜索指定时间之后的内容，使用before搜索指定时间之前的内容。

例如：`after: 2021 learn python`，搜索指定时间之后的内容。

