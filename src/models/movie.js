const { Model, Sequelize } = require("sequelize");

class Movie extends Model {}

/**
 * @type {typeof Movie}
 */
module.exports = (sequelize, DataTypes) => {
  /**
   * initialize movie model, representing a table in the DB, with attributes and options
   */
  Movie.init(
    {
      id: {
        description: "Primary key",
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
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
        unique: true,
      },
      voteAverage: {
        description: "Vote Average",
        type: DataTypes.INTEGER,
        field: "vote_average",
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: "Movie",
      tableName: "Movie",
      freezeTableName: true,
    }
  );

  return Movie;
};
