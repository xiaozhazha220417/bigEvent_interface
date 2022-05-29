// 导入 mysql 模块
const mysql = require('mysql')
const { regUser } = require('../router_handler/user')

// 创建数据库连接对象
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'my_db_01',
})

// 共享模块
module.exports = db
