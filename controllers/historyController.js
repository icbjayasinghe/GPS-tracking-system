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
    }
}

module.exports = history ;