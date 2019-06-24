const Router = require('koa-router')

const router = new Router()
const ArticleController = require('../controllers/article')

router.post('/create', ArticleController.create)

module.exports = router