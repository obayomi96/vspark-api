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
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Skills',
          key: 'id',
        },
      },
      opportunityRole: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      modeOfEngagement: {
        type: Sequelize.ENUM('remote', 'in-person')
      },
      typeOfPosition: {
        type: Sequelize.ENUM('paid', 'volunteer')
      },
      nature: {
        type: Sequelize.ENUM('full-time', 'intern', 'part-time')
      },
      minimumQualification: {
        type: Sequelize.ENUM('primary', 'secondary', 'OND', 'HND', 'BSC', 'masters', 'PHD')
      },
      applicationRoute: {
        type: Sequelize.ENUM('volunteerspark', 'external-site')
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
