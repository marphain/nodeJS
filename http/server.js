'use strict';

const http = require("http");
const url = require("url");

const hello = require("../hello");
const World = require("../world");
const router = require("../router")

hello.sayHello();
const world = new World();
world.sayWorld();

//全局变量
console.log("当前执行脚本的名称：" + __filename);
console.log("当前执行脚本的目录：" + __dirname);
const t1 = setTimeout(hello.sayHello, 3000);//3秒后执行sayHello函数,执行一次
const t2 = setInterval(world.sayWorld, 1000);//1秒后执行sayWorld函数,定时任务
clearTimeout(t1);//清除定时任务

http.createServer(function (request, response) {
    let current_url = url.parse(request.url);
    let pathname = current_url.pathname;
    let query_string = current_url.query;
    let href = current_url.href;
    console.log("current pathname: " + pathname);
    console.log("query string: " + query_string);
    console.log("current href: " + href);

    router.route(pathname);

    // 发送 HTTP 头部
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    response.writeHead(200, {'Content-Type': 'text/plain'});

    // 发送响应数据 "Hello World"
    response.end('Hello World\n');
}).listen(8888);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');