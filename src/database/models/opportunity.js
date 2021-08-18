'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Opportunity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Opportunity.init({
    skillId: DataTypes.INTEGER,
    opportunityRole: DataTypes.STRING,
    description: DataTypes.TEXT,
    modeOfEngagement: DataTypes.STRING,
    typeOfPosition: DataTypes.STRING,
    nature: DataTypes.STRING,
    minimumQualification: DataTypes.STRING,
    applicationRoute: DataTypes.STRING,
    applicationLink: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Opportunity',
  });
  return Opportunity;
};