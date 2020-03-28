var { getScreen } = require('./screen')

console.log(getScreen, "getScreen");
(async() => {
  await getScreen('https://tophub.today/n/KqndgxeLl9')
})()