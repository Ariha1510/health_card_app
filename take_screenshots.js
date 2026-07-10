const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    if (!fs.existsSync('assets')) {
        fs.mkdirSync('assets');
    }
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    console.log("Navigating to https://nirantar-health.netlify.app/");
    await page.goto('https://nirantar-health.netlify.app/', { waitUntil: 'networkidle2' });

    console.log("Taking Dashboard screenshot...");
    await page.screenshot({ path: 'assets/demo-dashboard.png' });

    console.log("Clicking Card Generator...");
    await page.click('button[data-target="generator-view"]');
    await new Promise(r => setTimeout(r, 500)); // wait for transition
    console.log("Taking Generator screenshot...");
    await page.screenshot({ path: 'assets/demo-generator.png' });

    console.log("Clicking Card Scanner...");
    await page.click('button[data-target="scanner-view"]');
    await new Promise(r => setTimeout(r, 500));
    console.log("Taking Scanner screenshot...");
    await page.screenshot({ path: 'assets/demo-scanner.png' });
    
    await browser.close();
    console.log("Screenshots captured!");
})();
