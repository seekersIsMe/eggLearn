const Sequelize = require('sequelize')

const config = {
  host: "localhost",
  user: "root",
  password: "bwcxfdsz",
  database: "shop"
}
// 连接数据库
const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: 'mysql', // 别名、方言
  pool: {
      max: 10,
      min: 0,
      idle: 10000
  }
});
module.exports = sequelize;