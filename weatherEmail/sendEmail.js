

const nodemailer = require('nodemailer')

const userEmail = '1213344190@qq.com'
let transporter = nodemailer.createTransport({
  service:'qq',
  port:465,
  secureConnetion:true,
  auth:{
    user:userEmail,
    pass:"necucilrkktzijbi"
  }
})
async function sendEmail(email,title,html){
    const mailOptions = {
      from:userEmail,
      to:email,
      subject:title,
      text:'',
      html
    }
    try{
      await transporter.sendMail(mailOptions)
      return true
    }catch(err){
      console.log(err)
      return false
    }
  }
module.exports = sendEmail