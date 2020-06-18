const fs = require('fs')
const path = require('fs')
const mongooes = require('mongoose')
const conf = require('./config')
function load (dir,cb) {
    // 先获取绝对路径
    const url = path.resolve(__dirname, dir)
    const file = fs.readFileSync(url)
    file.forEach(p =>{
      const name = p.replace('.js', '')
      const schema = require(__dirname + '/' + name)
      cb(schema, name)
    })
}
module.exports = async function loader (app) {
  mongooes.connect(conf.url, conf.option)
  mongooes.connection.on('error', () =>{
    console.log('连接数据库失败')
  })
  app.$model = {}
  load('./model', async (schema, name) =>{
    app.$model[name] = mongooes.model(name, schema)
  })
}