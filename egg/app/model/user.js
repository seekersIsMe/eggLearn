// module.exports = app => {
//  const mongoose = app.mongoose
//  const schema = mongoose.Schema 
//  // 设置use字段模型
//  const UserSchema = new schema(
//    {
//      name: {
//        type: String,
//        require: true
//      },
//      psw: {
//        type: String,
//        require: true
//      },
//      email: {
//        type: String,
//        require: true
//      }
//    }
//  )
//  return mongoose.model('User', UserSchema )
// }

module.exports = app=>{
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const UserSchema = new Schema({
    name: {
      type: String,
      require: true
    },
    psw: {
      type: String,
      require: true,
      select: false
    },
    email: {
      type: String,
      require: true
    }
    
    // 关注的人，
    // 点赞文章
    // 点赞的答案

  }, { timestamps:true } )

  return mongoose.model('User', UserSchema )
}