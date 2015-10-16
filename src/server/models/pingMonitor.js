'use strict';

//** Dependencies **//
var webLogger = require(appRoot + '/src/server/models/webLogger');
var ping = require('ping');
var _ = require('lodash');

//** Oject **//
function pingMonitor(deviceList) {
    this.deviceList = deviceList;
    this.timeoutInterval = 60000 * 5; //consider offline after x min inactive **not quite true
};

//** Exports **//
module.exports = pingMonitor;

//** Prototypes **//
pingMonitor.prototype.start = function() {
	var self = this;
	_scanDeviceList.call(self); //looping scan
};

//** Private Functions **//
function _scanDeviceList() {	
	console.log('ping scan started');	
	var self = this;
	var dList = this.deviceList.list;
	var timeout = this.timeoutInterval;
	var minNextCheck = timeout;

	//check device list
	_.forEach(dList, function(n) {
		//ignore dissabled
		if(n.enabled === false) {return;}

		//ignore offline devices *arpMonitor will catch new logins
		if(n.isPresent === true) {	

			//ignore devices with no ip
			if(n.ip === '' || n.ip === '0.0.0.0') {return;}

			//get time vars			
			var now = new Date();
			var lastSeen = new Date(n.lastSeen); //should result in min date if null
			var nextCheck = new Date(lastSeen.getTime() + timeout); // lastSeen + timeout int

			//ping device only after timeout int
			if(nextCheck < now) {
				
				//ping device
				var deviceIp = n.ip;
				ping.sys.probe(deviceIp, function(isAlive){
					if(isAlive){
						console.log(n.alias +': Needs refreshing!');
						console.log('its allive!');
						n.lastSeen = now;
					}else{
						console.log(n.alias +': Needs refreshing!');
						console.log('its dead!');
						n.isPresent = false;
					}
					//debugging always report
					webLogger.sendUpdate(n);
				});
			}else{
				//set next time to check (lowest of all devices in list)
				var timeTillNextCheck = nextCheck - now;
				minNextCheck = Math.min(minNextCheck,timeTillNextCheck);
			}
		}
	});

	//scan again in minNextCheck
	setTimeout(function() { _scanDeviceList.call(self); }, minNextCheck);
};