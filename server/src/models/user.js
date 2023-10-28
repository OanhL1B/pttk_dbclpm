"use strict";
const { Model, DataTypes } = require("sequelize");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Cart, {
        foreignKey: "user_id",
        as: "carts",
      });
      User.hasMany(models.Order, {
        foreignKey: "user_id",
        as: "orders",
      });
      User.hasMany(models.Review, {
        foreignKey: "user_id",
        as: "reviews",
      });
    }

    createPasswordChangedToken() {
      const resetToken = crypto.randomBytes(32).toString("hex");
      this.passwordResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
      this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
      return resetToken;
    }
  }

  User.init(
    {
      role: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      password: DataTypes.STRING,
      isBlock: DataTypes.BOOLEAN,
      image: DataTypes.STRING,
      refreshToken: DataTypes.STRING,
      passwordChangedAt: DataTypes.STRING,
      passwordResetToken: DataTypes.STRING,
      passwordResetExpires: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.prototype.isCorrectPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  return User;
};
