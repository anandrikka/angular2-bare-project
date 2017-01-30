'use strict';

var path = require('path');
var defaultSettings = require('./defaults');
var root = require('./helper').root;

module.exports = {
    additionalPaths: defaultSettings.additionalPaths,
    port: defaultSettings.port,
    entry: {
        'polyfills': [root('src/polyfills.ts')],
        'vendor': root('src/vendor.ts'),
        'app': [root('src/main.ts')]
    },
    resolve: {
        extensions: ['', '.js', '.ts'],
        root: path.resolve(root('src/app')),
        alias: { // todo: Need to check why it's not working
            config: `${defaultSettings.srcPath}/cfg/` + process.env.ANGULAR_WEBPACK_ENV
        }
    }
};