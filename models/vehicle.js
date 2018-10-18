var mongoose = require('mongoose');
// vehicle schema
var vehicleSchema = mongoose.Schema({
    vehicleNumber:{
        type:String,
        required:true
    },
    imeiNumber:{
        type:String,
        required:true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    vehicleDetails:{
        type:String
    },
    currentLocation:{
        date : String,
        longitude: Number,
        latitude: Number,
        altitude: String,
        angle: String,
        satelites: String,
        speed: String
    },
    trackingData:[{
        date : String,
        longitude: Number,
        latitude: Number,
        altitude: String,
        angle: String,
        satelites: String,
        speed: String
    }]
});

var Vehicle = module.exports = mongoose.model('Vehicle',vehicleSchema);

//add vehicle
module.exports.addVehicle = function(vehicle,callback){
	vehicle.save(callback);
}
//view vehicles
module.exports.viewVehicles = function(callback, limit){ 
    Vehicle.find(callback).limit(limit);
}
module.exports.findVehicle =function(vehicleNumber, callback){
    var vehicleNumber = vehicleNumber;
    Vehicle.find({'vehicleNumber' : new RegExp(vehicleNumber, 'i')},callback);
}
//update vehicle
module.exports.updateVehicle = function(vehicleNumber, vehicle, options, callback){
    Vehicle.findOneAndUpdate({vehicleNumber: vehicleNumber},{vehicleDetails: vehicle}, options, callback);
}
//vehicles by user
module.exports.userVehicles = function(userId, callback){
    Vehicle.find({userId:userId},callback);
}
//delete vehicle
module.exports.deleteVehicle = function(vehicleNumber, callback){
    Vehicle.findOneAndDelete({vehicleNumber: vehicleNumber}, callback);
}
//check imei
module.exports.checkImei = function(imeiNumber,callback){
    Vehicle.findOne({imeiNumber:imeiNumber},{vehicleNumber:1},function(err,vehicleRes){
        if(err){
            return callback(err,false);
        }
        if (!vehicleRes){
            return callback(null,false);
        }
        else{
            return callback(null,true);
        }
    });
}
//sort tracking data by date
module.exports.sortTrackingData = function(imeiNumber, callback){
    console.log(imeiNumber);
    //Vehicle.find().sort({datefield: -1}, function(err, cursor){...});

    //Vehicle.findOne({imeiNumber:imeiNumber}).sort({"trackingData.date": -1}).limit(1)
    //Vehicle.findOne({imeiNumber:imeiNumber,trackingData:{"date": "Wed Oct 17 2018 08:57:53 GMT+0530 (Sri Lanka Standard Time)"}},callback);
    //find().sort( { "item.category": 1, "item.type": 1 } )
    Vehicle.find({'imeiNumber':imeiNumber}).sort({'trackingData.date': 1}).limit(1);
}
//view tracking data of a vehicle
module.exports.checkPath = function(imeiNumber,callback){
    Vehicle.findOne({imeiNumber:imeiNumber},{trackingData:1},callback);
}
