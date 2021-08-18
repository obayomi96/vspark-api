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
        type: Sequelize.ENUM('project', 'event')
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
        type: Sequelize.ENUM('children', 'teen', 'adult-a', 'adult-b', 'adult-c', 'senoir-citizens', 'all-groups')
      },
      sdgId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Sdgs',
          key: 'id',
        },
      },
      interestAreaId: { 
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'InterestAreas',
          key: 'id',
        },
      },
      skillId: { 
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Skills',
          key: 'id',
        },
      },
      projectRole: {
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
    await queryInterface.dropTable('Projects');
  }
};