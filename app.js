// * 1.1 创建项目服务器-开始
const express = require('express')
const app = express()

// * 1.2 配置跨域请求-开始
const cors = require('cors')
app.use(cors())
// * 1.2 配置跨域请求-结束

// * 1.3 配置解析表单数据的中间件 - 开始
app.use(express.urlencoded({ extended: false }))
// * 1.3 配置解析表单数据的中间件 - 结束

// * 1.4 初始化路由相关的文件夹 - 开始
// router 文件夹用来存放所有路由模块，里面的文件只存放客户端请求与处理函数之间的映射关系
// router_handler 文件夹用来存放所有的 路由处理函数模块，里面的文件专门负责每个路由对应的处理函数
// * 1.4 初始化路由相关的文件夹 - 结束

app.listen(3007, () => {
    console.log('api server running at http://127.0.0.1:3007')
})
// * 1.1 创建项目服务器-结束
