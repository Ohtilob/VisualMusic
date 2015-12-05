var currentIP = '192.168.1.136';
var express = require('express');
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
