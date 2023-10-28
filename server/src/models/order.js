"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.hasMany(models.Product_item, {
        foreignKey: "order_id",
        as: "product",
      });
      Order.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  Order.init(
    {
      user_id: DataTypes.STRING,
      order_status: DataTypes.STRING,
      shipping_address: DataTypes.TEXT,
      phone_Number: DataTypes.STRING,
      total_price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
