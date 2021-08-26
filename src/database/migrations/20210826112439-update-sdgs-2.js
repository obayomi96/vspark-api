'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Sdgs', 'projectId', {
        type: Sequelize.INTEGER,
        allowNull: true
      });
  },

  down: async (queryInterface) => {
    await queryInterface.addColumn('Sdgs', 'projectId');
  },
};
