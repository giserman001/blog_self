const Joi = require('joi')

const { create, update, getArticleList } = require('../schemas/article')
const {
    article: ArticleModel,
    tag: TagModel,
    category: CategoryModel,
    Sequelize
} = require('../models')

// 注意这种写法
const { checkAuth: checkAuthFn } = require('../lib/token')
const Op = Sequelize.Op

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
    },
    // 获取文章列表
    async getArticleList(ctx) {
        let {page = 1, pageSize = 10, title, tag, category} = ctx.query
        const validator = Joi.validate(ctx.query, getArticleList)
        if (validator.error) {
            ctx.body = { code: 400, message: validator.error.message }
        } else{
            const offset = (page - 1) * pageSize
            const where = title ? { title: {[Op.like]: `%${title}%`} } : {}
            const tagFilter = tag ? {name: tag} : {}
            const categoryFilter = category ? {name: category} : {}
            pageSize = parseInt(pageSize) // 处理 pageSize
            const data = await ArticleModel.findAndCountAll({
                where,
                include: [
                    {model: TagModel, attributes: ['id', 'name'], where: tagFilter},
                    {model: CategoryModel, attributes: ['id', 'name'], where: categoryFilter}
                ],
                offset,
                limit: pageSize,
                order: [['createdAt', 'DESC']],
                row: true,
                distinct: true
            })
            ctx.body = { code: 200, ...data }
        }
    }
}

