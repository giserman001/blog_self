/**
 * @file 工具包
 * @author liuya(1522962872@qq.com)
 */

'use strict'
const path = require('path')
// 使用webpack的extract-text-webpack-plugin插件提取单独打包css文件时，报错，说是这个插件要依赖webpack3的版本。
// 后面查了一下，webpack4得使用mini-css-extract-plugin这个插件来单独打包css
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 单独打包css
const isDev = process.env.NODE_ENV === 'development' // 判断当前系统环境
const config = require('../config')

exports.assetsPath = function(newPath){
    const assetsSubDirectory = isDev ? config.dev.assetsSubDirectory : config.build.assetsSubDirectory
    return path.posix.join(assetsSubDirectory, newPath)
}