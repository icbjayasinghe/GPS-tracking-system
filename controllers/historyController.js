var History  = require('../models/history');
var CommonFacade = require('./commonFacade');

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
        History.historyByVehicle(vehicleNumber, function(err, historyRes){
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
                    }, i*1000);
                  }    
            }
        });
    },

    
    
};

module.exports = history ;
