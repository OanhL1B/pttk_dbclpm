"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init(
    {
      productName: DataTypes.STRING,
      category_id: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      images: DataTypes.STRING,
      thumb: DataTypes.STRING,
      material: DataTypes.STRING,
      size: DataTypes.STRING,
      design: DataTypes.BOOLEAN,
      price: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      product_status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};