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
        sattelites: String,
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
//userVehicles
module.exports.userVehicles = function(userName,callback,limit){
    var quary = {userName: userName};
    Vehicle.find(quary,callback).limit(limit);
}
module.exports.findVehicle =function(vehicleNumber, callback){
    var vehicleNumber = vehicleNumber;
    Vehicle.find({'vehicleNumber' : new RegExp(vehicleNumber, 'i')},callback);
}
//update vehicle
module.exports.updateVehicle = function(vehicleNumber, vehicle, options, callback){
    var quary = {vehicleNumber: vehicleNumber};
    var update = {vehicleDetails: vehicle}
    Vehicle.findOneAndUpdate(quary,update, options, callback);
}
//delete vehicle
module.exports.deleteVehicle = function(vehicleNumber, callback){
    var quary = {vehicleNumber: vehicleNumber};
    Vehicle.findOneAndDelete(quary, callback);
}
