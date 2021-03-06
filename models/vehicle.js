var mongoose = require('mongoose');
// vehicle schema
var vehicleSchema = mongoose.Schema({
    vehicleNumber:{
        type:String,
        unique: true,        
        required:true
    },
    imeiNumber:{
        type:String,
        unique: true,        
        required:true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required:true

    },
    vehicleDetails:{
        type:String
    },
    lastDataReceivedTime:{
        type : Date
    },
    trackingData:[{
        date : Date,
        longitude: Number,
        latitude: Number,
        altitude: Number,
        angle: Number,
        satelites: Number,
        speed: Number,
        ignition:Number,
        digitalInputTwo:Number,
        fuel:Number,
        batteryVoltage:Number,
        temperature:Number
    }]
});

var Vehicle = module.exports = mongoose.model('Vehicle',vehicleSchema);

//add vehicle
module.exports.addVehicle = function(vehicle,callback){
	vehicle.save(callback);
}
//view vehicles
module.exports.viewVehicles = function(callback, limit){ 
    Vehicle.find({},{trackingData:0},callback).limit(limit);
}
//view vehicles
module.exports.viewVehiclesWithTrackingData = function(callback, limit){ 
    Vehicle.find(callback).limit(limit);
}
//get all vehicle numbers
module.exports.getAllVehicleNumbers = function(callback,limit){
    Vehicle.find({},{vehicleNumber:1},callback).limit(limit);
}
module.exports.findVehicle =function(vehicleNumber, callback){
    var vehicleNumber = vehicleNumber;
    Vehicle.find({'vehicleNumber' : new RegExp(vehicleNumber, 'i')},callback);
}
//update vehicle
module.exports.updateVehicle = function(vehicleNumber, vehicle, options, callback){
    Vehicle.findOneAndUpdate({_id: vehicleNumber},{vehicleNumber: vehicle.vehicleNo, vehicleDetails: vehicle.vehcileDetails}, options, callback);
}
//vehicles by user
module.exports.userVehicles = function(userId, callback){
    Vehicle.find({userId:userId},callback);
}
//tracking data by name
module.exports.checkVehicleNumberByUser = function(userId, callback){
    Vehicle.find({userId:userId},{vehicleNumber:1},callback);
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
            return callback(err,false);
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
//view current locations of vehicles 
module.exports.viewAllLatesttData = function(callback,limit){ 
    Vehicle.find({},{vehicleNumber:1,trackingData:1,_id:0},callback).limit(limit);
}
//delete tracking data
module.exports.removeAllTrackingData = function(vehicleId, callback){
    Vehicle.update( {_id: vehicleId }, { $set: {trackingData:[]}} , callback );
}
//update vehicle last data rec
module.exports.updateVehicleLastDataTime = function(vehicleNumber, lastTime, options, callback){
    Vehicle.findOneAndUpdate({vehicleNumber: vehicleNumber},{lastDataReceivedTime:lastTime}, options, callback);
}