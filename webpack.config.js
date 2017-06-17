var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var proxy = require('http-proxy-middleware');
var path = require('path')
module.exports = {

    entry: path.resolve(__dirname, 'client/index.js'),
    output: {

        filename: 'bundle.js'
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.json$/,
                use: ['json-loader']
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|lib)/,
                use: ['babel-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(png|gif|jpg|jpeg|bmp)$/i,
                use: ['url-loader?limit=8192']
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.jsx'],
    },

    devServer: {
        historyApiFallback: true,
        port: 8090,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                secure: false,
                logLevel: "silent"
                // secure: true
            }
        }
    },

    devtool: 'cheap-module-eval-source-map',

    // proxy : {
    //     '/api': {
    //             target: {
    //                host: 'localhost',
    //                protocol: 'http:',
    //                port: 3000
    //             },
                    
    //             changeOrigin: true,
    //             secure: false
    //     }
    // },

    plugins: [

        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'client/index.tmpl.html'),
        }),

        new webpack.HotModuleReplacementPlugin(),
        // 不能加会很慢。
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),
        // 创建一个编译时的全局常量。
        // new webpack.DefinePlugin({
        //   __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
        // })

    ]

}