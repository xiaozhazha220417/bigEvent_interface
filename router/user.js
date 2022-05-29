// * 1.5 在 router 文件夹中，新建 user.js 文件，作为用户的路由模块，初始化 登录注册 路由
const express = require('express')
// 创建路由对象
const router = express.Router()

// * 1.6 步骤二 - 开始
// 导入用户路由处理函数模块
const userHandler = require('../router_handler/user')

// * 2.5.4.1 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// * 2.5.4.2 导入需要验证的规则对象
const { reg_login_schema } = require('../schema/user')

// 注册新用户的 路由
// 在注册新用户的路由中，声明局部中间件，对当前请求中携带的数据进行验证
// 数据验证通过后，会把这次请求流转给后面的路由处理函数
// 数据验证失败后，终止后续代码的执行，并抛出一个全局的 Error 错误，进入全局错误级别中间件中进行处理
router.post('/register', expressJoi(reg_login_schema), userHandler.regUser)

// 登录的 路由
// * 2.6.1 检测表单数据是否合法
router.post('/login', expressJoi(reg_login_schema), userHandler.login)
// * 1.6 步骤二 - 结束
// 共享路由
module.exports = router
