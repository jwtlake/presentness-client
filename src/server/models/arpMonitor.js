'use strict';

//** Dependencies **//
var webLogger = require(appRoot + '/src/server/models/webLogger');
var arpListener = require('arp-listener');
var _ = require('lodash');

//** Oject **//
function arpMonitor(deviceList) {
	this.deviceList = deviceList;
};

//** Exports **//
module.exports = arpMonitor;

//** Prototypes **//
arpMonitor.prototype.start = function() {
	//start listener
	var self = this;
	arpListener('wlan0', function(arpData) {
		_eventHandler.call(self,arpData);
	});
};

//** Private Functions **//
function _eventHandler(arpData) {
	
	//get mac and ip address
	var sender_mac = arpData.sender_ha.toUpperCase();
	var sender_ip = arpData.sender_pa.toString();
	
	//ignore ip requests
	if(sender_ip === '0.0.0.0') { return;}

	//lookup in devicelist
	var dList = this.deviceList.list;
	_.forEach(dList, function(n) {
		//check for match
		if(n.macAddress.toUpperCase() === sender_mac) {
			//ignore dissabled
			if(n.enabled === false) {return;} 
			
			console.log('**arp found: ' + n.alias);

			//update device object
			n.isPresent = true;
			n.lastSeen = new Date(); 
			n.ip = sender_ip;

			//debugging always report
			webLogger.sendUpdate(n);
		}
	});
};