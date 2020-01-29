/**
 * 生成环境配置
 */
const path = require('path');
const merge = require('webpack-merge'); // 合并webpack
const webpack = require('webpack');
const webpackConfig = require('./webpack.config'); // webpack配置
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //提取CSS到文件中 外联方式引入css
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin'); // 压缩css
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 清除上一次构建的结果
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 用户拷贝静态资源 例如从public 移动到 dist

module.exports = merge(webpackConfig, {
    mode: 'production',
    devtool: '#source-map', // 通过在浏览器调试工具(browser devtools)中添加元信息(meta info)增强调试
    optimization: { //自定义优化
        splitChunks: {
            cacheGroups: {
                vendors: {
                    name: 'chunk-vendors',
                    test: /[\\\/]node_modules[\\\/]/,
                    priority: -10,
                    chunks: 'initial'
                },
                common: {
                    name: 'chunk-common',
                    minChunks: 2,
                    priority: -20,
                    chunks: 'initial',
                    reuseExistingChunk: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.(scss|sass)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                          importLoaders: 2
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('dart-sass')
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins:[require('autoprefixer')]
                        }
                    }
                ]
            }
        ]  
    },
    plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: 'production'
          }
        }),
        new MiniCssExtractPlugin({
          filename: 'css/[name].[contenthash:8].css',
          chunkFilename: 'css/[name].[contenthash:8].css'
        }),
        new OptimizeCssnanoPlugin({
          sourceMap: true,
          cssnanoOptions: {
            preset: [
              'default',
              {
                mergeLonghand: false,
                cssDeclarationSorter: false
              }
            ]
          }
        }),
        new CopyWebpackPlugin([
          {
            from: path.resolve(__dirname, '../public'),
            to: path.resolve(__dirname, '../dist')
          }
        ]),
        new CleanWebpackPlugin()
    ]
})