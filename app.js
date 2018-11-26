var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config/config');
var session = require('express-session');
var fullDataSplit = require('./controllers/trackingContoller');
var addTracking = require('./controllers/vehicleController');
const net = require('net');
var http = require('http');
var Vehicle = require('./models/vehicle');
var passport = require('passport');
var CommonFacade = require('./controllers/commonFacade');
var History = require('./controllers/historyController');

const app = express();
const cors = require('cors');
var schedule = require('node-schedule');

app.use(cors());
mongoose.connect(config.database,{useNewUrlParser:true});
var db = mongoose.connection;

app.use(bodyParser.json());
app.use(session({secret: config.secret, resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

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
var subArr= [];//contain with remortPort and IMEI number
var mainArr= [];// constain with subArrs.
server.on("connection", function(socket){
    var remoteAddress = socket.remoteAddress +":"+ socket.remotePort;
    console.log("New client connection made %s ", remoteAddress);
    socket.on("data", function(d){
        //var IMIE;
        for(i=0;i<mainArr.length;i++){
            console.log(mainArr[i][0]);
        }
        var size= d.length.valueOf();
        if(size==17){
            console.log("IMIE : %s  ",d );
            var IMIE = d.toString().substring(2,17);
            Vehicle.checkImei(IMIE,function(err,data){
                if(data==true){
                    socket.write("");
                    var state= false;
                    for(i=0;i<mainArr.length;i++){
                        if(mainArr[i][0]==socket.remotePort){
                            state = true;
                            return;
                        }
                    }
                    if(state==false){
                        subArr[0]=socket.remotePort;
                        subArr[1]=IMIE;
                        mainArr[mainArr.length]=subArr;
                    }
                }
                else{
                    console.log({success: false, msg: err});
                }
            });
        }
        else {          
            console.log(fullDataSplit.splitDataNew(d.toString("hex")));
            console.log(fullDataSplit.getNoOfData(d.toString("hex")));
            var noOfData =fullDataSplit.getNoOfData(d.toString("hex"));
            
            var dataObj;
            for(i=0;i<mainArr.length;i++){
                remPort = socket.remotePort;
                if(mainArr[i][0]==remPort){
                    console.log(mainArr[i][1])
                    dataObj = { 

                        imeiNumber:mainArr[i][1],
                        data:d.toString("hex")
                    }
                    //data to database
                    addTracking.addTrackingData3(dataObj);
                    mainArr.splice(i, 1);
                    //return;
                    console.log("buf eka langa " +socket.remotePort);
                    var buf = new Buffer(4);
                    buf.writeInt32BE(noOfData);
                    socket.write(buf);
                }
                else{
                    console.log("aul , "+socket.remotePort);
                }
            }
            
            // for(i=0;i<mainArr.length;i++){
            //     if(mainArr[i][0]==remPort){
            //         //console.log(mainArr[i][1])
            //         mainArr.splice(i, 1);
            //         return;
            //     }
            // }
            //data obj    
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

    var j = schedule.scheduleJob('00 00 00 * * *', function(req, res){
        CommonFacade.create(req, res);
        // var date  = new Date;
        // console.log('date : '+date+' @ app.js');
    });
       
});