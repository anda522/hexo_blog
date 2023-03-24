---
title: Latex语法
top: false
cover: false
toc: true
mathjax: true
tags:
  - 学习总结
  - Latex
categories:
  - 文档编写
abbrlink: 917541138
date: 2023-03-09 17:48:41
password:
summary:
---

# Latex语法

在`begin{document}`和`end{document}`之间的就是正文区，而在这之前的就是导言区。

## 1 宏包导入

```latex
\usepackage{宏包1, 宏包2}
```

## 2 中文支持

无论是在线工具还是本地工具，LaTeX默认都是不支持中文的，因此需要在源代码和配置上稍作修改才可以让LaTeX支持中文，步骤如下：

1. 编译器配置：`XeLaTeX`
2. `tex`文件编码：`utf-8`
3. 代码开头添加

方式一：添加宏包

```latex
% -- coding: UTF-8 --
\documentclass{article} % 在文件类型下面添加宏包
\usepackage[UTF8]{ctex}
```

方式二：设置文档类型

```latex
% -- coding: UTF-8 --
\documentclass[UTF8]{ctexart}
```

## 3 注释

- 单行注释

```latex
% 这是一个注释
```

- 多行注释

  - 方式一（推荐）

    ```latex
    \iffalse
    注释内容
    \fi
    ```

  - 方式二

  使用`\usepackage{verbatim}`宏包

  ```latex
  \begin{comment}
  注释内容
  \end{comment} 
  ```

## 4 转义字符

可以使用`\`来转义一些特殊字符，如`\%`，`\_`



# 排版

## 1 首行缩进

- 缩进

进行缩进若LaTeX默认没有段首缩进，因此要首行缩进需要进行修改。在导言区加入如下代码（距离单位一般为`pt`或`em`，`pt`是绝对单位；`em`是相对单位，表示1个中文字符宽度）

```latex
% 使用indentfirst宏包
\usepackage{indentfirst}
% 设置首行缩进距离
\setlength{\parindent}{2em}
```

- 不进行缩进

1. 方式1（推荐）： 单段取消缩进，放在段首即可。

```latex
\noindent
```

2. 方式2： 全局取消缩进，在想缩进的段落再进行缩进。

放在导言区：

```latex
\setlength{\parindent}{0pt}
```

放在想要缩进的段落：

```latex
\hspace*{2em}段落\\
```

## 2 换行

|     源码     |                             解释                             |
| :----------: | :----------------------------------------------------------: |
|     `\\`     |                    一般在一行的最后一行写                    |
| `\\[offset]` | 换行，并且与下一行的行间距为原来行间距+offset，offset单位一般是`em`或`pt` |

## 3 更换段落

|  源码  |           解释           |
| :----: | :----------------------: |
|   无   | 源代码空一行即可进行换段 |
| `\par` |    一般在一段的最后写    |

## 4 页面更换

`\newpage`进行换页

## 5 纸张设置

```latex
% 设置页面的环境,a4纸张大小，左右上下边距信息
\usepackage[a4paper,left=30mm,right=25mm,top=25mm,bottom=25mm]{geometry}
```

## 6 标题分级

```latex
\section{一级标题}
\subsection{二级标题} 
\subsubsection{二级标题} 
```

## 7 使用模板

## 8 单双栏模式

- 单栏

```latex
\documentclass[onecolumn]{article}
```

- 双栏

```latex
\documentclass[twocolumn]{article}
```

# 显示

## 1 空格

源码：`a \quad b`，显示：`a b`，宽度为1个中文字符宽度

源码：`a \qquad b`，显示：`a  b`，宽度为2个中文字符宽度

源码：`a\ b`，显示：`a b`，宽度为$\frac{1}{3}$个字符宽度

## 2 标题、作者与日期

```latex
\documentclass{article} % article 文档
\usepackage[UTF8]{ctex}  % 使用宏包(为了能够显示汉字)
% 设置页面的环境,a4纸张大小，左右上下边距信息
\usepackage[a4paper,left=30mm,right=25mm,top=25mm,bottom=25mm]{geometry}

\title{行码棋的文章}  % 文章标题
\author{行码棋}   % 作者的名称
\date{\today}       % 当天日期

% 正文开始
\begin{document}

\maketitle          % 添加这一句才能够显示标题等信息

