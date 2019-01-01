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
module.exports.findSummary = function(vehicleNumber, date, callback){
    Summary.find({vehicleNumber:vehicleNumber, date:date}, {_id:0,distance:1}, callback);
}
//view all summary
module.exports.getAll = function(callback, limit){ 
    Summary.find(callback).limit(limit);
}
//update summary
module.exports.updateSummary = function(vehicleNumber, date, dis ,options,callback){
    console.log(dis);
    quary = {vehicleNumber:vehicleNumber, date:date};
    var update = { distance: dis, trips:1};
    Summary.findOneAndUpdate(quary, update, options, callback); 
}
