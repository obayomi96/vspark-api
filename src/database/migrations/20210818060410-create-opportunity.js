'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Opportunities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      skillId: {
        type: Sequelize.INTEGER
      },
      opportunityRole: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      modeOfEngagement: {
        type: Sequelize.STRING
      },
      typeOfPosition: {
        type: Sequelize.STRING
      },
      nature: {
        type: Sequelize.STRING
      },
      minimumQualification: {
        type: Sequelize.STRING
      },
      applicationRoute: {
        type: Sequelize.STRING
      },
      applicationLink: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Opportunities');
  }
};