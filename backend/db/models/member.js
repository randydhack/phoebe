'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // Member belongs to User
      Member.belongsTo(models.User, {
        foreignKey: 'userId',
        as: "User"
      })

      // Member belongs to Project
      Member.belongsTo(models.Project, {
        foreignKey: 'projectId',
        as: "Project"
      })
    }
  }
  Member.init({
    projectId: {type: DataTypes.INTEGER, allowNull: false},
    userId: {type: DataTypes.INTEGER, allowNull: false}
  }, {
    sequelize,
    modelName: 'Member',
  });
  return Member;
};
