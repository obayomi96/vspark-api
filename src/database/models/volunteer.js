'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Volunteer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Volunteer.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    phonenumber: DataTypes.STRING,
    isVerified: DataTypes.BOOLEAN,
    password: DataTypes.STRING,
    type: DataTypes.STRING,
    country: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.TEXT,
    sdgId: DataTypes.INTEGER,
    skillId: DataTypes.INTEGER,
    interestAreaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Volunteer',
  });
  return Volunteer;
};