% 正文结束
\end{document}
```

## 3 摘要

在`\maketitle`下添加内容

```latex
\maketitle          %添加这一句才能够显示标题等信息
%摘要开始部分
\begin{abstract}
该部分内容是放置摘要信息的。该部分内容是放置摘要信息的。该部分内容是放置摘要信息的。该部分内容是放置摘要信息的。该部分内容是放置摘要信息的。
\end{abstract}
```

## 4 引用、脚注

- 引用：写在`\begin{quote}`和`\end{quote}`之间

### 4.1 公式引用

需导入`amsmath`宏包，代码为`\usepackage{amsmath}`

公式：

```latex
\begin{equation}
z = x + y
\label{eq1}
\end{equation}
```

公式引用：

引用时只显示数字

```latex
Eq. (\ref{eq1})
% 或导入amsmath宏包，使用如下代码（推荐）：
Eq. \eqref{eq1}
```

### 4.2 图片引用

图片显示：

```latex
\begin{figure}[htbp] % htbp代表图片插入位置的设置
\centering %图片居中
\includegraphics[width=6cm]{1.jpg}
\caption{这是一个图片标题} % 图片标题
\label{pic} % 图片标签
\end{figure}
```

引用：`pic`是图片的label

引用时只显示数字

```latex
\ref{pic}
```

### 4.3 参考文献引用

下面的代码在文中使用，用于标注引用了哪篇文献

```latex
\cite{b1}
\cite{b2}
\cite{b3}
```

下面代码一般在文末使用，会列举自己使用的参考文献

```latex
\begin{thebibliography}{00}
\bibitem{b1} Ben-Othman J, Yahya B. Energy efficient and QoS based routing protocol for wireless sensor networks. J Parallel Distrib Comput 2010;2010(70):849–57.
\bibitem{b2} Younis M, Youssef M, Arisha K. Energy-aware routing in cluster-based sensor networks. In: Proceedings of the IEEE 20th international symposium on modeling, analysis and simulation of computer and telecommunication systems; 2012. p. 0129. https://doi.org/10.1109/MASCOT.2002.1167069.
\bibitem{b3} Al-Karaki JN, Kamal AE. Routing techniques in wireless sensor networks: a survey. IEEE J Wirel Commun 2004;11(6):6–28. 2004.
\end{thebibliography}
```

### 4.4 脚注

脚注：在需要添加脚注的文字后添加`\footnote{脚注内容}`即可，会自动标序号，并将`脚注内容`填上去

## 5 目录

在`\begin{document}`内容中添加：`\tableofcontents`

```latex
% 生成目录设置
\renewcommand{\contentsname}{目录} %将content转为目录,生成目录二字
\tableofcontents
```

## 6 字体、大小与颜色

- 字体

使用`{\字体 内容}`（推荐此种），也可使用`\字体 {内容}`

示例：

```latex
{\songti 宋体}
{\heiti 黑体}
{\fangsong 仿宋}
{\kaishu 楷书}

{\bf 粗体}
{\it 斜体}
{\sl 斜体}

\textbf{粗体}
\textit{斜体}
\textsl{斜体}
```

- 大小

```latex
{\tiny Hello} \\
{\scriptsize Hello} \\
{\footnotesize Hello} \\
{\small Hello} \\
{\normalsize Hello} \\
{\large Hello} \\
```

- 颜色

需要导入宏包`\usepackage{xcolor}`

```latex
\documentclass{article}
\usepackage[UTF8]{ctex}
\usepackage{color,xcolor}

\setlength{\parindent}{0pt}

% 预先定义好的颜色： red, green, blue, white, black, yellow, gray, darkgray, lightgray, brown, cyan, lime, magenta, olive, orange, pink, purple, teal, violet.

% 定义颜色的5种方式
\definecolor{light-gray}{gray}{0.95}    % 1.灰度
\definecolor{orange}{rgb}{1,0.5,0}      % 2.rgb
\definecolor{orange}{RGB}{255,127,0}    % 3.RGB
\definecolor{orange}{HTML}{FF7F00}      % 4.HTML
\definecolor{orange}{cmyk}{0,0.5,1,0}   % 5.cmyk

\begin{document}

% \pagecolor{yellow}          %设置背景色为黄色

% 使用颜色的常用方式
\textcolor{green}{绿色} % textcolor+颜色
\color{orange}{橙色} % color+颜色
\textcolor[rgb]{0,1,0}{绿色} % textcolor+rgb
\color[rgb]{1,0,0}{红色} % color+rgb

% 使用底色
\colorbox{red}{\color{black}红底黑字}
\fcolorbox{red}{green}{红框绿底} % 框色+背景色

