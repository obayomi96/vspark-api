'use strict';
module.exports = (sequelize, DataTypes) => {
  const Volunteer = sequelize.define('Volunteer', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    phonenumber: DataTypes.STRING,
    email: DataTypes.STRING,
    passwords: DataTypes.STRING,
    isVerified: DataTypes.BOOLEAN,
    type: DataTypes.STRING,
    country: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.TEXT,
    sdgId: DataTypes.INTEGER,
    interestAreaId: DataTypes.INTEGER,
    skillId: DataTypes.INTEGER
  }, {});
  Volunteer.associate = function(models) {
    // associations can be defined here
    Volunteer.hasMany(models.Skill, { as: 'skills', foreignKey: 'volunteerId' });
    Volunteer.hasMany(models.Sdg, { as: 'sdgs', foreignKey: 'volunteerId' });
    Volunteer.hasMany(models.InterestArea, { as: 'interestAreas', foreignKey: 'volunteerId' });
  };
  return Volunteer;
};
