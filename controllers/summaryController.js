var Summary  = require('../models/summary.js');

var summary = {

    updateSummary : function(req,res){
        Summary.updateSummary(newSummary,function(err,summaryRes){
            if(err){
                res.json({success: false, msg:'Something wrong, Try Again!',  err: err});
            }
            res.json({success:true,summary:summaryRes, msg: 'New Summary Added Successfully!'});
        })
    }
}

module.exports = summary;