//sets global variable to check if connection failed by not returning a connectionId
var connectionId = -1

function sendData(connectionId, bytes) {
  var buffer = new ArrayBuffer(bytes);
  chrome.serial.send(connectionId, buffer, function(sendInfo) {console.log(sendInfo) })
}

//Sets connection status on window
function setConnectionStatus(connectionId, successStatus) {
  var statusDiv = document.getElementById('status')

  if (connectionId == -1) {
    statusDiv.innerHTML = 'Connection failed!'
  }
  else if (connectionId > 0) {
    statusDiv.innerHTML = successStatus + ' Connection ID: ' + connectionId
  }
}

//tell App what to do on succesful connection
function onOpen(openData) {
  var connectionId = openData.connectionId;
  setConnectionStatus(connectionId, 'Succesfully connected');
  chrome.serial.onReceive.addListener(function(info) {console.log(info)})
}

//opens serial connection
function openPort() {
  var connectedPort = document.getElementById('serial-port').innerHTML
  chrome.serial.connect(connectedPort, onOpen);
}

//gets the path of the serial port we want to connect to
function getPortPath(ports) {
    var div = document.getElementById('serial-port');
    var portPath = ports[5].path
    div.innerHTML = portPath;
}

//Runs shit!
chrome.serial.getDevices(function(ports) {
  getPortPath(ports);
  openPort();
});
