var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config/config');
var session = require('express-session');
var fullDataSplit = require('./controllers/trackingContoller');

const app = express();
mongoose.connect(config.database,{useNewUrlParser:true});
var db = mongoose.connection;

app.use(bodyParser.json());
app.use(session({secret: 'mysupersecret', resave: false, saveUninitialized: false}));

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

const port = 3000;

app.get('/',function(req,res){
    res.send("Hello world");
});

app.listen(port, function(){
    console.log("connected");
    
    fullDataSplit.timeStamp();
    // var rowData = "080400000113fc208dff000f14f650209cca80006f00d6040004000403010115031603000 1460000015d0000000113fc17610b000f14ffe0209cc580006e00c0050001000403010115 0316010001460000015e0000000113fc284945000f150f00209cd20000950108040000000 4030101150016030001460000015d0000000113fc267c5b000f150a50209cccc000930068 0400000004030101150016030001460000015b0004";
    // console.log(rowData.substring(0,20));
});