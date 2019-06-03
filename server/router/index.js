const router = require('koa-router')()
const examplesRouter = require('./examples')
const UserController = require('../controllers/user')

router.use('/examples', examplesRouter.routes())
router.get('/', async ctx => {
  ctx.body = 'hello koa2'
})

// 用户登录注册
router.post('/login', UserController.login)
router.post('/register', UserController.register)

module.exports = router
