'use strict';
module.exports = (sequelize, DataTypes) => {
  const InterestArea = sequelize.define('InterestArea', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  InterestArea.associate = (models) => {
    InterestArea.belongsToMany(models.Volunteer, { as: 'volunteers', through: 'VolunteersInterestAreas', foreignKey: 'interestAreaId' });
  };
  return InterestArea;
};
