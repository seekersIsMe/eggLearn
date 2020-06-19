const fs = require('fs')
const path = require('path')
const mongooes = require('mongoose')
const conf = require('./config')
function load (dir,cb) {
    // 先获取绝对路径
    const url = path.resolve(__dirname, dir)
    const file = fs.readdirSync(url) // 读取目标路径下所有文件的名称
    console.log('文件路劲',url)
    console.log('文件', file)
    file.forEach(p =>{
      const name = p.replace('.js', '')
      const file = require(url + '/' + name)
      cb(file.schema, name)
    })
}
module.exports = async function loader (app) {
  mongooes.connect(conf.url, conf.option)
  mongooes.connection.on('error', () =>{
    console.log('连接数据库失败')
  })
  mongooes.connection.on('open', (err) => {
    app.$model = {}
    load('../model', async (schema, name) =>{
      app.$model[name] = mongooes.model(name, schema)
    })
  })
  
}