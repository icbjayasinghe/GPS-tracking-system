var async = require('async');
var hexToDec = require('hex-to-dec');


var TrackingData = {   

    splitDataNew:function(test){
        
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

    getNoOfData:function(d){
        data = hexToDec(d.substring(19,20));
        return data;
    },
}

module.exports = TrackingData;