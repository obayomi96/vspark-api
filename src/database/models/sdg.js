'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sdg = sequelize.define('Sdg', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  Sdg.associate = (models) => {
    Sdg.belongsToMany(models.User, { as: 'volunteers', through: 'VolunteerSdgs', foreignKey: 'sdgId' });
  };
  return Sdg;
};
