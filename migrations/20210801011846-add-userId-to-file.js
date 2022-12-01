"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.addColumn("file", "userId", {
        type: Sequelize.UUID,
      });
    } catch (e) {
      throw e;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn("file", "userId");
    } catch (e) {
      throw e;
    }
  },
};
