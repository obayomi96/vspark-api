import bcrypt from 'bcrypt';
// import faker from 'faker';

const saltRounds = 10;

const password = bcrypt.hashSync('Password123', saltRounds);

module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert('Users', [
      {
        firstname: 'seun',
        lastname: 'martins',
        phonenumber: '08125742533',
        email: 'seun@mail.com',
        isVerified: true,
        password,
        type: 'admin',
        country: 'Nigeria',
        state: 'Lagos',
        city: 'lekki',
        address: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstname: 'Zira',
        lastname: 'jauni',
        phonenumber: '08125742532',
        email: 'oba@mail.com',
        isVerified: true,
        password,
        address: '',
        type: 'admin',
        country: 'Nigeria',
        state: 'Lagos',
        city: 'yaba',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstname: 'Rume',
        lastname: 'Rume',
        phonenumber: '08125742534',
        email: 'mart@mail.com',
        isVerified: true,
        password,
        type: 'admin',
        country: 'Nigeria',
        state: 'Lagos',
        city: 'Ikeja',
        address: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // ...(() => {
      //   const arr = [];
      //   for (let i = 0; i < 50; i += 1) {
      //     arr.push({
      //       firstname: faker.name.firstName(),
      //       lastname: faker.name.lastName(),
      //       email: faker.internet.email(),
      //       phoneNumber: getPhoneNumber(),
      //       password,
      //       roleId: 3,
      //       locationId: getRandomLocation(),
      //       isActive: Math.floor(Math.random() * 5) >= 3,
      //       createdAt: Sequelize.fn('NOW'),
      //       updatedAt: Sequelize.fn('NOW'),
      //     });
      //   }
      //   return arr;
      // })(),
    ]),
  down: (queryInterface) => queryInterface.dropAllTables(),
};
