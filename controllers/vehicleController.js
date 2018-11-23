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
                res.json({success: false, msg:'Something wrong, Try Again!',  err: err});
            }
            res.json({success:true,vehicle:vehicleRes, msg: 'New Vehicle Added Successfully!'});
        })
    },
    viewAllVehicles: function(req, res){
        Vehicle.viewVehicles(function(err,vehi){
            if(err){
                res.json({success: false, msg: err});
            }
            var vehicle = [];
            var dataAmount = 0;
            let vehicleAmount = vehi.length;
            for (let i = 0; i < vehicleAmount; i++) {
                let trackingData = vehi[i].trackingData.length;
                dataAmount = dataAmount + trackingData;
                vehicle[i] = {
                    _id: vehi[i]._id,
                    vehicleNumber: vehi[i].vehicleNumber,
                    imeiNumber: vehi[i].imeiNumber,
                    vehicleDetails: vehi[i].vehicleDetails,
                    trackingData: [vehi[i].trackingData[0]]
                };
                if(trackingData === 0) {
                    vehicle[i].trackingData = [];
                }
            }
            res.json({vehicle, dataAmount, vehicleAmount});
        });
    },
    getVehicleNumber: function(req, res){
        Vehicle.getAllVehicleNumbers(function(err, vehicleRes){
            if (err){
                res.json({success: false, msg: err});
            }
            res.json(vehicleRes);
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
            var vehicle = [];
            let vehicleAmount = vehicleRes.length;
            for (let i = 0; i < vehicleAmount; i++) {
                vehicle[i] = {
                    _id: vehicleRes[i]._id,
                    vehicleNumber: vehicleRes[i].vehicleNumber,
                    imeiNumber: vehicleRes[i].imeiNumber,
                    vehicleDetails: vehicleRes[i].vehicleDetails
                };
            }
            res.json({vehicle, vehicleAmount});
        });
    },
    viewAdminVehicles: function(req, res){
        Vehicle.viewVehicles(function(err,vehi) {
            if (err) {
                res.json({success: false, msg: err});
            }
            var vehicle = [];
            let vehicleAmount = vehi.length;
            for (let i = 0; i < vehicleAmount; i++) {
                vehicle[i] = {
                    _id: vehi[i]._id,
                    vehicleNumber: vehi[i].vehicleNumber,
                    imeiNumber: vehi[i].imeiNumber,
                    vehicleDetails: vehi[i].vehicleDetails
                };
            }
            res.json({vehicle, vehicleAmount});
        });
    },
    vehicleUpdate: function(req, res){
        var vehicleNumber = req.params.vehicleNumber;
        const vehicle = { vehcileDetails: req.body.details,
                vehicleNo: req.body.vehicleNo }

        Vehicle.updateVehicle(vehicleNumber, vehicle, {}, function(err, vehicleRes){
            if(err){
                res.json({success: false, msg: 'Something Wrong, Try Again!', err: err});
            }
            res.json({success: true, msg: 'Vehicle Details Update Successfully!'});
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
    addTrackingData: function(req,res){
        var imeiNumber = req.params.imeiNumber;
        var dataArray = TrackingData.splitDataNew();
        Vehicle.checkImei(imeiNumber,function(err, vehicleRes){
            if(err){
                res.json({success: false, msg: err});
            }
            if (!vehicleRes){
                res.json({success: false, msg: "wrong imei"});
            }
            else{
                Vehicle.updateMany({'imeiNumber': imeiNumber},{'$push': { trackingData:{ '$each':dataArray, '$sort':{date:-1}}}}, function (err){
                    if (err) {
                        res.json({ success: false, message: "error" });
                    } else {
                        res.json({ success: true, message: "successfully added new tracking data" });
                    }
                });
            }
        })
    }, 
    addTrackingData3: function(req){
        var imeiNumber = req.imeiNumber;
        var rawData = req.data;
        var dataArray = TrackingData.splitDataNew(rawData);
        Vehicle.checkImei(imeiNumber,function(err, vehicleRes){
            if(err){
                console.log({success: false, msg: err});
            }
            if (!vehicleRes){
                console.log({success: false, msg: "wrong imei"});
            }
            else{
                Vehicle.updateMany({'imeiNumber': imeiNumber},{'$push': { trackingData:{ '$each':dataArray, '$sort':{date:-1}}}}, function (err){
                    if (err) {
                        console.log({ success: false, message: "error" });
                    } else {
                        console.log({ success: true, message: "successfully added new tracking data" });
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
    allLatestLocations: function(req, res){
        Vehicle.viewAllLatesttLocations(function(err,vehi){
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
    },
    viewAdminAllVehiclesTrackingData: function(req, res){
        var vehicleNumber = req.params.vehicleNumber;
        Vehicle.viewVehicles(function(err,vehi){
            if(err){
                res.json({success: false, msg: err});
            }
            let vehicle = [];
            let vehicleAmount = vehi.length;
            let trackingData = [];
            let k = 0;
            for (let i = 0; i < vehicleAmount; i++) {
                let trackingDataLength = vehi[i].trackingData.length;
                vehicle[k] = {
                    _id: vehi[i]._id,
                    vehicleNumber: vehi[i].vehicleNumber,
                    imeiNumber: vehi[i].imeiNumber,
                    vehicleDetails: vehi[i].vehicleDetails,
                    trackingData: [vehi[i].trackingData[0]]
                };
                if (vehi[i].vehicleNumber === vehicleNumber) {
                    let data = vehi[i].trackingData.length;
                    for (let j = 0; j < data; j++) {
                        trackingData[j] = vehi[i].trackingData[j];
                    }
                    vehicle[k].trackingData = trackingData;
                }
                if(trackingDataLength === 0) {
                    vehicle.splice(k, 1);
                    k--;
                }
                k++;
            }
            //console.log(vehicle);
            res.json(vehicle);
        });
    },
    viewUserVehicleTrackingData: function(req, res){
        var vehicleNumber = req.params.vehicleNumber;
        var userId = req.params.user;
        Vehicle.userVehicles(userId,function(err, vehi){
            if(err){
                res.json({success: false, msg: err});
            }
            let vehicle = [];
            let vehicleAmount = vehi.length;
            let trackingData = [];
            let k = 0;
            for (let i = 0; i < vehicleAmount; i++) {
                let trackingDataLength = vehi[i].trackingData.length;
                vehicle[k] = {
                    _id: vehi[i]._id,
                    vehicleNumber: vehi[i].vehicleNumber,
                    imeiNumber: vehi[i].imeiNumber,
                    vehicleDetails: vehi[i].vehicleDetails,
                    trackingData: [vehi[i].trackingData[0]]
                };
                if (vehi[i].vehicleNumber === vehicleNumber) {
                    let data = vehi[i].trackingData.length;
                    for (let j = 0; j < data; j++) {
                        trackingData[j] = vehi[i].trackingData[j];
                    }
                    vehicle[k].trackingData = trackingData;
                }
                if(trackingDataLength === 0) {
                    vehicle.splice(k, 1);
                    k--;
                }
                k++;
            }
            //console.log(vehicle);
            res.json(vehicle);
        });
    },
    viewVehicleNumberByUser: function(req,res){
        var userId = req.params.userId;
        Vehicle.checkVehicleNumberByUser(userId,function(err,vehicleNumbers){
            if (err){
                res.json({success: false, msg: err});
            }
            else{
                res.json(vehicleNumbers);

            }
        });
    }
}
module.exports = vehicle;