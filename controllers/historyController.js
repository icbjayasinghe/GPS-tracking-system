var History  = require('../models/history');
var CommonFacade = require('./commonFacade');
var Vehicle = require('../models/vehicle');

var history = {

    create : function(req,res, next) {
        Vehicle.find().then((vehicles) => {
            var resu;
            vehicles.forEach((vehicle) => {
                var vId = vehicle._id;
                console.log(vId);
                resu = CommonFacade.addTrackingDataToHistory(vId, next);
            });
            res.json(resu);
        })
    },

    // create : function(req,res, next) {
    //     CommonFacade.addTrackingDataToHistory(req, res, next);
    // },

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
        History.searchHistoryByUser(userId, function(err, historyRes){
            if (err){
                res.json({success:false, msg:err});
            }
            res.json(historyRes);
        });
    },

    getHistoryByVehicle : function(req, res){
        var vehicleNumber = req.params.vehicleNumber;
        History.findVehicle(vehicleNumber, function(err, historyRes){
            if (err){
                res.json({success:false, msg:err});
            }
            res.json(historyRes);
        });
    }
}

module.exports = history ;