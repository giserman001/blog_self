const Joi = require('joi')

const regiester = Joi.object().keys({
    username: Joi.string().alphanum().required().error(new Error('用户名不能为空')),
    password: Joi.string().required().error(new Error('密码不能为空')),
    email: Joi.string().email().required()
})

const login = Joi.object().keys({
    account: Joi.string().required(),
    password: Joi.string().required()
})

module.exports = {
    regiester,
    login
}