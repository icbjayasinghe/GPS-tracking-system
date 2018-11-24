var History  = require('../models/history');
var CommonFacade = require('./commonFacade');
var geolib = require('geolib');
var geodist = require('geodist');
var GeoPoint = require('geopoint');

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

    getHistoryToDist :function(req,res){
        var vehicleNumber = req;
        History.historyToDist(vehicleNumber, function(err, historyRes){
            if (err){
                res.json({success:false, msg:err});
            }
            var x =historyRes.trackingData.length;
            var d = 0;
            var j =0 ;

            for (let i = 0; i < x-1; i++) {
                radconv = 3.14159265358979 / 180;
                var x1 = historyRes.trackingData[i].latitude * radconv;
                var y1 = historyRes.trackingData[i].longitude * radconv;
                var x2 = historyRes.trackingData[i+1].latitude * radconv;
                var y2 = historyRes.trackingData[i+1].longitude * radconv;  
                xDiff = x2 -x1;
                yDiff = y2 -y1;
                a = ((Math.sin(xDiff / 2) * Math.sin(xDiff / 2)) + (Math.cos(x1) * Math.cos(x2) * Math.sin(yDiff / 2) * Math.sin(yDiff / 2)))
                c = 2 * Math.atan(Math.sqrt(a) / Math.sqrt(1 - a));
                R = 6371;
                dist = R * c
                d = d + dist ;
                j=i;
            }
            console.log('number of tracking data : '+(j+2));
            console.log('function :');
            console.log('distance : '+d);
            console.log();
            //res.json({vehicle, vehicleAmount});
            });        
    },

    getHistoryToDist1 : function(req, res){
        var vehicleNumber = req;
        History.historyToDist(vehicleNumber, function(err, historyRes){
            if (err){
                res.json({success:false, msg:err});
            }
            var x =historyRes.trackingData.length;
            var d = 0;
            var j =0 ;

            for (let i = 0; i < x-1; i++) {
                var x1 = historyRes.trackingData[i].latitude;
                var y1 = historyRes.trackingData[i].longitude;
                var x2 = historyRes.trackingData[i+1].latitude;
                var y2 = historyRes.trackingData[i+1].longitude; 
                var point1 = new GeoPoint(x1,y1);
                var point2 = new GeoPoint(x2,y2); 
                var dist = point1.distanceTo(point2, true);           

                if(isNaN(dist)){
                    // console.log('dist : '+dist+' lat1 : '+x1 +' lon1 : '+y1+' lat2 : '+x2 +' lon2 : '+y2);
                }
                else{
                    d = d + dist ;
                    //console.log('dist : '+dist+' lat1 : '+x1 +' lon1 : '+y1+' lat2 : '+x2 +' lon2 : '+y2);
                }
                j=i;
            }
            console.log('number of tracking data : '+(j+2));
            console.log('node module :');
            console.log('distance : '+d);
            console.log();

            //res.json({vehicle, vehicleAmount});
            });
    },
};

module.exports = history ;