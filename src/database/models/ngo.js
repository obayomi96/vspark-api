'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ngo = sequelize.define('Ngo', {
    name: DataTypes.STRING,
    logo: DataTypes.STRING,
    about: DataTypes.TEXT,
    isVerified: DataTypes.BOOLEAN,
    password: DataTypes.STRING,
    type: DataTypes.ENUM('profit', 'non-profit'),
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
    beneficiaryDemographic: DataTypes.ENUM('children', 'teen', 'adult-a', 'adult-b', 'adult-c', 'senoir-citizens', 'all-groups'),
    pastworkProjectName: DataTypes.STRING,
    pastworkStartDate: DataTypes.DATE,
    pastworkEndDate: DataTypes.DATE,
    pastworkDuration: DataTypes.STRING,
    pastworkAbout: DataTypes.TEXT,
    pastworkBeneficiariesReached: DataTypes.INTEGER,
    pastworkNumberOfVolunteers: DataTypes.INTEGER,
    sdgId: DataTypes.INTEGER,
    interestAreaId: DataTypes.INTEGER,
  }, {});
  Ngo.associate = function(models) {
    Ngo.belongsToMany(models.Sdg, { as: 'sdgs', through: 'ngoSdgs', foreignKey: 'sdgId' });
    Ngo.belongsToMany(models.InterestArea, { as: 'interestAreas', through: 'ngoInterestAreas', foreignKey: 'interestAreaId' });
  };
  return Ngo;
};
