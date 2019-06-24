const Joi = require('joi')

// commonJS 里面 exports和module.exports 却别 ：module.exports就是{}，而exports是指向module.exports的引用。
// 创建文章验证
exports.create = Joi.object().keys({
    title: Joi.string().required().error(new Error('标题不能为空')),
    content: Joi.string(),
    categories: Joi.array(),
    tags: Joi.array()
})

// 编辑文章验证
exports.update = Joi.object().keys({
    articleId: Joi.number(),
    title: Joi.string().required().error(new Error('标题不能为空')),
    content: Joi.string(),
    categories: Joi.array(),
    tags: Joi.array()
})

// 获取文章列表验证
 exports.getArticleList = Joi.object().keys({
     page: Joi.number(),
     pageSize: Joi.number(),
     title: Joi.string().allow(''),
     tag: Joi.string().allow(''),
     category: Joi.string().allow('')
 })
 // exports与module.exports两种写法区别
//  module.exports = {
//     create,
//     update,
//     getArticleList
// }