const Sequelize = require('sequelize');
const sequelize = require('./dbindex.js');
const order = sequelize.define('order', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false, // 不能为空
    primaryKey: true, // 主键
    autoIncrement: true, // 自增
  }
});
module.exports = order