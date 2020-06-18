const {MongoClient} = require('mongodb')
const config = require('../config')
const { EventEmitter } = require('events')
class MongoDb {
  constructor (conf) {
    this.conf= conf
    this.emiter = new EventEmitter()
    this.dbClient = new MongoClient(config.url, {
      useNewUrlParser: true
    }) 
    console.log('链接成功前')
    this.dbClient.connect(err => {
      if(err) throw err
      console.log('链接成功')
      this.emiter.emit('connect') // 派发连接成功的事件
    })
  }
  col (colName, dbName = config.dbName) {
    return this.dbClient.db(dbName).collection(colName)
  }
  once(eventName, cb) {
    console.log('监听')
    this.emiter.once(eventName,cb) 
  }
}
module.exports = new  MongoDb(config)
