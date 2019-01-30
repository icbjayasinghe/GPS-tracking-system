var History  = require('../models/history');
var moment = require('moment');
var CommonFacade = require('./commonFacade');
var Duration = require('duration');

var history = {
    
    create : function(req,res) {
        CommonFacade.createHistory(req, res);
    },

    getHistory: function(req,res){
        History.getAll(function(err, history){
            if (err){
                res.json({success:false, msg:err});
            }
            res.json(history);
        });
    },

    getHistoryByUser: function(req,res){
        var userId = req.params.userId; 
        History.historyByUser(userId, function(err, historyRes){
            if (err){
                res.json({success:false, msg:err});
            }
            res.json(historyRes);
        });
    },

    getHistoryByVehicle : function(req, res){
        var vehicleNumber = req.params.vehicleNumber;
        var date = req.params.date;
        History.getHistory(vehicleNumber,date, function(err, historyRes){
            if (err){
                res.json({success:false, msg:err});
            }
            res.json(historyRes);
        });
    },

    searchHistory: function(req, res){
        var d = new Date(req.body.dateFrom); // Today!
        d.setDate(d.getDate() + 1);
        var date = d.toISOString();

        var day =date.substring(0,10);
        const searchDetails = {
            vehicleNumber: req.body.vehicleNumber,
            date: day
        };

        History.searchHistory(searchDetails, function(err, historyRes){
            if (err){
                res.json({success:false, msg:err});
            }
            else if (historyRes.length === 0) {
                res.json({success:false, msg: 'Sorry No History Data avalable '+searchDetails.vehicleNumber});
            } else {
                res.json({success: true, historyRes});
            }
        });
    },

    calculateDistance: function(req,res){
        History.historyByDate(req,function(err,res){   
            var date = req ;         
            res.forEach(element => { 
                if (err){
                    res.json({success:false, msg:err});
                }
                var trackingDataLength = element.trackingData.length;
                var vehicleNumber = element.vehicleNumber
                var distance = 0;
                var j =0 ;
    
                for (let i = 0; i < trackingDataLength-1; i++) {
                    radconv = 3.14159265358979 / 180;
                    var x1 = element.trackingData[i].latitude * radconv;
                    var y1 = element.trackingData[i].longitude * radconv;
                    var x2 = element.trackingData[i+1].latitude * radconv;
                    var y2 = element.trackingData[i+1].longitude * radconv;  
                    xDiff = x2 -x1;
                    yDiff = y2 -y1;
                    a = ((Math.sin(xDiff / 2) * Math.sin(xDiff / 2)) + (Math.cos(x1) * Math.cos(x2) * Math.sin(yDiff / 2) * Math.sin(yDiff / 2)))
                    c = 2 * Math.atan(Math.sqrt(a) / Math.sqrt(1 - a));
                    R = 6371;
                    dist = R * c
                    distance = distance + dist ;
                    j=i;
                }
                var data = ({
                    vehicleNumber: vehicleNumber,
                    date : req,
                    distance : distance
                });
                console.log('__________________________________');
                console.log(element._id+'/'+vehicleNumber+' has'+(j+2)+' number of tracking data on '+date);
                console.log('Total distance : '+distance);
                console.log('__________________________________');
                CommonFacade.function1(data,function(err,res){
                    if(err){
                        console.log(err);
                      }
                      console.log('add tracking distance');
                })
            });
        });
    },
    
    updateSummary : function(req, res){
        console.log(req);
        History.historyByDate(req,function(err,history){
            if (err){
                console.log(err);
            }
            for (let i = 0; i < history.length; i++){
                setDelay(i)
                function setDelay(i) {
                    setTimeout(function(){
                      console.log(i);
                      CommonFacade.function1(history[i],res);       
                    }, i*2000);
                  }    
            }
        });
    },

    updateHistoryStopDetails : function(date, res){
        History.historyTrackingSpeedByDate(date,function(err,res){
            if (err){
                console.log(err);
            }
            var len = res.length;
            for (i=0;i<len;i++){
                var da = 0;
                var dataArray=[];
                var trackingData = res[i].trackingData;
                var vehicleNumber = res[i].vehicleNumber;
                let k = 0;
                let zeroSpeed = [];
                let l = trackingData.length;
                if (l>2){
                    for (j=0; j<l; j++){
                        if (res[i].trackingData[j].speed===0){
                            zeroSpeed[k]=j
                            k++;
                        }
                    }

                    let zl = zeroSpeed.length;
                    stopedTime = trackingData[zeroSpeed[0]].date
                    for (j=1;j<zl-1;j++){
                        if (zeroSpeed[j]+1 != zeroSpeed[j+1]){
                            startTime = trackingData[zeroSpeed[j]].date;
                            longitude =  trackingData[zeroSpeed[j]].longitude ;
                            latitude =  trackingData[zeroSpeed[j]].latitude ;
                            location = {
                                longitude :longitude,
                                latitude : latitude
                            };
                            let stopedDetails = {} ;
                            stopedDetails.stopedTime = startTime ;
                            stopedDetails.startedTime = stopedTime ;
                            stopedDetails.location = location ;
                            var duration = new Duration(startTime,stopedTime);
                            stopedDetails.duration = duration.minutes ;                        

                            var x = da ;                        
                            if (duration.minutes>5){
                                dataArray[da] = stopedDetails;
                                da++;
                            }

                            stopedTime = trackingData[zeroSpeed[j+1]].date
                        }
                    }

                    if (stopedTime != null){
                        startTime = trackingData[zeroSpeed[zl-1]].date;
                        longitude =  trackingData[zeroSpeed[zl-1]].longitude,
                        latitude =  trackingData[zeroSpeed[zl-1]].latitude
                        location = {
                            longitude :longitude,
                            latitude : latitude
                        };
                        let stopedDetails = {} ;
                        stopedDetails.stopedTime = startTime ;
                        stopedDetails.startedTime = stopedTime ;
                        stopedDetails.location = location ;
                        var duration = new Duration(startTime,stopedTime);

                        stopedDetails.duration = duration.minutes ;                        
                        if (duration.minutes>5){
                            dataArray[da] = stopedDetails;
                            da++;
                        }
                    }

                    console.log(dataArray)

                    History.updateMany({'vehicleNumber': vehicleNumber},{'$push': { stopDetails:{ '$each':dataArray, '$sort':{stopedTime:-1}}}}, function (err){
                        if (err) {
                            console.log({ success: false, message: "error"+err });
                        } else {
                            console.log({ success: true, message: "successfully added new stoped details" });
                        }
                    });
                }
            }
        });
    },

    updateOverSpeedTrackingData :function(date,res){
        History.historyTrackingSpeedByDate(date,function(err,res){
            if (err){
                console.log(err);
            }

            let numberOfHistoryVehicles = res.length;

            for(i=0 ; i<numberOfHistoryVehicles; i++){
                var vehicleNumber = res[i].vehicleNumber;
                var trackingData = res[i].trackingData;
                console.log(vehicleNumber);
                var trackingDataLength = trackingData.length
                var k = 0;
                var da = 0 ;
                var overSpeedIndexArray = []
                dataArray = []
                if (trackingDataLength>0){
                    for(j=0;j<trackingDataLength;j++){
                        if (trackingData[j].speed>=60){
                            overSpeedIndexArray[k]=j;
                            k++
                        }
                    }
                    var numberOfOverSpeedData = overSpeedIndexArray.length;
                    if (numberOfOverSpeedData>0){
                        speedUpIndex = overSpeedIndexArray[numberOfOverSpeedData-1] ;
                        console.log(numberOfOverSpeedData-1)
                        speedUpTime = trackingData[speedUpIndex].date;

                        for(j=(numberOfOverSpeedData-1);j>0;j--){
                            if((overSpeedIndexArray[j]-1)!=(overSpeedIndexArray[j-1])){
                                speedDownIndex = overSpeedIndexArray[j] ;
                                speedDownTime = trackingData[speedDownIndex].date; 

                                speededDetails = {}
                                speededDetails.speedUpIndex = speedUpIndex ;
                                speededDetails.speedDownIndex = speedDownIndex;
                                speededDetails.speedUpDetails = trackingData[speedUpIndex] ;
                                speededDetails.speedDownDetails = trackingData[speedDownIndex];
                                dataArray[da] = speededDetails;
                                da++;

                                speedUpIndex = overSpeedIndexArray[j-1] ;
                                speedUpTime = trackingData[speedUpIndex].date;

                            }
                        }

                        speedDownIndex = overSpeedIndexArray[0] ;
                        speedDownTime = trackingData[speedDownIndex].date;
                        speededDetails = {}
                        speededDetails.speedUpIndex = speedUpIndex ;
                        speededDetails.speedDownIndex = speedDownIndex;
                        speededDetails.speedUpDetails = trackingData[speedUpIndex] ;
                        speededDetails.speedDownDetails = trackingData[speedDownIndex];
                        // start_date = trackingData[speedUpIndex].date;
                        // end_date =trackingData[speedDownIndex].date;
                        // var duration = moment.utc(end_date.diff(start_date));
                        // console.log(duration);
                        dataArray[da] = speededDetails;
                    }  
                    
                    console.log('speededDetails Array : '+dataArray);
                    History.updateMany({'vehicleNumber': vehicleNumber},{'$push': { speededDetails:{ '$each':dataArray}}}, function (err){
                        if (err) {
                            console.log({ success: false, message: "error"+err });
                        } else {
                            console.log({ success: true, message: "successfully added new stoped details" });
                        }
                    });
                }                
            }           
        });
    },

    dynamicOverSpeed : function(req,res){
        var date = req.body.date;
        var vehicleNumber = req.body.vehicleNumber;
        var speed = req.body.speed;
        History.historyTrackingSpeedByDateAndVehicle(date,vehicleNumber,function(err,hisRes){
            console.log('res : '+hisRes);
            if (err){
                res.json({success:false, msg: 'Something went wrong! Try again'});
            }if (!hisRes){
                res.json({success:false, msg: 'No Speed Details available'});
            }
            else{
                var trackingData = hisRes.trackingData
                let n = trackingData.length;
                var k= 0;
                var da = 0 ;
                var overSpeedIndexArray = []
                var dataArray = [];
                console.log(n);

                if (n>0){
                    for(j=0;j<n;j++){
                        if (trackingData[j].speed>=speed){
                            overSpeedIndexArray[k]=j;
                            k++
                        }
                    }
                    var numberOfOverSpeedData = overSpeedIndexArray.length;
                    if (numberOfOverSpeedData>0){
                        speedUpIndex = overSpeedIndexArray[numberOfOverSpeedData-1] ;
                        console.log(numberOfOverSpeedData-1)
                        speedUpTime = trackingData[speedUpIndex].date;
                        for(j=(numberOfOverSpeedData-1);j>0;j--){
                            if((overSpeedIndexArray[j]-1)!=(overSpeedIndexArray[j-1])){
                                speedDownIndex = overSpeedIndexArray[j] ;
                                speedDownTime = trackingData[speedDownIndex].date; 
                                speededDetails = {}
                                speededDetails.speedUpIndex = speedUpIndex ;
                                speededDetails.speedDownIndex = speedDownIndex;
                                speedUpDetails = trackingData[speedUpIndex] ;
                                speedDownDetails = trackingData[speedDownIndex];
                                speededDetails.speededTime = speedUpDetails.date;
                                var duration = new Duration(speedUpDetails.date,speedDownDetails.date);                                
                                speededDetails.duration = duration.toString(" %Hs:%M:%S") ;
                                dataArray[da] = speededDetails;
                                da++;
                                speedUpIndex = overSpeedIndexArray[j-1] ;
                                speedUpTime = trackingData[speedUpIndex].date;
                            }
                        }
                        speedDownIndex = overSpeedIndexArray[0] ;
                        speedDownTime = trackingData[speedDownIndex].date;
                        speededDetails = {}          
                        speededDetails.speedUpIndex = speedUpIndex ;
                        speededDetails.speedDownIndex = speedDownIndex;
                        speedUpDetails = trackingData[speedUpIndex] ;
                        speedDownDetails = trackingData[speedDownIndex]; 
                        speededDetails.speededTime = speedUpDetails.date;
                        var duration = new Duration(speedUpDetails.date,speedDownDetails.date);
                        speededDetails.duration = duration.toString("%Hs:%M:%S") ;
                        dataArray[da] = speededDetails;
                    }
                    console.log(dataArray);
                }
                res.json({success:true, msg: 'Access Speed Dynamically!', amount: dataArray.length, overSpeedData:dataArray});
            }

        });
        
    },

    dynamicOverSpeedPath : function(req,res){
        vehicleNumber =req.body.vehicleNumber;
        date = req.body.date;
        speedUpIndex = req.body.speedUpIndex;
        speedDownIndex = req.body.speedDownIndex;
        var dataArray = [];
        var da = 0;
        History.getHistory(vehicleNumber,date,function(err,historyRes){
            if (err){
                console.log('err');
                res.json({success: false, msg: 'Something Wrong, Try Again!'});
            }
            if (!historyRes) {
                res.json({success: false, msg: 'Sorry, No Report Data in ' + vehicleNumber});
            }
            else{
                for (i=speedDownIndex; i<speedUpIndex; i++){
                    dataArray[da] = historyRes.trackingData[i]
                    console.log(i);
                    da++;
                }
                res.json({success:true, msg: 'Access Over Speed Path', overSpeedPath:dataArray});

            }
        })
    },

    getReport : function(req,res){
        // vehicleNumber = 'wp LF 2512'
        // date = '2019-01-24'
        vehicleNumber =req.params.vehicleNumber;
        date = req.params.date;
        History.getHistory(vehicleNumber,date,function(err,historyRes) {
            if (err) {
                console.log('err');
                res.json({success: false, msg: 'Something Wrong, Try Again!'});
            }
            history = {};
            reports = {};
            overSpeedData = {};
            stopDetails = [];
            if (!historyRes) {
                res.json({success: false, msg: 'Sorry, No Report Data in ' + vehicleNumber});
            }  else {
                var startTime = historyRes.stopDetails[0].stopedTime;
            for (i = (historyRes.trackingData.length - 1); i > 0; i--) {
                //console.log(historyRes.trackingData[i]);
                if (historyRes.trackingData[i].speed > 0) {
                    startTime = historyRes.trackingData[i].date;
                    i = 0;
                }
            }
            //console.log(history);
            history.reports = reports;
            history.overSpeedData = overSpeedData;
            history.stopDetails = historyRes.stopDetails;

            reports.distance = historyRes.distance;
            reports.startTime = startTime;
            reports.stopTime = historyRes.stopDetails[0].stopedTime;
            reports.avarageSpeed = historyRes.avarageSpeed;

            overSpeedData.speedingTime = historyRes.speededDetails.length;
            overSpeedData.overSpeedAvg = historyRes.avarageOverSpeed;
            overSpeedData.highestSpeed = historyRes.highestSpeed;
            stopDetails = historyRes.stopDetails;
            console.log(history.stopDetails);
            //res.json({success: true, history, msg: 'Allowed Access Vehicle Report'});
        }

        });

    },

    calculateAvgSpeed : function(req, res){
        date = req ;
        History.historyTrackingSpeedByDate(date, function(err,historyRes){
            if (err){
                console.log(err);
            }
            console.log(historyRes.length)
            let len = historyRes.length ;
            for (i=0; i<len; i++){
                //console.log(historyRes[i].trackingData);
                let trackingData = historyRes[i].trackingData;
                let trackingLen = trackingData.length;
                var vehicleNumber = historyRes[i].vehicleNumber;
                var speed = 0 ;
                var overSpeedAvg = 0;
                var highestSpeed = 0;
                var num = 1;
                var overSpeedNum = 1;
                var avarageSpeed =0;
                var avarageOverSpeed = 0;

                for(j=0;j<trackingLen;j++){
                    if (trackingData[j].speed!=0){
                        speed = speed +trackingData[j].speed ;
                        num++;
                    }
                    if (trackingData[j].speed>60){
                        overSpeedAvg = overSpeedAvg +trackingData[j].speed ;
                        overSpeedNum++;
                    }
                    if (trackingData[j].speed>highestSpeed){
                        highestSpeed = trackingData[j].speed ;
                    }
                    if(j==trackingLen-1){
                        if(num>1){
                            var avarageSpeed = speed/(num-1);
                        }
                        
                        if(overSpeedNum>1){
                            avarageOverSpeed = overSpeedAvg/(overSpeedNum-1);
                        }
                        
                    }                    
                }

                History.updateHistoryReportingData(vehicleNumber, date, avarageSpeed, avarageOverSpeed, highestSpeed, function(err, res){
                    if(err){
                      console.log(err);
                    }
                    console.log('add avg speeds');
                  })
            }
        })
    },

    updateDistance: function(date,vehicleNumber,distance,res){
        History.updateHistoryTrackingDistance1(date,vehicleNumber,distance, function(err, res){
            if (err){
                console.log(err);
            }
            console.log('add distance');
        })        
    },

    deleteHistory : function(req,res){
        var date = req.params.date;
        var vehicleNumber = req.params.vehicleNumber;

        History.deleteHistory(date,vehicleNumber, function(err, res){
            if (err){
                console.log({success: false, msg: 'Something Wrong'});
            }
            else{
                console.log({success: true, msg: 'History data of vehicle '+vehicleNumber+' in date '+date+' deleted'});
            }
        })        
    },

    getBatteryLevel : function(req,res){
        var date = req.body.date;
        var vehicleNumber = req.body.vehicleNumber;
        History.getHistory(vehicleNumber,date,function(err,historyRes) {
            if (err){
                res.json({success: false, msg: 'Something went wrong!'});
            }
            if (!historyRes){
                res.json({success: false, msg: 'No data in selected date'});
            }
            else {
                var batteryArray = [];
                var tempArray =[];
                da = 0 ;
                var len = historyRes.trackingData.length;
                for (i=0;i<len;i=i+120){
                    batteryArray[da] = historyRes.trackingData[i].batteryVoltage ;
                    tempArray[da] = historyRes.trackingData[i].temperature ;
                    da ++ 
                }
                if (tempArray[0]== null){
                    tempArray = [];
                }
                if (batteryArray[0]== null){
                    batteryArray = [];
                }
                res.json({success: true, msg: 'Access to hourly battery level and temperature', battery: batteryArray ,temp : tempArray});
            }
        });
    }
    
};

module.exports = history ;