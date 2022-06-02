/**
 * 创建数据库连接， 连接客户端
 */
const pg = require('pg');
//tcp://用户名：密码@localhost/数据库名
const client = new pg.Client('tcp://postgres:123456@localhost:5432/students')
client.connect((err, res) => {
    if(err){
        console.log(`clientConnectionReady Error:${err.message}`);
        client.end();
        return;        
    }
    console.log('connection success!')
})
exports.client = client;