var async = require('async');
var History = require('../models/history');
var Vehicle = require('../models/vehicle');

module.exports = {
    create : function(req,res) {
        Vehicle.viewVehicles(function(err,res){
            res.forEach(element => {
                var date = new Date();
                // date.setHours(date.getHours() + 5);
                // date.setMinutes(date.getMinutes() + 30);
                var history = new History({
                    date : date,
                    userId : element.userId,
                    vehicleNumber : element.vehicleNumber,
                    trackingData : element.trackingData
                });
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
        res.json({success:true});
    },
}