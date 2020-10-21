const koa = require('koa')
const app = new koa()
const static = require('koa-static') 
app.use(static(__dirname + '/views'))
const bodyParser = require('koa-bodyparser')
app.use(bodyParser())
app.use((ctx, next) =>{
    console.log('4000')
    let cookie = ctx.url
    console.log('dsad',cookie)
    next()
})
module.exports = app