## Webstorm使用bower包管理遇到git不是命令的问题 ##

<span style='font-size:14px;'>
即使安装了`git`(注意是 git, 不是github for windows)Webstorm在使用`bower`的时候也出现`git`不是命令的错误
</span>

<span style='font-size:14px;'>
原因很简单, 因为`git`不是全局的命令, 也就是说你打开 命令行, 敲`git`会提示你不是内部命令

<span style='font-size:12px;'>
解决方法 :
>计算机 -> 属性 -> 高级系统设置 -> 环境变量 -> 用户变量 -> PATH -> 
->编辑,在尾部加入git.exe的目录, 以 `;` 分割 (一般git目录都是 C:\Program Files (x86)\Git\cmd, 不同操作系统可能不同, 最好看一下)

<span style='font-size:14px;'>
PPS : 其实这个不只是适用于 `bower`, 只要是用到`git`的应用或扩展, 但是git不是全局命令的情况下, 都会报错.

