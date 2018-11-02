var express = require('express');
var router = express.Router();
var auth = require('./auth.js');
var user  = require('./userController.js');
var vehicle = require('./vehicleController.js');
var history = require('./historyController.js');
const passport = require('passport');




//login & registration
router.post('/login', auth.login);
router.post('/test', history.create);

router.use('/', passport.authenticate('jwt', { session: false }),
    function(req, res, next) {
        next();
    }
);
//find users done
router.post('/api/user', user.addUser);
router.get('/api/user',  user.getAll);
router.get('/api/user/:id', user.getOne);
router.get('/api/userByName/:userName', user.findByName);
router.put('/api/user/resetPassword/:userName', user.resetUserPassword);
router.put('/api/user/deleteUser/:userName', user.deleteFlag);
router.put('/api/user/changePasword/:userName', user.changeUserPassword);

//locations(branch) routes
router.put('/api/user/location/:userName', user.addLocation);
router.get('/api/user/location/:userName', user.viewLocation);
router.put('/api/user/removeLocation/:userId',user.removeLocation);


//vehicle related routes done
router.post('/api/vehicle',vehicle.addVehicle);
router.get('/api/vehicle', vehicle.viewAllVehicles);
router.get('/api/vehicle/search/:vehicleNumber',vehicle.searchVehicle);
router.get('/api/vehicle/:userId',vehicle.viewUserVehicles);
router.put('/api/vehicle/:vehicleNumber',vehicle.vehicleUpdate);
router.delete('/api/vehicle/:vehicleNumber',vehicle.vehicleDelete);

//Tracking data
router.get('/api/vehicle/checkImei/:imeiNumber',vehicle.checkImeiNumber);
router.put('/api/vehicle/trackingData/:imeiNumber',vehicle.addTrackingData2);
router.put('/api/vehicle/trackingData/',vehicle.addTrackingData);
router.put('/api/vehicle/removeTrackingData/:vehicleId',vehicle.removeTrackingData);

//filter tracking data by vehicle
router.get('/api/vehicle/trackingData/:imeiNumber', vehicle.viewPath);




module.exports = router;