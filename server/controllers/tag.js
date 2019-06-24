const {
    tag: TagModel,
    article: ArticleModel,
    category: CategoryModel,
    sequelize
} = require('../models')

module.exports = {
    // 获取所有标签
    async getTags(ctx) {
        const data = await TagModel.findAll({
            attributes: ['name', [sequelize.fn('COUNT', sequelize.col('name')), 'count']],
            group: 'name'
        })
        ctx.body = {code: 200, data}
    },
    // 通过指定tag获取文章
    async getArticlesByTag(ctx) {
        const { page=1, pageSize=10, name } = ctx.query
        offset = (page - 1) * pageSize
        pageSize = parseInt(pageSize)

        const data = await ArticleModel.findAndCountAll({
            attributes: ['id', 'title', 'createdAt'],
            include: [{model: TagModel, where: {name}}, {modle: CategoryModel}],
            offset,
            limit: pageSize,
            order: [['createdAt', 'DESC']],
            distinct: true
        })
        ctx.body = {code: 200, ...data}
    }
}