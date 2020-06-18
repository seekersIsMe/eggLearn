const mongoose = require('mongoose')
const conf = require('../config')
mongoose.connect(conf.url + '/animal')
mongoose.connection.on('error', () =>{
  console.log('连接数据失败')
})
mongoose.connection.on('open', async () =>{
  console.log('连接成功')
  const catSchema = mongoose.Schema({
    name: String,
    variety: String
  })
  // 第一种方式，可以在schema上定义方法
  const catModel = mongoose.model('cat', catSchema)
  // 第二种方式定义数据格式
  // const catModel = mongoose.model('cat', {
  //   name: String,
  //   variety: String
  // })


  // 删除
  catModel.remove({
    name: /咩咩|黑皮/
  }, (err) =>{
    if(err) throw console.error(err);
    console.log('删除成功，这个remove必须要回调函数，不然就删除不了')
  })


  // 增加
  // cat.save((err, res) =>{
  //   // console.log(res)
  //   if (err) {
  //     console.log('插入成功')
  //   }else {
  //     console.log('插入失败')
  //   }
  // })


  // 增加
  catModel.insertMany([
    {
      name: '黑皮',
      variety: '奶牛猫'
    },
    {
      name: '咩咩',
      variety: '布偶'
    }
  ])
  const allCat = await catModel.find()
  console.log('所有的猫咪', allCat)
})

