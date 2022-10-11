const { Model } = require("sequelize");
const Sequelize = require("sequelize-mock");
const { sequelize } = require('../models/index')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models){}
  }
 /**
   * initilaize user model, representing User model in the DB, with atributes and options
   */
  User.init(
    {
      id: {
        description: "Primary key",
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      username: {
        description: "User name",
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        description: "Email",
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        description: "Password",
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "User",
      tableName: "Users",
      createdAt: false,
      updatedAt: false,
    }
  );

  return User;
};
