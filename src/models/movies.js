const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class movies extends Model {
    static associate(models) {}
  }
  movies.init(
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        validat: {
          notEmpty: true,
        },
      },
      backdrop_path: {
        type: DataTypes.STRING,
        allowNull: false,
        validat: {
          notEmpty: true,
        },
      },
      original_language: {
        type: DataTypes.STRING,
        allowNull: false,
        validat: {
          notEmpty: true,
        },
      },
      original_title: {
        type: DataTypes.STRING,
        allowNull: false,
        validat: {
          notEmpty: true,
        },
      },
      overview: {
        type: DataTypes.STRING,
        allowNull: false,
        validat: {
          notEmpty: true,
        },
      },
      popularity: {
        type: DataTypes.STRING,
        allowNull: false,
        validat: {
          notEmpty: true,
        },
      },
      poster_path: {
        type: DataTypes.STRING,
        allowNull: false,
        validat: {
          notEmpty: true,
        },
      },
      release_date: {
        type: DataTypes.STRING,
        allowNull: false,
        validat: {
          notEmpty: true,
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validat: {
          notEmpty: true,
        },
      },
      vote_average: {
        type: DataTypes.STRING,
        allowNull: false,
        validat: {
          notEmpty: true,
        },
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        validat: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );

  return movies;
};
