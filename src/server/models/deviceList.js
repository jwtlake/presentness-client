var request = require('request');

// constructor
function deviceList(serverSettings){
	this.server = serverSettings.ip + ':' + serverSettings.port;
	this.list = [];
};

/** Functions **/ 
deviceList.prototype.getLatest = function() {
	var thisObject = this;
	var options = {
		uri: 'http://'+ this.server +'/api/devicelist',
		method: 'GET',
		timeout: 10000
	};
	request(options, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
		//console.log(body);
		thisObject.list = body;
	  }
	});
};

// export
module.exports = deviceList;
