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
    ctx.session.emailCode = code
  }
  async getCode() {
    const { ctx } = this
    const captcha = await ctx.service.tools.captcha()
    ctx.session.captcha = captcha.text
    ctx.response.type = 'image/svg+xml'
    ctx.body = captcha.data
  }
  async register () {
    // console.log('测试',ctx1)
    let { ctx } = this
    let { email, name, psw , code, emailCode} = ctx.request.body
    console.log('请求体',ctx.request.body)
    if(code.toLowerCase() !== ctx.session.captcha.toLowerCase()) {
      this.message('验证码不对')
      return
    }
    if(emailCode !== ctx.session.emailCode) {
      this.message('邮箱验证码不对')
      return
    }
    let isInName = await ctx.model.User.findOne({
      name
    })
    let isInEmail = await ctx.model.User.findOne({
      email
    })
    if(isInName) {
      this.message('该用户名已被占用')
      return
    }
    // if (isInEmail) {
    //   this.message('该邮箱已经注册')
    //   return
    // }
  
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
