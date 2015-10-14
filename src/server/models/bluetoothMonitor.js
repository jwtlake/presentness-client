'use strict';

//** Dependencies **//

function bluetoothMonitor(deviceList) {
    this.deviceList = deviceList;
};

//** Prototypes **//
bluetoothMonitor.prototype.start = function() {
    //console.log('bluetooth mon started');
};

//** Functions **//

// export
module.exports = bluetoothMonitor;
