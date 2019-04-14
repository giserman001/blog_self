const { TOKEN_SECRET, TOKEN_EXPIRESIN } = require('../config')
const jwt = require('jsonwebtoken')


/**
 * @function createToken - 生成token
 */
exports.createToken = (info) => {
  const token = jwt.sign(info, TOKEN_SECRET, { expiresIn: TOKEN_EXPIRESIN })
  return token
}

/**
 * @function verifyToken - 校验token
 * @param token - token值
 */
exports.verifyToken = token => {

}