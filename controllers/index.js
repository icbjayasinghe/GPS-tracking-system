var express = require('express');
var router = express.Router();
var auth = require('./auth.js');
var user  = require('./userController.js');
var vehicle = require('./vehicleController.js');
var history = require('./historyController.js');
var summary = require('./summaryController.js');
const passport = require('passport');
var trackingData = require('./trackingContoller');

//login & registration
router.post('/login', auth.login);


//report related routes
router.get('/api/historyReports/:vehicleNumber/:date',history.getReport);


//summary related routes
router.get('/api/summary/:date',summary.getAll);
router.get('/api/summaryByUser/:userId/:date',summary.searchSummary);

//tracking data spliting
router.get('/test',trackingData.splitDataNew);

router.use('/', passport.authenticate('jwt', { session: false }),
    function(req, res, next) {
        next();
    }
);

// -------------USER COLLECTION--------------

//find users done
router.get('/api/user',  user.getAll);
router.post('/api/user', user.addUser);
router.get('/api/user/:id', user.getOne);
router.post('/api/user/editUser', user.editUser);
router.post('/api/user/restPassword', user.restPassword);
router.post('/api/user/changePassword', user.changeUserPassword);
router.get('/api/user/trackLogoutTime/:id',user.trackLogoutTime);
router.get('/api/getUserLogs/:id',user.getUserLogs);
router.get('/api/user/deleteUser/:userId', user.deleteFlag);
router.get('/api/userByName/:userName', user.findByName);

//locations(branch) routes
router.get('/api/user/location/:userName', user.viewLocation);
router.put('/api/user/location/:userName', user.addLocation);
router.put('/api/user/removeLocation/:userId',user.removeLocation);

// -------------VEHICLE COLLECTION--------------

//vehicle related routes done
router.post('/api/vehicle',vehicle.addVehicle);

// router.get('/api/vehicle', vehicle.viewAllVehicles);
router.get('/api/vehicle/vehicleDetailsWithUserName',vehicle.getVehiclesWithUserName);
router.get('/api/vehicle/allVehicleDetails', vehicle.viewAdminVehicles);
router.get('/api/vehicle/search/:vehicleNumber',vehicle.searchVehicle);
router.get('/api/vehicle/getVehicleNumbers',vehicle.getVehicleNumber);
router.get('/api/vehicle/:userId',vehicle.viewUserVehicles);
router.get('/api/vehicle/checkImei/:imeiNumber',vehicle.checkImeiNumber);
router.put('/api/vehicle/:vehicleNumber',vehicle.vehicleUpdate);
router.delete('/api/vehicle/:vehicleNumber',vehicle.vehicleDelete);

//Tracking data
router.get('/api/vehicle/trackingData/:imeiNumber', vehicle.viewPath);
router.get('/api/vehicle/vehicleNumberByUser/:userId', vehicle.viewVehicleNumberByUser);
router.get('/api/vehicle/getTrackingData/:vehicleNumber', vehicle.viewAdminAllVehiclesTrackingData);
router.get('/api/vehicle/getTrackingData/:user/:vehicleNumber', vehicle.viewUserVehicleTrackingData);
router.put('/api/vehicle/trackingData/:imeiNumber',vehicle.addTrackingData);
router.put('/api/vehicle/removeTrackingData/:vehicleId',vehicle.removeTrackingData);

// -------------HISTORY COLLECTION--------------

//history related routes
router.post('/api/history', history.create);
router.post('/api/searchHistory',history.searchHistory);
router.get('/api/history',history.getHistory);
router.get('/api/historyByUserId/:userId',history.getHistoryByUser);
router.get('/api/historyByVehicle/:vehicleNumber',history.getHistoryByVehicle);

//report related routes

// router.get('/api/historyReports/:vehicleNumber/:date',history.getReport);
// router.get('/api/historyStopedLocations/:vehicleNumber/:date',history.getStopedData);
// router.get('/api/speedDeailsByVehicle/:vehicleNumber/:date',history.getOverSpeed);

// -------------SUMMARY COLLECTION--------------

//summary related routes
// router.get('/api/summary/:date',summary.getAll);
// router.get('/api/summaryByUser/:userId/:date',summary.searchSummary);

module.exports = router;