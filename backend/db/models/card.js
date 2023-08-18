"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // Card belongs to User
      Card.belongsTo(models.User, {
        foreignKey: "userId",
        as: "User",
      });

      // Card belongs to Section
      Card.belongsTo(models.Section, {
        foreignKey: "sectionId",
        as: "Section",
      });

      // Card have many Comments, one-to-many
      Card.hasMany(models.Comment, {
        foreignKey: "cardId",
        onDelete: 'CASCADE',
        hooks: true
      });
    }
  }
  Card.init(
    {
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: true },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      sectionId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "Card",
    }
  );
  return Card;
};
