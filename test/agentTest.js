const ip = require('ip').address();
const assert = require('assert');
const config = require('../src/config/config');
const adapter = require('../src/simulator/adapter');
const device = require('../src/simulator/device');
const fileServer = require('../src/simulator/fileserver');
const { filePort, machinePort } = config.app.simulator;
const { start, stop } = require('../src/agent');

describe.skip('Agent', () => {
  let deviceT;
  let filesT;

  before(function *setup() {
    adapter.start();
    yield start();
    yield new Promise((success) => (deviceT = device.listen(machinePort, ip, success)));
    yield new Promise((success) => (filesT = fileServer.listen(filePort, ip, success)));
  });


  after(() => {
    stop();
    adapter.stop();
    deviceT.close();
    filesT.close();
  });
});
