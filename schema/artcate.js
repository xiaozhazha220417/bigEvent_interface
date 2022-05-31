const joi = require('joi')

// todo:定义文章分类的校验规则并导出使用
// alias 分类别名
const name = joi.string().required()
const alias = joi.string().alphanum().required()

// todo:验证表单数据,并导出使用
const id = joi.number().integer().min(1).required()

module.exports.add_cate_schem = {
    body: {
        name,
        alias,
    },
}

module.exports.delete_cate_schema = {
    params: { id },
}

module.exports.get_cate_schema = {
    params: { id },
}

module.exports.update_cate_schema = {
    body: {
        id,
        name,
        alias,
    },
}
