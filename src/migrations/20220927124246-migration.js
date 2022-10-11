"use strict";

module.exports = {
  async up(queryInterface, Sequelize, done) {
    queryInterface
      .createTable("Users", {
        id: { type: Sequelize.UUID, primaryKey: true },
        username: { type: Sequelize.STRING, allowNull: false },
        email: { type: Sequelize.STRING, allowNull: false },
        password: { type: Sequelize.STRING, allowNull: false },
      })

      .success(() => {
        queryInterface.createTable("Movie", {
          id: { type: Sequelize.UUID, primaryKey: true },
          backdrop_path: { type: Sequelize.STRING, allowNull: false },
          original_language: { type: Sequelize.STRING, allowNull: false },
          original_title: { type: Sequelize.STRING, allowNull: false },
          overview: { type: Sequelize.STRING, allowNull: false },
          popularity: { type: Sequelize.INTEGER, allowNull: false },
          poster_path: { type: Sequelize.STRING, allowNull: false },
          release_date: { type: Sequelize.DATE, allowNull: false },
          title: { type: Sequelize.STRING, allowNull: false },
          vote_average: { type: Sequelize.INTEGER, allowNull: false },
          user_id: { type: Sequelize.STRING, allowNull: false },
        });
        done();
      });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.dropTable("Movie");
    queryInterface.dropTable("Users");
  },
};
