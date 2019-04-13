const { TOKEN_SECRET } = require('../config')

const koaJwt = require('koa-jwt')

module.exports = koaJwt({ secret: TOKEN_SECRET }).unless({
  path: [/\/examples\/login/, /\/examples\/register/] // 白名单
})