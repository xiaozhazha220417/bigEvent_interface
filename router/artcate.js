const express = require('express')
const { required } = require('joi')
const router = express.Router()

const artcate_handle = require('../router_handler/artcate')

const expressJoi = require('@escook/express-joi')
const {
    add_cate_schem,
    delete_cate_schema,
    get_cate_schema,
} = require('../schema/artcate')

// 获取文章分类列表路由模块
router.get('/cates', artcate_handle.getArticleCates)

// 新增文章分类路由
router.post(
    '/addcates',
    expressJoi(add_cate_schem),
    artcate_handle.addArticleCates
)

// 根据id删除文章分类
router.get(
    '/deletecate/:id',
    expressJoi(delete_cate_schema),
    artcate_handle.deleteCateById
)

// 根据 Id 获取文章分类数据
router.get(
    '/cates/:id',
    expressJoi(get_cate_schema),
    artcate_handle.getArticleById
)

// 根据 Id 更新文章分类数据
router.post(
    '/updatecate',
    expressJoi(update_cate_schema),
    artcate_handle.updateCateById
)

module.exports = router
