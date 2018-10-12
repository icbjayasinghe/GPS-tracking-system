var async = require('async');
var hexToDec = require('hex-to-dec');

var TrackingData = {   
    splitData : function (req, res, next) {
        var testData = req;
        let newTackingData = {};
        console.log("test:  " + testData);
        const tasks = [
            function time(cb) {
                dateDec = hexToDec(testData.substring(9,20));
                var date = new Date(dateDec);
                newTackingData.date = date;
                return cb(null, date);
            },
            function longitude(cb) {
                longi = hexToDec(testData.substring(22,30));
                var longitude = longi/10000000;
                newTackingData.longitude=longitude;
                return cb(null, longitude);
            },
            function latitude(cb) {
                lati = hexToDec(testData.substring(30,38));
                var latitude = lati/10000000;
                newTackingData.latitude = latitude;
                return cb(null, latitude);
            },
            function altitude(cb) {
                var altitude = hexToDec(testData.substring(38,42));
                newTackingData.altitude = altitude;
                return cb(null, altitude);

            },
            function angle(cb) {
                var angle = hexToDec(testData.substring(42,46));
                newTackingData.angle = angle;
                return cb(null, angle);

            },
            function sattelites(cb) {
                var sattelites = hexToDec(testData.substring(46,48));
                newTackingData.sattelites=sattelites;
                return cb(null, sattelites);
            },
            function speed(cb) {
                var speed = hexToDec(testData.substring(48,52));
                newTackingData.speed=speed;
                return cb(null, speed);
            } 
        ];
        async.series(tasks, (err, results) => {
            if (err) {
                return next(err);
            }
        })
        console.log(newTackingData);
    }
    
}

module.exports = TrackingData;