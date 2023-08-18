'use strict';
const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // User has Many Projects, one-to-many
      User.hasMany(models.Project, {
        foreignKey: 'ownerId',
      })

      // User has Many Members, one-to-many
      User.hasMany(models.Member, {
        foreignKey: 'userId'
      })

      // User has Many Cards, one-to-many
      User.hasMany(models.Card, {
        foreignKey: 'userId',
      })

      // User has Many Comments, one-to-many
      User.hasMany(models.Comment, {
        foreignKey: 'userId'
      })

    }

  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256],
        isEmail: true
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
      }
    }
  });
  return User;
};
