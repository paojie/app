var webpack = require('webpack')
var pkg = require('./package.json')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path')

module.exports = {
    // 向 entry 传入一个数组时会发生什么？将创建“多个主入口(multi-main entry)”
    entry: {
        app: path.resolve(__dirname, 'client/index.jsx'),
        // Object.keyse传入一个对象，返回一个数组，数组值依次是对象的属性。/
        // vendor: Object.keys(pkg.dependencies) 
        vendor: [
            'react', 
            'react-dom', 
            'react-redux', 
            'react-router', 
            'redux', 
            'es6-promise', 
            'whatwg-fetch'
        ]
    },

    output: {
        path: __dirname + "/client/build",
        filename: "js/[name].[chunkhash:8].js"
    },
    module: {
        rules: [
                {test: /\.css$/, use: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'})},
                {test: /\.json$/, use: ['json-loader']},
                {test: /\.(js|jsx)$/, use: ['babel-loader'], },
                {test: /\.scss$/, use : ExtractTextPlugin.extract({fallback:'style-loader', use: ['css-loader', 'sass-loader']})},
                {test: /\.less$/, use: ExtractTextPlugin.extract({fallback:'style-loader', use: ['css-loader', 'less-loader']})},
                {test:/\.(png|gif|jpg|jpeg|bmp)$/i, use:['url-loader?limit=8192'] }
            ]
    },

    resolve: {
        extensions: ['.js', '.jsx'],
    },

    plugins: [
        // webpack 内置的 banner-plugin
        new webpack.BannerPlugin("Copyright by bdfu"),

        new HtmlWebpackPlugin({
            template: __dirname + '/client/index.tmpl.html'
        }),

        // 分离CSS和JS文件
        new ExtractTextPlugin('css/[name].[chunkhash:8].css'), 

         // 定义为生产环境，编译 React 时压缩到最小
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),

        // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
        new webpack.DefinePlugin({
        __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
        }),
    
        //  这是核心插件，起到压缩代码的作用
        new webpack.optimize.UglifyJsPlugin({
            compress: {
            //supresses warnings, usually from module minification
            warnings: false
            }
        }),

        // CommonsChunkPlugin 插件,通过将公共模块拆出来，最终合成的文件能够在最开始的时候加载一次，便存起来到缓存中供后续使用。
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'js/[name].[chunkhash:8].js'
        }),
        // 创建一个编译时的全局常量。
        new webpack.DefinePlugin({
          __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
        })

    ]

}
