'use strict';

/** Dependencies **/
//var settings = require(appRoot + '/src/server/config/settings');
var arpMonitor = require(appRoot + '/src/server/models/arpMonitor');
var pingMonitor = require(appRoot + '/src/server/models/pingMonitor');
var bluetoothMonitor = require(appRoot + '/src/server/models/bluetoothMonitor');

// constructor
function deviceMonitor(deviceList) {
	this.deviceList = deviceList;
	this.arpMon = new arpMonitor(this.deviceList); 
	this.pingMon = new pingMonitor(this.deviceList);
	this.bluetoothMon = new bluetoothMonitor(this.deviceList);
};

//** Prototypes **//
deviceMonitor.prototype.start = function() {
	this.arpMon.start();
	this.pingMon.start();
	this.bluetoothMon.start();		
};

// export
module.exports = deviceMonitor;
