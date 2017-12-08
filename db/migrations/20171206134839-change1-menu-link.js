'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(function handleTransaction(t) {
      return Promise.all([
        queryInterface.changeColumn('menulinks', 'updated_at', {
            allowNull: true,
            type: Sequelize.DATE,
          }, { transaction: t }
        ),
        queryInterface.changeColumn('menulinks', 'deleted_at', {
            allowNull: true,
            type: Sequelize.DATE,
          }, { transaction: t }
        ),
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(function handleTransaction(t) {
      return Promise.all([
        queryInterface.changeColumn('menulinks', 'updated_at', {
            allowNull: false,
            type: Sequelize.DATE,
          }, { transaction: t }
        ),
        queryInterface.changeColumn('menulinks', 'deleted_at', {
            allowNull: false,
            type: Sequelize.DATE,
          }, { transaction: t }
        ),
      ]);
    });
  },
};
