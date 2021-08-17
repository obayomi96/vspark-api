'use strict';
module.exports = (sequelize, DataTypes) => {
  const Skill = sequelize.define('Skill', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  Skill.associate = (models) => {
    Skill.belongsToMany(models.Volunteer, 
      { 
      as: 'volunteers', 
      through: 'VolunteerSkills',
      foreignKey: 'skillId' 
      }
    );
  };
  return Skill;
};
