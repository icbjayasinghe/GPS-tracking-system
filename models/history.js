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
    avarageSpeed:{
        type:Number,
        required:true
    },
    avarageOverSpeed:{
        type:Number,
        required:true
    },
    highestSpeed:{
        type:Number,
        required:true
    },
    stopDetails:[{
        stopedTime :Date,
        startedTime:Date,
        duration : Number,
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
        //speedDuration :         
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
    History.findOne({vehicleNumber:vehicleNumber,date:date},callback);
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
    History.find({date:date},{_id:1, vehicleNumber:1,distance:1,date:1,trackingData:1,stopDetails:1},callback);
}
//update history distance
module.exports.updateHistoryTrackingDist = function(vehicleNumber, date, distance, options, callback){
    console.log('@model : '+distance);
    History.findOneAndUpdate({vehicleNumber: vehicleNumber,date:date},{distance:distance}, options, callback);
}
//get history tracking data where tracking speed is equal to  0
module.exports.historyTrackingSpeedByDate = function(date, callback){
    History.find({date:date},{_id:0,trackingData:1,vehicleNumber:1},callback);
}
//get history tracking data where tracking data got over speed
module.exports.getUserOverSpeedData = function(vehicleNumber, date, callback){
    History.findOne({date:date,vehicleNumber:vehicleNumber},{date:1,vehicleNumber:1,speededDetails:1},callback);
}
//get history tracking data where tracking speed is equal to  0
module.exports.getUserStoppedData = function(vehicleNumber, date, callback){
    History.findOne({vehicleNumber:vehicleNumber, date:date},{_id:0,stopDetails:1,vehicleNumber:1},callback);
}
//update history avgSpeed
module.exports.updateHistoryReportingData = function(vehicleNumber, date, avarageSpeed, avarageOverSpeed, highestSpeed, options, callback){
    History.findOneAndUpdate({vehicleNumber: vehicleNumber,date:date},{avarageSpeed:avarageSpeed,avarageOverSpeed:avarageOverSpeed, highestSpeed:highestSpeed}, options, callback);
}
module.exports.deleteHistory = function(date,vehicleNumber,callback){
    console.log(date)
    History.deleteMany({date:date,vehicleNumber:vehicleNumber},callback);
}
