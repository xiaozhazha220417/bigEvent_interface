const express = require('express')
const router = express.Router()
const userinfoRouter = require('../router_handler/userinfo')

// 获取用户的基本信息
router.get('/userinfo', userinfoRouter.userInfo)

module.exports = router
