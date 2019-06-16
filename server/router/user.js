const Router = require('koa-router')
const router = new Router()

const UserController = require('../controllers/user')

router.get('/getUserList', UserController.getUserList) // 获取用户列表
router.delete('/delete', UserController.delete) // 删除用户

module.exports = router

