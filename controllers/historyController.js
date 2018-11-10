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
        var date = (req.body.dateFrom).substring(0,10)
        const searchDetails = {
            vehicleNumber: req.body.vehicleNumber,
            dateFrom: date
        };
        console.log(searchDetails);
        /*var userId =  req.body.userId;
        var vehicleNumber = req. body.vehicleNumber;
        var date = req.body.date;
        
        History.searchHistory(userId,vehicleNumber,date, function(err, historyRes){
            if (err){
                res.json({success:false, msg:err});
            }
            res.json(historyRes);
        });*/
    }
}

module.exports = history ;