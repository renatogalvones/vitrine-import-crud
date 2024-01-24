module.exports = (Sequelize, sequelize) => {
  const Products = sequelize.define('Products', {
    id: {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    sku: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    sku_variation: {
      type: Sequelize.DataTypes.INTEGER,
    },
    name: {
      type: Sequelize.DataTypes.STRING(300),
      allowNull: false,
    },
  },
  {
    tableName: 'products',
  });

  return Products;
}