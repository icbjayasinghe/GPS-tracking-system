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
    trckingData:{
        date : String,
        longitude: String,
        latitude: String,
        altitude: String,
        angle: String,
        sattelites: String,
        speed: String
    }
});

var Vehicle = module.exports = mongoose.model('Vehicle',vehicleSchema);

//add vehicle
module.exports.addVehicle = function(vehicle,callback){
    Vehicle.create(vehicle,callback);
}
//view vehicles
module.exports.viewVehicles = function(callback, limit){ 
    Vehicle.find(callback).limit(limit);
}
//update vehicle
module.exports.updateVehicle = function(id, vehicle, options, callback){
    var quary = {_id: id};
    var update = { vehicleDetails: vehicle.details }
    Vehicle.findByIdAndUpdate(quary,update, options, callback);
}
//delete vehicle
module.exports.deleteVehicle = function(id, callback){
    var quary = {_id: id};
    Vehicle.findByIdAndDelete(quary, callback);
}

module.exports.addNewTrackingData = function(imeiNumber, callback){
    quary = {imeiNumber:imeiNumber};
    User.findOneAndUpdate(quary, update, options, callback);
}