// 定义表

module.exports = (sequelize, dataTypes) => {
  return sequelize.define(
    'examples',
    {
      // id sequelize 默认创建...
      id: {
        type: dataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
      },
      artcle: {
        type: dataTypes.TEXT
      },
      username: {
        type: dataTypes.STRING(20),
        allowNull: false,
        unique: true
      },
      password: {
        type: dataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamps: false // 不创建 createAt / updateAt 字段
    }
  )
}