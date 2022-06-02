//引入express
const express = require('express');
const app = express();
const config = require('./config/config');
const routes = require('./routes/routes');
const pg = require('./lib/pg');

//CORS跨域设置
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("X-Powered-By", '3.2.1');
    if (req.method == "OPTIONS") res.send(200);
    else next();
});

//开启端口8088,端口号等配置集中放置到config文件中,也可以直接将8088替换掉config.port
app.listen(config.port,()=>{
    console.log(config.port,process.pid);
    console.log("server online");
})

//查询学生信息
app.get('/getStudents', routes.getStudents);
//增加学生信息
app.post('/addStudent', routes.addStudent);
//删除学生信息
app.delete('/deleteStudent', routes.deleteStudent);
//更新学生信息
app.post('/updateStudent', routes.updateStudent);

//为防止接口调用错误导致的崩溃，设置全局错误捕获
process.on('uncaughtException', function (err) {
    console.log('Caught Exception:' + err);//直接捕获method()未定义函数，Node进程未被退出。
});