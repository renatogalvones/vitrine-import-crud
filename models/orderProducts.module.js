module.exports = (Sequelize, sequelize) => {
  const Products = require('./products.models')(Sequelize, sequelize);
  const Order = require('./order.models')(Sequelize, sequelize);

  const OrderProducts = sequelize.define('OrderProducts', {
    id: {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    product_id: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      references: {
        model: Products,
        key: 'id',
      },
    },
    order_id: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      references: {
        model: Order,
        key: 'id',
      },
    },
    quantity: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'order_products',
  });

  return OrderProducts;
}