var History = require('../models/history');
var Vehicle = require('../models/vehicle');
var User = require('../models/user');
var Summary = require('../models/summary');

module.exports = {
    createHistory : function(req,res) {
        Vehicle.viewVehiclesWithTrackingData(function(err,res){
            res.forEach(element => {
                var date = new Date() // Today!
                var date = date.toISOString();
                console.log(date);
                var d = date.substring(0,10);
                var history = new History({
                    date : d,
                    userId : element.userId,
                    vehicleNumber : element.vehicleNumber,
                    trackingData : element.trackingData,
                    distance:0
                });
                //History.getHistoryToDist('cp VO 2020');
                Vehicle.removeAllTrackingData(element._id,function(err,res){
                    if(err){
                        console.log(err);
                    }
                    console.log(res);
                })
                History.newHistory(history,function(err,historyRes){
                    if(err){
                        console.log({success: false, msg: err});
                    }
                    console.log({success:true,history:historyRes});
                })
                console.log(element._id);
            });
        })
        console.log({success:true});
    },

    addDistanceToHistory : function(req){
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
                console.log('__________________________________');
                console.log(element._id+'/'+vehicleNumber+' has'+(j+2)+' number of tracking data on '+date);
                console.log('Total distance : '+distance);
                console.log('__________________________________');

                History.updateHistoryTrackingDistance(vehicleNumber, date, distance, function(err, res){
                    if(err){
                      console.log(err);
                    }
                    console.log('add tracking distance');
                  })
            });
        });
    },

    getVehicleListWithUserName : function(req,response){
        Vehicle.viewVehicles(function(err,res){
            var i =0;
            var vehicle = [];
            res.forEach(element => {
                if (err){
                    console.log(err);
                }
                var userId = element.userId;
                User.getUserName(userId, function(err, result){
                    if (err){
                        console.log(err);
                    }
                    vehicle[i] = {
                        _id: element._id,
                        vehicleNumber: element.vehicleNumber,
                        imeiNumber: element.imeiNumber,
                        vehicleDetails: element.vehicleDetails,
                        userName: result.userName
                    };

                    i++;

                    if (i >= res.length) {
                        response.json({vehicle: vehicle});
                    }
                });
            });

        });
    },
    
    addNewSummary : function(req,res){
        //console.log('hi');
        Vehicle.viewVehicles(function(err,res){
            res.forEach(element => {
                var date = new Date() // Today!
                var date = date.toISOString();
                console.log(date);
                var d = date.substring(0,10);
                var newSummary = new Summary({
                    userId: element.userId,
                    vehicleNumber: element.vehicleNumber,
                    date : req,
                    distance : 0,
                    trips : 0
                });
                Summary.addNewSummary(newSummary,function(err,summaryRes){
                    if(err){
                        console.log({success: false, msg:'Something wrong, Try Again!',  err: err});
                    }
                    console.log({success:true,summary:summaryRes, msg: 'New Summary Added Successfully!'});
                })
                console.log(element._id);
            });
        })
        console.log({success:true});
    }
};