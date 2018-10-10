var hexToDec = require('hex-to-dec');
var rowData = "080400000113fc208dff000f14f650209cca80006f00d60400040004030101150316030001460000015d0000000113fc17610b000f14ffe0209cc580006e00c00500010004030101150316010001460000015e0000000113fc284945000f150f00209cd200009501080400000004030101150016030001460000015d0000000113fc267c5b000f150a50209cccc0009300680400000004030101150016030001460000015b0004";    
var fullDataSplit = {
    timeStamp: function(){
        dateData =rawData.substring(9,20);
        dateDec = hexToDec(data);
        var date = new Date(dateDec);
        return date;
    },
    latitude: function(){
        latitudeData = rawData.substring(22,30);
        lati = hexToDec(latitudeData);
        latiValue=lati/10000000;
        return latiValue;
    }
    

}

module.exports = fullDataSplit;

