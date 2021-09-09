'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sdg = sequelize.define('Sdg', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  Sdg.associate = (models) => {
    Sdg.hasMany(models.Volunteer, { as: 'volunteers', foreignKey: 'sdgId' });
  };
  return Sdg;
};
