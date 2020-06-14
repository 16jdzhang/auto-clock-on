# 汕头大学自动健康打卡

因为众所周知的原因，无作为的官僚又想到了新的恶心人的方法。所谓“上有政策，下有对策”，为了对抗这种无休止的“每日健康打卡”，开发了这个项目。

## 原理

使用puppeteer，类似于爬虫的方式，让程序帮我们打卡。

使用node-windows，注册为服务，使得能开机启动，使得程序定时帮我们打卡。

## 安装

首先你要安装node.js，如果你需要启动服务的话需要是windows平台。

使用方法，下载这个项目，解压缩。

命令行进入解压后的文件夹

``` shell
npm install
```

修改项目里面的 user.config.js 文件，输入你的校园网账号密码，如果不正确填写将无法正确运行。

``` javascript
module.exports = {
    username: '你的账号',
    password: '你的密码',
}
```

## 设置开机启动的自动打卡服务

``` shell
npm run service
```

只要运行一次这个命令，以后你每天开电脑都会帮你自动打卡，一天打一次，不用再管它。

除非你有一天关了电脑一整天

祝大家过上轻松的生活。

## 只打卡一次

``` shell
npm run clockon
```

这个命令会帮你打一次卡，不管今天打过卡没有。

## 待机打卡

如果你启动自动打卡服务有问题，你可能需要这个功能

``` shell
npm run test
```

运行这个命令后，会启动服务程序，只要不关机，它就会一天打一次卡，但是关机后无法自己启动。

## 查看打卡情况

如果打卡成功会自动把结果以pdf格式输出到项目的pdf文件夹，文件名为标出打卡时间。

程序运行后会生成program.log，可以查看。

## 联系方式

16jdzhang@stu.edu.cn

项目可能会有bug，请谅解
