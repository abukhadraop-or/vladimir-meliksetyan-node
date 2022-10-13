const { Model, Sequelize } = require("sequelize");

class User extends Model {}

/**
 * @type {typeof User}
 */
module.exports = (sequelize, DataTypes) => {
  /**
   * initialize user model, representing User model in the DB, with attributes and options
   */
  User.init(
    {
      id: {
        description: "Primary key",
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
      },
      username: {
        description: "User name",
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        description: "Email",
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
      freezeTableName: true,
    }
  );

  return User;
};
