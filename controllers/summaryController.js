var Summary  = require('../models/summary.js');

var summary = {
    getAll : function(req, res) {
        var date = req.params.date;
        Summary.getSummaries(date,function(err,userRes){
          if (err){
            res.json({success: false, msg: 'Something Wrong, Try Again!'});
          }
          res.json({success: true, msg: 'All Vehicle Monthly Summary Access Allowed',userRes});
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
          res.json({success: true, msg: 'Your Vehicle Monthly Summary Access Allowed',userRes});
        })
    }
}

module.exports = summary;