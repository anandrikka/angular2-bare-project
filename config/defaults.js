'use strict';

var root = require('./helper').root;

var srcPath = root('src');
var defaultPort = 8080;

// Combines all scss files into a single css file
var ExtractTextPlugin = require('extract-text-webpack-plugin');

// Additional npm or bower modules to include in builds
// Add all foreign plugins you may need into this array
// @example:
// let npmBase = path.join(__dirname, '../node_modules');
// let additionalPaths = [ path.join(npmBase, 'react-bootstrap') ];
var additionalPaths = [];

var modules = {
    loaders: [
        {
            test: /\.ts$/,
            loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
            include: [].concat(
                additionalPaths,
                [ srcPath ]
            )
        },
        {
            test: /\.html$/,
            //loader: 'file-loader?name=[path][name].[ext]!extract-loader!html-loader'
            loader: 'html',
            exclude: [root('src/template.html')]
        },
        {
            test: /\.(png|jpe?g|gif|svg)$/,
            loader: 'file?name=assets/images/[hash].[ext]'
        },
        {
            test: /\.(woff|woff2|ttf|eot|ico)$/,
            loader: 'file?name=assets/fonts/[name].[ext]'
        },
        {
            test: /\.scss/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader'),
            exclude: [root('src/app')]
        },
        {
            test: /\.scss/,
            loaders: ['raw-loader', 'sass-loader'],
            include: [root('src/app')]
        },
        {
           test: /\.css$/,
           loaders: ['to-string-loader', 'css-loader']
        },
        {
            test: /\.json$/,
            loader: 'json-loader'
        }
    ]
}

module.exports = {
    srcPath: srcPath,
    port: defaultPort,
    publicPath: '/app/', //logical path served by server
    modules: modules,
    additionalPaths: additionalPaths
};