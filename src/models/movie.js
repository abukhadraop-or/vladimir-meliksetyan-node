const { Model } = require("sequelize");
const Sequelize = require("sequelize-mock");
const { sequelize } = require("../models/index");

module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    static associate(models) {}
  }
  /**
   * initilaize movie model, representing Movie model in the DB, with atributes and options
   */
  Movie.init(
    {
      id: {
        type: DataTypes.UUID,
        description: "primary key",
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      backdropPath: {
        description: "Backdrop Path",
        type: DataTypes.STRING,
        allowNull: false,
        field: "backdrop_path",
      },
      originalLanguage: {
        description: "Original Language ",
        type: DataTypes.STRING,
        allowNull: false,
        field: "original_language",
      },
      originalTitle: {
        description: "Original Title",
        type: DataTypes.STRING,
        allowNull: false,
        field: "original_title",
      },
      overview: {
        description: "overview",
        type: DataTypes.STRING,
        allowNull: false,
      },
      popularity: {
        description: "Movie Popularity",
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      posterPath: {
        description: "Poster Path",
        type: DataTypes.STRING,
        field: "poster_path",
        allowNull: false,
      },
      releaseDate: {
        description: "Movie Release Date",
        field: "release_date",
        type: DataTypes.DATE,
        allowNull: false,
      },
      title: {
        description: "Movie Title",
        type: DataTypes.STRING,
        allowNull: false,
      },
      vote_average: {
        description: "Vote Average",
        type: DataTypes.INTEGER,
        field: "vote_average",
        allowNull: false,
      },
      userId: {
        description: "user ID",
        type: DataTypes.UUID,
        field: "user_id",
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "Movie",
      tableName: "Movie",
      createdAt: false,
      updatedAt: false,
    }
  );

  return Movie;
};
