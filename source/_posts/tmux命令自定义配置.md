---
title: tmux命令详解及自定义配置
top: false
cover: false
toc: true
mathjax: true
tags:
  - Linux
categories:
  - 开发知识
abbrlink: 4190388149
date: 2023-12-19 17:37:21
password:
summary:
---

# Tmux命令

`tmux` 是一个终端复用器，可以在一个窗口中运行多个终端会话。

一个 `tmux` 可以包含多个 `session` ，一个 `session` 可以包含多个 `window` ，一个 `window` 可以包含多个 `pane` 。

结构如下：

```bash
tmux:
    session 0:
        window 0:
            pane 0
            pane 1
            pane 2
            ...
        window 1
        window 2
        ...
    session 1
    session 2
```

## 1 会话命令-session

- 开始新会话

```bash
tmux
```

- 开始新会话指定会话名称

```bash
tmux new -s "新名称"
```

- 连接现有会话

```bash
tmux attach -t "名字"
```

- 列出所有运行的会话

```bash
tmux ls
```

- 结束特定会话

```bash
tmux kill-session -t "名字"
```

- 打开之前挂起的会话

```bash
tmux a
```

- 进入会话界面后，切换其他会话：`Ctrl + a + s` ，之后上下键操作选择即可

- 从当前会话中断开连接（挂起，会在后台继续运行）： `Ctrl + a + d`

> 注意： `Ctrl+b` 是 `tmux` 命令的默认前缀键组合。而我修改了配置文件，自定义前缀为 `Ctrl+a`

## 2 窗口命令-window

- 创建新窗口： `Ctrl + a + c`

- 切换到前一个/下一个窗口： `Ctrl + a + p/n` 

- 切换其他窗口： `Ctrl + a + w` ，之后上下键操作选择即可

## 3 窗格命令-pane

- 左右分割窗格： `Ctrl + a + :`

- 上下分割窗格： `Ctrl + a + "` 

> 上面两条在我的配置文件中配置了

- 切换窗格： `Ctrl + a + 方向键` ，可以在窗格之间任意切换

> 同时鼠标可以点击选择窗格。

- 关闭当前窗格： `Ctrl + a + x` 或 `Ctrl + d`

> 对于 `Ctrl + d` ，如果当前 `window` 的所有 `pane` 均已关闭，则自动关闭 `window` ；如果当前 `session` 的所有 `window` 均已关闭，则自动关闭 `session` 。

- 调整窗格大小： `Ctrl + a + Ctrl + 方向键` 

> 同时鼠标可以拖动分割线进行调整大小。

- 将当前窗格全屏/取消全屏： `Ctrl + a + z`
- 翻阅当前pane内的内容：鼠标滚轮。

- `tmux` 中复制/粘贴文本的通用方式：按下 `Ctrl + a` 后松开手指，然后按 `[` ，用鼠标选中文本，被选中的文本会被自动复制到tmux的剪贴板，按下 `Ctrl + a` 后松开手指，然后按 `]`，会将剪贴板中的内容粘贴到光标处。

# Tmux配置

## 1 配置文件

将 `.tmux.conf` 文件放置在用户目录下。

我的配置，基本也是从网上整理的：

也可见：https://github.com/anda522/config/blob/main/tmux/.tmux.conf 

```bash
# Note:
# -1 If the config is not valid, run the command "tmux source-file ~/.tmux.conf", 
# then try your config again!
# -2 This is my personal config file according to my likes.

set-option -g status-keys vi
setw -g mode-keys vi

setw -g monitor-activity on

# setw -g c0-change-trigger 10
# setw -g c0-change-interval 100

# setw -g c0-change-interval 50
# setw -g c0-change-trigger  75

set-window-option -g automatic-rename on
set-option -g set-titles on
set -g history-limit 100000

#set-window-option -g utf8 on

# set command prefix
set-option -g prefix C-a
unbind-key C-b
bind-key C-a send-prefix

bind h select-pane -L
bind j select-pane -D
bind k select-pane -U
bind l select-pane -R

bind -n M-Left select-pane -L
bind -n M-Right select-pane -R
bind -n M-Up select-pane -U
bind -n M-Down select-pane -D

bind < resize-pane -L 7
bind > resize-pane -R 7
bind - resize-pane -D 7
bind + resize-pane -U 7

bind-key -n M-l next-window
bind-key -n M-h previous-window

set -g status-interval 1
# status bar
set -g status-bg black
set -g status-fg blue

#set -g status-utf8 on
set -g status-justify centre
set -g status-bg default
set -g status-left " #[fg=green]#S@#H #[default]"
set -g status-left-length 20


# mouse support
# for tmux 2.1
# set -g mouse-utf8 on
set -g mouse on

# for previous version
#set -g mode-mouse on
#set -g mouse-resize-pane on
#set -g mouse-select-pane on
#set -g mouse-select-window on


#set -g status-right-length 25
set -g status-right "#[fg=green]%H:%M:%S #[fg=magenta]%a %m-%d #[default]"

# Split the pane into left and right.
# Command: ctrl + a + "
bind '"' split-window -vc "#{pane_current_path}"

# Split the pane into up and down.
# Command: ctrl + a + :
bind ':' split-window -hc "#{pane_current_path}"

bind 'c' new-window -c "#{pane_current_path}"
```

## 2 下载该配置文件

在用户目录运行下面命令，该文件就会下载到本目录

```bash
wget https://raw.githubusercontent.com/anda522/config/main/tmux/.tmux.conf
```

如果配置文件不生效，看下面描述。

## 3 配置文件不生效

在根目录下输入这个回车即可

```bash
tmux source-file ~/.tmux.conf
```
