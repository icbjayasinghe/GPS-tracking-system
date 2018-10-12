var Vehicle = require('../models/vehicle');
var TrackingData = require('./trackingContoller');

var vehicle = {
    addVehicle: function(req, res){
        var newVehicle = new Vehicle({
            vehicleNo: req.body.vehicleNo,
            imeiNo: req.body.Imie,
            userName:req.body.userName,
            vehicleDetails:req.body.details
        });
        Vehicle.addVehicle(newVehicle,function(err,vehicleRes){
            if(err){
                res.json({success: false, msg: err});
            }
            res.json({success:true,vehicle:vehicleRes});
        })
    },
    viewAllVehicles: function(req, res){
        Vehicle.viewVehicles(function(err,vehi){
            if(err){
                res.json({success: false, msg: err});
            }
            res.json(vehi)
        });
    },
    vehicleUpdate: function(req, res){
        var _id = req.params.id;
        var vehicle = req.body;
        Vehicle.updateVehicle(_id, vehicle, {}, function(err, vehicleRes){
            if(err){
                res.json({success: false, msg: err});
            }
            res.json({success: true, msg: vehicleRes});
        })
    },
    vehicleDelete: function(req, res){
        var _id = req.params.id;
        Vehicle.deleteVehicle(_id,function(err, resVeh){
            if(err){
                res.json({success: false, msg: err});
            }
            res.json({success: true, msg: resVeh});
        })
    },
    addTrackingData: function(imeiNumber, rawData, res){
        newTrackingData = TrackingData.splitData(rawData);
        Vehicle.addNewTrackingData({ imeiNumber: imeiNumber }, { $push: { trackingData: newTrackingData } }, function (err) {
            if (err) {
                res.json({ success: false, message: "error" });
            } else {
                res.json({ success: true, message: "successfully added new tracking data" });
            }
        })
    }
} 
module.exports = vehicle;