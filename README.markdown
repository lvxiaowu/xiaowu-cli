
### 脚手架

> 是一个命令行工具，安装对应的命令，通过这些命令执行一些操作，得到一些结果，帮我们快速地完成一些事情。

### 常用的脚手架工具
* vue-cli
* create-react-app
* webpack 
* gulp 
* grunt

### 为何要使用
1. 减少重复性的工作，不在需要复制其他项目和删除无关的代码，或者从零开始创建一个项目
2. 根据互动情节动态生成项目结构和配置文件
3. 多人协作更加方便，不需要文件传来传去


> 以vue-cli 脚手架使用举例

```
npm install -g vue-cli
npm install -g cnpm --registry=https://registry.npm.taobao.org
vue -V|--version  
vue list
vue init <template-name> <project-name>
```

***
### 如何开发定制自己的一个脚手架呢？

#### 思路
1. 本地开发好，项目模板上传到远程git仓库，脚手架命令发布到npm官网
2. 用户通过npm安装脚手架命令，根据命令行提示导向，从远程git仓库拉去对于的模板


### 开始
1. 获取命令行参数
    * 原生方法：node index.js aa， 通过process.argv拿到数组，再处理
    * 借助第三方库： <a href="https://github.com/tj/commander.js" target="_blank">commander</a>
    > 
2. 命令映射
    * 常规：node index.js执行脚本
    * 使用npm link映射，在package.json文件bin字段增加命令,如下，就可以使用lv命令了
        * #!/usr/bin/env node  使用node开发命令行工具所执行的js脚本，必须在顶部加入该行代码
        ``` 
        {
            ...,
            "bin": {
                "lv": "./index.js"
            }
        }
3. 辣么自己撸一个xiaowu-cli吧
    * git仓库新建两个模板项目
        * <a href="https://github.com/lvxiaowu/tpl-a.git" target="_blank">tpl-a</a>
        * <a href="https://github.com/lvxiaowu/tpl-b.git" target="_blank">tpl-b</a>
        * 注意：package.json文件有几个值是变量
    * 命令行参数设计
        * xiaowu --help 
        * xiaowu -V|version
        * xiaowu list
        * xiaowu init <template-name> <project-name>
    * 命令行交互 
        * <a href="https://github.com/SBoudrias/Inquirer.js" target="_blank">inquirer</a>提示用户进行输入的对话框，类似与window.prompt()
    * 视觉美化
        * <a href="https://github.com/sindresorhus/ora" target="_blank">ora</a>命令面板交互效果，相当于loading效果
        * <a href="https://github.com/chalk/chalk" target="_blank">chalk</a>改变输入文字样式
        target="_blank">chalk</a>改变输入文字样式
        * <a href="https://github.com/sindresorhus/log-symbols" target="_blank">log-symbols</a>各种日志级别的彩色的符号
    * 下载用户模板到本地
         * <a href="https://github.com/flipxfx/download-git-repo" target="_blank">download-git-repo</a> 是用来clone远程仓库代码到本地的包
    * 根据用户输入，更新package.json信息（如项目名，作 者，项目描述）
        * <a href="https://github.com/wycats/handlebars.js" target="_blank">handlebars</a>  模板处理 
        * Node.js的fs模块,进行读写操作
    * npm发布（关键几步）
        * npm官网检索下你的package.json文件的name包名是否有重名
        * 登录npm账户
            ```
            npm login
            ``` 
        * 发布(项目根目录)
            ```
            npm publish
            ``` 
    * 如何使用
        ```
            npm i -g lvxiaowu-cli
            lv list
            lv init tpl-a abc
        ``` 









