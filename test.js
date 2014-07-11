//sets global variable to check if connection failed by not returning a connectionId
var connectionId = -1

//gets the path of the serial port we want to connect to
function getPortPath(ports) {
    var div = document.getElementById('serial-port');
    var portPath = ports[5].path
    div.innerHTML = portPath;
}

//Sets connection status oh html
function setConnectionStatus(connectionId, successStatus) {
  var statusDiv = document.getElementById('status')

  if (connectionId == -1) {
    statusDiv.innerHTML = 'Connection failed!'
  }
  else if (connectionId > 0) {
    statusDiv.innerHTML = successStatus + ' with connection ID: ' + connectionId
  }
}

//tell App what to on succesful connection to serial port
function onOpen(openData) {
  var connectionId = openData.connectionId;
  setConnectionStatus(connectionId, 'Succesfully connected');
}

//opens serial connection
function openPort() {
  var connectedPort = document.getElementById('serial-port').innerHTML
  chrome.serial.connect(connectedPort, onOpen);
}

chrome.serial.getDevices(function(ports) {
  getPortPath(ports);
  openPort();
});
