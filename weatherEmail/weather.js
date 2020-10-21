const originRequest = require('request');
const iconv = require('iconv-lite')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')
const dayjs = require('dayjs')
const sendEmail = require('./sendEmail')
// 赤壁当天的天气
const wData = [
    {
        url:'http://www.qixiangwang.cn/chibi15tian.htm',
        name: '赤壁',
        code: 'chibi',
        qq: '757036923@qq.com'
    },
    {
        url: 'https://www.qixiangwang.cn/guangzhou.htm',
        name: '广州',
        code: 'guangzhou',
        qq: '1213344190@qq.com'
    },
    {
        url: 'https://www.qixiangwang.cn/shanghai.htm',
        name: '上海',
        code: 'shanghai',
        qq: '1605006939@qq.com'
    },
]
function request (url) {
    return new Promise((resolve,reject) =>{
        let option = {
            encoding: null
        }
        originRequest(url, option, (err, res , body) =>{
            if(err) {
                throw new Error(err) 
                return
             } else {
                 console.log('wpadasda', body)
                resolve(body)
             }
           
        })
    }) 
}
function sub () {
    let reqfun = []
    wData.forEach(p =>{
        reqfun.push(request(p.url))
    })
    Promise.all(reqfun).then(async res =>{
        for(let i = 0;i<wData.length;i++) {
            let $ = cheerio.load(res[i].toString())
            let weatherData =  getWeaterData($)
            console.log('ahahha', weatherData)
            changeHtml(weatherData, wData[i].code, wData[i].name, wData[i].qq)
        }
    })
}

function refreshWeatherData () {
    let myDate = new Date();
    let f = myDate.getMinutes()
    let s = myDate.getSeconds()
    if(f === 0 && s === 0) {
        sub()
    }
    setTimeout(() =>{
        refreshWeatherData()
    }, 1000)
}

