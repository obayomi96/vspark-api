'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ngo = sequelize.define('Ngo', {
    name: DataTypes.STRING,
    logo: DataTypes.STRING,
    about: DataTypes.TEXT,
    isVerified: DataTypes.BOOLEAN,
    password: DataTypes.STRING,
    type: DataTypes.STRING,
    industry: DataTypes.STRING,
    country: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.TEXT,
    phonenumber: DataTypes.STRING,
    email: DataTypes.STRING,
    website: DataTypes.STRING,
    linkedin: DataTypes.STRING,
    instagram: DataTypes.STRING,
    twitter: DataTypes.STRING,
    verificationDocument: DataTypes.STRING,
    nature: DataTypes.STRING,
    beneficiaries: DataTypes.INTEGER,
    beneficiaryDemographic: DataTypes.STRING,
    pastworkProjectName: DataTypes.STRING,
    pastworkStartDate: DataTypes.DATE,
    pastwordEndDate: DataTypes.DATE,
    pastwordDuration: DataTypes.STRING,
    pastwordAbout: DataTypes.TEXT,
    pastworkBeneficiariesReached: DataTypes.INTEGER,
    pastworkNumberOfVolunteers: DataTypes.INTEGER,
  }, {});
  Ngo.associate = function(models) {
   
  };
  return Ngo;
};
