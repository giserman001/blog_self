const Router = require('koa-router')

const router = new Router()

const ExampleController = require('../controllers/examples')
router.get('/', async (ctx) => {
  ctx.body = {
    status: true,
    data: 'examples router test'
  }
})

router.post('/login', ExampleController.login)
router.post('/register', ExampleController.register)
router.post('/test', async (ctx) => {
  ctx.body = {
    status: true,
    data: 'test go'
  }
})

module.exports = router