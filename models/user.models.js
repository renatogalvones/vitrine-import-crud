module.exports = (Sequelize, sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: true,
    },
    name: {
      type: Sequelize.DataTypes.STRING(70),
      allowNull: false,
    },
    email: {
      type: Sequelize.DataTypes.STRING(200),
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: 'users',
  });

  return User;
};
