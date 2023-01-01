# 快速搭建属于你的博客
博客主题修改自[hexo-theme-matery](https://github.com/blinkfox/hexo-theme-matery)，解决了一些bug，做了一些个性化定制。

## 我的博客演示
[http://wyqz.top](http://wyqz.top)

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



