'use strict';

//** Dependencies **//
var arpListener = require('arp-listener');

function arpMonitor(deviceList) {
	this.deviceList = deviceList;
};

//** Prototypes **//
arpMonitor.prototype.start = function() {
	var thisObject = this;
	// start arpListener **add settings for which lan to listen to
	console.log('arp mon started');
        
	//arpListener('wlan0',arpListenerHandler(arpData));
	arpListener('wlan0',function(arpData){arpListenerHandler(arpData);});
};

//** Functions **//
function arpListenerHandler(arpData) {
	var sender_mac = arpData.sender_ha.toUpperCase(); // arp table
	console.log(sender_mac);
};

function test(){console.log('test');};


// export
module.exports = arpMonitor;
