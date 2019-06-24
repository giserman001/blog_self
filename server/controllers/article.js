const Joi = require('joi')

const { create, update, getArticleList } = require('../schemas/article')
const {
    article: ArticleModel,
    tag: TagModel,
    category: CategoryModel
} = require('../models')

// 注意这种写法
const { checkAuth: checkAuthFn } = require('../lib/token')

module.exports = {
    // 创建文章
    async create(ctx) {
        const isAuth = checkAuthFn(ctx)
        if (isAuth) {
            const { title, content, categories, tags } = ctx.request.body
            const validator = Joi.validate(ctx.request.body, create)
            if (validator.error) {
                ctx.body = { code: 400, message: validator.error.message }
            } else {
                const tagList = tags.map(t => ({ name: t }))
                const categoryList = categories.map(t => ({name: t}))
                const data = await ArticleModel.create(
                    {title, content, tags: tagList, categories: categoryList},
                    {include: [TagModel, CategoryModel]}
                )
                ctx.body = { code: 200, message: '成功创建文章', data }
            }
        }
    }
}

