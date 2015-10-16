'use strict';

/** Dependencies **/
//var settings = require(appRoot + '/src/server/config/settings');
var _ = require('lodash');
var arpMonitor = require(appRoot + '/src/server/models/arpMonitor');
var pingMonitor = require(appRoot + '/src/server/models/pingMonitor');
var bluetoothMonitor = require(appRoot + '/src/server/models/bluetoothMonitor');

//** Oject **//
function deviceMonitor(deviceList) {
	this.deviceList = deviceList;
	this.arpMon = new arpMonitor(this.deviceList); 
	this.pingMon = new pingMonitor(this.deviceList);
	this.bluetoothMon = new bluetoothMonitor(this.deviceList);
};

//** Exports **//
module.exports = deviceMonitor;

//** Prototypes **//
deviceMonitor.prototype.start = function() {
	this.arpMon.start();
	this.pingMon.start();
	this.bluetoothMon.start();		
};

deviceMonitor.prototype.reportCurrent = function() {
	console.log('------------------------');
	var dList = this.deviceList.list;
	var now = new Date();
	_.forEach(dList, function(n) {
		var diffInSeconds = 'NA';
		if(n.lastSeen !== null){ diffInSeconds = ((now - new Date(n.lastSeen)) / 1000).toFixed(0); }
		console.log('alias: ' + n.alias + ' isPresent: ' + n.isPresent + ' lastSeen(seconds): ' + diffInSeconds);	
	});
};