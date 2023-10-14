"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.User_role, { foreignKey: 'role' });
      models.User.hasMany(models.Product, {
        foreignKey: {
          name: 'userId',
          allowNul: false,
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      User.hasMany(models.Transaction, { foreignKey: "staff" });
    }
  }
  User.init(
    {
      role: DataTypes.INTEGER,
      username: { type: DataTypes.STRING, allowNull: false, unique: true },
      email: DataTypes.STRING,
      password: { type: DataTypes.STRING, allowNull: false },
      phone: { type: DataTypes.STRING, allowNull: true, unique: true },
      fullname: { type: DataTypes.STRING, allowNull: false },
      image_url: DataTypes.STRING,
      gender: DataTypes.ENUM("male", "female"),
      isActive: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
