const webpack = require('webpack');
let { smart } = require('webpack-merge');
let base = require('./webpack.config.base.js');

// 删除对应路径下文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 压缩JS代码
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// 压缩css代码
const optimizeCss = require('optimize-css-assets-webpack-plugin');

module.exports = smart(base,{
    mode: 'production', //可选'development'（开发）和'production'（生产）

    /**
     * 源码映射，用于生产调试,可取以下值
     * 1）source-map:会单独生成一个sourcemap文件，出错了会标识当前报错的列和行（大且全）
     * 2）eval-source-map: 不会产生单独的文件，但是可以显示行和列
     * 3）cheap-module-source-map: 不会标识列，只是标识行，而且是一个单独的映射文件
     * 4）cheap-module-eval-source-map: 不会产生单独的文件，不会标识列，
     */
    // devtool: 'eval-source-map',

    optimization: {
        // 设置是否压缩代码。webpack.optimize.UglifyJsPlugin()在4以上不再支持，
        // 设置true时为production模式，如果前面有设置mode,则可能会覆盖此处的设置。
        minimizer: [
            new UglifyJSPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new optimizeCss(),
        ],

    },

    plugins: [

        //清除输出文件夹目录的文件，V4之后自动清除输出文件夹目录，不需要配置对应的目录
        new CleanWebpackPlugin(),

        // 设置环境变量
        new webpack.DefinePlugin({
            DEV: JSON.stringify('production'),       // 可在代码中取到此环境变量
        }),

        new webpack.BannerPlugin("made by sean " + new Date()) // 在各打包出的文件开头加上版权说明等描述语句
    ]

})