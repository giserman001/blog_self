const router = require('koa-router')()

const examplesRouter = require('./examples')

// 装载子路由
router.use('/examples', examplesRouter.routes())

router.get('/', async (ctx) => {
  ctx.body = {
    data: 'hello koa2',
    status: true
  }
})
module.exports = router


