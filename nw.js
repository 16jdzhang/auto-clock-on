var Service = require('node-windows').Service;
var path = require('path');
var alert = require('./alert').alert;

// Create a new service object
var svc = new Service({
  name:'auto clock on',
  script: path.join(__dirname, 'index.js'),
});
 
// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
  alert('自动打卡启动了！')
});
 
svc.install();