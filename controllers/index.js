var express = require('express');
var router = express.Router();
var auth = require('./auth.js');
var user  = require('./userController.js');
var vehicle = require('./vehicleController.js');
var checkPoint = require('./checkPointController');

//login & registration
router.post('/login', auth.login);
router.post('/signup', user.register);

//find users
router.get('/api/v1/users', user.getAll);
router.get('/api/v1/user/:id', user.getOne);

//access to the CheckPoint routes
router.use('/CheckPoint', checkPoint);

//vehicle related routes
router.post('/addVehicle',vehicle.addVehicle);
router.get('/viewVehicles',vehicle.viewAllVehicles);
router.put('/updateVehicle/:id',vehicle.vehicleUpdate);
router.delete('/deleteVehicle/:id',vehicle.vehicleDelete);

module.exports = router;