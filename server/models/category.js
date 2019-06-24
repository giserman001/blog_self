const moment = require('moment')

module.exports = (sequelize, dataTypes) => {
    const Category = sequelize.define('category', {
        id: { type: dataTypes.INTEGER(11), primaryKey: true, autoIncrement: true },
        name: { type: dataTypes.STRING(100), allowNull: false }
    })
    Category.associate = (models) => {
        Category.belongsTo(models.article, {
            foreignKey: 'articleId',
            targetKey: 'id'
        })
    }
    return Category
}