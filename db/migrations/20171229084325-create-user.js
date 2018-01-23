'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      first_name: {
        type: Sequelize.STRING(25),
      },
      last_name: {
        type: Sequelize.STRING(25),
      },
      email: {
        type: Sequelize.STRING(150),
      },
      contact_number: {
        type: Sequelize.STRING(40),
      },
      passcode: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING(255),
      },
      zipcode: {
        type: Sequelize.STRING(20),
      },
      country: {
        type: Sequelize.STRING(60),
      },
      user_status: {
        type: Sequelize.ENUM('active', 'inactive', 'registered', 'suspended'),
      },
      account_locked: {
        type: Sequelize.ENUM('no', 'yes'),
      },
      registered_on: {
        type: Sequelize.INTEGER(11),
      },
      activation_key: {
        type: Sequelize.STRING,
      },
      activated_on: {
        type: Sequelize.INTEGER(11),
      },
      added_by: {
        type: Sequelize.STRING(100),
      },
      updated_by: {
        type: Sequelize.STRING(100),
      },
      deleted_by: {
        type: Sequelize.STRING(100),
      },
      created_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
