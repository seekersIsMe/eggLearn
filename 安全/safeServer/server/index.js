const koa = require('koa')
const app = new koa()
const views = require('koa-views');
const router = require('koa-router')()
const session = require('koa-session')
const CONFIG = {
    key: 'kaikeba:sess',
    /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    autoCommit: true,
    /** (boolean) automatically commit headers (default true) */
    overwrite: false,
    /** (boolean) can overwrite or not (default true) */
    httpOnly: false,
    /** (boolean) httpOnly or not (default true) */
    signed: false,
    /** (boolean) signed or not (default true) */
    rolling: false,
    /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false,
    /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  };
   
app.use(session(CONFIG, app));
const bodyParser = require('koa-bodyparser')
app.use(bodyParser())
// app.use(require('koa-static')(__dirname + '/'))
app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))
app.use(async (ctx, next) => {
    await next()
    // 参数出现在HTML内容或属性浏览器会拦截
    ctx.set('X-XSS-Protection', 0) // 禁止浏览器xss
    // ctx.set('Content-Security-Policy', "default-src 'self'")
    ctx.set('X-FRAME-OPTIONS', 'DENY')
    // const referer = ctx.request.header.referer
    // console.log('Referer:', referer)

    // const referer = ctx.request.header.referer
    // console.log('Referer:', referer)

})
router.get('/', async (ctx) => {
    // res = await query('select * from test.text')
    // ctx.set('X-FRAME-OPTIONS', 'DENY')
    console.log('用户名',ctx.session.username)
    console.log('1',ctx.render)
    await ctx.render('index', {
        from: ctx.query.from,
        username: ctx.session.username,
        text: '哈哈哈哈'
        // text: res[0].text,
    });
});

router.get('/login', async (ctx) => {
    await ctx.render('login');
});
router.post('/login', async (ctx) =>{
    console.log(ctx.request.body)
    ctx.session.username = ctx.request.body.username
    ctx.redirect('/?from=china')
})
app.use(router.routes())
app.use(router.allowedMethods())
module.exports = app