const express = require('express');
const router = express.Router();

const CheckPoint = require('../models/checkPoint');

/* view check Points page. */
router.get('/', function(req, res, next) {
    CheckPoint.getAllCheckPoints(function (err, docs) {
        if(err){
            res.json({success: false, msg: err});
        }else {
            res.json(docs);
        }
    });
});

/* add new check Point Locations. */
router.post('/', function(req, res, next) {
    const checkPoint = new CheckPoint({
        userId : req.body.userId,
        locationName : req.body.locationName,
        locationType : req.body.locationType,
        latitude : req.body.latitude,
        longitude : req.body.longitude
    });
    CheckPoint.addLocation(checkPoint, function (err, result) {
            if(err){
                res.json({success: false, msg: err});
            }else {
                res.json({success: true, msg: "Successfully Added New Check Point!"});
            }
        });
});

/* edit check Points. */
router.get('/edit/:id', function(req, res, next) {
    req.session.locationId = req.params.id;
    res.redirect('/CheckPoint/edit');
});

router.get('/edit', function(req, res, next) {
    CheckPoint.findLocationId(req.session.locationId, function (err, docs) {
        if(err){
            res.json({success: false, msg: err});
        }else {
            res.json({success: true, msg: "Successfully Display The Edit Check Point Page!"});
        }
    });
});


router.post('/edit', function(req, res, next) {
    req.session.updateDocs = {
        $set: {
            userId : req.body.userId,
            locationName : req.body.locationName,
            locationType : req.body.locationType,
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
    res.redirect('/CheckPoint/delete')
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