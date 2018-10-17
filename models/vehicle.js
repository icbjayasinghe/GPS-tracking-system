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
    trackingData:[{
        date : String,
        longitude: String,
        latitude: String,
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
//view tracking data of a vehicle
module.exports.checkPath = function(imeiNumber,callback){
    Vehicle.findOne({imeiNumber:imeiNumber},{trackingData:1},callback);
}
