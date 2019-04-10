const Koa = require('koa')
// 接受post数据（body里面接受）
const bodyParser = require('koa-bodyparser')
// 解决跨域
const cors = require('koa2-cors')
// 日志
const logger = require('koa-logger')

const app = new Koa()
// 注意顺序
app.use(cors()).use(logger()).use(bodyParser())

app.listen(6060, () => {
  console.log('sever listen on http://127.0.0.1:6060')
})
