const fs = require('fs')
const path = require('path')
const config = require('../config')
const Sequelize = require('sequelize')


const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
)

let db = {}
// fs.readdirSync(url)---方法将返回一个包含“指定目录下所有文件名称”的数组对象。
fs.readdirSync(__dirname)
  .filter(file => file != 'index.js')
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
