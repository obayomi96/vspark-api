'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Volunteers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstname: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      middlename: {
        type: Sequelize.STRING
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
        type: Sequelize.STRING
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
      profilePhoto: {
        type: Sequelize.STRING,
      },
      headerPhoto: {
        type: Sequelize.STRING
      },
      bio: {
        type: Sequelize.TEXT
      },
      profession: {
        type: Sequelize.STRING,
      },
      educationlevel: {
        type: Sequelize.ENUM('primary', 'secondary', 'OND', 'HND', 'BSC', 'masters', 'PHD')
      },
      availability: {
        type: Sequelize.ENUM('full-time', 'part-time'),
      },
      hoursOrWeek: {
        type: Sequelize.INTEGER
      },
      daysofWeek: {
        type: Sequelize.STRING
      },
      prevOrganisationName: {
        type: Sequelize.STRING
      },
      prevProject: {
        type: Sequelize.STRING
      },
      prevOrganisationRole: {
        type: Sequelize.STRING
      },
      prevDesOfResponsibilities: {
        type: Sequelize.TEXT
      },
      currentPosition: {
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
    await queryInterface.dropTable('Volunteers');
  }
};
