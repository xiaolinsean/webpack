const HtmlWebpackPlugin = require('html-webpack-plugin');

//定义路径相关变量
const path = require('path');
const BASE_PATH = path.resolve(__dirname);
const SRC_PATH = path.resolve(BASE_PATH,'src');
const BUILD_PATH = path.resolve(BASE_PATH, 'build');
const TEMPLATES_PATH = path.resolve(BASE_PATH, 'templates');

module.exports = {
    // 模式，可在打包语句中定义：webpack --mode=production
    mode: 'development', //可选'development'（开发）和'production'（生产）
    
    //入口
    entry: {
        app: path.resolve(SRC_PATH,'app.js'),
    },

    //输出
    output: {
        filename: '[name].js',
        path: BUILD_PATH,
    },

    // loader
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'] // 为[ {loader: 'style-loader'}, {loader: 'css-loader' }]的简写
            },
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                }
            }
        ],
    },
    
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack demo1',
            template: path.resolve(TEMPLATES_PATH, 'template.html'),
            chunks: ['app'],
        })
    ]


}