// * 1.5 步骤一
const express = require('express')
// 创建路由对象
const router = express.Router()

// * 1.6 步骤二 - 开始
const userHandler = require('../router_handler/user')

// 注册新用户的 路由
router.post('/register', userHandler.regUser)

// 登录的 路由
router.post('/login', userHandler.login)
// * 1.6 步骤二 - 结束
// 共享路由
module.exports = router
