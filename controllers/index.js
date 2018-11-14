var express = require('express');
var router = express.Router();
var auth = require('./auth.js');
var user  = require('./userController.js');
var vehicle = require('./vehicleController.js');
var history = require('./historyController.js');
const passport = require('passport');
var trackingData = require('./trackingContoller');

//login & registration
router.post('/login', auth.login);
router.get('/test',trackingData.splitDataNew);

router.put('/api/vehicle/trackingData/:imeiNumber',vehicle.addTrackingData2);
router.post('/api/history', history.create);
router.get('/api/vehicle/getVehicleNumbers',vehicle.getVehicleNumber);

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
router.post('/api/user/restPassword', user.restPassword);
router.get('/api/user/deleteUser/:userId', user.deleteFlag);
router.post('/api/user/changePassword', user.changeUserPassword);

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
router.get('/api/vehicle/checkImei/:imeiNumber',vehicle.checkImeiNumber);

//Tracking data
router.put('/api/vehicle/trackingData/:imeiNumber',vehicle.addTrackingData2);
router.put('/api/vehicle/removeTrackingData/:vehicleId',vehicle.removeTrackingData);
router.get('/api/vehicle/trackingData/:imeiNumber', vehicle.viewPath);
router.get('/api/vehicle/trackingDataByUser/:userId', vehicle.viewTrackingDataByUser);

//history related routes
router.get('/api/history',history.getHistory);
router.post('/api/searchHistory',history.searchHistory);
router.get('/api/historyByUserId/:userId',history.getHistoryByUser);
router.get('/api/historyByVehicle/:vehicleNumber',history.getHistoryByVehicle);

module.exports = router;