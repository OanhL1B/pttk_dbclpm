"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      productName: {
        type: Sequelize.STRING,
      },
      category_id: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      images: {
        type: Sequelize.STRING,
      },
      thumb: {
        type: Sequelize.STRING,
      },
      material: {
        type: Sequelize.STRING,
      },
      size: {
        type: Sequelize.STRING,
      },
      design: {
        type: Sequelize.STRING,
      },

      price: {
        type: Sequelize.INTEGER,
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      product_status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      free_ship: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Products");
  },
};
