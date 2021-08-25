'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    type: DataTypes.ENUM('project', 'event'),
    about: DataTypes.TEXT,
    location: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    duration: DataTypes.INTEGER,
    estNumBeneficiaries: DataTypes.INTEGER,
    benenficiairiesDemographic: DataTypes.ENUM('children', 'teen', 'adult-a', 'adult-b', 'adult-c', 'senoir-citizens', 'all-groups'),
    skillId: DataTypes.INTEGER,
    interestAreaId: DataTypes.INTEGER,
    sdgId: DataTypes.INTEGER,
    projectRole: DataTypes.STRING,
    description: DataTypes.TEXT,
    modeOfEngagement: DataTypes.ENUM('remote', 'in-person'),
    typeOfPosition: DataTypes.ENUM('paid', 'volunteer'),
    nature: DataTypes.ENUM('full-time', 'intern', 'part-time'),
    minimumQualification: DataTypes.ENUM('primary', 'secondary', 'OND', 'HND', 'BSC', 'masters', 'PHD'),
    applicationRoute: DataTypes.ENUM('volunteerspark', 'external-site'),
    applicationLink: DataTypes.STRING
  }, {});
  Project.associate = function(models) {
    Project.hasMany(models.Skill, { as: 'skills', foreignKey: 'projectId' });
    Project.hasMany(models.Sdg, { as: 'sdgs', foreignKey: 'projectId' });
    Project.hasMany(models.InterestArea, { as: 'interestAreas', foreignKey: 'projectId' });
  };
  return Project;
};
