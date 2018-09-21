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
router.get('/edit/:id', function(req, res, next) {
    const locationId = req.params.id
});

/* delete check Points. */
router.get('/delete/:id', function(req, res, next) {
    const locationId = parseInt(req.params.id);
    CheckPoint.deleteLocation(locationId, function (err, result) {
        if(err){
            res.json({success: false, msg: err});
        }else {
            res.json({success: true, msg: "Successfully Deleted The check Point Location!"});
        }
    });
});




module.exports = router;