// not using anymore

var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
 
const path = require('path');
const rootDir = path.resolve(__dirname, '..');
 
module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',
    output: {
        path: path.join(__dirname, '/../public'),
        publicPath: '/app/',
        filename: 'js/[name].[hash].js',
        chunkFilename: 'js/[id].chunk.js'
    },
    plugins: [
        new ExtractTextPlugin('[name].css')
    ],
    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }
});
