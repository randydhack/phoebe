'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // Comment belongs to Card
      Comment.belongsTo(models.Card, {
        foreignKey: 'cardId',
        as: "Card"
      })

      // Comment belongs to User
      Comment.belongsTo(models.User, {
        foreignKey: 'userId',
        as: "User"
      })
    }
  }
  Comment.init({
    cardId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
