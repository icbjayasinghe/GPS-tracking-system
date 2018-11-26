var History = require('../models/history');
var Vehicle = require('../models/vehicle');

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
                History.getHistoryToDist('cp VO 2020');
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
}