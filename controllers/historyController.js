var History  = require('../models/history');
var CommonFacade = require('./commonFacade');
var geolib = require('geolib')


var history = {
    
    create : function(req,res) {
        CommonFacade.create(req, res);
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

    getHistoryToDist : function(req, res){
        var vehicleNumber = req;
        History.historyToDist(vehicleNumber, function(err, historyRes){
            if (err){
                res.json({success:false, msg:err});
            }
            var x =historyRes.trackingData.length;
            console.log('x = '+historyRes.trackingData[0].latitude);
            var distance = 0;
            var j =0 ;
            for (let i = 0; i < x-1; i++) {
                var x1 = historyRes.trackingData[i].latitude;
                var y1 = historyRes.trackingData[i].longitude;
                var x2 = historyRes.trackingData[i+1].latitude;
                var y2 = historyRes.trackingData[i+1].longitude;
                var dist = geolib.getDistanceSimple({latitude: x1, longitude: y1}, {lalatitudet: x2, longitude: y2},1,3);
                if( (x1!=x2)&&(y1!=y2)){
                    console.log('dist');
                }
                //distance = distance + dist ;
                console.log(dist);
                j=i;
            }
            console.log('number of tracking data : '+j);
            console.log('distance : '+distance);
            //res.json({vehicle, vehicleAmount});
        });
    },
};

module.exports = history ;