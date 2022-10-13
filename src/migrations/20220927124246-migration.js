module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: { type: Sequelize.UUID, primaryKey: true },
      username: { type: Sequelize.STRING, allowNull: false, unique: true },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      password: { type: Sequelize.STRING, allowNull: false },
    });

    await queryInterface.createTable("Movie", {
      id: { type: Sequelize.UUID, primaryKey: true },
      backdrop_path: { type: Sequelize.STRING, allowNull: false },
      original_language: { type: Sequelize.STRING, allowNull: false },
      original_title: { type: Sequelize.STRING, allowNull: false },
      overview: { type: Sequelize.STRING, allowNull: false },
      popularity: { type: Sequelize.INTEGER, allowNull: false },
      poster_path: { type: Sequelize.STRING, allowNull: false },
      release_date: { type: Sequelize.DATE, allowNull: false },
      title: { type: Sequelize.STRING, allowNull: false, unique: true },
      vote_average: { type: Sequelize.INTEGER, allowNull: false },
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable("Movie");
    queryInterface.dropTable("Users");
  },
};
