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
     * 路径重定向，
     * 接口代理，
     * 模块化热更新，
     * 更新后自动刷新浏览器
     *  */
    devServer:{
        port:9000,   //  端口号，本地chrome浏览器调试的，除了9000，设置其他端口websocket会自动断开,也可不主动设置端口，但每次重新构建端口号都会变
        // progress: true,
        compress: true, // 开启
        contentBase: BUILD_PATH,
        historyApiFallback: true, //不跳转
        inline: true, 
        hot: true,
        proxy: {
            "/v1": {
                target: "http://tingapi.ting.baidu.com",
                changeOrigin: true,
                secure: false,
            },
            "/api": {
                target: "http://tingapi.ting.baidu.com",
                changeOrigin: true,
                secure: false,
                pathRewrite: { '/api': '' },     //重写路径，将匹配上的路径进行重写
            },
        },

        // 前端模拟数据用
        before(app){
            app.get('/user',(rep,res)=>{
                res.json({name:'before'})
            })
        }
    },

     plugins: [
        
        // 设置环境变量
        new webpack.DefinePlugin({
            DEV: JSON.stringify('DEV'),       // 可在代码中取到此环境变量
        }),
    ]
})