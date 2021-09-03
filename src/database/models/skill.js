'use strict';
module.exports = (sequelize, DataTypes) => {
  const Skill = sequelize.define('Skill', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  Skill.associate = (models) => {
    Skill.hasMany(models.Volunteer, 
      { 
      as: 'volunteers', 
      foreignKey: 'skillId' 
      }
    );
  };
  return Skill;
};
