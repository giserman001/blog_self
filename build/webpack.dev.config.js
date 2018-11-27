const path = require('path')

const webpack = require('webpack')

const merge = require('webpack-merge')

// 能够更好在终端看到webapck运行的警告和错误
// Friendly-errors-webpack-plugin识别某些类型的webpack错误并清理，聚合和优先级，以提供更好的开发人员体验。
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const config = require('../config')

const utils = require('./utils')

const baseWebpackConfig = require('./webpack.base.config')