'use strict';

/** Dependencies **/ 
var settings = require(appRoot + '/src/server/config/settings');
var deviceList = require(appRoot + '/src/server/models/deviceList');
var deviceMonitor = require(appRoot + '/src/server/models/deviceMonitor');

//get latest device list from server
var serverInfo = settings.get('server');
var dList = new deviceList(serverInfo);
dList.getLatest();

//start device monitor
var dMonitor = new deviceMonitor(dList);
dMonitor.start();

//repr
setInterval(function() { dMonitor.reportCurrent(); }, 5000); 