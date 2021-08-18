'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      about: {
        type: Sequelize.TEXT
      },
      location: {
        type: Sequelize.STRING
      },
      startDate: {
        type: Sequelize.DATE
      },
      endDate: {
        type: Sequelize.DATE
      },
      duration: {
        type: Sequelize.INTEGER
      },
      estNumBeneficiaries: {
        type: Sequelize.INTEGER
      },
      benenficiairiesDemographic: {
        type: Sequelize.STRING
      },
      skillId: {
        type: Sequelize.INTEGER
      },
      interestAreaId: {
        type: Sequelize.INTEGER
      },
      sdgId: {
        type: Sequelize.INTEGER
      },
      projectRole: {
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
    await queryInterface.dropTable('Projects');
  }
};