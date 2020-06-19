module.exports = {
  async init (ctx,next) {
     // 动态路由
    console.log('动态路由参数', ctx.params) 
    const model =ctx.app.$model[ctx.params.model]
    if(model) {
      ctx.model = model
      await next()
    } else {
      ctx.body = {
        code: 0,
        msg: '没有该模块'
      }
    }
  },
  async get(ctx,next) {
    const dbData = await ctx.model.find()
    // console.log('获取的数据', dbData )
     ctx.body = {
      code: 1,
      data: dbData
    }
    next()
  },
  async create(ctx,next) {
    const params = ctx.request.body.params
    console.log('post请求的参1数', params)
    await ctx.model.create(params)
    ctx.body = {
      code: 1,
      msg: '添加成功'
    }
  },
  async del(ctx,next) {
    await ctx.model.deleteOne({_id: ctx.params.id})
    // await ctx.model.remove({
    //   _id: ctx.params.id
    // }, err =>{
    //   if(err) throw console.error(err);
    //   console.log('删除成功，这个remove必须要回调函数，不然就删除不了')
    //   ctx.body = {
    //     code: 1,
    //     msg: '删除成功'
    //   }
    // })
  },
  async update(ctx,next) {
    console.log('id',ctx.params.id)
    const params = ctx.request.body.params
    await ctx.model.update({ _id: ctx.params.id }, params)
    ctx.body = {
      code: 1,
      msg: '更新成功'
    }
  }
}