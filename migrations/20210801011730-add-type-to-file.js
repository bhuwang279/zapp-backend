"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.addColumn("file", "type", {
        type: Sequelize.STRING,
      });
    } catch (e) {
      throw e;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn("file", "type");
    } catch (e) {
      throw e;
    }
  },
};
