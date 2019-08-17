const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');



// 拷贝对应目录下的文件到目标路径下
const CopyWebpackPlugin = require('copy-webpack-plugin');

// extract-text-webpack-plugin目前版本不支持webpack4。 需要使用extract-text-webpack-plugin@next
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

// 压缩JS代码
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// 压缩css代码
const optimizeCss = require('optimize-css-assets-webpack-plugin');

const PurifyCss = require('purifycss-webpack');
const glob = require('glob-all');

//定义路径相关变量
const path = require('path');
const BASE_PATH = path.resolve(__dirname);
const SRC_PATH = path.resolve(BASE_PATH, 'src');
const BUILD_PATH = path.resolve(BASE_PATH, 'build');
const TEMPLATES_PATH = path.resolve(BASE_PATH, 'templates');

module.exports = {
    // 模式，可在打包语句中定义：webpack --mode=production
    // mode: 'development', //可选'development'（开发）和'production'（生产）

    resolve: {
        modules:[path.resolve('node_modules')],
        extensions: ['.js','.jsx','.css','.scss','.json'],
        alias:{ // 设置模块别名
            jQuery: 'jquery/dist/css/jquery.js', // 业务代码中引用jQuery及引用的'jquery/dist/css/jquery.js'
        }
    },

    //入口
    entry: {
        pageA: path.resolve(SRC_PATH, 'pageA.jsx'),
        pageB: path.resolve(SRC_PATH, 'pageB.jsx'),
    },

    //输出
    output: {
        filename: '[name].js',
        path: BUILD_PATH,
        chunkFilename: '[name].js',
    },

    // loader
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: {
                        loader: "style-loader",
                    },
                    use: [
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: "postcss-loader",
                            options:{
                                ident: 'postcss',
                                plugins: [
                                    // require('autoprefixer')(),
                                    require('postcss-cssnext')(),
                                ]
                            }
                        }
                    ]
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: {
                        loader: "style-loader",
                    },
                    use: [
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                ident: 'postcss',
                                plugins: [
                                    // require('autoprefixer')(),
                                    require('postcss-cssnext')(), // 兼容下一代css方案，内置了autoprefixer
                                ]
                            }
                        },
                        {
                            loader: "sass-loader"
                        }
                    ]
                })
            },
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options:{
                        presets:[
                            '@babel/preset-env',
                            "@babel/preset-react"
                        ],
                        plugins:[
                            "@babel/plugin-transform-runtime",
                            "@babel/plugin-syntax-dynamic-import",
                            '@babel/plugin-proposal-class-properties'
                        ]
                    }
                },
                exclude: /node_modules/,
            },
            { // 解析图片(html-withimg-loader:解析html标签中的图片地址，如<img src="./login.png" alt=""/>)
                test: /\.(png|jpg|gif)$/,
                // use:'file-loader'
                use:{
                    loader: "url-loader",
                    options: {
                        limit: 1 * 1024, // 大小限制，大于这个值时做base64转换，否则生成单独的图片文件
                        name: 'images/[name].[hash:5].[ext]',
                        // publicPath:'https://www.baidu.com', // 设置引用路径，便于做CDN处理
                    }
                }
            }
        ],
    },

    optimization: {

        // 提取公共代码
        splitChunks: {   // V4之后不再支持commonChunksPlugin，改用splitChunksPlugin
            cacheGroups: {
                // 注意: priority属性
                // 其次: 打包业务中公共代码
                common: {
                    name: "common",
                    // test: /common\/|components\//,
                    chunks: "all",
                    minSize: 3, // 文件大小限制
                    minChunks: 2,   // 引用次数
                    priority: 0
                },
                // 首先: 打包node_modules中的文件
                vendor: {
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    priority: 10,       // 设置优先级，先抽离node_modules
                }
            }
        }
    },

    //插件
    plugins: [

        // 拷贝对应目录文件到目的目录文件
        new CopyWebpackPlugin([
            {
                from: path.resolve(BASE_PATH, 'static'),
                to: path.resolve(BUILD_PATH, 'static'),
            }
        ]),


        new ExtractTextWebpackPlugin({
            filename: 'css/[name].min.css',
        }),

        // 删除冗余的css代码
        // new PurifyCss({
        //     paths: glob.sync([
        //         path.join(BASE_PATH, 'templates/*.html'),
        //         path.join(BASE_PATH, 'src/*.jsx'),
        //         path.join(BASE_PATH, 'components/Title/*.jsx'),
        //     ])
        // }),
        new HtmlWebpackPlugin({
            filename : 'pageA.html',
            title: 'webpack demo2',
            template: path.resolve(TEMPLATES_PATH, 'template.html'),
            chunks: ['vendor', 'common', 'pageA'], // 注意此处
            // minify: {
            //     collapseWhitespace: true,
            // }
        }),
        new HtmlWebpackPlugin({
            filename: 'pageB.html',
            title: 'webpack demo2',
            template: path.resolve(TEMPLATES_PATH, 'template.html'),
            chunks: ['vendor', 'common', 'pageB'], // 注意此处
        }),
    ],

}