const Sequelize = require('sequelize');
const sequelize = require('./dbindex.js');
const orderItem = sequelize.define('orderItem', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false, // 不能为空
    primaryKey: true, // 主键
    autoIncrement: true, // 自增
  },
  quantity: Sequelize.INTEGER
});
module.exports = orderItem