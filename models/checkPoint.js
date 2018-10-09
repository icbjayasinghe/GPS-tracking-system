var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    locationName : {
        type:String, 
        required: true
    },
    locationType : {
        type:String, 
        required: true
    },
    latitude : {
        type: Number, 
        required: true
    },
    longitude : {
        type:Number, 
        required: true
    }
});

var CheckPointLocation = module.exports = mongoose.model('CheckPointLocation', schema);

module.exports.getAllCheckPoints = function(callback,limit){
    CheckPointLocation.find(callback).limit(limit);
};

module.exports.addLocation = function(checkPoint, callback){
    CheckPointLocation.create(checkPoint,callback);
};

module.exports.deleteLocation = function(locationId, callback){
    var quary = { _id : locationId};
    CheckPointLocation.findByIdAndDelete(quary ,callback);
};

module.exports.findLocationId = function(locationId, callback){
    CheckPointLocation.find({_id: locationId}).exec(callback);
};


module.exports.editLocation = function(locationId, updateDocs, callback){
    CheckPointLocation.findByIdAndUpdate(locationId, updateDocs, { new: true }, callback);
};

