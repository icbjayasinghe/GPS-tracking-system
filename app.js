var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config/config');
var session = require('express-session');
var fullDataSplit = require('./controllers/trackingContoller');
const net = require('net');
var http = require('http');


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


//socket setup
var server = net.createServer();
var IMIE;
server.on("connection", function(socket){
    var remoteAddress = socket.remoteAddress +":"+ socket.remotePort;
    console.log("New client connection made %s ", remoteAddress);
  
    socket.on("data", function(d){
        var size= d.length.valueOf();
        //console.log(size)
        if(size==17){
            console.log("IMIE : %s  ",d );
            IMIE = d.toString();
            //console.log(IMIE);
            socket.write("");
        }
        else {
            //console.log(d.length);
            //console.log(d.toString("hex"));
           
            
            console.log(fullDataSplit.splitData(d.toString("hex")));
            console.log(fullDataSplit.getNoOfData(d.toString("hex")));
            var noOfData =fullDataSplit.getNoOfData(d.toString("hex"));
            var buf = new Buffer(4);
            buf.writeInt32BE(noOfData);
            socket.write(buf);
            //console.log("${noOfData}");

        }
      
      
    });
  
    socket.once("close", function(){
      console.log("Connection from %s deleted ", remoteAddress)
    });
  
    socket.on("error", function(err){
      console.log(err);
    })
  });

  server.listen(1245, function(){
    console.log("Port 1245 is open, server listening to %j", server.address());
  })

app.listen(port, function(){
    console.log("connected");
    //var testData = "00000000000000e40805000001666c5519b8012f9ce61b04192c890003000006000042060301004501f00003420fa2180000430efe000000000166680bf08e012f9ccf0004191e65006600f60a000518060301004501f00003420050180005430fad0000000001666809f888012f9ceb2b0419306a001a000009000042060301004501f0000342048b180000430fde00000000016662e11fc6012f9ce36f04192002002300db08000318060301004501f00003420050180003430efe00000000016662df4e94012f9ccab2041930760009000005000042060301004501f00003420c0a180000430f3b000005000019fb";
    //var testData = "080400000113fc208dff000f14f650209cca80006f00d60400040004030101150316030001460000015d0000000113fc17610b000f14ffe0209cc580006e00c0050001000403010115 0316010001460000015e0000000113fc284945000f150f00209cd200009501080400000004030101150016030001460000015d0000000113fc267c5b000f150a50209cccc0009300680400000004030101150016030001460000015b0004";    
    //console.log(fullDataSplit.splitData(testData));
    //console.log('Hi'+veiwVehicle.userVehicles());
    // console.log(fullDataSplit.splitData(testData));
});


