'use strict';

// Set app root
global.appRoot = require('path').resolve(__dirname);

// Export server
module.exports = require(appRoot + '/src/server');
