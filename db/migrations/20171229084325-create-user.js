'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      contact_number: {
        type: Sequelize.STRING
      },
      passcode: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      zipcode: {
        type: Sequelize.INT
      },
      country: {
        type: Sequelize.STRING
      },
      user_status: {
        type: Sequelize.ENUM
      },
      account_locked: {
        type: Sequelize.INT
      },
      registered_on: {
        type: Sequelize.INT
      },
      activation_key: {
        type: Sequelize.STRING
      },
      activated_on: {
        type: Sequelize.INT
      },
      added_by: {
        type: Sequelize.STRING
      },
      updated_by: {
        type: Sequelize.STRING
      },
      deleted_by: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};