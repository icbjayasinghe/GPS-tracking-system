var express = require('express');
//var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config/config'); 

const app = express();

//connect to mongoose
mongoose.connect(config.database);
var db = mongoose.connection;

app.use(bodyParser.json());

app.all('/*', function(req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
      res.status(200).end();
    } else {
      next();
    }
  });
  
 
app.use('/', require('./controllers'));
app.use('/CheckPointLocation', require('./controllers/checkPointLocation'));

const port = 3000;

app.get('/',function(req,res){
    res.send("Hello world");
});

app.listen(port, function(){
    console.log("connected");
});