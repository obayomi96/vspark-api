'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sdg = sequelize.define('Sdg', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  Sdg.associate = (models) => {
    Sdg.belongsToMany(models.Volunteer, { as: 'volunteers', through: 'VolunteerSdgs', foreignKey: 'sdgId' });
  };
  return Sdg;
};
