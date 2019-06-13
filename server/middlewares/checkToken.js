const { TOKEN_SECRET } = require('../config')

const koaJwt = require('koa-jwt')

module.exports = koaJwt({ secret: TOKEN_SECRET }).unless({
  // path: [/\/examples\/login/, /\/examples\/register/] // 白名单

  // return true 需要被授权
  custom: (ctx) => {
    // 定义白名单 即需要token的请求 和 不需要token的请求
    // 1 文章 增删改查 需要token
    // 2 用户操作需要 token    评论之类的都需要token
    const requireList = [/article\/(create|update|delete)/, /user/]
    return !requireList.find(reg => reg.test(ctx.request.url))
  }
})