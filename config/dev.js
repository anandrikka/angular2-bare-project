'use strict';

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var baseConfig = require('./base');
var defaultSettings = require('./defaults');

var root = require('./helper').root;

var devServerConfig = {
    //contentBase: 'client-src/',
    // publicPath: defaultSettings.publicPath,
    inline: true,
    historyApiFallback: true,
    stats: 'minimal',
    proxy: {
        '/api/*': 'http://localhost:3000'
    },
    hot:true
};

const config = Object.assign({}, baseConfig, {
    output: {
        path: root('public'),
        publicPath: '/',
        filename: 'js/[name].js',
        chunkFilename: 'js/[id].chunk.js'
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: devServerConfig,
    cache: true,
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('./assets/css/main.css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),
        new HtmlWebpackPlugin({
            template: root('src/index.html')
        })
    ],
    module: defaultSettings.modules
});

module.exports = config;

