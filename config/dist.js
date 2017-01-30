'use strict';

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var baseConfig = require('./base');
var defaultSettings = require('./defaults');

var root = require('./helper').root;

const config = Object.assign({}, baseConfig, {
  output: {
    path: root('public'),
    publicPath: defaultSettings.publicPath,
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[id].chunk.js'
  },
  cache: false,
  devtool: 'sourcemap',
  plugins: [
     new CleanWebpackPlugin(['*'], {
      root: root('public'),
      verbose: true, 
      dry: false
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
        name: ['app', 'vendor', 'polyfills']
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': "'production'"
    }),
    new webpack.optimize.UglifyJsPlugin({minimize: true, sourceMap: false}),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'Time Tracker',
      template: root('src/template.html'),
      inject: false,
      chunksSortMode: 'none'
    }),
    new ExtractTextPlugin('assets/css/main.[hash].css')
  ],
  htmlLoader: {
    minimize: true,
    removeAttributeQuotes: false,
    caseSensitive: true,
    customAttrSurround: [ [/#/, /(?:)/], [/\*/, /(?:)/], [/\[?\(?/, /(?:)/] ],
    customAttrAssign: [ /\)?\]?=/ ]
  },
  module: defaultSettings.modules
});

module.exports = config;