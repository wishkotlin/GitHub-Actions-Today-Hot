const hot = require('./hot');
const zhihu = require('./zhihu');
var fs= require("fs");

async function main(params) {
  if(!fs.existsSync('data')) {
    fs.mkdirSync('data')
  }
  try {
    await hot()
    await zhihu()
  } catch (error) {
    console.log(error);
    process.exit();
  }
}

main()
