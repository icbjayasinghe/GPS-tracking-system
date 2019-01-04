var mongoose = require('mongoose');
// summary schema
var summarySchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    vehicleNumber:{
        type:String,      
        required:true
    },
    date:{
        type:String,
        required:true
    },
    distance:{
        type:Number,
        required:true
    },
    trips:{
        type:Number,
        required:true
    }
});

var Summary = module.exports = mongoose.model('Summary',summarySchema);

//add new summary
module.exports.addNewSummary = function(summary, callback){
    summary.save(callback);
}
//search summary
module.exports.getSummary = function(vehicleNumber, date, callback){
    Summary.findOne({vehicleNumber:vehicleNumber, date:date}, {_id:0, distance:1, trips:1}, callback);
}
//search summary by user and date
module.exports.searchSummaryByUser = function(userId, date, callback){
    Summary.find({userId:userId, date:date}, {_id:0, distance:1, trips:1}, callback);
}
//view all summary
module.exports.getSummaries = function(date,callback, limit){ 
    Summary.find({date:date},callback).limit(limit);
}
//update summary
module.exports.updateSummary = function(vehicleNumber, date, distance, trips ,options,callback){
    quary = {vehicleNumber:vehicleNumber, date:date};
    var update = { distance: distance, trips: trips};
    Summary.findOneAndUpdate(quary, update, options, callback); 
}
