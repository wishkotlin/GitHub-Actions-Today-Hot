// const puppeteer = require('puppeteer');
// var fs = require("fs");

// (async () => {
//   try {
//     if (!fs.existsSync('data')) {
//       fs.mkdirSync('data')
//     }
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto('https://tophub.today/');
//     const dimensions = await page.evaluate(() => {
//       return {
//         width: document.documentElement.clientWidth,
//         height: document.documentElement.clientHeight,
//         deviceScaleFactor: window.devicePixelRatio,
//       }
//     });
//     console.log("dimensions ", dimensions);
//     page.setViewport(dimensions)
//     await page.screenshot({
//       path: './data/example.png'
//     });
//     await browser.close();
//   } catch (error) {
//     console.log(error);
//     process.exit();
//   }
// })();

// const puppeteer = require('puppeteer');

// let getScreen = async (url) => {
//   // 启动Chromium
//   const browser = await puppeteer.launch({
//     ignoreHTTPSErrors: true,
//     headless: false,
//     args: ['--no-sandbox']
//   });
//   // 打开新页面
//   const page = await browser.newPage();
//   // 设置页面分辨率
//   await page.setViewport({
//     width: 1920,
//     height: 1080
//   });

//   let request_url = url;
//   // 访问
//   await page.goto(request_url, {
//     waitUntil: 'load'
//   }).catch(err => console.log(err));
//   await page.waitFor(3000);
//   let title = await page.title();
//   console.log(title);

//   // 网页加载最大高度
//   const max_height_px = 20000;
//   // 滚动高度
//   let scrollStep = 1080;
//   let height_limit = false;
//   let mValues = {
//     'scrollEnable': true,
//     'height_limit': height_limit
//   };

//   while (mValues.scrollEnable) {
//     mValues = await page.evaluate((scrollStep, max_height_px, height_limit) => {

//       // 防止网页没有body时，滚动报错
//       if (document.scrollingElement) {
//         let scrollTop = document.scrollingElement.scrollTop;
//         document.scrollingElement.scrollTop = scrollTop + scrollStep;

//         if (null != document.body && document.body.clientHeight > max_height_px) {
//           height_limit = true;
//         } else if (document.scrollingElement.scrollTop + scrollStep > max_height_px) {
//           height_limit = true;
//         }

//         let scrollEnableFlag = false;
//         if (null != document.body) {
//           scrollEnableFlag = document.body.clientHeight > scrollTop + 1081 && !height_limit;
//         } else {
//           scrollEnableFlag = document.scrollingElement.scrollTop + scrollStep > scrollTop + 1081 && !height_limit;
//         }

//         return {
//           'scrollEnable': scrollEnableFlag,
//           'height_limit': height_limit,
//           'document_scrolling_Element_scrollTop': document.scrollingElement.scrollTop
//         };
//       }

//     }, scrollStep, max_height_px, height_limit);

//     await sleep(800);
//   }

//   try {
//     await page.screenshot({
//       path: `./data/hot${new Date().valueOf()}.jpg`,
//       fullPage: true
//     }).catch(err => {
//       console.log('截图失败');
//       console.log(err);
//     });
//     await page.waitFor(5000);

//   } catch (e) {
//     console.log('执行异常');
//   } finally {
//     await browser.close();
//   }

// }

// //延时函数
// function sleep(delay) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       try {
//         resolve(1)
//       } catch (e) {
//         reject(0)
//       }
//     }, delay)
//   })
// }


const puppeteer = require('puppeteer');

let getScreen = async (url) => {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
  await page.goto(url);
  await page.setViewport({
    width: 1200,
    height: 800
  });

  await autoScroll(page);

  await page.screenshot({
    path: 'jd.png',
    fullPage: true
  });

  await browser.close();
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      var totalHeight = 0;
      var distance = 100;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

module.exports = {
  getScreen
}