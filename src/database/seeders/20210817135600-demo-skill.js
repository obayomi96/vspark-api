'use strict';

module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert('Skills', [
      {
        name: 'Engineering',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Information Technology',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Social Development',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Music',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Finance',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Economics',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'People',
        description: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),
  down: (queryInterface) => queryInterface.dropAllTables(),
};
