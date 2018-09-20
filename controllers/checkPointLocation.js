const express = require('express');
const router = express.Router();

const CheckPoint = require('../models/checkPointLocation');



/* view check Points page. */
router.get('/', function(req, res, next) {
    res.send('Display check Points Location Page');
});

/* add new check Point Locations. */
router.post('/', function(req, res, next) {

    const checkPoint = new CheckPoint({

    locationId : req.body.locationId,
    userId : req.body.userId,
    locationName : req.body.locationName,
    latitude : req.body.latitude,
    longitude : req.body.longitude

    });

    CheckPoint.addLocation(checkPoint, function (err, result) {
            if(err){
                res.json({success: false, msg: err});
            }else {
                res.json({success: true, msg: "Successfully Added New check Point Location!"});
            }
        });
});

/* edit check Points. */
router.get('/edit', function(req, res, next) {
});

/* delete check Points. */
router.get('/delete', function(req, res, next) {
});




module.exports = router;