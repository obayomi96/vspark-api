'use strict';
module.exports = (sequelize, DataTypes) => {
  const Volunteer = sequelize.define('Volunteer', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    middlename: DataTypes.STRING,
    phonenumber: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isVerified: DataTypes.BOOLEAN,
    type: DataTypes.STRING,
    country: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.TEXT,
    sdgId: DataTypes.INTEGER,
    interestAreaId: DataTypes.INTEGER,
    skillId: DataTypes.INTEGER,
    profilePhoto: DataTypes.STRING,
    headerPhoto: DataTypes.STRING,
    bio: DataTypes.TEXT,
    profession: DataTypes.STRING,
    educationlevel: DataTypes.ENUM('primary', 'secondary', 'OND', 'HND', 'BSC', 'masters', 'PHD'),
    availability: DataTypes.ENUM('full-time', 'part-time'),
    hoursOrWeek: DataTypes.INTEGER,
    daysofWeek: DataTypes.STRING,
    prevOrganisationName: DataTypes.STRING,
    prevProject: DataTypes.STRING,
    prevOrganisationRole: DataTypes.STRING,
    prevDesOfResponsibilities: DataTypes.TEXT,
    currentPosition: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    duration: DataTypes.INTEGER,
    website: DataTypes.STRING,
    linkedin: DataTypes.STRING,
    instagram: DataTypes.STRING,
    twitter: DataTypes.STRING,
  }, {});
  Volunteer.associate = function(models) {
    // associations can be defined here
    Volunteer.hasMany(models.Skill, { as: 'skills', foreignKey: 'skillId' });
    Volunteer.hasMany(models.Sdg, { as: 'sdgs', foreignKey: 'sdgId' });
    Volunteer.hasMany(models.InterestArea, { as: 'interestAreas', foreignKey: 'interestAreaId' });
    Volunteer.belongsTo(models.Opportunity, { as: 'opportunity', foreignKey: 'opportunityId' });
  };
  return Volunteer;
};
