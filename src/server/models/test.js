var appRoot = '../../..';
var settings = require(appRoot + '/src/server/config/settings');
var deviceList = require(appRoot + '/src/server/models/deviceList');
var pingMonitor = require(appRoot + '/src/server/models/pingMonitor');

//get latest device list from server
var serverInfo = settings.get('server');
var dList = new deviceList(serverInfo);
dList.getLatest();

//start device monitor
var pMonitor = new pingMonitor(dList);
pMonitor.start();