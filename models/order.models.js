module.exports = (Sequelize, sequelize) => {
  const User = require('./user.models')(Sequelize, sequelize);
  const OrderStatus = require('./orderStatus.models')(Sequelize, sequelize);

  const Order = sequelize.define('Order', {
    id: {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    paid: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      }
    },
    statusId: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      references: {
        model: OrderStatus,
        key: 'id',
      },
    },
  },
  {
    tableName: 'orders',
  });

  return Order;
}