var request = require('request');

//** Object **//
function deviceList(serverSettings){
	this.server = serverSettings.ip + ':' + serverSettings.port;
	this.list = [];
};

//** Exports **//
module.exports = deviceList;

/** Prototyes **/ 
deviceList.prototype.getLatest = function() {
	console.log('Getting latest device list..');
	var thisObject = this;
	var options = {
		uri: 'http://'+ this.server +'/api/devicelist',
		method: 'GET',
		timeout: 10000
	};
	request(options, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
		//console.log(body);
		thisObject.list = JSON.parse(body);
		console.log('Device list updated!');
	  } else {
	  	console.log('Error getting device list from server. ' + error);
	  }
	});
};