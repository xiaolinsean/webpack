# demo2

demo2中包括了四个配置文件
- `webpack.config.base.js`
    包括了一些公共的基本配置，下面三个配置文件使用了`webpack-merge`，共享base中的公共配置

- `webpack.config.dev.js`
    用于本地开发环境使用，使用watch模式
- `webpack.config.server.js`
    用于本地开发环境使用，使用`webpack-dev-server`启动本地服务，可设置本地服务proxy。
- `webpack.config.prod.js`
    用于生产环境打包，启动了代码压缩优化

各文件中的具体配置项及对应的作用和使用方法可以参考对应文件中的注释。