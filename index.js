'use strict';

// Set app root
global.appRoot = require('path').resolve(__dirname);

/** Dependencies **/ 
var settings = require(appRoot + '/config/settings');
var arpListener = require('arp-listener');
var request = require('request');
var ping = require('ping');
//var _ = require('lodash');

/** Local Variables **/
var server = settings.get('server:ip') + ':' + settings.get('server:port');
var devicelist = [];

// Get device list from server
getDeviceList(server,test);

/** Functions **/ 
function getDeviceList(server,callback) {
	var options = {
		uri: 'http://'+ server +'/api/devicelist',
		method: 'GET',
		timeout: 10000
	};
	request(options, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    // console.log(body);
	    devicelist = body;
	    callback();
	  }
	});
};

function test(){
	console.log('test');
	console.log(devicelist);
};
