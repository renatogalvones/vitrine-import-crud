const Sequelize = require('sequelize');

const sequelize = new Sequelize('vitrine', 'root', 'test', {
  host: '0.0.0.0',
  port: 3306,
  dialect: 'mysql',
  allowNull: false,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user.models')(Sequelize, sequelize);
db.OrderStatus = require('./orderStatus.models')(Sequelize, sequelize);
db.Products = require('./products.models')(Sequelize, sequelize);
db.OrderProducts = require('./orderProducts.module')(Sequelize, sequelize);
db.Order = require('./order.models')(Sequelize, sequelize);

module.exports = db;
