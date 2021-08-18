'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Project.init({
    type: DataTypes.STRING,
    about: DataTypes.TEXT,
    location: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    duration: DataTypes.INTEGER,
    estNumBeneficiaries: DataTypes.INTEGER,
    benenficiairiesDemographic: DataTypes.STRING,
    skillId: DataTypes.INTEGER,
    interestAreaId: DataTypes.INTEGER,
    sdgId: DataTypes.INTEGER,
    projectRole: DataTypes.STRING,
    description: DataTypes.TEXT,
    modeOfEngagement: DataTypes.STRING,
    typeOfPosition: DataTypes.STRING,
    nature: DataTypes.STRING,
    minimumQualification: DataTypes.STRING,
    applicationRoute: DataTypes.STRING,
    applicationLink: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};