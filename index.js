#!/usr/bin/env node
var program = require('commander');
var download = require('download-git-repo')
var handlebars = require('handlebars')
var inquirer = require('inquirer')
var ora = require('ora')
var chalk = require('chalk')
var logSymbols = require('log-symbols')
var fs = require('fs')

// 定义模板信息
const templates  ={
    'tpl-a':{
        url:'https://gitee.com/lvxiaowu/tpl-a.git', // 仓库地址
        downloadUrl:'https://gitee.com:lvxiaowu/tpl-a#master',// 下载地址，按download-git-repo文档来
        description:'a模板' // 模板名称
    },
    'tpl-b':{
        // url:'https://github.com/lvxiaowu/tpl-b.git',
        // downloadUrl:'https://github.com:lvxiaowu/tpl-b#master',
        url:'https://gitee.com/lvxiaowu/tpl-b.git', 
        downloadUrl:'https://gitee.com:lvxiaowu/tpl-b#master',
        description:'b模板'
    }
}


// 命令交互commander
program
  .version('0.0.1')
  .option('-C, --chdir <path>', 'change the working directory')
  .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
  .option('-T, --no-tests', 'ignore test hook');

program
  .command('init <template-name> <project-name>')
  .description('初始化项目')
  .action(function(templateName, projectName){
      // 根据模板名，下载到本地，并以projectName 命名
    //将git包下载到本地 npm包 download-git-repo
    //仓库地址 下载路径
    const spinner = ora('正在下载模板...')
    spinner.start()
    const { downloadUrl } = templates[templateName]
    download(downloadUrl,projectName,{clone:true},(err)=>{
        if(err){
            spinner.fail()
            console.log(logSymbols.error,chalk.red(err))
            return
        }
        spinner.succeed()
      
        // 获取用户输入的值
        inquirer.prompt([{
          type:'input',
          name:'name',
          message:'请输入项目名称'
        },
        {
          type:'input',
          name:'description',
          message:'请输入项目简介'
        },
        {
          type:'input',
          name:'author',
          message:'请输入作者名称'
        }

        ]).then((answers) => {
          // answers：{ name: 'xx', description: 'xx', author: 'xx' }
          // 需要更新默认值的package.json文件的路径
          const packagePath = `${projectName}/package.json`
          // 把项目的package.json文件读取出来
          const packageContent = fs.readFileSync(packagePath,'utf8')
          // 使用模板引擎把用户输入的数据写入package.json
          const packageResult = handlebars.compile(packageContent)(answers)
          // 重新写入package.json文件
          fs.writeFileSync(packagePath,packageResult)
          // 初始化成功
          console.log(logSymbols.success,chalk.yellow('初始化模板成功！'))
        })
    })
  });

  program
  .command('list')
  .description('查看所有可用模板')
  .action(function(){
    for(let key in templates){
        console.log('★',chalk.bold.blue(`${key}`) , ` - ${templates[key].description}`)
    }
  });



program.parse(process.argv);