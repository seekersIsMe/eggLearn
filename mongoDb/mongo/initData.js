const mdb = require('./db')
mdb.once('connect', async () =>{
  const foodCol = mdb.col('food')
  foodCol.deleteMany()
  const data = new Array(100).fill(' ').map((p, i) => {
    return {
        name: '美食' + i,
        price: Math.floor(Math.random() * 10),
        category: Math.random() > 0.5 ? '蔬菜' : '水果'
    }
  })
  foodCol.insertMany(data)
})