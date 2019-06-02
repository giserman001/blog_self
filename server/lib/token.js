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

/**
 * @function verifyToken - 校验token
 * @param token - token值
 */
exports.verifyToken = token => {

}