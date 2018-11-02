var mongoose = require('mongoose');
// vehicle schema
var historySchema = mongoose.Schema({
    vehicleNumber:{
        type:String,      
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    trackingData:[{
        date : Date,
        longitude: Number,
        latitude: Number,
        altitude: Number,
        angle: Number,
        satelites: Number,
        speed: Number
    }]
});

var History = module.exports = mongoose.model('History',historySchema);

//view all history
module.exports.getAll = function(callback, limit){ 
    History.find(callback).limit(limit);
}