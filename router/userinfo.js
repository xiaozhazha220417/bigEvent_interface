const express = require('express')
const router = express.Router()
// 导入用户路由处理函数模块
const userinfoRouter = require('../router_handler/userinfo')
// 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入需要验证的规则对象
const {
    update_userinfo_schema,
    update_password_schema,
    update_avatar_schema,
} = require('../schema/user')

// 获取用户的基本信息
router.get('/userinfo', userinfoRouter.userInfo)

// 更新用户的基本信息
router.post(
    '/userinfo',
    expressJoi(update_userinfo_schema),
    userinfoRouter.updateUserInfo
)

// 重置密码
router.post(
    '/updatepwd',
    expressJoi(update_password_schema),
    userinfoRouter.updatePassword
)

// 更新用户头像
router.post(
    '/update/avatar',
    expressJoi(update_avatar_schema),
    userinfoRouter.updateAvatar
)

module.exports = router
