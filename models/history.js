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
        type:Date,
        required:true
    },
    trackingData:[{
        date : Date,
        longitude: Number,
        latitude: Number,
        altitude: Number,
        angle: Number,
        satelites: Number,
        speed: Number
    }]
});

var History = module.exports = mongoose.model('History',historySchema);

module.exports.newHistory = function(history, callback){
    history.save(callback);
}

//view all history
module.exports.getAll = function(callback, limit){ 
    History.find(callback).limit(limit);
}
//search history by user
module.exports.searchHistoryByUser = function(userId, callback){
    History.find({userId:userId},callback);
}
module.exports.findVehicle = function(vehicleNumber, callback){
    History.find({vehicleNumber:vehicleNumber},callback);
}