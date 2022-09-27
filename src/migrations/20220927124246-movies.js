"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("movies", {
      id: Sequelize.DataTypes.STRING,
      backdrop_path: Sequelize.DataTypes.STRING,
      original_language: Sequelize.DataTypes.STRING,
      original_title: Sequelize.DataTypes.STRING,
      overview: Sequelize.DataTypes.STRING,
      popularity: Sequelize.DataTypes.STRING,
      poster_path: Sequelize.DataTypes.STRING,
      release_date: Sequelize.DataTypes.STRING,
      title: Sequelize.DataTypes.STRING,
      vote_average: Sequelize.DataTypes.STRING,
      user_id: Sequelize.DataTypes.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("movies");
  },
};
