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
    req.session.locationId = req.params.id;
    res.redirect('/CheckPointLocation/edit');
});

router.get('/edit', function(req, res, next) {
    CheckPoint.findLocationId(req.session.locationId, function (err, docs) {
        if(err){
            res.json({success: false, msg: err});
        }else {
            res.json({success: true, msg: "Successfully Display The Edit check Point Location Page!"});
        }
    });
});


router.post('/edit', function(req, res, next) {
    req.session.updateDocs = {
        $set: {
            userId : req.body.userId,
            locationName : req.body.locationName,
            latitude : req.body.latitude,
            longitude : req.body.longitude
        }
    };
    CheckPoint.editLocation(req.session.locationId, req.session.updateDocs, function (err, result) {
        if(err){
            res.json({success: false, msg: err});
        }else {
            res.json({success: true, msg: "Successfully Edited The check Point Location!"});
            req.session.locationId = 0;
        }
    });
});


/* delete check Points. */
router.get('/delete/:id', function(req, res, next) {
    req.session.locationId = req.params.id;
    res.redirect('/CheckPointLocation/delete')
});

router.get('/delete', function(req, res, next) {
    CheckPoint.deleteLocation(req.session.locationId, function (err, result) {
        if(err){
            res.json({success: false, msg: err});
        }else {
            res.json({success: true, msg: "Successfully Deleted The check Point Location!"});
        }
    });
});


module.exports = router;