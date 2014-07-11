chrome.serial.getDevices(function(ports) {
  var numberOfPorts = ports.length
  for(i=0; i < numberOfPorts; i++) {
    console.log(ports[i].path);
  }
})
