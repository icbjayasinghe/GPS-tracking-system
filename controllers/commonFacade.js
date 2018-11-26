var History = require('../models/history');
var Vehicle = require('../models/vehicle');
var historyController = require('./historyController');

module.exports = {
    create : function(req,res) {
        Vehicle.viewVehicles(function(err,res){
            res.forEach(element => {
                var date = new Date() // Today!
                date.setDate(date.getDate() - 1); // Yesterday!
                var date = date.toISOString();
                var d = date.substring(0,10);
                var history = new History({
                    date : d,
                    userId : element.userId,
                    vehicleNumber : element.vehicleNumber,
                    trackingData : element.trackingData,
                    distance:0
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
        console.log({success:true});
    },

    addDistance : function(req){
        //res.json({success:false, msg:err});
        History.historyByDate(req,function(err,res){
             
            res.forEach(element => {                
                historyController.updateHistoryDist(element.vehicleNumber,res);
                console.log(element._id);
                console.log('hiiiii '+res);
                //History.findOneAndUpdate({}, {}, options, callback);
            });
        })
    }
}