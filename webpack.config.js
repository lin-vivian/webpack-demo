const path = require('path')
const { resolve } = require('path')
const Html = require('html-webpack-plugin');   //  引入html-webpack-plugin插件
const webpack = require('webpack');   //  引入html-webpack-plugin插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');   //  引入clean-webpack-plugin插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');  //合并css文件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');  //压缩css文件


module.exports = {
    entry: path.join(__dirname, './src/index.js'), //入口文件
    output: {
        path: path.join(__dirname, './build'), //打包后文件存放的地方
        filename: 'main.js' //打包后输出的文件名
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src')]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    // 'style-loader',
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                modules: true,
                                javascriptEnabled: true
                            }
                        }

                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    // 'style-loader',
                    'css-loader'
                ]
            },
            {    
            //处理css文件中`(png|svg|jpg|gif)` 格式的图片
                test: /\.(png|svg|jpg|gif)$/,
                use:{
                    loader: "url-loader",
                    options:{
                        name: '[name]_[hash].[ext]',
                        outputPath: 'images/',
                        limit: 20480,
                        esModule: false //解决打包之后的图片含有default的问题
                    }
                }
           },
           {
                test: /\.html$/,
                use: {
                    loader: 'html-withimg-loader'
                }
            },
        ]
    },
    plugins: [ //打包需要的各种插件
        new Html({  //打包html
            inject: true,
            template: './public/index.html' //html模版路径
        }),
        new CleanWebpackPlugin(), //每次构建前清空build文件夹
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            // 这里的配置和webpackOptions.output中的配置相似
            // 即可以通过在名字前加路径，来决定打包后的文件存在的路径
            filename: 'main.css'
        })
    ],
    optimization: {
        minimizer: [new OptimizeCssAssetsWebpackPlugin()]
    },
    //本地服务器配置
    devServer: {
        contentBase: './build',  //服务器加载的文件目录
        port: '8080',   //端口设置为8080
        hot: true,  //文件修改自动刷新
        historyApiFallback: true //不跳转
    }
}