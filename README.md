# 快速搭建属于你的博客
博客主题修改自[hexo-theme-matery](https://github.com/blinkfox/hexo-theme-matery)，解决了一些bug，做了一些个性化定制。

## 我的博客演示
[https://wyqz.top](https://wyqz.top)

# 使用

修改`run.sh`脚本文件可以定义自己的一键搭建功能。

# 相关命令

主目录中：

新建文章，name为文件名

```bash
hexo new post "name"
```

将文件部署到本地服务器上，可以通过4000端口访问

```bash
hexo s
```

清除public文件夹内容

```bash
hexo clean
```

生成博客public文件夹

```
hexo g
```

将public文件夹内容上传到远程仓库

```
hexo d
```

根目录下的`watermark.py`文件是给文章图片添加水印的程序。每写完一篇文章，可以运行`python watermark.py postname`添加水印，如果要一次性给所有文章添加水印，直接运行`python watermark.py all`。

# 评论

Valine评论系统官方API：https://valine.js.org/configuration.html

评论邮箱通知参考：https://aeneag.xyz/articles/2021/11/14/1636875468621.html

leancloud评论唤醒：

https://www.pudn.com/news/62810fc09b6e2b6d558f96c7.html

流控问题：https://www.aimtao.net/slef-wake-leancloud/

