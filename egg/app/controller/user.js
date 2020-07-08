const Controller = require('./superCtrl');
const md5 = require('md5')
class User extends Controller {
  async getEmailCode() {
    const {ctx} = this
    const code = Math.random().toString().slice(2,6)
    const html =  `
    <div>
     验证码： ${code}
    </div>
    `
    // await ctx.service.tools.sendEmail('757036923@qq.com', '天气预报', html)
    const {email} = ctx.query
    await ctx.service.tools.sendEmail(email, '邮箱验证码', html)
    this.message('请求成功')
    ctx.session.code = code
  }
  async getCode() {
    const { ctx } = this
    const captcha = await ctx.service.tools.captcha()
    ctx.session.captcha = captcha.text
    ctx.response.type = 'image/svg+xml'
    ctx.body = captcha.data
  }
  async register () {
    let { ctx } = this
    let { email, name, psw } = ctx.request.body
    console.log('模型',ctx.app)
    let ret = await ctx.model.User.create({ 
      email, 
      name,
      psw:md5(psw)
    })
    if(ret._id){
      this.success('注册成功')
    }
  }
}
module.exports = User;
