'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const bulkData = [];
    const oData = {};
    for (var i = 1; i < 45; i++) {
      let oData = { name: 'Category-' + i, created_by: 'milin.mestry@dinerosoftware.com', };
      bulkData.push(oData);
    }

    return queryInterface.bulkInsert('categories', bulkData,
      { fields: ['name', 'created_by'] });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categories', null, {});
  },
};
