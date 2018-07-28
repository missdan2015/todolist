//网易云教程：node.js入门和实践
//1.什么是node以及相关资源，cnode社区，命令行也而已用tab自动补全
//2.node安装，（下一步下一步的傻瓜式安装和用命令行安装），不同的安装方式对环境变量的影响
//3.文件的读写，路径和文件名最好不要有中文或者空格
//4.基本的 http服务
//5.根据不同路径，处理不同响应
//6.

// //node测试
// var foo = 'sdf';
// function f() {
//     console.log(foo);
// }
// console.log(foo);
// f();
//**************************
//node写文件
var fs = require('fs');
// fs.writeFile('./data/w.txt','hello',function(err){
//     if(err){
//         return console.log('写入文件失败');
//     }
//     console.log('写入文件成功');
// });
//node读文件,读取的是二进制文件，但是是用十六进制显示的，所以使用字符串转换成自己可以识别的字符
// fs.readFile('./data/w.txt',function(err,data){
//     if(err){
//         throw err;
//     }
//     console.log(data);
//     console.log(data.toString('utf8'));//或者直接在输入参数的地方加上一个字符解析编码
// });
//**************************************************

//http创建
//1.服务器做的事情：接受请求，处理请求，发送响应
//2.事件编程思维，怎么监听事件呢:通过server实例添加request请求事件，该事件是所有请求的入口
//3.绑定端口号，开启服务器
//4.可在终端运行改js文件，也可以安装terminal插件
var http = require('http');
var server = http.createServer();//通过http模块创建一个server实例
var handRequest =function(req,res){
    console.log('当前的请求路径是：'+req.url);
    res.write('hello');
    res.write('world');//可以多次发送响应数据
    //发送数据完，主动结束响应
    res.end();
};
server.on('request',handRequest);
//运行完之后去127.0.0.1:8080看看（协议，域名，端口号之后的都是路径。。后面还会有一些查询字符串)
//ip地址是定位计算机（网卡），端口号就是定位一个具体的应用程序(比如服务器就是运行在一个计算机上的程序）
server.listen(8080,function(){
    console.log('server is running at 8080');
});
