const puppeteer = require('puppeteer');
var fs = require("fs");

(async () => {
  if (!fs.existsSync('data')) {
    fs.mkdirSync('data')
  }
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://tophub.today/n/KqndgxeLl9', {
    waitUntil: 'networkidle2'
  });
  let divHandle = await page.$('#appbar')
  await page.evaluate((el, value) => el.setAttribute('style', value),
    divHandle,
    'display: none'
  )
  await page.pdf({
    path: './data/hot.pdf',
    format: 'A4',
  });
  await browser.close();
})()