'use strict';
module.exports = (sequelize, DataTypes) => {
  const Opportunity = sequelize.define('Opportunity', {
    skillId: DataTypes.INTEGER,
    opportunityRole: DataTypes.STRING,
    description: DataTypes.TEXT,
    modeOfEngagement: DataTypes.ENUM('remote', 'in-person'),
    typeOfPosition: DataTypes.ENUM('paid', 'volunteer'),
    nature: DataTypes.STRING,
    minimumQualification: DataTypes.ENUM('primary', 'secondary', 'OND', 'HND', 'BSC', 'masters', 'PHD'),
    applicationRoute: DataTypes.ENUM('volunteerspark', 'external-site'),
    applicationLink: DataTypes.STRING
  }, {});
  Opportunity.associate = function(models) {
   
  };
  return Opportunity;
};
