'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('InterestAreas', 'volunteerId', {
        type: Sequelize.INTEGER,
        allowNull: true
      });
  },

  down: async (queryInterface) => {
    await queryInterface.addColumn('InterestAreas', 'volunteerId');
  },
};
