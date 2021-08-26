'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Sdgs', 'volunteerId', {
        type: Sequelize.INTEGER,
        allowNull: true
      });
  },

  down: async (queryInterface) => {
    await queryInterface.addColumn('Sdgs', 'volunteerId');
  },
};
