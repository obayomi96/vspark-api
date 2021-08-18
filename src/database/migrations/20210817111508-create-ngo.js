'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Ngos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      phonenumber: {
        type: Sequelize.STRING
      },
      isVerified: {
        type: Sequelize.BOOLEAN
      },
      password: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.ENUM('profit', 'non-profit'),
      },
      country: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.TEXT
      },
      website: {
        type: Sequelize.STRING
      },
      linkedin: {
        type: Sequelize.STRING
      },
      instagram: {
        type: Sequelize.STRING
      },
      twitter: {
        type: Sequelize.STRING
      },
      industry: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      logo: {
        type: Sequelize.STRING
      },
      about: {
        type: Sequelize.TEXT
      },
      verificationDocument: {
        type: Sequelize.STRING
      },
      nature: {
        type: Sequelize.STRING
      },
      beneficiaries: {
        type: Sequelize.INTEGER
      },
      beneficiaryDemographic: {
        type: Sequelize.ENUM('children', 'teen', 'adult-a', 'adult-b', 'adult-c', 'senoir-citizens', 'all-groups'),
      },
      pastworkProjectName: {
        type: Sequelize.STRING
      },
      pastworkEndDate: {
        type: Sequelize.DATE
      },
      pastworkStartDate: {
        type: Sequelize.DATE
      },
      pastworkDuration: {
        type: Sequelize.STRING
      },
      pastworkAbout: {
        type: Sequelize.TEXT
      },
      pastworkBeneficiariesReached: {
        type: Sequelize.INTEGER
      },
      pastworkNumberOfVolunteers: {
        type: Sequelize.INTEGER
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
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'InterestAreas',
          key: 'id',
        },
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
    await queryInterface.dropTable('Ngos');
  }
};