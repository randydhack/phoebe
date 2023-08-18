'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Section extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Section.hasMany(models.Card, {
        foreignKey: 'sectionId',
        onDelete: 'CASCADE',
        hooks: true
      })

      Section.belongsTo(models.Project, {
        foreignKey: 'projectId',
        as: "Project"
      })
    }
  }
  Section.init({
    name: DataTypes.STRING,
    projectId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Section',
  });
  return Section;
};
