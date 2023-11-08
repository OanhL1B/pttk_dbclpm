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
      Product.hasMany(models.Cart, {
        foreignKey: "product_id",
        as: "carts",
      });
      Product.hasMany(models.Product_item, {
        foreignKey: "product_id",
        as: "product",
      });
      Product.belongsTo(models.Category, {
        foreignKey: "category_id",
        as: "category",
      });
      Product.hasMany(models.Review, {
        foreignKey: "product_id",
        as: "reviews",
      });
    }
  }
  Product.init(
    {
      productName: DataTypes.STRING,
      category_id: DataTypes.STRING,
      description: DataTypes.TEXT,
      images: DataTypes.STRING,
      thumb: DataTypes.STRING,
      material: DataTypes.STRING,
      size: DataTypes.STRING,
      design: DataTypes.BOOLEAN,
      price: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      product_status: DataTypes.BOOLEAN,
      free_ship: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
