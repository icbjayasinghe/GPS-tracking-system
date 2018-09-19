var express = require('express');
var router = express.Router();

var CheckPoint = require('../models/checkPointLocation');



/* view check Points page. */
router.get('/', function(req, res, next) {
    res.send('Display check Points Location Page');
});

/* add new check Point Locations. */
router.post('/', function(req, res, next) {

    console.log(req.body.locationId);
    console.log(req.body.userId);
    console.log(req.body.locationName);
    console.log(req.body.latitudes);
    console.log(req.body.longitudes);

    var checkPoint = new CheckPoint();
        checkPoint.locationId = req.body.locationId;
        checkPoint.userId = req.body.userId;
        checkPoint.locationName = req.body.locationName;
        checkPoint.latitude = req.body.latitude;
        checkPoint.longitude = req.body.longitude;

    checkPoint.save(function (err, result) {
        if(err){
            res.json({success: false, msg: err});
        }else {
            res.json({success: true, msg: "Successfully Added New check Point Location!"});
        }

        //req.flash('success', 'Successfully Added New check Point Location!');

    });
});

/* edit check Points. */
router.get('/edit', function(req, res, next) {
});

/* delete check Points. */
router.get('/delete', function(req, res, next) {
});




module.exports = router;