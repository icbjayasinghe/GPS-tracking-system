var async = require('async');
var hexToDec = require('hex-to-dec');

var TrackingData = {   
    splitData : function (req, res, next) {
        var testData = req;
        let newTackingData = {};
        const tasks = [
            function time(cb) {
                dateDec = hexToDec(testData.substring(20,36));
                var date = new Date(dateDec);
                date.setHours(date.getHours() + 5);
                date.setMinutes(date.getMinutes() + 30);
                newTackingData.date = date;
                return cb(null, date);
            },
            function longitude(cb) {
                longi = hexToDec(testData.substring(38,46));
                var longitude = longi/10000000;
                newTackingData.longitude=longitude;
                return cb(null, longitude);
            },
            function latitude(cb) {
                lati = hexToDec(testData.substring(46,54));
                var latitude = lati/10000000;
                newTackingData.latitude = latitude;
                return cb(null, latitude);
            },
            function altitude(cb) {
                var altitude = hexToDec(testData.substring(54,58));
                newTackingData.altitude = altitude;
                return cb(null, altitude);
            },
            function angle(cb) {
                var angle = hexToDec(testData.substring(58,62));
                newTackingData.angle = angle;
                return cb(null, angle);
            },
            function satelites(cb) {
                var satelites = hexToDec(testData.substring(62,64));
                newTackingData.satelites=satelites;
                return cb(null, satelites);
            },
            function speed(cb) {
                var speed = hexToDec(testData.substring(64,68));
                newTackingData.speed=speed;
                return cb(null, speed);
            },
            function noOFIo(cb){
                var noOFIoElements = hexToDec(testData.substring(70,72));
                var noOfOneBytes = hexToDec(testData.substring(72,74));
                // console.log("1byte "+noOfOneBytes);
                if(noOfOneBytes!=0){
                    for(i=0;i<noOfOneBytes;i++){
                        var idEndPoint=74+2*i;
                        var valueEndPoint=idEndPoint+2;
                        console.log("point id"+idEndPoint+" : "+testData.substring(74,idEndPoint));
                        console.log("value " +testData.substring(74,valueEndPoint));   
                    }
                    var secondEndPoint = 74+(4*noOfOneBytes);
                    var noOfTwoBytes = hexToDec(testData.substring(secondEndPoint,secondEndPoint+2));
                    console.log("second "+noOfTwoBytes);
                }
                

                // elementCount=0;
                // var oneByteState = false;
                // var twoByteState = false;
                // var fourByteState = false;
                // var eightByteState = false;
                // for(i=0;i<noOFIoElements;i++){
                //     if(oneByteState==false){
                //         oneByteState==true;
                //         var noOfOneByte =  hexToDec(testData.substring(72,74));
                //         //for(j)
                //         console.log("No of 1byte "+noOfOneByte);
                //     }
                    
                // }
                console.log("IO "+noOFIoElements);
            } 
        ];

        async.series(tasks, (err, results) => {
            if (err) {
                console.log(err);
            }
        });  
        return newTackingData;
    },

    getNoOfData:function(d){
        data = hexToDec(d.substring(19,20));
        //console.log(this.splitData(d.substring(105,184)));
        //var len = (d.length-30)/86;
        console.log("numb "+data);
        console.log(d)
        // console.log("Len : "+d.length)
        return data;
    }
}

module.exports = TrackingData;