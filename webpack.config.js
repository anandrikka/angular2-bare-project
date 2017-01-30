'use strict';

const path = require('path');
const args = require('yargs').argv;

// List of allowed environments
const allowedEnvs = ['dev', 'dist', 'test'];

// Set the correct environment
var env = args.env;
if(!env) {
    env = 'dev';
}

process.env.ANGULAR_WEBPACK_ENV = env;

/**
 * Build the webpack configuration
 * @param  {String} wantedEnv The wanted environment
 * @return {Object} Webpack config
 */
function buildConfig(wantedEnv) {
    const isValid = wantedEnv && wantedEnv.length > 0 && allowedEnvs.indexOf(wantedEnv) !== -1;
    const validEnv = isValid ? wantedEnv : 'dev';
    const configPath = path.join(__dirname, 'config/' + validEnv);
    const config = require(configPath);
    return config;
}

module.exports = buildConfig(env);


//module.exports = require('./config/webpack.dev.config.js');

// function root(args) {
//   args = Array.prototype.slice.call(arguments, 0);
//   return path.join.apply(path, [__dirname].concat(args));
// }