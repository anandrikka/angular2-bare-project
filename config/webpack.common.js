// not using anymore
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
 
const path = require('path');
const rootDir = path.resolve(__dirname, '..');

module.exports = {
entry: {
    'polyfills': ['./client-src/polyfills.ts'],
    'vendor': './client-src/vendor.ts',
    'app': ['./client-src/main.ts']
},
resolve: {
    extensions: ['', '.js', '.ts']
},
module: {
    loaders: [
        {
            test: /\.ts$/,
            loaders: ['awesome-typescript-loader', 'angular2-template-loader']
        },
        {
            test: /\.html$/,
            loader: 'html'
        },
        {
            test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
            loader: 'file?name=assets/images/[hash].[ext]'
        },
        {
            test: /\.(woff|woff2|ttf|eot|ico)$/,
            loader: 'file?name=assets/fonts/[hash].[ext]'
        },
        {
           test: /\.css$/,
           loaders: ['to-string-loader', 'css-loader']
        }
    ]
}, 
plugins: [
    new webpack.optimize.CommonsChunkPlugin({
        name: ['app', 'vendor', 'polyfills']
    }),
    new HtmlWebpackPlugin({
        template: 'client-src/index.html'
    })
]
};