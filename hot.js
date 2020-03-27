/**
 * 主要功能是处理今日热点
 * @since 2020/03/12
 */
const Axios = require('axios')
const Cheerio = require('cheerio');
const vm = require('vm');
const process = require('process');
const fs = require('fs-extra')


const url = 'https://tophub.today/';
async function getData(){
    let response = await Axios.get(url);
    let html = await response.data;
    let $ = Cheerio.load(html);
    let obj = []
    $('#node-1 .nano-content a').each((i,item) => {
        let temp = Cheerio.load(item)
        const index = temp('.cc-cd-cb-ll .s').text()
        const title = temp('.cc-cd-cb-ll .t').text()
        const heat = temp('.cc-cd-cb-ll .e').text()
        obj.push({href: $(item).attr('href'),index,title,heat})
    })
    return obj
}

async function hot(){
    let data = await getData()||{};
    console.log(data);
    try {
        let cache = await fs.readJSON('data/hot.json');
        if(cache){
            let keys = Object.keys(cache);
            for(let i = 0; i < keys.length; i++){
                let key = keys[i];
                //测试中发现数据源可能会产生丢失部分数据的问题，如果缺少某项数据，复用缓存数据
                data[key] = data[key] || cache[key];
            }
        }  
    } catch (error) {
        console.log(error);
    }
    await fs.writeJSON('data/hot.json',data)//保存数据
    // try {
    //     await CountryMap.getCountryMap();//更新全国分布地区
    // } catch (error) {
    //     console.log(error);
    // }
}

hot().catch((error) => {
    console.log(error);
    process.exit();
});

module.exports = hot