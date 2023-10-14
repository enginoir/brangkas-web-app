"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction_detail_status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction_detail_status.hasMany(models.Transaction_details, {
        foreignKey: "status",
      });
    }
  }
  Transaction_detail_status.init(
    {
      order_status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Transaction_detail_status",
    }
  );
  return Transaction_detail_status;
};
