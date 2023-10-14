"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction_order_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction_order_type.hasMany(models.Transaction, {
        foreignKey: "order_type",
      });
    }
  }
  Transaction_order_type.init(
    {
      order_type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Transaction_order_type",
    }
  );
  return Transaction_order_type;
};
