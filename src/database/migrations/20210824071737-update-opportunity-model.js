'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Opportunities', 'volunteerId', {
        type: Sequelize.INTEGER,
        allowNull: false
      });
  },

  down: async (queryInterface) => {
    await queryInterface.addColumn('Opportunities', 'volunteerId');
  },
};
