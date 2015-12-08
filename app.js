var currentIP = '172.30.200.86';
var express = require('express');
var WebSocketServer = require("websocketserver");
var app = express();

app.set('view engine', 'jade');
// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

var server = app.listen(3000, currentIP, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

//app.use('/', express.static(__dirname + '/'));
app.use('/css',express.static( __dirname + '/css'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));



app.get('/', function(req, res){
    res.render('index', {title:'Christmas'});
});

//var wss = new WebSocketServer({server: server});
var wss = new WebSocketServer("none", 3001);
console.log("websocket server created");

var connectionList = [];
wss.broadcast = function(data) {
  for (var i in this.clients)
    this.connectionList[i].send(data);
};

wss.on("connection", function(ws) {
    console.log("client connected");
    connectionList.push(ws);
    //wss.sendMessage("one", "Hello Client", ws);
});

wss.on("message", function(data, id) {
    var mes = wss.unmaskMessage(data);
    var str = wss.convertToString(mes.message);
    //console.log("message: Start|" + str.trim() + "|End");
    if (str.trim() !== "") {
      var array = JSON.parse("[" + str + "]");
      wss.sendMessage("others", array.toString(), id);
      // var i;
      // for(i = 0; i < connectionList.length; i++) {
      //   var a = array;
      //   // if (i === 1) {
      //   //   //console.log("For Client 1");
      //   //   a.forEach(function(item, i) { if (item <= 0 || item >= 100) a[i] = 0; });
      //   // } else {
      //   //   //console.log("For Client 2");
      //   //   a.forEach(function(item, i) { if (item <= 101 || item >= 255) a[i] = 0; });
      //   // }
      //
      //
      //   wss.sendMessage("one", a.toString(), connectionList[i]);
      // }
    }

});

wss.on("closedconnection", function(id) {
  console.log("Client " + id + " has left the server");
  for(var i = connectionList.length-1; i >= 0; i--){
      if(connectionList[i] == id){
          connectionList.splice(i,1);
      }
  }
});