function setWeatherClass (weather) {
    let weatherClass = ''
    switch (true) {
        case weather.includes('晴'):
            weatherClass = 'icon0'
        break;
        case weather.includes('云'):
            weatherClass = 'icon2'
        break;
        case weather.includes('阴'):
            weatherClass = 'icon4'
        break;
        case weather.includes('雨'):
            weatherClass = 'icon5'
        break;
        case weather.includes('雪'):
            weatherClass = 'icon7'
        break;
        case weather.includes('雾'):
            weatherClass = 'icon9'
        break;
        default:
            weatherClass = ''
        break
    }
    return weatherClass
}

 function getWeaterData($) {
    const weatherClass = {
        '晴日': 'clear-day',
        '晴月': 'clear-night', 
        '多云日': 'partly-cloudy-day', 
        '多云月': 'partly-cloudy-night', 
        '多云': 'cloudy', 
        '下雨': 'rain', 
        '雨夹雪或雹': 'sleet', 
        '下雪': 'snow', 
        '风': 'wind', 
        '雾': 'fog', 
    }
    // 今天详细天气
    let dom =  $('.pagemian .leftbar .bbox_c .tableTop tr td').eq(2)
    let dom1 =  $('.pagemian .leftbar .bbox_c .tableTop tr td').eq(4).text().trim()
    let len1 =  dom1.split('：').length
    let shidu =  dom1.split('\n')[1].split('：')[1] // 湿度
    let qiya =   dom1.split('\n')[2].split('：')[1] // 气压
    let nengjiandu =   dom1.split('\n')[3].split('：')[1] // 能见度
    let temp1 =  dom.find('#sk_temp').text() // 温度
    let weather1 =  dom.find('b').eq(0).text() // 天气
    let isHasZH = weather1.includes('转')
    let weather1_1class = ''
    let weather1_2class = ''
    if(isHasZH){
        weather1_1class = setWeatherClass(weather1.split('转')[0])
        weather1_2class = setWeatherClass(weather1.split('转')[1])
    } else {
        weather1_1class = setWeatherClass(weather1)
    }
    let wind =  dom.find('#sk_wdws').text() // 风向
    let len =  dom.text().trim().split("：").length
    let rainfall =  dom.text().trim().split("：")[len-1] // 降雨量
    // 明天详细天气
    let dom2 =  $('.sflb table').eq(2)
    let temp2Top =  dom2.find('tr').eq(0).find('td').eq(4).find('strong').text().replace(/[^0-9]/ig,"") // 白天气温
    let temp2Low =  dom2.find('tr').eq(1).find('td').eq(3).find('strong').text().replace(/[^0-9]/ig,"") // 夜间气温
    let weather2Bai =  dom2.find('tr').eq(0).find('td').eq(3).text() // 白天天气
    let weather2hei =  dom2.find('tr').eq(1).find('td').eq(2).text() // 夜间天气
    let weather2 = weather2Bai !== weather2hei? weather2Bai + '转' + weather2hei : (weather2Bai||weather2hei)
    let isHasZH2 = weather2.includes('转')
    let weather2_1class = ''
    let weather2_2class = ''
    if(isHasZH2){
        weather2_1class = setWeatherClass(weather2.split('转')[0])
        weather2_2class = setWeatherClass(weather2.split('转')[1])
    } else {
        weather2_1class = setWeatherClass(weather2)
    }
    let temp2 =  Number(temp2Top) > Number(temp2Low) ? Number(temp2Low) + '～' + Number(temp2Top) + '℃' :  Number(temp2Top) + '～' + Number(temp2Low) + '℃'

    // 后天详细天气
    let dom3 =  $('.sflb table').eq(3)
    let temp3Top =  dom3.find('tr').eq(0).find('td').eq(4).find('strong').text().replace(/[^0-9]/ig,"") // 白天气温
    let temp3Low =  dom3.find('tr').eq(1).find('td').eq(3).find('strong').text().replace(/[^0-9]/ig,"") // 夜间气温
    let weather3Bai =  dom3.find('tr').eq(0).find('td').eq(3).text() // 白天天气
    let weather3hei =  dom3.find('tr').eq(1).find('td').eq(2).text() // 夜间天气
    let weather3 = weather3Bai !== weather3hei? weather3Bai + '转' + weather3hei : (weather3Bai||weather3hei)
    let isHasZH3 = weather3.includes('转')
    let weather3_1class = ''
    let weather3_2class = ''
    if(isHasZH3){
        weather3_1class = setWeatherClass(weather3.split('转')[0])
        weather3_2class = setWeatherClass(weather3.split('转')[1])
    } else {
        weather3_1class = setWeatherClass(weather3)
    }
    let temp3 =  Number(temp3Top) > Number(temp3Low) ? Number(temp3Low) + '～' + Number(temp3Top) + '℃' :  Number(temp3Top) + '～' + Number(temp3Low) + '℃'

    // 总体天气描述
    let today = $('.tqqk ul li').eq(0).text() // 今天天气总体描述
    let tomorrow = $('.tqqk ul li').eq(1).text() // 明天天气总体描述
    let tomorrow2 = $('.tqqk ul li').eq(2).text() // 后天天气总体描述

    let week = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ]
    let date2 = new Date()
    let nextDay = date2.getDate() +1
    date2.setDate(nextDay)
    let date3 = new Date()
    let nextDay1 = date3.getDate() +2
    date3.setDate(nextDay1)
    let weatherData = {
        temp1,
        temp2,
        temp3,
        weather1,
        weather2,
        weather3,
        w1: week[new Date().getDay()],
        w2: week[date2.getDay()],
        w3: week[date3.getDay()],
        date1:dayjs().format('YYYY-MM-DD'),
        date2:dayjs().add(1, 'day').format('YYYY-MM-DD'),
        date3:dayjs().add(2, 'day').format('YYYY-MM-DD'),
        weather1_1class,
        weather1_2class, 
        weather2_1class,
        weather2_2class,
        weather3_1class,
        weather3_2class
    }
    console.log('数据', weatherData)
    return weatherData
}
// request(wData, async function (err, res , body) {
//     // let html =  iconv.decode(body, 'utf-8')
//     if(err) {
//        throw new Error(err) 
//        return
//     } else {
//         const $ = await cheerio.load(body.toString())
//         getWeaterData($)
//     }
// })
async function changeHtml (weatherData, code, name, email) {
    const htmlPath = path.resolve(__dirname, './html/index.html') 
    const html = fs.readFileSync(htmlPath)
    const $ = cheerio.load(html.toString())
    $('#tem1').text(weatherData.temp1)
    $('#tem2').text(weatherData.temp2)
    $('#tem3').text(weatherData.temp3)
    $('#date1').text(weatherData.date1)
    $('#date2').text(weatherData.date2)
    $('#date3').text(weatherData.date3)
    $('#weed1').text(weatherData.w1)
    $('#weed2').text(weatherData.w2)
    $('#weed3').text(weatherData.w3)
    $('#weat1').text(weatherData.weather1)
    $('#weat2').text(weatherData.weather2)
    $('#weat3').text(weatherData.weather3)
    // weatherData.weather2_1class = weatherData.weather1_1class === weatherData.weather2_1class ? weatherData.weather1_1class + '1' : weatherData.weather2_1class
    // weatherData.weather3_1class = weatherData.weather1_1class === weatherData.weather3_1class ? weatherData.weather1_1class + '2' : weatherData.weather3_1class
    // weatherData.weather3_1class = weatherData.weather2_1class === weatherData.weather3_1class ? weatherData.weather2_1class + '2' : weatherData.weather3_1class
    // $('.weather1 canvas').attr('id',  weatherData.weather1_1class)
    // $('.weather2 canvas').attr('id',  weatherData.weather2_1class)
    // $('.weather3 canvas').attr('id',  weatherData.weather3_1class)
    $('h3').text(name)
    fs.writeFileSync(`./html/${code}.html`,$.html())
}
function sendMsg () {
    let myDate = new Date();
    let h = myDate.getHours()
    let f = myDate.getMinutes()
    let s = myDate.getSeconds()
    if((h === 7 && f === 0 && s === 0) || (h === 18 && f === 0 && s === 0)) {
        let text = '点击获取你的专属天气预报,给予你特殊的关爱，中央气象台提醒你定时服用肾宝片' 
        wData.forEach(p =>{
            sendEmail(p.qq, '天气预报', 
            `<a href="http://8.129.182.233:3010/${p.code}.html">${text}</a>`
            )
        })
    }
    setTimeout(() =>{
        sendMsg()
    }, 1000)
}
async function main () {
    refreshWeatherData()
    sendMsg()
}
module.exports = main
