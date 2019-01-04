var Summary  = require('../models/summary.js');

var summary = {
    getAll : function(req, res) {
        Summary.getSummaries(function(err,userRes){
          if (err){
            res.json({success: false, msg: err});
          }
          res.json(userRes);
        })
    },
    searchSummary : function(req, res) {
        var user = req.params.userId;
        var date = req.params.date;
        console.log(user+'  '+date);
        Summary.searchSummaryByUser(user, date ,function(err,userRes){
          if (err){
            res.json({success: false, msg: err});
          }
          res.json(userRes);
        })
    }
}

module.exports = summary;