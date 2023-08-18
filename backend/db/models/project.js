"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // Project belongs to User
      Project.belongsTo(models.User, {
        foreignKey: 'ownerId',
        as: 'Owner',
      })

      // Project have many Sections, one-to-many
      Project.hasMany(models.Section, {
        foreignKey: 'projectId',
        onDelete: 'CASCADE',
        hooks: true
      })

      Project.hasMany(models.Member, {
        foreignKey: 'projectId',
        onDelete: 'CASCADE',
        hooks: true
      })

      Project.hasMany(models.Card, {
        foreignKey: 'projectId',
      })

    }
  }
  Project.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      category: {
        type: DataTypes.STRING,
        allowNull: true
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      },
      projectImage: {
        type: DataTypes.STRING,
        allowNull: true
      },
    },
    {
      sequelize,
      modelName: "Project",
    }
  );
  return Project;
};
