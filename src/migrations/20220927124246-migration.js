"use strict";

module.exports = {
  async up(queryInterface, Sequelize, done) {
    queryInterface
      .createTable("Users", {
        id: Sequelize.DataTypes.STRING,
        username: Sequelize.DataTypes.STRING,
        email: Sequelize.DataTypes.STRING,
        password: Sequelize.DataTypes.STRING,
      })

      .success(() => {
        queryInterface.createTable("movies", {
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
        done();
      });
  },

  async down(queryInterface, Sequelize) {
      queryInterface.dropTable("movies");
      queryInterface.dropTable("Users")
  },
};
