var express = require('express');
var router = express.Router();
var auth = require('./auth.js');
var user  = require('./userController.js');
var vehicle = require('./vehicleController.js');
var checkPoint = require('./checkPointController');

//login & registration
router.post('/login', auth.login);

//find users
router.post('/user', user.register);
router.get('/user', user.getAll);
router.get('/user/:id', user.getOne);
router.get('/user/:name', user.findByName);
router.put('/user/deleteUser/:id', user.deleteFlag);
router.put('/user/resetPassword/:name', user.resetUserPassword);
router.put('/user/changePasword/:name', user.changeUserPassword);

//access to the CheckPoint routes
router.use('/checkpoint', checkPoint);

//vehicle related routes
router.post('/vehicle',vehicle.addVehicle);
router.get('/vehicle',vehicle.viewAllVehicles);
router.put('/vehicle/:id',vehicle.vehicleUpdate);
router.delete('/vehicle/:id',vehicle.vehicleDelete);
module.exports = router;