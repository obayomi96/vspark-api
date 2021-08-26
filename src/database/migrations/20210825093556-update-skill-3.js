'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Skills', 'volunteerId', {
        type: Sequelize.INTEGER,
        allowNull: true
      });
  },

  down: async (queryInterface) => {
    await queryInterface.addColumn('Skills', 'volunteerId');
  },
};
