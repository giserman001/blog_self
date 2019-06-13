const Joi = require('joi')
const UserSchema = require('../schemas/user')
const Sequelize = require('sequelize')
const Op = Sequelize.Op


const {user: UserModel} = require('../models')
const { encrypt, comparePassword } = require('../lib/bcrypt')
const { createToken } = require('../lib/token')

module.exports = {
    // 注册
    async register(ctx) {
        const { username, password, email } = ctx.request.body
        let response
        const validator = Joi.validate({username, password, email}, UserSchema.regiester)
        if (validator.error) {
            response = { code: 400, message: validator.error.message }
        } else {
            const result = await UserModel.findOne({where: {email}})
            if (result) {
                response = { code: 400, message: '邮箱已被注册' }
            }else{
                const user = await UserModel.findOne({where: {username}})
                if (user) {
                    response = { code: 400, message: '用户名已被占用' }
                }else{
                    const saltPassword = await encrypt(password)
                    await UserModel.create({username, password: saltPassword, email})
                    response = { code: 200, message: '注册成功' }
                }
            }
        }
        ctx.body = response
    },
    // 登录
    async login(ctx) {
        const {account, password} = ctx.request.body
        const validator = Joi.validate({account, password}, UserSchema.login)
        let response
        if (validator.error) {
            response = {code: 400, message: validator.error.message}
        }else{
            const user = await UserModel.findOne({
                where: {
                    [Op.or]: [{username: account}, {email: account}]
                }
            })
            console.log(user, '查到了吗')
            if (!user) {
                response = { code: 400, message: '用户不存在' }
            }else{
                const isMatch = await comparePassword(password, user.password)
                if (!isMatch) {
                    response = { code: 400, message: '密码不正确' }
                }else{
                    const { userId: id, auth, username, email} = user
                    const token = createToken({username: username, userId: id, auth, email: email})
                    response = { code: 200, message: '登录成功', username: username, auth: auth, token }
                }
            }
        }
        ctx.body = response
    }
}