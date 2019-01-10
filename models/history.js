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
    },
    stopDetails:[{
        stopedTime :Date,
        startedTime:Date,
        location:{
            longitude: Number,
            latitude: Number
        }
    }],
    speededDetails:[{
        speedUpIndex: Number,
        speedDownIndex: Number,
        speedUpDetails: {
            date : Date,
            longitude: Number,
            latitude: Number,
            altitude: Number,
            angle: Number,
            satelites: Number,
            speed: Number,
            fuel: Number,
            temperature: Number
        },
        speedDownDetails:{
            date : Date,
            longitude: Number,
            latitude: Number,
            altitude: Number,
            angle: Number,
            satelites: Number,
            speed: Number,
            fuel: Number,
            temperature: Number
        },
        
    }]
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
module.exports.getHistory = function(vehicleNumber, date, callback){
    History.find({vehicleNumber:vehicleNumber,date:date},callback);
}
module.exports.getHistoryDistance = function(vehicleNumber, date, callback){
    History.findOne({vehicleNumber:vehicleNumber,date:date},{_id:0,distance:1},callback);
}
//history search
module.exports.searchHistory = function(searchDetails,callback){    
    History.find({vehicleNumber:searchDetails.vehicleNumber,date:searchDetails.date},callback);
}
//search history by date
module.exports.historyByDate = function(date, callback){
    History.find({date:date},{_id:0, vehicleNumber:1,distance:1,date:1},callback);
}
//update history distance
module.exports.updateHistoryTrackingDistance = function(vehicleNumber, date, distance, options, callback){
    History.findOneAndUpdate({vehicleNumber: vehicleNumber,date:date},{distance:distance}, options, callback);
}
//get history tracking data where tracking speed is equal to  0
module.exports.historyTrackingSpeedByDate = function(date, callback){
    History.find({date:date},{_id:0,trackingData:1,vehicleNumber:1},callback);
}
module.exports.getUserOverSpeedData = function(vehicleNumber, date, callback){
    History.findOne({date:date,vehicleNumber:vehicleNumber},{_id:0,speededDetails:1},callback);
}
module.exports.getUserOverSpeedPath = function(vehicleNumber, date, callback){
    History.find({date:date,vehicleNumber:vehicleNumber},{_id:0,speededDetails:1,trackingData:1},callback);
}

