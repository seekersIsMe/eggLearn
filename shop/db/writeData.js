const user = require('./user')
const product = require('./product')
const order = require('./order')
const orderItem = require('./order-item')
const cart = require('./cart')
const cartItem = require('./cart-item')
insertData()
async function insertData () {
  // await product.drop(); //删除表
  await user.drop(); //删除表
  // let syn = await product.sync({
  //   force: true  // 强制同步，先删除表，然后新建
  // });
  // syn = await product.bulkCreate([
  //   {
  //     id: 10,
  //     title: '三文鱼',
  //     price: 100,
  //     imageUrl: 'dsdsd',
  //     description: '带有病毒的三文鱼'
  //    },
  //    {
  //     id: 102,
  //     title: '带鱼',
  //     price: 100152,
  //     imageUrl: 'dsdsd12233',
  //     description: '苗条的带鱼'
  //    },
  //    {
  //     id: 11,
  //     title: '鲈鱼',
  //     price: 50.2,
  //     imageUrl: 'dsdsd1122233',
  //     description: '好吃的鲈鱼'
  //    }
  // ]).then(res =>{
  //   console.log('创建',res)
  // })
  let userSyn = await user.sync({
    force: true  // 强制同步，先删除表，然后新建
  });
  // userSyn = await user.create({
  //   id: 1,
  //   name: 'zh' 
  // })
} 