{
    // 程序的根路径
    "appDir" : "./",
    // 脚本的根路径
    // 相对于程序的根路径
    "baseUrl" : ".",

    // 打包输出到的路径
    "dir" : "./asset",
    // 需要打包合并的js模块，数组形式，可以有多个
    // name 以 baseUrl 为相对路径，无需写 .js 后缀
    // 比如 main 依赖 a 和 b，a 又依赖 c，则 {name: 'main'} 会把 c.js a.js b.js main.js 合并成一个 main.js
    "modules" : [
            {name: 'main'}
    ],
    // 通过正则以文件名排除文件/文件夹
    // 比如当前的正则表示排除 .svn、.git 这类的隐藏文件
    "fileExclusionRegExp" : /^\.|frozenui-1.3.0/,
    "paths" : {                    //如果某个前缀的依赖不是按照baseUrl拼接这么简单，就需要在这里指出
        "a" : "a.js",
        "b" : "b.js"
    }
}