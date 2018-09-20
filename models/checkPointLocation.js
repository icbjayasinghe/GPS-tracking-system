var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({

    locationId : {type:Number, required: true},
    userId : {type:Number, required: true},
    locationName : {type:String, required: true},
    latitude : {type: Number, required: true},
    longitude : {type:Number, required: true},

});

module.exports = mongoose.model('CheckPointLocation', schema);