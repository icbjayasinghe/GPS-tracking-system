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
    //var testData = "080400000113fc208dff000f14f650209cca80006f00d60400040004030101150316030001460000015d0000000113fc17610b000f14ffe0209cc580006e00c0050001000403010115 0316010001460000015e0000000113fc284945000f150f00209cd200009501080400000004030101150016030001460000015d0000000113fc267c5b000f150a50209cccc0009300680400000004030101150016030001460000015b0004";    
    //fullDataSplit.splitData(testData);
});