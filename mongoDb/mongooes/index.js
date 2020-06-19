const koa = require('koa')
const loader = require('./framework/load')
const router = require('./framework/router')
const app = new koa()
app.use(require('koa-bodyparser')())
app.use(require('koa-static')(__dirname + '/'))
// 连接数据库，并构建
loader(app)
app.use(router)
app.listen(3000, () => {
  console.log('服务启动....')
})