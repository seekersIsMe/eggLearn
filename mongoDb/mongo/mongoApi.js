const mdb = require('./db')
// 链接成功后
mdb.once('connect', async () =>{
  console.log('连接成功后，事件回调')
  const foodCol = mdb.col('food')
  foodCol.deleteMany() // 先删除这个集合
  foodCol.createIndex({
    price: 1
  })
  // 增
  await foodCol.insertOne({
    name: '苹果',
    price: 100
  })
  await foodCol.insertMany([
    {
      name: '葡萄',
      price: 200
    },
    {
      name: '梨子',
      price: 50
    }
  ])
  // 改
  await foodCol.updateOne({
    name: '苹果'
  }, {
    $set: {
      name: '苹果',
      price: 1000
    }
  })
  // 删
  await foodCol.deleteOne({
    name: '梨子'
  })
  // 查
  const result =  await foodCol.findOne({
    name: '苹果'
  })
  console.log(result)
})