const Sequelize = require('sequelize');
const sequelize = require('./dbindex.js');
const user = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false, // 不能为空
    primaryKey: true, // 主键
    autoIncrement: true, // 自增
  },
  name:  Sequelize.STRING
});
module.exports = user