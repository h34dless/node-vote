const puppeteer = require('puppeteer');

var proxylist = require('./list.js');
var viewports = require('./viewports.js');

(async () => {
    const browser = await puppeteer.launch();
    try {
        const page = await browser.newPage();
        await page.emulate({
            userAgent: 'Headless-Chrome',
            viewport: {
                width: 1800,
                height: 1024,
            }
        })
        await page.goto('https://www.google.de');
        await page.screenshot({
            path: './example-' + Date.now() + '.png'
        });


        // const votebutton = await page.$(".candidate-tile__vote-icon");
        // const res = await votebutton.evaluate( votebutton => votebutton.click() );
        page.click(".candidate-tile__vote-icon");

        await timeout(1000);

        await page.screenshot({
            path: './screens/example_clicked-' + Date.now() + '.png'
        });


    } catch (err) {
        console.error('ERROR:', err.message);
    } finally {
        console.log('FINISHED');
    }

    await browser.close();

})();

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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