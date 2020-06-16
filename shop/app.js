const Koa = require('koa')
const koaStatic = require('koa-static')
const bodyParser = require('koa-bodyparser')
const Sequelize = require('sequelize')
const router = require('koa-router')()
const sequelize = require('./db/dbindex.js')
const product = require('./db/product.js')
const user = require('./db/user')
const order = require('./db/order')
const orderItem = require('./db/order-item')
const cart = require('./db/cart')
const cartItem = require('./db/cart-item')
const app = new Koa()
app.use(koaStatic(__dirname + '/'))
app.use(bodyParser())
app.use(async (ctx, next) => {
  ctx.user = await user.findByPk(1)
  await next()
})
router.get('/api/admin/products', async ctx => {
  const pro = await product.findAll() || []
  ctx.body = {
    prods: pro
  }
})
router.get('/api/cart', async ctx => {
  console.log(ctx)
  const cart_ = await ctx.user.getCart()
  const pro = await cart_.getProducts()
  ctx.body = {
    products: pro || []
  }
})
router.get('/api/orders', async ctx => {
  console.log(ctx)
  const orders = await ctx.user.getOrders({ include: ['products'], order: [['id', 'DESC']] })
  ctx.body = { orders }
})
// 加入购物车
router.post('/api/cart', async ctx =>{
  const body = ctx.request.body 
  const proId = body.id
  let coute = 1
  let pro
  // 获取购物车
  const cart = await ctx.user.getCart(body)
  console.log('购物车',cart)
  const fetchedCart = cart
  const products = await cart.getProducts(
    {
      where: {
        id: proId
      }
    }
  )
  console.log('购物车商品',products)
  // 如果购物车中有该商品
  if(products.length > 0) {
    pro = products[0]
    coute = pro.cartItem.quantity + 1
  } else {
    pro = await product.findByPk(proId)
  }
  console.log('添加的商品',pro)
  // 增加购物车商品或者更新已有的商品数量
  await fetchedCart.addProduct(pro, {
    through: {
      quantity: coute
    }
  })
  ctx.body= {
    success: true
  }
})
// 添加商品
router.post('/api/admin/product',async ctx =>{
  const body = ctx.request.body;
  console.log('添加的商品', ctx)
  await ctx.user.createProduct(body)
  ctx.body = {
    success: true
  } 
})
// 添加订单
router.post('/api/orders', async ctx => {
  const cart_ = await ctx.user.getCart()
  let fetchedCart = cart_ 
  const pro = await cart_.getProducts()
  const newOrder = await ctx.user.createOrder()
  console.log('要添加到订单中的商品',pro)
  if(pro.length > 0) {
    await newOrder.addProducts(pro.map(p => {
      p.orderItem = {
        quantity: p.cartItem.quantity
      }
      return p
    }))
  }
  // 置空购物车
  await fetchedCart.setProducts(null)
  ctx.body = {
    success: true
  }
})
router.get('/getData', async ctx => {
  console.log(ctx)
  ctx.body = {
    a: 1
  }
})
app.use(router.routes())
app.use(router.allowedMethods());
// 构建表之间的关系
product.belongsTo(user);
user.hasMany(product);
user.hasOne(cart);
cart.belongsTo(user);
cart.belongsToMany(product, {
  through: cartItem
});
product.belongsToMany(cart, {
  through: cartItem
});
order.belongsTo(user);
user.hasMany(order);
order.belongsToMany(product, {
  through: orderItem
});
product.belongsToMany(order, {
  through: orderItem
});
sequelize.sync().then(async result =>{
  let user1 = await user.findByPk(1)
  console.log('是否有用户', user1)
  if(!user1) {
    await user.create({
        id: 1,
        name: 'zh' 
    })
    await user.createCart();
  }
  app.listen(3000, () =>{
    console.log('服务启动。。。。')
  })
})

