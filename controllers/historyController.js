var History  = require('../models/history');
var CommonFacade = require('./commonFacade');


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
        const userPasswordDetails = {
            vehicleNumber: req.body.vehicleNumber,
            dateFrom: req.body.dateFrom
        };
        console.log(userPasswordDetails);
        /*var userId =  req.body.userId;
        var vehicleNumber = req. body.vehicleNumber;
        var date = req.body.date;
        // date.setHours(date.getHours() + 5);
        // date.setMinutes(date.getMinutes() + 30);
        History.searchHistory(userId,vehicleNumber,date, function(err, historyRes){
            if (err){
                res.json({success:false, msg:err});
            }
            res.json(historyRes);
        });*/
    }
}

module.exports = history ;