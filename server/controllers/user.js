const Joi = require('joi')
const UserSchema = require('../schemas/user')

const {user: UserModel, sequelize, Sequelize} = require('../models')
const Op = Sequelize.Op
const { encrypt, comparePassword } = require('../lib/bcrypt')
const { createToken, checkAuth } = require('../lib/token')

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
    },
    // 获取用户列表
    async getUserList(ctx) {
        const isAuth = checkAuth(ctx)
        if (isAuth) {
            // 注意：get请求这里是通过ctx.query接收参数
            let { page = 1, pageSize = 10, username } = ctx.query
            const offset = (page-1) * pageSize
            pageSize = parseInt(pageSize)
            // $like设置模糊查询
            const params = username ? { username: {[Op.like]: `%${username}%`} } : {}
            const data = await UserModel.findAndCountAll({
                attributes: ['id', 'username', 'createdAt'],
                where: { auth: 2, ...params },
                // Sequelize中使用include hook可以方便的进行表关联(关联评论和回复)
                include: [],
                offset,
                limit: pageSize,
                row: true,
                distinct: true,
                order: [['createdAt', 'DESC']]
            })
            ctx.body = { code: 200, ...data }
        }
    },
    // 删除用户
    async delete(ctx) {
        const isAuth = checkAuth(ctx)
        if (isAuth) {
            let { userId } = ctx.query
            userId = parseInt(userId)
            // 使用原始查询或执行已经准备好的SQL语句，可以用Sequelize提供的工具函数sequelize.query实现.
            // 删除该用户所有评论和回复（需要加强sql的理解）
            await sequelize.query(
                `delete comment, reply from comment left join reply on comment.id=reply.commentId where comment.userId=${userId}`
            )
            // 删除数据库里用户数据
            await UserModel.destroy({ where: { id: userId } })
            ctx.body = { code: 200, message: '成功删除用户' }
        }
    }
}