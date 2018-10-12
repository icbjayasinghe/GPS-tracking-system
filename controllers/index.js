var express = require('express');
var router = express.Router();
var auth = require('./auth.js');
var user  = require('./userController.js');
var vehicle = require('./vehicleController.js');

//find users
router.post('/api/user', user.addUser);
router.get('/api/user', user.getAll);
router.get('/api/user/:id', user.getOne);
router.get('/api/userByName/:userName', user.findByName);
router.put('/api/user/resetPassword/:userName', user.resetUserPassword);
router.put('/api/user/deleteUser/:id', user.deleteFlag);
router.put('/api/user/changePasword/:userName', user.changeUserPassword);
router.put('/api/user/addNewLocation/:userName', user.addLocation);

//login & registration
router.post('/login', auth.login);
 
//vehicle related routes
router.post('/api/vehicle',vehicle.addVehicle);
router.get('/api/vehicle',vehicle.viewAllVehicles);
router.put('/api/vehicle/:id',vehicle.vehicleUpdate);
router.delete('/api/vehicle/:id',vehicle.vehicleDelete);
router.put('/api/vehicle/:imeiNumber',vehicle.addTrackingData);

//does not work

module.exports = router;