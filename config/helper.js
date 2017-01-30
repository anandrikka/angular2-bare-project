'use strict';

var path = require('path');

var rootDir = path.join(__dirname, './../');

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [rootDir].concat(args));
}

module.exports = {
    root: root
};