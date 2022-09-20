'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('Users', {
      user_id: Sequelize.DataTypes.STRING,
      username: Sequelize.DataTypes.STRING,
      email: Sequelize.DataTypes.STRING,
      password:Sequelize.DataTypes.STRING,
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('Users');
  }
};
