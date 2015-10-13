'use strict';

//** Dependencies **//
var ping = require('ping');

function pingMonitor(deviceList) {
        this.deviceList = deviceList;
};

//** Prototypes **//
pingMonitor.prototype.start = function() {
	console.log('ping mon started');	
};

//** Functions **//

// export
module.exports = pingMonitor;

