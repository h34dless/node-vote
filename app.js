/**
 * Created by Marcel Michelfelder on 28.08.2016.
 */
//https://www.canon-summertour.de/api/v1/participations/vote/142
var request = require('request');


var proxylist = require('./list.js');

var fs = require('fs');
var ualist = fs.readFileSync('ualist.txt').toString().split("\n");


var copylist = shuffle(JSON.parse(JSON.stringify(proxylist)).list);

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
    return a;
}

var successful = 0;
var errors = 0;
function sendRequests(list){
    console.log("REQUEST #",proxylist.list.length-list.length);
    request(
        {
            'url':'https://www.canon-summertour.de/api/v1/participations/vote/142',
            headers: {
                "User-Agent": getRandomUA(),
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8"
                "Accept-Encoding": "gzip, deflate, br"
                "Accept-Language": "de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7"
                "Cache-Control": "max-age=0"
                "Connection": "keep-alive"
                "Cookie": "XSRF-TOKEN=eyJpdiI6IlwvbWpQVWc3S3dRQytvMVFJdFpvZElBPT0iLCJ2YWx1ZSI6IkR2blk2N21sRFdubzV6ZTNFWml1c3dEc1RRZHpObzNuTTA3ZzRsV2F2UXpXRGtNaGhoMHpWd3p6bElhMzhsSllJWEJQVm1JalBkS2dXcm10bm5RbVJRPT0iLCJtYWMiOiIxYzk4NjFmY2EyNmYxZjNmM2QzMWI3YWI0YjYzYzNkNjljODY5MWZjMDRlZTFjODE4OGRlOGFhZTViYTBmMDgxIn0%3D; the_next_make_up_artist_session=eyJpdiI6IjU2eHZhSDdYa3JFUEE0S1hLQTZIQkE9PSIsInZhbHVlIjoiZEpaY1pMQUd5Q29nSFdCRzczTktzYnlKOHNcL3ZRbyt0S0lZY05KakJcL2RwbXIyTDRJYUdrWHdsdmszQkg2dWxyKzRINXNiZWE0UENPdXl4NWZEMEpuZz09IiwibWFjIjoiOWFmNjg1MmM4YmRmY2M1ZWNkNTFjMDg4YjBiYjFiZjQxZjViZGQ1MWNjYTAzMmRmNmFlMWViN2Y3OTcwZTQ5MyJ9"
                "DNT": 1
                "Host": "www.thenextmakeupartist.com"
                "Upgrade-Insecure-Requests": 1
            },
            //'proxy':'http://yourproxy:8087'
            'proxy': 'http://' + list.pop()
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
                successful++;
            } else {
                console.log(error,response,body);
                errors++;
            }
            console.log("successful:", successful);
            console.log("errors:", errors);
            if(list.length)
                sendRequests(list);
            else {
                console.log("start anew..");
                var copylist = shuffle(JSON.parse(JSON.stringify(proxylist)).list);
                sendRequests(copylist);
            }
        });
}

function getRandomUA(){
    return ualist[Math.floor(Math.random()*ualist.length)];
}

sendRequests(copylist);

