module.exports = {
  init (ctx,next) {
     // 动态路由
    console.log(ctx.params)/
    next()
  },
  get(ctx,next) {},
  create(ctx,next) {},
  del(ctx,next) {},
  update(ctx,next) {}
}