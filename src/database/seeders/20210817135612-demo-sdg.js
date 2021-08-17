'use strict';

module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert('Sdgs', [
      {
        name: 'No Poverty',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Zero Hunger',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Good Health and Well-being',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Quality Education',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Gender Equality',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Clean Water and Sanitation',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Affordable and Clean Energy',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Decent Work and Economic Growth',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Industry, Innovation and Infrastructure',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Reduced Inequality',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sustainable Cities and Communities',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Responsible Consumption and Production',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Climate Action',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Life Below Water',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Life on Land',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Peace and Justice Strong Institutions',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Partnerships to achieve the Goal',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),
  down: (queryInterface) => queryInterface.dropAllTables(),
};
