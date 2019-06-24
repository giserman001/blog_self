const router = require('koa-router')()

//装载二级路由
const examplesRouter = require('./examples')
const UserRouter = require('./user')
const ArticleRouter = require('./article')

// 一级路由
const UserController = require('../controllers/user')
const TagController = require('../controllers/tag')
const CategoryController = require('../controllers/category')


router.use('/examples', examplesRouter.routes())
router.get('/', async ctx => {
  ctx.body = 'hello koa2'
})

// 装载用户所有路由
router.use('/user', UserRouter.routes())
// 裝載所有文章路由
router.use('/article', ArticleRouter.routes())

// 用户登录注册
router.post('/login', UserController.login)
router.post('/register', UserController.register)

// 获取所有标签以及每个标签的总数
router.get('/tags/getList', TagController.getTags)
//根据标签的名字获取文章
router.get('/tags/getArticles', TagController.getArticlesByTag)
// 获取所有分类以及分类的总数
router.get('/categories/getList', CategoryController.getCategories)
//根据分类的名字获取文章
router.get('/categories/getArticles', CategoryController.getArticlesByCate)

module.exports = router
