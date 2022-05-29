// * 1.6 步骤一：在 /router_handler/user.js 中，使用 module.exports 对象，向外共享两个路由处理函数
/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */
// * 2.3.2.1 导入 数据库操作模块
const db = require('../db/index')
// * 2.3.3.2 导入 密码加密模块
const bcrypt = require('bcryptjs')
// * 2.6.4.3 导入 生成token模块
const jwt = require('jsonwebtoken')
// * 2.6.4.5 导入 token秘钥模块
const config = require('../config')

// 注册用户的处理函数
module.exports.regUser = (req, res) => {
    // * 2.3.1 检测表单数据是否合法 - 开始
    // 接收表单数据
    const userinfo = req.body
    // 判断数据是否合法
    if (!userinfo.username || !userinfo.password) {
        return res.send({
            status: 1,
            message: '用户名或密码不能为空',
        })
    }
    // * 2.3.1 检测表单数据是否合法 - 结束

    // * 2.3.2 检测用户名是否被占用 - 开始
    // * 2.3.2.2 定义 sql 语句
    const sql = `select * from ev_users where username = ?`
    // * 2.3.2.3 执行 SQL 语句并根据结果判断用户名是否被占用
    db.query(sql, [userinfo.username], (err, results) => {
        // 执行 sql 语句失败
        // if (err)
        //     return res.send({
        //         status: 1,
        //         message: err.message,
        //     })
        if (err) return res.cc(err)
        // 用户名被占用
        // if (results.length > 0)
        //     return res.send({
        //         status: 1,
        //         message: '用户名被占用，请更换其他用户名',
        //     })
        if (results.length > 0) return res.cc('用户名被占用，请更换其他用户名')
        // * 2.3.3 对密码进行加密处理 - 开始
        // * 2.3.3.1 安装密码加密包 npm i bcryptjs@2.4.3
        // * 2.3.3.3 对用户的密码进行加密处理
        // 对用户的密码，进行 bcrypt 加密 ，返回值是加密之后的密码字符串
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        // * 2.3.3 对密码进行加密处理 - 结束

        // * 2.3.4 插入新用户 - 开始
        // 定义sql语句
        const sql = `insert into ev_users set ?`
        // 执行sql语句，向数据库插入新用户
        db.query(
            sql,
            { username: userinfo.username, password: userinfo.password },
            (err, results) => {
                // 执行sql语句失败
                if (err) return res.cc(err)
                // 执行sql语句成功，未改变数据库的数据
                if (results.affectedRows !== 1)
                    return res.cc('注册用户失败，请稍后再试！')
                // 注册成功
                // res.send({ status: 0, message: '注册成功' })
                res.cc('注册成功', 0)
            }
        )
        // * 2.3.4 插入新用户 - 结束
    })
    // * 2.3.2 检测用户名是否被占用 - 结束
}

// 登录的处理函数
module.exports.login = (req, res) => {
    // 1、接收表单数据
    const userinfo = req.body
    // 2、定义sql语句
    const sql = `select * from ev_users where username = ?`
    // 3、执行sql语句，查询用户数据
    db.query(sql, [userinfo.username], (err, results) => {
        // 执行sql语句失败
        if (err) return res.cc(err)
        // 执行 sql 语句成功，但是查询不到数据的条数
        if (results.length !== 1) return res.cc('登陆失败')

        // todo:判断用户输入的登录密码是否和数据库中的密码一致
        // console.log(results)
        // * 2.6.3 判断用户输入的密码是否正确
        // 拿着用户输入的密码,和数据库中存储的密码进行对比
        const compareResult = bcrypt.compareSync(
            userinfo.password,
            results[0].password
        )
        // console.log(compareResult)
        // 如果对比结果等于false,则证明用户输入的密码错误
        if (!compareResult) return res.cc('登录失败')

        // todo:登录成功，生成token，生成token前，要去除 密码和头像的值
        // * 2.6.4 生成 JWT 的 Token 字符串
        // 安全考虑，需要把密码和头像 去除后 在生成 token
        // ...results[0],就是浅拷贝对象，后面再加上的属性，表示覆盖扩展运算符弄出来password属性和user_pic属性
        const user = { ...results[0], password: '', user_pic: '' }
        // console.log(user);
        // 生成 token 字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            // token 有效期为10小时
            expiresIn: config.expiresIn,
        })
        // * 2.6.4.6 将生成的token字符串响应给客户端
        res.send({
            status: 0,
            message: '登录成功',
            token: 'Bearer ' + tokenStr,
        })
    })
}
