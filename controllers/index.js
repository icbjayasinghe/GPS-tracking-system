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

// -------------USER COLLECTION--------------

//find users done
router.get('/api/user',  passport.authenticate('jwt', { session: false }), user.getAll);
router.post('/api/user', passport.authenticate('jwt', { session: false }),  user.addUser);
router.get('/api/user/:id', passport.authenticate('jwt', { session: false }), user.getOne);
router.post('/api/user/editUser', passport.authenticate('jwt', { session: false }), user.editUser);
router.post('/api/user/restPassword', passport.authenticate('jwt', { session: false }), user.restPassword);
router.post('/api/user/changePassword', passport.authenticate('jwt', { session: false }), user.changeUserPassword);
router.get('/api/user/trackLogoutTime/:id',passport.authenticate('jwt', { session: false }), user.trackLogoutTime);
router.get('/api/getUserLogs/:id',passport.authenticate('jwt', { session: false }), user.getUserLogs);
router.get('/api/user/deleteUser/:userId', passport.authenticate('jwt', { session: false }), user.deleteFlag);
router.get('/api/userByName/:userName', passport.authenticate('jwt', { session: false }), user.findByName);

//locations(branch) routes
router.get('/api/user/location/:userName', passport.authenticate('jwt', { session: false }), user.viewLocation);
router.put('/api/user/location', passport.authenticate('jwt', { session: false }), user.addLocation);
router.post('/api/user/removeLocation', passport.authenticate('jwt', { session: false }), user.removeLocation);

// -------------VEHICLE COLLECTION--------------

//vehicle related routes done
router.post('/api/vehicle',passport.authenticate('jwt', { session: false }), vehicle.addVehicle);

// router.get('/api/vehicle', vehicle.viewAllVehicles);
router.get('/api/vehicle/vehicleDetailsWithUserName',passport.authenticate('jwt', { session: false }), vehicle.getVehiclesWithUserName);
router.get('/api/vehicle/allVehicleDetails', passport.authenticate('jwt', { session: false }), vehicle.viewAdminVehicles);
router.get('/api/vehicle/search/:vehicleNumber',passport.authenticate('jwt', { session: false }), vehicle.searchVehicle);
router.get('/api/vehicle/getVehicleNumbers',passport.authenticate('jwt', { session: false }), vehicle.getVehicleNumber);
router.get('/api/vehicle/:userId',passport.authenticate('jwt', { session: false }), vehicle.viewUserVehicles);
router.get('/api/vehicle/checkImei/:imeiNumber',passport.authenticate('jwt', { session: false }), vehicle.checkImeiNumber);
router.put('/api/vehicle/:vehicleNumber',passport.authenticate('jwt', { session: false }), vehicle.vehicleUpdate);
router.delete('/api/vehicle/:vehicleNumber',passport.authenticate('jwt', { session: false }), vehicle.vehicleDelete);

//Tracking data
router.get('/api/vehicle/trackingData/:imeiNumber', passport.authenticate('jwt', { session: false }), vehicle.viewPath);
router.get('/api/vehicle/vehicleNumberByUser/:userId', passport.authenticate('jwt', { session: false }), vehicle.viewVehicleNumberByUser);
router.get('/api/vehicle/getTrackingData/:vehicleNumber', passport.authenticate('jwt', { session: false }), vehicle.viewAdminAllVehiclesTrackingData);
router.get('/api/vehicle/getTrackingData/:user/:vehicleNumber', passport.authenticate('jwt', { session: false }), vehicle.viewUserVehicleTrackingData);
router.put('/api/vehicle/trackingData/:imeiNumber',passport.authenticate('jwt', { session: false }), vehicle.addTrackingData);
router.put('/api/vehicle/removeTrackingData/:vehicleId',passport.authenticate('jwt', { session: false }), vehicle.removeTrackingData);

// -------------HISTORY COLLECTION--------------

//history related routes
router.post('/api/history', passport.authenticate('jwt', { session: false }), history.create);
router.post('/api/searchHistory',passport.authenticate('jwt', { session: false }), history.searchHistory);
router.get('/api/history',passport.authenticate('jwt', { session: false }), history.getHistory);
router.post('/api/history/batteryLevel',passport.authenticate('jwt', { session: false }), history.getBatteryLevel);
router.get('/api/historyByUserId/:userId',passport.authenticate('jwt', { session: false }), history.getHistoryByUser);
router.get('/api/historyByVehicle/:vehicleNumber',passport.authenticate('jwt', { session: false }), history.getHistoryByVehicle);
router.delete('/api/deleteHistory/:date/:vehicleNumber', passport.authenticate('jwt', { session: false }), history.deleteHistory);

//report related routes
router.get('/api/historyReports/:vehicleNumber/:date',passport.authenticate('jwt', { session: false }), history.getReport);

//get dynamic over speed data
router.post('/api/getOverSpeed', passport.authenticate('jwt', { session: false }), history.dynamicOverSpeed);
router.post('/api/getOverSpeedPath', passport.authenticate('jwt', { session: false }), history.dynamicOverSpeedPath);

// -------------SUMMARY COLLECTION--------------

//summary related routes
router.get('/api/summary/:date', passport.authenticate('jwt', { session: false }), summary.getAll);
router.get('/api/summaryByUser/:userId/:date',passport.authenticate('jwt', { session: false }), summary.searchSummary);

module.exports = router;