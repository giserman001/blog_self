const router = require('koa-router')()

//装载二级路由
const examplesRouter = require('./examples')
const UserRouter = require('./user')

// 一级路由
const UserController = require('../controllers/user')


router.use('/examples', examplesRouter.routes())
router.get('/', async ctx => {
  ctx.body = 'hello koa2'
})
// 装载用户所有路由
router.use('/user', UserRouter.routes())

// 用户登录注册
router.post('/login', UserController.login)
router.post('/register', UserController.register)

module.exports = router
