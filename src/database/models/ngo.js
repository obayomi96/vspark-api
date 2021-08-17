'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ngo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Ngo.init({
    email: DataTypes.STRING,
    phonenumber: DataTypes.STRING,
    isVerified: DataTypes.BOOLEAN,
    password: DataTypes.STRING,
    type: DataTypes.STRING,
    country: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.TEXT,
    website: DataTypes.STRING,
    linkedin: DataTypes.STRING,
    instagram: DataTypes.STRING,
    twitter: DataTypes.STRING,
    industry: DataTypes.STRING,
    name: DataTypes.STRING,
    logo: DataTypes.STRING,
    about: DataTypes.TEXT,
    verificationDocument: DataTypes.STRING,
    nature: DataTypes.STRING,
    beneficiaries: DataTypes.INTEGER,
    beneficiaryDemographic: DataTypes.STRING,
    pastworkProjectName: DataTypes.STRING,
    pastworkEndDate: DataTypes.DATE,
    pastworkStartDate: DataTypes.DATE,
    pastworkDuration: DataTypes.STRING,
    pastwordAbout: DataTypes.TEXT,
    pastworkBeneficiariesReached: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ngo',
  });
  return Ngo;
};