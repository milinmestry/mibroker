'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addIndex('categories', {
        fields: ['name'],
        unique: true,
        name: 'unique_category',
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeIndex('categories', 'unique_category', {});
  },
};
