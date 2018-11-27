const path = require('path')

const webpack = require('webpack')

const {VueLoaderPlugin} = require('vue-loader')

const WebpackBar = require('webpackbar') // 优雅加载进度

const config = require('../config')

const projectRoot = path.resolve(__dirname, '../') // 项目根目录

const isProd = process.env.NODE_ENV === 'production' // 判断环境

const cssSourceMapDev = !isProd && config.dev.cssSourceMap
const cssSourceMapProd = isProd && config.build.productionSourceMap
const useCssSourceMap = cssSourceMapDev || cssSourceMapProd

const jsLoader = [{
    loader: 'cache-loader', // 在一些性能开销较大的 loader 之前添加此 loader，以将结果缓存到磁盘里。
    options: {
        cacheDirectory: path.join(__dirname, '../node_modules/.cache/babel-loader'),
        cacheIdentifier: process.env.NODE_ENV + '_babel'
    }
},{
    loader: 'babel-loader'
}]
if (isProd) {
    jsLoader.push({
        loader: 'thread-loader'
    })
}

module.exports = {
    // 配置如何展示性能提示
    performance: {
        maxEntrypointSize: 300000, //配置入口文件最大体积
        hints: isProd ? 'warning' : false, // 打开/关闭提示
        //此属性允许 webpack 控制用于计算性能提示的文件
        assetFilter: function(assetFilename) {
            return assetFilename.endsWith('.js')
        }
    },
    entry: {
        app: './src/app.js',
        admin: './src/admin.js'
    },
    output: {
        path: config.build.assetsRoot,
        publicPath: isProd ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
        filename: 'static/js/[name].js',
        chunkFilename: 'static/js/[name].js' //公共模块抽离打包
    },
    // webpack可以不处理应用的某些依赖库，使用externals配置后，依旧可以在代码中通过CMD、AMD或者window/global全局的方式访问
    // 使用时需要声明：var $ = require("jquery");并且不会被打包进入boundle
    externals: {
        jquery: 'jQuery' 
    },
    resolve: {
        extensions: ['.js', '.vue'], // 自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        // resolve.modules  配置 Webpack 去哪些目录下寻找第三方模块，默认是只会去  node_modules  目录下寻找。 有时你的项目里会有一些模块会大量被其它模块依赖和导入，由于其它模块的位置分布不定，针对不同的文件都要去计算被导入模块文件的相对路径， 这个路径有时候会很长，就像这样  import '../../../components/button'  这时你可以利用  modules  配置项优化，假如那些被大量导入的模块都在  ./src/components  目录下，把  modules  配置成
        modules: [path.join(__dirname, '../node_modules')],
        alias: { // 模块别名定义，方便后续直接引用别名，无须多写长长的地址
            '@': path.resolve(__dirname, '../src'),
            '~src': path.resolve(__dirname, '../src'),
            '~components': path.resolve(__dirname, '../src/components'),
            '~api': path.resolve(__dirname, '../src/api/index-client'),
            '~mixins': path.resolve(__dirname, '../src/mixins'),
            '~pages': path.resolve(__dirname, '../src/pages'),
            '~store': path.resolve(__dirname, '../src/store'),
            '~utils': path.resolve(__dirname, '../src/utils'),
            'api-config': path.resolve(__dirname, '../src/api/config-client')
        }
    },
    // 这组选项与上面的 resolve 对象的属性集合相同，但仅用于解析 webpack 的 loader 包。
    resolveLoader: {
        modules: [path.join(__dirname, '../node_modules')]
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'cache-loader',
                        options: {
                            cacheDirectory: path.join(__dirname, '../node_modules/.cache/vue-loader'),
                            cacheIdentifier: process.env.NODE_ENV + '_vue'
                        }
                    },
                    {
                        loader: 'vue-loader',
                        options: {
                            compilerOptions: {
                                preserveWhitespace: true // 放弃模板标签之间的空格
                            },
                            // 当这两个选项同时被设置时，开启基于文件系统的模板编译缓存 (需要在工程里安装 cache-loader)。
                            cacheDirectory: path.join(__dirname, '../node_modules/.cache/vue-loader'),
                            cacheIdentifier: process.env.NODE_ENV + '_vue'
                        }
                    }
                ]
            },
            {
                test: /\.jsx?$/,
                include: projectRoot,
                exclude: /node_modules/,  // exclude 排除，不需要编译的目录，提高编译速度
                use: jsLoader
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'static/img/[name].[hash:7].[ext]',// 存放目录
                            limit: 8192 // 限制图片大小
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'static/fonts/[name].[hash:7].[ext]',
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // 以jquery为例，用ProvidePlugin进行实例初始化后，jquery就会被自动加载并导入对应的node模块中
        // 然后我们可以在代码中直接使用，无需声明
        // $('#item'); // <= just works
        // jQuery('#item'); // <= just works
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new VueLoaderPlugin(),
        new WebpackBar()
    ]
}

