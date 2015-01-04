var express = require('express');
var app = express();
var port = process.env.PORT||8080;
var router = require('./routes');
var path = require('path');
var bodyParser = require('body-parser');

//static middleware added
app.use(express.static(path.join(__dirname, 'public')));
//to support req.body
app.use(bodyParser.json());
//set root path
app.use('/',router);
app.listen(port, function(){
  console.log('WJ Express started on port' + port);
});


