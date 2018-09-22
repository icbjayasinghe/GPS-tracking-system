var Vehicle = require('../models/vehicle');

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
                throw err;
            }
            res.json({success:true,vehicle:vehicleRes});
        })
    },
    viewAllVehicles: function(req, res){
        Vehicle.viewVehicles(function(err,vehi){
            if(err){
                throw err;
            }
            res.json(vehi)
        });
    },
    vehicleUpdate: function(req, res){
        var _id = req.params.id;
        var vehicle = req.body;
        Vehicle.updateVehicle(_id, vehicle, {}, function(err, vehicle){
            if(err){
                throw err;
            }
            res.json(vehicle);
        })
    },
    vehicleDelete: function(req, res){
        var _id = req.params.id;
        Vehicle.deleteVehicle(_id,function(err, resVeh){
            if(err){
                throw err;
            }
            res.json(resVeh);
        })
    }

} 
module.exports = vehicle;