var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({

    locationId : {type:Number, required: true},
    userId : {type:Number, required: true},
    locationName : {type:String, required: true},
    latitude : {type: Number, required: true},
    longitude : {type:Number, required: true},

});

var CheckPointLocation = module.exports = mongoose.model('CheckPointLocation', schema);

module.exports.addLocation = function(checkPoint, callback){

    CheckPointLocation.create(checkPoint,callback);

};

module.exports.deleteLocation = function(locationId, callback){

    CheckPointLocation.deleteOne({ locationId :  locationId}, callback);

};

