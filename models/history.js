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

module.exports.addToHistory = function(rsp,callback){
	history.save(callback);
}