const koa = require('koa')
const app = new koa()
const weather = require('./weather')
app.use(require('koa-static')(__dirname + '/html'))
weather()
app.listen(3010, ()=>{
    console.log('服务启动中.....')
})