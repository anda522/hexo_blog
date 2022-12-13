---
title: nginx知识总结
top: false
cover: false
toc: true
mathjax: true
tags:
  - nginx
categories:
  - nginx
abbrlink: 386249329
date: 2022-08-06 15:55:55
password:
summary:
---



# 开关nginx

`Ubuntu`下：

打开`nginx`服务，需要在root权限下（docker容器下也可以用）

```bash
/etc/init.d/nginx start
```

重启nginx

```bash
/sbin/nginx -s reload
```







# nginx配置

## http块

### server区

进行端口监听，转发流量

- 访问80端口，即浏览器直接输入地址，访问网页，内容位于`/home/hexo/blog`处

```bash
http{
    server{
        listen 80; # 监听80端口
        server_name 101.35.203.216; #访问输的地址，可以填域名
        root /home/hexo/blog; # 访问文件的目录
        location / {

        }
    }
}
```

- 域名转发，即访问`game.wyqz.top`域名，转发到本地`10000`端口。

`game.wyqz.top`域名解析到的是服务器IP地址，等于说访问的还是80端口，我们通过域名匹配，将其转发到域名对应的端口处。

```bash
http{
    server
    {
        listen 80;
        server_name game.wyqz.top;

        location / {
        proxy_pass  http://127.0.0.1:10000; # 转发规则
        proxy_set_header Host $proxy_host; # 修改转发请求头，让10000端口的应用可以受到真实的请求
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
        access_log  /www/wwwlogs/access.log;
    }
}
```

- 重定向，即通过80端口访问`vj.wyqz.top`域名（80端口是http访问），直接return一个地址，即对应的**https**地址，实现**https**访问。

```bash
http{
    server{
        listen 80;
        server_name vj.wyqz.top;
        return  301 https://$host$request_uri; #重定向至https访问。
        location / {
        }
    }
}
```



- https配置

```bash
server {
    # 服务器端口使用443，开启ssl, 这里ssl就是上面安装的ssl模块
    listen       443 ssl;
    root /home/hexo/blog;
    # 域名，多个以空格分开
    server_name  wyqz.top www.wyqz.top;
    
    # ssl证书地址
    ssl_certificate     /etc/nginx/ssl.pem;  # pem文件的路径
    ssl_certificate_key  /etc/nginx/ssl.key; # key文件的路径
    
    # ssl验证相关配置
    ssl_session_timeout  5m;    #缓存有效期
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;    #加密算法
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;    #安全链接可选的加密协议
    ssl_prefer_server_ciphers on;   #使用服务器端的首选算法

    location / {
    }
}
```





# 注意

- server_name 值为`_`时，匹配任何域名。
