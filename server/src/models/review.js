"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
      Review.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "product",
      });
    }
  }
  Review.init(
    {
      product_id: DataTypes.STRING,
      user_id: DataTypes.STRING,
      rating: DataTypes.INTEGER,
      comment: DataTypes.TEXT,
      image: DataTypes.STRING,
      reviewed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
