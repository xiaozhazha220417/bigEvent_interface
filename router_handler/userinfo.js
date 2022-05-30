// 导入数据库模块
const db = require('../db/index')

module.exports.userInfo = (req, res) => {
    // 定义 sql 语句
    const sql = `select id,username,nickname,email,user_pic from ev_users where id = ?`
    // 注意：req 对象上的 user 属性,是token解析成功，express-jwt 中间件 帮我们挂载上去的
    // console.log(req.user.id) // 2
    db.query(sql, req.user.id, (err, results) => {
        // sql 语句执行失败
        if (err) return res.cc(err)
        // sql语句执行成功，但是查询到的数据条数不等于1 表示没有数据
        if (results.length !== 1) return res.cc('获取用户信息失败')
        // todo：查询成功，将用户信息返回回去
        res.send({
            status: 0,
            message: '获取用户基本信息成功',
            // 把查询到的数据响应回去
            data: results[0],
        })
    })
}
