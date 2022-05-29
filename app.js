// * 1.1 创建项目服务器-开始
// 步骤一：新建 api_server 文件夹作为项目根目录，运行 npm init -y 初始化 包管理配置文件
// 步骤二：安装 4.17.1 的express的包
// 步骤三：在项目根目录中新建 app.js 作为整个项目的入口文件，初始化服务器
const express = require('express')
const app = express()

// * 1.2 配置跨域请求-开始
// 步骤一：安装 2.8.5的cors的包
// 步骤二：在 app.js 中导入并配置 cors 中间件
const cors = require('cors')
app.use(cors())
// * 1.2 配置跨域请求-结束

// * 1.3 配置解析表单数据的中间件 - 开始
app.use(express.urlencoded({ extended: false }))
// * 1.3 配置解析表单数据的中间件 - 结束

// * 1.4 初始化路由相关的文件夹 - 开始
// 步骤一：router 文件夹用来存放所有路由模块，里面的文件只存放客户端请求与处理函数之间的映射关系
// 步骤二：router_handler 文件夹用来存放所有的 路由处理函数模块，里面的文件专门负责每个路由对应的处理函数
// * 1.4 初始化路由相关的文件夹 - 结束

// * 1.5 初始化用户路由模块 - 开始
// 步骤一：在 /router/user.js 中操作
// 步骤二：导入并注册用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)
// * 1.5 初始化用户路由模块 - 结束

// * 1.6 抽离用户路由模块中的处理函数 - 开始
// 步骤一和步骤二：操作步骤在 router_handler/user.js 和 router/user.js 文件下
// * 1.6 抽离用户路由模块中的处理函数 - 结束

// * 2.1 新建ev_suers表，操作数据库 - 开始
// * 2.1 新建ev_suers表，操作数据库 - 结束

// * 2.2 安装并配置mysql模块 - 开始
// 步骤一：安装mysql模块
// 步骤二：新建 /db/index.js 文件，在文件中创建数据库的链接对象
// * 2.2 安装并配置mysql模块 - 结束

app.listen(3007, () => {
    console.log('api server running at http://127.0.0.1:3007')
})
// * 1.1 创建项目服务器-结束
