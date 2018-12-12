var mongoose = require('mongoose');
// vehicle schema
var historySchema = mongoose.Schema({
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
    trackingData:[{
        date : Date,
        longitude: Number,
        latitude: Number,
        altitude: Number,
        angle: Number,
        satelites: Number,
        speed: Number,
        fuel: Number,
        temperature: Number
    }],
    distance:{
        type:Number,
        required:true
    }
});

var History = module.exports = mongoose.model('History',historySchema);

//add tracking data to history
module.exports.newHistory = function(history, callback){
    history.save(callback);
}
//view all history
module.exports.getAll = function(callback, limit){ 
    History.find(callback).limit(limit);
}
//search history by user
module.exports.historyByUser = function(userId, callback){
    History.find({userId:userId},callback);
}
//history by vehicle
module.exports.historyByVehicle = function(vehicleNumber, callback){
    History.find({vehicleNumber:vehicleNumber},callback);
}
//history search
module.exports.searchHistory = function(searchDetails,callback){    
    History.find({vehicleNumber:searchDetails.vehicleNumber,date:searchDetails.date},callback);
}
//search history by date
module.exports.historyByDate = function(date, callback){
    History.find({date:date},callback);
}
//update history distance
module.exports.updateHistoryTrackingDistance = function(vehicleNumber, date, distance, options, callback){
    History.findOneAndUpdate({vehicleNumber: vehicleNumber,date:date},{distance:distance}, options, callback);
}