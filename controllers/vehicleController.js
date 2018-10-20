var Vehicle = require('../models/vehicle');
var TrackingData = require('./trackingContoller');

var vehicle = {
    addVehicle: function(req, res){
        var newVehicle = new Vehicle({
            vehicleNumber: req.body.vehicleNumber,
            imeiNumber: req.body.imeiNumber,
            userId: req.body.userId,
            userName: req.body.userName,
            vehicleDetails: req.body.details,
            trackingData: [],
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
    searchVehicle: function(req, res){
        var vehicleNumber = req.params.vehicleNumber;
        Vehicle.findVehicle(vehicleNumber, function(err, vehicleRes){
            if(err){
                res.json({success: false, msg: err});
            }
            res.json(vehicleRes);
        })
    },
    viewUserVehicles: function(req, res){
        var userId = req.params.userId;
        Vehicle.userVehicles(userId,function(err, vehicleRes){
            if (err){
                res.json({success: false, msg: err});
            }
            res.json(vehicleRes)
        });
    },  
    vehicleUpdate: function(req, res){
        var vehicleNumber = req.params.vehicleNumber;
        var vehicle = req.body.vehicleDetails;
        Vehicle.updateVehicle(vehicleNumber, vehicle, {}, function(err, vehicleRes){
            if(err){
                res.json({success: false, msg: err});
            }
            res.json({success: true, msg: vehicleRes});
        })
    },
    vehicleDelete: function(req, res){
        var vehicleNumber = req.params.vehicleNumber;
        Vehicle.deleteVehicle(vehicleNumber,function(err, resVeh){
            if(err){
                res.json({success: false, msg: err});
            }
            res.json({success: true, msg: resVeh});
        })
    },
    addTrackingData: function(req){
        var imeiNumber = req.imeiNumber;
        var rawData = req.data;
        var newTrackingData = TrackingData.splitData(rawData);

        Vehicle.checkImei(imeiNumber,function(err, vehicleRes){
            if(err){
                console.log({success: false, msg: err});
            }
            if (!vehicleRes){
                console.log({success: false, msg: "wrong imei"});
            }
            else{
                Vehicle.updateMany({'imeiNumber': imeiNumber}, {'$push': { trackingData : newTrackingData}}, function (err){
                    if (err) {
                        console.log({ success: false, message: "error" });
                    } else {
                        console.log({ success: true, message: "successfully added new tracking data" });
                    }
                });
            }
        })
    },   
    addTrackingData2: function(req,res){
        var imeiNumber = req.params.imeiNumber;
        var rawData = req.body.data;
        var newTrackingData = TrackingData.splitData(rawData);
        console.log(imeiNumber);

        Vehicle.checkImei(imeiNumber,function(err, vehicleRes){
            if(err){
                res.json({success: false, msg: err});
            }
            if (!vehicleRes){
                res.json({success: false, msg: "wrong imei"});
            }
            else{
                Vehicle.updateMany({'imeiNumber': imeiNumber}, {'$push': { trackingData : newTrackingData}}, function (err){
                    if (err) {
                        res.json({ success: false, message: "error" });
                    } else {
                        res.json({ success: true, message: "successfully added new tracking data" });
                    }
                });
            }
        })
    }, 
    checkImeiNumber : function(req, res){
        var imeiNumber = req.params.imeiNumber;
        Vehicle.checkImei(imeiNumber,function(err, vehicleRes){
            if(err){
                res.json({success: false, msg: err});
            }
            if (!vehicleRes){
                res.json(false);
            }
            else{
                return ({success: false, msg: err});
            }

        });
    },
    sortByDate: function(req,res){
        var imeiNumber = req.params.imeiNumber;
        Vehicle.sortTrackingData(imeiNumber,function(err, vehicleRes){
            if (err){
                throw err;
            }
            else{
                res.json(vehicleRes);
            }
        });
    },
    viewPath : function(req,res){
        var imeiNumber = req.params.imeiNumber;
        Vehicle.checkPath(imeiNumber,function(err,trackingRes){
            if (err){
                res.json({success: false, msg: err});
            }
            else{
                res.json({success: true, msg: trackingRes});

            }
        });
    },
    allCurrentLocations: function(req, res){
        Vehicle.viewAllCurrentLocations(function(err,vehi){
            if(err){
                res.json({success: false, msg: err});
            }
            res.json(vehi)
        });
    },
    removeTrackingData: function(req, res){
        var vehicleId = req.params.vehicleId;
        Vehicle.removeAllTrackingData(vehicleId,function(err,trackingRes){
            if (err){
                res.json({success: false, msg: err});
            }else{
                res.json({success: true, msg: "tracking data deleted"});
            }
        })
    }
}
module.exports = vehicle;