'use strict';

// libary for settings
var nconf = require('nconf');

// example settings
var defaults = {
	server:{
		ip: '192.168.0.105',
		port: 3001
	}
};

// set default settings
nconf.defaults(defaults);

// TODO# add enviorments and hidden connection strings

// export
module.exports = nconf;
