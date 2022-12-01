"use strict";

const { allUserRoles, USER_ROLES } = require("../src/helpers/consts");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("user", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
      },
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
          isEmail: true,
        },
      },
      phoneNumber: {
        type: Sequelize.BIGINT,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      salt: {
        type: Sequelize.STRING(64),
      },
      hash: {
        type: Sequelize.STRING(1024),
      },
      role: {
        type: Sequelize.ENUM(allUserRoles()),
        allowNull: false,
        defaultValue: USER_ROLES.USER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("user");
  },
};
