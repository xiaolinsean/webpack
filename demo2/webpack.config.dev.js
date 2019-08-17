const webpack = require('webpack');
let { smart } = require('webpack-merge');
let base = require('./webpack.config.base.js');

//定义路径相关变量
const path = require('path');
const BASE_PATH = path.resolve(__dirname);
const SRC_PATH = path.resolve(BASE_PATH, 'src');
const BUILD_PATH = path.resolve(BASE_PATH, 'build');
const TEMPLATES_PATH = path.resolve(BASE_PATH, 'templates');

module.exports = smart(base,{
    mode: 'development', //可选'development'（开发）和'production'（生产）
    
    /**
     * 监控文件变化选项,一般在本地调试，且需要看到输出文件时使用
     */
    watch: true,
    watchOptions:{
        poll: 1000, // 每秒检查的次数
        aggregateTimeout: 500, // 防抖 500毫秒内没有输入才重新打包
        ignored: /node_modules/ //不需要监控的的目录
    },

     plugins: [
        
        // 设置环境变量
        new webpack.DefinePlugin({
            DEV: JSON.stringify('DEV'),       // 可在代码中取到此环境变量
        }),
    ]
})