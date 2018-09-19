var mongoose = require('mongoose');
// vehicle schema
var vehicleSchema = mongoose.Schema({
    vehicleNo:{
        type:String,
        required:true
    },
    imeiNo:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    vehicleDetails:{
        type:String
    }

});

var Vehicle = module.exports = mongoose.model('Vehicle',vehicleSchema);

//add vehicle
module.exports.addVehicle = function(vehicle,callback){
    Vehicle.create(vehicle,callback);
}