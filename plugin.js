const Screenshot = require('puppeteer-screenshot');

(async () => {
  const screenshot = new Screenshot({
    storage: {
      type: 'filesystem',
      path: './data/'
    },
    pageOption: {
      timeout: 30000,
    },
    view: {
      deviceScaleFactor: 2, // 可以理解为多倍图
      width: 750,
      height: 1200
    },
    captureOption: {
      type: 'jpeg',
      quality: 75,
      fullPage: true, // 是否截取全屏
      // clip: { // 裁剪
      //   x: 0,
      //   y: 0,
      //   width: 400,
      //   height: 400,
      // },
      omitBackground: false, // 是否隐藏背景
      encoding: 'binary'
    },
    hooks: {
      beforeCapture: function () {
        // do something
      },
      afterCapture: function () {
        // do something
      }
    }
  })

  const result = await screenshot.capture('https://tophub.today/n/KqndgxeLl9');

  // 传入对象方式覆盖options
  // const result2 = await screenshot.capture({
  //   url: 'http://www.baidu.com',
  //   type: 'url',
  //   view: {
  //     deviceScaleFactor: 1,
  //     width: 750,
  //     height: 1200,
  //   },
  // });

  await screenshot.close();

  process.on('exit', code => {
    screenshot.close();
  });
})()