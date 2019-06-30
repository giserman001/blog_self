const Router = require('koa-router')

const router = new Router()
const ArticleController = require('../controllers/article')

router.post('/create', ArticleController.create)
router.get('/getList', ArticleController.getArticleList)

module.exports = router