const puppeteer = require('puppeteer');

// var proxylist = require('./list_new.js');
// var proxylist = require('./list.js');
var viewports = require('./viewports.js');
var fs = require('fs');
var ualist = fs.readFileSync('ualist.txt').toString().split("\n");
var proxylist = fs.readFileSync('proxies.txt').toString().split("\n");

var successful = 0;
var errors = 0;
async function sendReq (list){
    let proxy = list.pop();
    let error = false;
    console.log(proxy);
    const browser = await puppeteer.launch({
        args: [
            // '--proxy-server=185.93.3.123:8080', // Or whatever the address is
            '--proxy-server=' + proxy, // Or whatever the address is
        ]
    });
    try {
        const page = await browser.newPage();
        await page.emulate({
            userAgent: getRandomFromList(ualist),
            viewport: getRandomFromList(viewports.list)
        })
        // await page.goto('http://localhost:8001');
        // await page.screenshot({
        //     path: './screens/example-' + Date.now() + '.png'
        // });

        let cookies = await page.cookies();
        console.log(cookies);

        await timeout(getRandomInt(1000,3000));

        // const votebutton = await page.$(".candidate-tile__vote-icon");
        // const res = await votebutton.evaluate( votebutton => votebutton.click() );
        page.click(".candidate-tile__vote-icon");

        await timeout(getRandomInt(1000,2000));

        // await page.screenshot({
        //     path: './screens/example_clicked-' + Date.now() + '.png'
        // });


    } catch (err) {
        // console.error('ERROR:', err.message);
        error = true;

    } finally {
        console.log(error ? 'x' : 'o');
        error ? successful++ : errors++;
    }

    await browser.close();

    let second = 1000;
    let minute = second * 60;
    await timeout(getRandomInt(minute,minute * 20));

    if(list.length)
        sendReq(list);
    else {
        console.log("FINISHED:");
        console.log("SUCCESSFUL: " + successful);
        console.log("ERRORS: " + errors);
        // sendReq(shuffle(proxylist));
    }
}

sendReq(shuffleArr(proxylist));

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomFromList(list){
    return list[Math.floor(Math.random()*list.length)];
}

function shuffleArr(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function shuffle(a) {
    a = JSON.parse(JSON.stringify(a)).list;
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
    return a;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// (async () => {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto('https://google.com');
//     await page.screenshot({path : "google.png"});
//     page.click("#lst-ib");
//     await page.keyboard.type("Smashing magazine");
//     await page.screenshot({path : "google1.png"});
//     page.click('input[type="submit"]');
//     // Note although the page has two input[type="submit"] elements it picks up the   first one more about it here.
//     await page.waitForNavigation();
//     console.log("1");
//     await page.screenshot({path : "google2.png"});
//     console.log("2");
//
//     browser.close();
// })();