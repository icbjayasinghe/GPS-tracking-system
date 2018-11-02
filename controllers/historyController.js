var History  = require('../models/history');
var CommonFacade = require('./commonFacade');

var history = {

    create : function(req,res, next) {
        CommonFacade.addTrackingDataToHistory(req, res, next);
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