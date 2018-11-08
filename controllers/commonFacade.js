var async = require('async');
var History = require('../models/history');
var Vehicle = require('../models/vehicle');

module.exports = {
    addTrackingDataToHistory : function(req, next){
        
        id = req;
        //id = req.body.vehicleId;
        let rsp = {};
        const tasks = [
            function getDate(cb){
                var datetime = new Date();
                rsp.date = datetime;
                return cb(null, datetime)
            },
            function getVehicleNumber(cb){
                Vehicle.findOne({ _id: id }, function (err, vehicle) {
                    if (err) {
                        return cb(err);
                    }
                    rsp.userId = vehicle.userId;
                    rsp.vehicleNumber = vehicle.vehicleNumber;
                    rsp.trackingData = vehicle.trackingData;
                    return cb(null, vehicle)
                })
            },
            function createHistory(cb) {
                const history = new History({
                    date : rsp.date,
                    userId :rsp.userId,
                    vehicleNumber : rsp.vehicleNumber,
                    trackingData : rsp.trackingData
                });
                history.save(function (err, historyRes) {
                    if (err) {
                        return cb(err);
                    }
                    rsp.historyRes = historyRes;
                    return cb(null, historyRes);
                });
            },
            function clearTrackingData(cb){
                Vehicle.updateMany( {_id: id }, { $set: {trackingData:[]}} , function (err) {
                    if (err) {
                        return cb(err);
                    }
                    rsp.historyRes = null;
                    return cb(null);
                })
            }
        ];

        async.series(tasks, (err, results) => {
            if (err) {
                return next(err);
            }
            console.log('result : '+results);
            return results;
        })
    }
}