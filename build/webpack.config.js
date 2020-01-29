const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    // mode: '', 模式。"production" | "development" | "none" 告诉webpack 是在生产还是开发环境
    entry: {
        // 配置入口文件
        // ES6/7API转化为ES5
        main: ['@babel/polyfill', path.resolve(__dirname, '../src/main.js')],
    },
    output: {
        // 打包输出文件路径
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[hash:8].js',
        // 资源引用路径
        publicPath: '/'
    },
    devServer: {
        hot: true,
        port: 3000,
        contentBase: './dist'
    },
    resolve: {
        // 模块别名列表
        alias: {
            vue$: 'vue/dist/vue.runtime.esm.js',
            '@': path.resolve(__dirname,'../src'),
        },
        // 使用的扩展名
        extensions: ['.js', '.vue'],
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'cache-loader',
                    },
                    {
                        loader: 'vue-loader',
                        options: {
                            compilerOptions: {
                                preserveWhitespace: false
                            },
                        }
                    }

                ]
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
              },
            // 图片 url-loader
            {
                test: /\.(jpe?g|png|gif)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 4096,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                                name: 'img/[name].[hash:8].[ext]',
                            }
                        }
                    }
                }]
            },
            // 音视频
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 4096,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'media/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            // 字体文件
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 4096,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'font/[name].[hash:8].[ext]',
                                }
                            }
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
        }),
        // 定义环境变量
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ]
}