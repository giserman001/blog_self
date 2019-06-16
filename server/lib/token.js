const { TOKEN_SECRET, TOKEN_EXPIRESIN } = require('../config')
const jwt = require('jsonwebtoken')


/**
 * @function createToken - 生成token
 */
exports.createToken = (info) => {
  // jwt.sign()方法第一个参数是一个对象
  const token = jwt.sign(info, TOKEN_SECRET, { expiresIn: TOKEN_EXPIRESIN })
  return token
}

// 解析token
const decodeToken = ctx => {
  const authorizationHeader = ctx.headers['authorization']
  const token = authorizationHeader.split(' ')[1] // 获取token
  return jwt.decode(token)
}

exports.decodeToken = decodeToken


/**
 * @function checkAuth - 检查权限 权限 1 为博主~
 * @param token - token值
 */
exports.checkAuth = ctx => {
  const { auth } = decodeToken(ctx)
  if (auth === 1) {
    return true
  } else {
    ctx.body = { code: 401, message: '您无权限进行此操作' }
    return false
  }
}

/**
 * @function verifyToken - 校验token
 * @param token - token值
 */
exports.verifyToken = token => {

}