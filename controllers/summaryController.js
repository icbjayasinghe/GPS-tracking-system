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
}

module.exports = summary;