const koa = require('koa')
const router = require('koa-router')()
const mdb = require('./db')
const app = new koa()
app.use(require('koa-static')(__dirname + '/'))
app.use(require('koa-bodyparser')())
router.get('/api/list', async(ctx) =>{
  const query = ctx.query
  const param = {}
  if(query.keyword !== "") {
    param.name = new RegExp(query.keyword) 
  }
  if(query.category !== "") {
    param.category = query.category
  }
  console.log(param)
  console.log('请求的数据', JSON.stringify(query))
  const foodCol = await mdb.col('food')
    const total = await foodCol.find(param).count()
    const data =  await foodCol.find(param).skip((query.page - 1) * 10).limit(10).toArray()
    console.log('查询到的数据', JSON.stringify(data))
    ctx.body = {
      ok:1,
      data: {
        fruits: data,
        pagination: {
          total,
          page: query.page
        }
      }
    }
})
/// 可以定义多个中间件，执行next()
router.get('/api/category',async (ctx, next) =>{
  const foodCol = await mdb.col('food')
  const data = await foodCol.distinct('category') // 指定字段去重
  ctx.body = {
    ok: 1,
    data
  }
  console.log(1)
  next()
}, ctx =>{ 
  console.log(2)
})
app.use(router.routes())
app.listen(3000, () =>{
  console.log('服务启动.....')
})