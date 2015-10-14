'use strict';

/** Dependencies **/
var settings = require(appRoot + '/src/server/config/settings');
var request = require('request');

//** Exports **//
module.exports = {
	sendUpdate: function(update){
		//get server info
		var server = settings.get('server:ip') + ':' + settings.get('server:port');
		var postURL = 'http://'+ server +'/api/device/'+ alias;
		var postData = update;

		var alias = update.alias; //need to come up with a primary key. Would like to use mac but : char might cause problems
		// var macAddress = update.macAddress;
		// var ip  = update.ip;
		// var isPresent = update.isPresent;
		// var lastSeen = update.lastSeen;

		console.log('Sending Update for: ' + alias);
		console.log('Data: ' + postData);

		//send update to server
		request.post({
			url: postURL,
			form: postData
		}, function(err, httpResponse, body) {
			if(err){
				console.log('Error: ' + err);
			}
			else{
				console.log('Success!');
			}
		});
	}
}
