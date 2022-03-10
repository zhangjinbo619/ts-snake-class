//引入一个包
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
// webpack 所有配置信息
module.exports = {
    mode: 'development', //development |  production
    devtool: "cheap-module-source-map",
    target: 'web',
    context: __dirname + '/src',
    //指定入口文件
    entry: path.resolve(__dirname, "./src/index.ts"),
    //指定打包文件所在目录
    output: {
        //指定打包文件目录
        path: path.resolve(__dirname, './dist'),
        //指定打包后文件名
        filename: '[name].bundle.js',
        environment: {
            arrowFunction: false,
            const:false
        }
    },
    //指定webpack打包时要使用的模块
    module: {
        //指定要加载的规则
        rules: [
            {
                //test指定的生效的文件
                test: /\.ts$/,
                // 要使用的loader ,loader运行从后往前执行
                use: [
                    {
                        //指定加载器
                        loader: 'babel-loader',
                        //设置babel
                        options: {
                            //设置预制环境
                            presets: [
                                ['@babel/preset-env',
                                    {
                                        //要兼容的目标浏览器
                                        "targets": {
                                            "chrome": "88",
                                        // "ie": "11"
                                        },
                                        //指定corejs 版本
                                        "corejs": "3",
                                        //使用corejs 的方式 "usage" 表示按需加载
                                        "useBuiltIns": "usage"
                                    }]
                            ],
                            sourceMap: true
                        }
                    }, "ts-loader"],
                //要排除的文件
                exclude: /node_modules/
            }, {
                //设置less处理
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    //引入postcss 
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    ["postcss-preset-env",
                                        {
                                            browsers: 'last 2 versions'
                                        }]
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            }
        ]
    },
    //配置webpack插件
    plugins: [
        //清理打包目录插件
        new CleanWebpackPlugin(),
        //自动生成HTML插件
        new htmlWebpackPlugin({
            template: "/template/index.html"
        }),
    ],
    devServer: {
        port: 3000,
        allowedHosts: "all",
    },
    //用来设置应用模块
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    }
}