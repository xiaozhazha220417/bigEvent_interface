// 导入数据库模块
const db = require('../db/index')
const bcrypt = require('bcryptjs')

// 查询用户基本信息的处理函数
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

// 更新用户基本信息的处理函数
module.exports.updateUserInfo = (req, res) => {
    const sql = `update ev_users set ? where id =?`
    // console.log(req.user.id); //2
    // console.log(req.user); // 报错 字段列表中的“iat”列未知 因为user 里面有token
    db.query(sql, [req.body, req.body.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('修改用户基本信息失败')
        console.log(results)
        return res.cc('修改用户基本信息成功', 0)
    })
}

// 重置密码的处理函数
module.exports.updatePassword = (req, res) => {
    // 定义 根据 id 查询用户数据的 sql 语句
    // console.log(req.user.id);
    const sql = `select * from ev_users where id =?`
    db.query(sql, [req.user.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('用户不存在')
        // todo: 判断提交的旧密码是否正确
        // console.log(results) // 数据库里面的数据,密码是加密后的数据
        // 判断提交的旧密码是否正确
        const compareResult = bcrypt.compareSync(
            req.body.oldPwd,
            results[0].password
        )
        if (!compareResult) return res.cc('原密码错误')

        // 对新密码进行加密
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        // 把加密后的新密码更新到数据库中
        // 定义sql语句
        const sql = `update ev_users set password = ? where id = ?`
        db.query(sql, [newPwd, req.user.id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新密码失败')
            return res.cc('更新密码成功', 0)
        })
    })
}

// 重置用户头像
module.exports.updateAvatar = (req, res) => {
    // 定义更新用户头像的sql
    const sql = `update ev_users set user_pic = ? where id = ?`
    // console.log(req.body.id) // undefined
    db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('更新头像失败')
        return res.cc('更新头像成功', 0)
    })
}
