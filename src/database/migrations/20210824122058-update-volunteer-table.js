'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Volunteers', 'opportunityId', {
        type: Sequelize.INTEGER,
        allowNull: true
      });
  },

  down: async (queryInterface) => {
    await queryInterface.addColumn('Volunteers', 'opportunityId');
  },
};
