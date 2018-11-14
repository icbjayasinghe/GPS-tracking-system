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
                var startTwoByte = noOfOneBytes*4+74;
                var noOfTwoBytes = hexToDec(testData.substring(startTwoByte,startTwoByte+2));
                var startFourByte = noOfTwoBytes*6+startTwoByte+2;
                var noOfFourBytes = hexToDec(testData.substring(startFourByte,startFourByte+2));
                var startEightByte = noOfFourBytes*10+startFourByte+2;
                var noOfEightBytes = hexToDec(testData.substring(startEightByte,startEightByte+2));
                var endOfBreaker = noOfEightBytes*18 + startEightByte+4;
                
                console.log("1byte "+noOfOneBytes);
                console.log("2byte "+startTwoByte);
                console.log("4byte "+startFourByte);
                console.log("8byte "+startEightByte);
                console.log("breaker "+endOfBreaker);
                for(i=0;i<noOfOneBytes;i++){
                    var idStartPoint = i*4+74
                    var oneByteId = hexToDec(testData.substring(idStartPoint,idStartPoint+2));
                    var value = hexToDec(testData.substring(idStartPoint+2,idStartPoint+4));
                    console.log("1 byte ids "+oneByteId);
                    console.log("1 byte values "+value);
                }
                for(i=0;i<noOfTwoBytes;i++){
                    var idStartPoint = i*6+startTwoByte+2;
                    var TwoByteId = hexToDec(testData.substring(idStartPoint,idStartPoint+2));
                    var value = hexToDec(testData.substring(idStartPoint+2,idStartPoint+6));
                    console.log("2 byte ids "+TwoByteId);
                    console.log("2 byte values "+value);
                }
                for(i=0;i<noOfFourBytes;i++){
                    var idStartPoint = i*10+startFourByte+2;
                    var FourByteId = hexToDec(testData.substring(idStartPoint,idStartPoint+2));
                    var value = hexToDec(testData.substring(idStartPoint+2,idStartPoint+10));
                    console.log("4 byte ids "+FourByteId);
                    console.log("4 byte values "+value);
                }

                for(i=0;i<noOfEightBytes;i++){
                    var idStartPoint = i*18+startEightByte+2;
                    var EightByteId = hexToDec(testData.substring(idStartPoint,idStartPoint+2));
                    var value = hexToDec(testData.substring(idStartPoint+2,idStartPoint+18));
                    console.log("8 byte ids "+EightByteId);
                    console.log("8 byte values "+value);
                }

                
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
    },

    splitDataNew:function(req, res){
        var test = "0000000000000000080400000113fc208dff000f14f650209cca80006f00d60400040004030101150316030001460000015d0000000113fc17610b000f14ffe0209cc580006e00c00500010004030101150316010001460000015e0000000113fc284945000f150f00209cd200009501080400000004030101150016030001460000015d0000000113fc267c5b000f150a50209cccc0009300680400000004030101150016030001460000015b000400000000";
        //var test = "00000000000000da0805000001670bffa2d0002f9ceb62041929a0003a00000e0000000401010002090030430000014800000bb800000001670bfeb870002f9ceb62041929a0003d00000f000000040101000209002c430000014800000bb800000001670bfdce10002f9ceb62041929a0003d00000d0000000401010002090012430000014800000bb800000001670bfce798002f9ceb62041929a0003f000011000000040101000209001c430000014800000bb800000001670bfbf950002f9ceb62041929a0003f00000f0000000401010002090010430000014800000bb8000500002c62";
        //var test = "00000000000000da0805000001670c68ebf0002f9ceb62041929a0fff40000130000000401010002090014430000014800000bb800000001670c5ed9d0002f9ceb62041929a0ffe60000120000000401010002090022430000014800000bb800000001670c54c7b0002f9ceb62041929a000190000100000000401010002090018430000014800000bb800000001670c4621b0002f9ceb62041929a0004c000010000000040101000209002c430000014800000bb800000001670c3c0f90002f9ceb62041929a0001d00000f000000040101000209002b430000014800000bb80005000004ae";
        console.log('length of the data '+test.length);
        //n== no of data
        var n = hexToDec(test.substring(18,20));
        console.log('number of data '+n);

        //l== length of a data set
        var l = (test.length-30)/n;
        console.log(l);

        for (i=0; i<n; i++){
            console.log(i+1);
            console.log("data range : "+(20+i*l)+'-'+(20+(i+1)*l));
            var data = test.substring(20+i*l,20+(i+1)*l);
            
            //GPS element
            dateDec = hexToDec(data.substring(0,16));
            var date = new Date(dateDec);
            date.setHours(date.getHours() + 5);
            date.setMinutes(date.getMinutes() + 30);
            console.log('date '+date);

            var priority = hexToDec(data.substring(16,18));
            console.log('priority '+priority);

            var longitude = (hexToDec(data.substring(18,26)))/10000000;
            console.log('longitude '+longitude);

            var latitude = (hexToDec(data.substring(26,34)))/10000000;
            console.log('latitude '+latitude);

            var altitude = hexToDec(data.substring(34,38));
            console.log('altitude '+altitude);
            
            var angle = hexToDec(data.substring(38,42));
            console.log('angle '+angle);

            var satellites = hexToDec(data.substring(42,44));
            console.log('satellites '+satellites);

            var speed = hexToDec(data.substring(44,48));
            console.log('speed '+speed);

            var speed = hexToDec(data.substring(44,48));
            console.log('speed '+speed);

            var ioElementId = hexToDec(data.substring(48,50));
            console.log('IO Element Id '+ioElementId);

            //no of IO Elements
            var k = hexToDec(data.substring(50,52));
            console.log('Number of IO Elements '+k);

            for (j=0;j<k;j++){

                //no of 1 byte IO Elements = w
                var w = hexToDec(data.substring(52,54));
                console.log('1 byte IO Elements '+w)

                //no of 2 byte IO Elements = x
                var x = hexToDec(data.substring(54+4*w,56+4*w));
                console.log('2 byte IO Elements '+x)

                //no of 4 byte IO Elements = y
                var y = hexToDec(data.substring(56+(4*w)+(6*x),58+(4*w)+(6*x)));
                console.log('4 byte IO Elements '+y)
                
                //no of 8 byte IO Elements = z
                var z = hexToDec(data.substring(58+(4*w)+(6*x)+(10*y),60+(4*w)+(6*x)+(10*y)));
                console.log('8 byte IO Elements '+z)

            }
        }
        res.json("Hi :)");
    }
}

module.exports = TrackingData;