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
        // Vehicle.viewVehicles(err,vehicles){
        //     if(err){
        //         throw err;
        //     }
        //     res.json(vehicles);
        // }
    }
} 
module.exports = vehicle;