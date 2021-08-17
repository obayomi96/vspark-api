import bcrypt from 'bcrypt';
// import faker from 'faker';

const saltRounds = 10;

const password = bcrypt.hashSync('Password123', saltRounds);

module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert('Volunteers', [
      {
        firstname: 'Brenda',
        lastname: 'Philip',
        phonenumber: '09088337633',
        email: 'brenda.p@mail.com',
        isVerified: true,
        password,
        type: 'volunteer',
        country: 'Nigeria',
        state: 'Abuja',
        city: 'gwarinpa',
        address: '',
        sdgId: 2,
        interestAreaId: 1,
        skillId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstname: 'John',
        lastname: 'Moses',
        phonenumber: '08099333532',
        email: 'john.m@mail.com',
        isVerified: true,
        password,
        address: '',
        type: 'volunteer',
        country: 'Nigeria',
        state: 'Lagos',
        city: 'yaba',
        sdgId: 1,
        interestAreaId: 2,
        skillId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstname: 'nina',
        lastname: 'topson',
        phonenumber: '08144342534',
        email: 'nin.top@mail.com',
        isVerified: true,
        password,
        type: 'volunteer',
        country: 'Ghana',
        state: 'Accra',
        city: '',
        address: '',
        sdgId: 2,
        interestAreaId: 1,
        skillId: 4,
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
