var async = require('async');
var hexToDec = require('hex-to-dec');

var rawData = {   
    splitData : function (req, res, next) {
        var testData = req;
        let rsp = {};
        console.log("test:  " + testData);
        const tasks = [
            function time(cb) {
                dateDec = hexToDec(testData.substring(9,20));
                var date = new Date(dateDec);
                rsp.date = date;
                return cb(null, date);
            },
            function longitude(cb) {
                longi = hexToDec(testData.substring(22,30));
                var longitude = longi/10000000;
                rsp.longitude=longitude;
                return cb(null, longitude);
            },
            function latitude(cb) {
                lati = hexToDec(testData.substring(30,38));
                var latitude = lati/10000000;
                rsp.latitude = latitude;
                return cb(null, latitude);
            },
            function altitude(cb) {
                var altitude = hexToDec(testData.substring(38,42));
                rsp.altitude = altitude;
                return cb(null, altitude);

            },
            function angle(cb) {
                var angle = hexToDec(testData.substring(42,46));
                rsp.angle = angle;
                return cb(null, angle);

            },
            function sattelites(cb) {
                var sattelites = hexToDec(testData.substring(46,48));
                rsp.sattelites=sattelites;
                return cb(null, sattelites);
            },
            function speed(cb) {
                var speed = hexToDec(testData.substring(48,52));
                rsp.speed=speed;
                return cb(null, speed);
            }
            
        ];
        async.series(tasks, (err, results) => {
            if (err) {
                return next(err);
            }
        })
        console.log(rsp);
    }
}

module.exports = rawData;