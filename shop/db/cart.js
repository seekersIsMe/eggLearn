const Sequelize = require('sequelize');
const sequelize = require('./dbindex.js');
const cart = sequelize.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false, // 不能为空
    primaryKey: true, // 主键
    autoIncrement: true, // 自增
  }
});
module.exports = cart