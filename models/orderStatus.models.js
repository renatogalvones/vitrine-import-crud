module.exports = (Sequelize, sequelize) => {
  const OrderStatus = sequelize.define('OrderStatus', {
    id: {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: Sequelize.DataTypes.STRING(45),
      allowNull: false,
    }
  },
  {
    tableName: 'order_statuses',
  });

  return OrderStatus;
}