\end{document} 
```

## 7 链接

导入宏包：`\usepackage{url}`
插入超链接：`\url{www.baidu.com}`

## 8 图片

需要导入宏包：`\usepackage{graphicx}`

- 单张图片

```latex
%开始插入图片
\begin{figure}[htbp] % htbp代表图片插入位置的设置
\centering %图片居中
%添加图片；[]中为可选参数，可以设置图片的宽高；{}中为图片的相对位置
\includegraphics[width=6cm]{image.jpg}
\caption{这是一个图片标题} % 图片标题
\label{pic1} % 图片标签
\end{figure}
```

> `[htbp]`是可选参数，允许用户指定图片、表格等元素被放置的位置。这一可选参数项可以是下列字母的任意组合。
>
> `h(here)`: 当前位置；将图形放置在 正文文本中给出该图形环境的地方。如果本页所剩的页面不够， 这一参数将不起作用。
>
> `t(top)`: 顶部；将图形放置在页面的顶部。
>
> `b(bottom)`: 底部；将图形放置在页面的底部。
>
> `p(page)`: 浮动页；将图形放置在一只允许有浮动对象的页面上。
>
> 注：
>
> - 如果在图形环境中没有给出上述任一参数，则缺省为`[tbp]`
> - 给出参数的顺序不会影响到最后的结果。因为在考虑这些参数时LaTeX总是尝试以`h-t-b-p` 的顺序来确定图形的位置。所以`[hb]`和`[bh]`都以`h-b`的顺序来排版
> - 给出的参数越多，LaTeX的排版结果就会越好。`[htbp]`， `[tbp]`， `[htp]`， `[tp]` 这些组合得到的效果不错，`[h]`也是常用的选择。

- 并排插入多张图片

```latex
\begin{figure}
\centering
{\includegraphics[width=2.5cm]{1.jpg}}
\hspace{10pt}    %每张图片水平距离
{\includegraphics[width=2.5cm]{1.jpg}}
\hspace{10pt}
{\includegraphics[width=2.5cm]{1.jpg}}
\hspace{10pt}
{\includegraphics[width=2.5cm]{1.jpg}}
\hspace{10pt}
\caption{并排插入4张图片} %图片标题
\end{figure}
```

- 竖排插入多张图片

## 9 表格

在线生成Latex表格：https://www.tablesgenerator.com/

## 10 数学公式

公式编写类似Katex，不再详细讲述，文档请参考： https://katex.org/docs/supported.html

- 公式自动编号

使用`\begin{equation}`和`\end{equation}`进行公式输入，要同时使用，且编号不能够修改。

```latex
\begin{equation}
a^2+b^2=c^2
\end{equation}
```



- 公式手动编号

```latex
\begin{equation}
a^2 + b^2 = c^2
\tag{2}
\end{equation}
```

## 11 代码

- 算法伪代码

需要使用`\usepackage{algorithm}`和`\usepackage{algorithmic}`宏包，`if`、`for`等关键字要按照规范书写，如`\IF \ENDIF`。

```latex
\documentclass{article}
\usepackage[UTF8]{ctex}
\usepackage{algorithm} % 排版算法
\usepackage{algorithmic} % 排版算法

\title{Algorithm}
\author{NSJim Green}
\date{October 2020}

\begin{document}

\maketitle

\section{Algorithm 1}

\begin{algorithm}
\caption{CheckSum(A,x)} %算法标题
\label{alg2} %标签
\begin{algorithmic} %算法开始
\STATE {\bf Input:} An array A and a value x  %也可以用\textbf{Input:}
\STATE {\bf Output:} A bool value show if there is two elements in A whose sum is x
\STATE A $\gets$ SORT(A)
\STATE n $\gets$ length(n)
\FOR{i $\gets$ 0 to n}
    \IF{Binary-search(A,x-A[i],1,n)}
    \STATE return true
    \ENDIF
\ENDFOR
\STATE return false
\end{algorithmic}
\end{algorithm}

\end{document}
```

- 代码块

使用`\usepackage{listings}`宏包，并使用`\lstset{}`进行基础设置，然后使用`\begin{lstlisting}[language=xxx]`和`\end{lstlisting}`插入代码块。

基础设置包括行号，不显示字符串空格，代码块边框，不包含颜色等设置，要设置颜色和字体请见下文的高级用法。

进行代码基础设置：（写在导言区）

```latex
% 代码块基础设置
\lstset{
breaklines, % 代码自动换行
numbers=left,  	% 在左侧显示行号
showstringspaces=false,  % 不显示字符串中的空格
frame=single,  	% 设置代码块边框
}
```

其他代码设置：

```latex
% 代码块高级设置
\lstset{
% basicstyle=\footnotesize,                 % 设置整体的字体大小
showstringspaces=false,                     % 不显示字符串中的空格
frame=single,                               % 设置代码块边框
numbers=left,                               % 在左侧显示行号
% numberstyle=\footnotesize\color{gray},    % 设置行号格式
numberstyle=\color{darkgray},               % 设置行号格式
backgroundcolor=\color{white},              % 设置背景颜色
keywordstyle=\color{blue},                  % 设置关键字颜色
commentstyle=\it\color[RGB]{0,100,0},       % 设置代码注释的格式
stringstyle=\sl\color{red},                 % 设置字符串格式
}
```

书写代码：（写在正文区）

```latex
\begin{lstlisting}[language=c]
#include <stdio.h>

// main function
int main() {
    printf("Hello World!");
    return 0;
}
\end{lstlisting}
```



