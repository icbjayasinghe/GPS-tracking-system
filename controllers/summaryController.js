var Summary  = require('../models/summary.js');

var summary = {
    getAll : function(req, res) {
        var date = req.params.date;
        Summary.getSummaries(date,function(err,userRes){
          if (err){
            res.json({success: false, msg: 'Something Wrong, Try Again!'});
          }
          res.json({success: true,userRes});
        })
    },
    searchSummary : function(req, res) {
        var user = req.params.userId;
        var date = req.params.date;
        console.log(user+'  '+date);
        Summary.searchSummaryByUser(user, date ,function(err,userRes){
          if (err){
            res.json({success: false, msg: 'Something Wrong, Try Again!'});
          }
          res.json({success: true,userRes});
        })
    }
}

module.exports = summary;