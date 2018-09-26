const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

//定义路径相关变量
const path = require('path');
const BASE_PATH = path.resolve(__dirname);
const SRC_PATH = path.resolve(BASE_PATH, 'src');
const BUILD_PATH = path.resolve(BASE_PATH, 'build');
const TEMPLATES_PATH = path.resolve(BASE_PATH, 'templates');

module.exports = {
    // 模式，可在打包语句中定义：webpack --mode=production
    mode: 'development', //可选'development'（开发）和'production'（生产）

    //入口
    entry: {
        pageA: path.resolve(SRC_PATH, 'pageA.jsx'),
        pageB: path.resolve(SRC_PATH, 'pageB.jsx'),
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
                },
                exclude: /node_modules/,
            }
        ],
    },

    //插件
    plugins: [
        new HtmlWebpackPlugin({
            filename : 'pageA.html',
            title: 'webpack demo2',
            template: path.resolve(TEMPLATES_PATH, 'template.html'),
            chunks: ['pageA'],
        }),
        new HtmlWebpackPlugin({
            filename: 'pageB.html',
            title: 'webpack demo2',
            template: path.resolve(TEMPLATES_PATH, 'template.html'),
            chunks: ['pageB'],
        }),
    ],

    optimization: {
        splitChunks: {
            cacheGroups: {
                // 注意: priority属性
                // 其次: 打包业务中公共代码
                common: {
                    name: "common",
                    chunks: "all",
                    minSize: 2,
                    priority: 0
                },
                // 首先: 打包node_modules中的文件
                vendor: {
                    name: "vendor",
                    // test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    priority: 10
                }
            }
        }
    }


}