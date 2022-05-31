// * 2.5.3 新建 /schema/user.js 模块，用户信息验证规则
const joi = require('joi')

/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 * integer() 整数
 * email() 邮箱的验证规则
 */

// todo：登录和注册的表单校验规则
// 用户名的验证规则
const username = joi.string().alphanum().min(1).max(10).required()
// 密码的验证规则
const password = joi
    .string()
    .pattern(/^[\S]{6,12}$/)
    .required()

// todo：用户更新信息的表单校验规则
// 因为用户更新信息的表单会提交 id,username,nickname,email 这四个数据，需要校验这四个数据
// 又因为 username 是不可修改的，所以只要校验 id,nickname,email
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()

// todo:用户重置密码的表单校验规则
// 校验用户的旧密码和新密码
// 解读 joi.not(joi.ref("oldPwd")).concat(password)
// 1、joi.ref("oldPwd") 表示 newPwd 的值必须和 oldPwd 的值保持一致
// 2、joi.not(joi.ref("oldPwd")) 表示 newPwd 的值不能等于 oldPwd 的值
// 3、concat(password) 用于合并 joi.not(joi.ref("oldPwd")) 和 password 这两条验证规则
const oldPwd = password
const newPwd = joi.not(joi.ref('oldPwd')).concat(password)

// todo:定义用户头像图片格式的验证规则
const avatar = joi.string().dataUri().required()

// 注册和登录表单的验证规则对象
module.exports.reg_login_schema = {
    // 表示需要对 req.body 中的数据进行验证
    body: {
        username,
        password,
    },
}

// 跟新用户基本信息的验证规则对象
module.exports.update_userinfo_schema = {
    body: {
        id,
        nickname,
        email,
    },
}

// 重置密码的验证规则对象
module.exports.update_password_schema = {
    body: {
        oldPwd,
        newPwd,
    },
}

// 更新用户头像
module.exports.update_avatar_schema = {
    body: {
        avatar,
    },
}
