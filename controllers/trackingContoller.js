var async = require('async');
var hexToDec = require('hex-to-dec');

var rawData = {   
    splitData : function (req, res, next) {
        var testData = "080400000113fc208dff000f14f650209cca80006f00d60400040004030101150316030001460000015d0000000113fc17610b000f14ffe0209cc580006e00c0050001000403010115 0316010001460000015e0000000113fc284945000f150f00209cd200009501080400000004030101150016030001460000015d0000000113fc267c5b000f150a50209cccc0009300680400000004030101150016030001460000015b0004";    
        let rsp = {};
        console.log("test:  " + testData);
        const tasks = [
            function time(cb) {
                dateDec = hexToDec(testData.substring(9,20));
                var date = new Date(dateDec);
                rsp.date = date;
                return cb(null, date);
                //return date;
            },
            function longitude(cb) {
                longi = hexToDec(testData.substring(22,30));
                var longitude = longi/10000000;
                rsp.longitude=longitude;
                return cb(null, longitude);

                //return longitude;
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
            //return res.json(results);
           
        })
        console.log(rsp);
    }
}

module.exports = rawData;