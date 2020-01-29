/**
 * 开发环境不配置
 * 1、无需压缩代发。
 * 2、无需提取css
 * 3、sourceMap
 */

 const merge = require('webpack-merge');
 const webpackConfig = require('./webpack.config');
 const webpack = require('webpack');

 module.exports = merge(webpackConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.(scss|sass)$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('dart-sass'),
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins:[require('autoprefixer')]
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
            }
        })
    ]
 })