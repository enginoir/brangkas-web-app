"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction_details.belongsTo(models.Transaction, {
        foreignKey: "transactionId",
      });
      Transaction_details.belongsTo(models.Product, {
        foreignKey: "productId",
      });
      Transaction_details.belongsTo(models.Transaction_detail_status, {
        foreignKey: "status",
      });
    }
  }
  Transaction_details.init(
    {
      transactionId: { type: DataTypes.INTEGER, allowNull: false },
      productId: { type: DataTypes.INTEGER, allowNull: false },
      price: { type: DataTypes.INTEGER, allowNull: false },
      qty: DataTypes.INTEGER,
      discount: { type: DataTypes.INTEGER, defaultValue: 0 },
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Transaction_details",
    }
  );
  return Transaction_details;
};
