// 项目配置文件
var path = require('path')

module.exports = {
    // 生产环境配置参数
    build: {
        env: require('./prod.env'), // 生产环境变量
        index: path.resolve(__dirname, '../dist/index.html'), // 主html模板
        assetsRoot: path.resolve(__dirname, '../dist'), // 产品文件的存放路径
        assetsSubDirectory: 'static', // 二级目录，存放静态资源文件的目录，位于dist文件夹下
        // 发布路径，如果构建后的产品文件有用于发布CDN或者放到其他域名的服务器，可以在这里进行设置
        // 设置之后构建的产品文件在注入到index.html中的时候就会带上这里的发布路径
        assetsPublicPath: '/', 
        productionSourceMap: true, // 是否使用source-map
        productionGzip: false, // 是否开启gzip压缩
        productionGzipExtensions: ['js', 'css'] // gzip模式下需要压缩的文件的扩展名，设置js、css之后就只会对js和css文件进行压缩
    },
    dev: {
        env: require('./dev.env'), // 开发环境变量
        port: 8081, // dev-server 端口号
        assetsSubDirectory: 'static', // 静态文件目录
        assetsPublicPath: '/', // 发布路径
        // 代理配置表，在这里可以配置特定的请求代理到对应的API接口
        // 例如将'localhost:8080/api/xxx'代理到'www.example.com/api/xxx'
        // 利用本地服务器请求代理的服务器api
        proxyTable: {
            '/api': {
                target: 'http://localhost:4000',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api'
                }
            }
        },
        cssSourceMap: false // 是否开启 cssSourceMap
    }
}