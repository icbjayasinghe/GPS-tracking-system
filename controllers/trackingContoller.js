var async = require('async');
var hexToDec = require('hex-to-dec');


var TrackingData = {   

    splitDataNew:function(rawData){
        //var test = "0000000000000000080400000113fc208dff000f14f650209cca80006f00d60400040004030101150316030001460000015d0000000113fc17610b000f14ffe0209cc580006e00c00500010004030101150316010001460000015e0000000113fc284945000f150f00209cd200009501080400000004030101150016030001460000015d0000000113fc267c5b000f150a50209cccc0009300680400000004030101150016030001460000015b000400000000";
        var test = rawData;
        //var test = "00000000000000da0805000001670c68ebf0002f9ceb62041929a0fff40000130000000401010002090014430000014800000bb800000001670c5ed9d0002f9ceb62041929a0ffe60000120000000401010002090022430000014800000bb800000001670c54c7b0002f9ceb62041929a000190000100000000401010002090018430000014800000bb800000001670c4621b0002f9ceb62041929a0004c000010000000040101000209002c430000014800000bb800000001670c3c0f90002f9ceb62041929a0001d00000f000000040101000209002b430000014800000bb80005000004ae";
        console.log('length of the data '+test.length);
        //n== no of data
        var n = hexToDec(test.substring(18,20));
        console.log('number of data '+n);

        var dataArray=[];

        //l== length of a data set
        var l = (test.length-30)/n;
        console.log(l);

        for (i=0; i<n; i++){

            //define new tracking data
            let newTackingData = {};
            console.log('_______________________________');
            console.log(i+1);
            var data = test.substring(20+i*l,20+(i+1)*l);
            
            //GPS element
            dateDec = hexToDec(data.substring(0,16));
            var date = new Date(dateDec);
            date.setHours(date.getHours() + 5);
            date.setMinutes(date.getMinutes() + 30);
            newTackingData.date = date;
            console.log('date '+date);

            var priority = hexToDec(data.substring(16,18));
            newTackingData.priority = priority;
            console.log('priority '+priority);

            var longitude = (hexToDec(data.substring(18,26)))/10000000;
            newTackingData.longitude = longitude;
            console.log('longitude '+longitude);

            var latitude = (hexToDec(data.substring(26,34)))/10000000;
            newTackingData.latitude = latitude;
            console.log('latitude '+latitude);

            var altitude = hexToDec(data.substring(34,38));
            newTackingData.altitude = altitude;
            console.log('altitude '+altitude);
            
            var angle = hexToDec(data.substring(38,42));
            newTackingData.angle = angle;
            console.log('angle '+angle);

            var satellites = hexToDec(data.substring(42,44));
            newTackingData.satellites = satellites;
            console.log('satellites '+satellites);

            var speed = hexToDec(data.substring(44,48));
            newTackingData.speed = speed;
            console.log('speed '+speed);

            var ioElementId = hexToDec(data.substring(48,50));
            console.log('IO Element Id '+ioElementId);

            //no of IO Elements
            var k = hexToDec(data.substring(50,52));
            console.log('Number of IO Elements '+k);

            //no of 1 byte IO Elements = w
            var w = hexToDec(data.substring(52,54));
            console.log('1byte : '+w);
            for(j=0;j<w;j++){
                var id = hexToDec(data.substring(54+j*4,56+j*4));
                var value = hexToDec(data.substring(56+j*4,58+j*4));
                console.log('id : '+id+', value : '+value);
                if (id == 1){
                    console.log('hi');
                    console.log('id : '+id+', value : '+value);
                    newTackingData.ignition = value;
                }
                else if (id == 2){
                    newTackingData.digitalInputTwo = value;
                }
            }

            //no of 2 byte IO Elements = x
            var x = hexToDec(data.substring(54+4*w,56+4*w));
            console.log('2byte : '+x);
            for(j=0;j<x;j++){
                var id = hexToDec(data.substring(56+4*w+j*6,58+4*w+j*6));
                var value = hexToDec(data.substring(58+4*w+j*6,62+4*w+j*6));
                console.log('id : '+id+', value : '+value);   
                if (id == 9){
                    newTackingData.fuel = value;
                }
                else if (id == 64){
                    newTackingData.batteryVoltage = value;
                }            
            }

            //no of 4 byte IO Elements = y
            var y = hexToDec(data.substring(56+(4*w)+(6*x),58+(4*w)+(6*x)));
            console.log('4byte : '+y);
            for(j=0;j<y;j++){
                var id = hexToDec(data.substring(58+(4*w)+(6*x)+10*j,60+(4*w)+(6*x)+10*j));
                var value = hexToDec(data.substring(60+(4*w)+(6*x)+10*j,68+(4*w)+(6*x)+10*j));
                console.log('id : '+id+', value : '+value);
                if (id == 72){
                    newTackingData.temperature = value;
                }
            }

            //no of 8 byte IO Elements = z
            var z = hexToDec(data.substring(58+(4*w)+(6*x)+(10*y),60+(4*w)+(6*x)+(10*y)));
            console.log('8byte : '+z);
            for(j=0;j<z;j++){       
                var id = hexToDec(data.substring(60+(4*w)+(6*x)+(10*y)+18*j,62+(4*w)+(6*x)+(10*y)+18*j));
                var value = hexToDec(data.substring(62+(4*w)+(6*x)+(10*y)+18*j,78+(4*w)+(6*x)+(10*y)+18*j));
                console.log('id : '+id+', value : '+value);
            }

            dataArray[i]=newTackingData;
            
        }
        //res.json(dataArray);
        return(dataArray);
    },

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
        //console.log("numb "+data);
        //console.log(d)
        // console.log("Len : "+d.length)
        return data;
    },
}

module.exports = TrackingData;