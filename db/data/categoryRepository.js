const db = require('../../models');

const categoryRepository = {
  getAllCategories: (isActive) => {
    return db.category.findAll({
      attributes: [
        'id', 'name',
      ],
      where: {
        is_active: 1,
      },
      order: [
        ['sort', 'ASC'],
        ['name', 'ASC'],
      ],
    }).then(function (data) {
      return data;
    });
  },
};

module.exports = categoryRepository;
