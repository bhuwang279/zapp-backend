"use strict";

const { allBankingApps, BANKING_APPS } = require("../src/helpers/consts");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("transaction", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
      },
      bankingApp: {
        type: Sequelize.ENUM(allBankingApps()),
        allowNull: false,
        defaultValue: BANKING_APPS.MBOB,
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      refrenceNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "",
      },
      customerPhoneNumber: {
        type: Sequelize.BIGINT,
      },
      customerName: {
        type: Sequelize.STRING,
      },
      customerAccountNumber: {
        type: Sequelize.STRING,
      },
      receiverBank: {
        type: Sequelize.STRING,
      },
      receiverAccountNumber: {
        type: Sequelize.STRING,
      },
      receiverName: {
        type: Sequelize.STRING,
      },
      transactionDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      customerRemark: {
        type: Sequelize.STRING,
      },
      merchantRemark: {
        type: Sequelize.STRING,
      },
      ownerId: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: null,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },

      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("transaction");
  },
};
