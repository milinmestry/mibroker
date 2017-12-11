const db = require('../../models');

const menulinkRepository = {
  getTopMenus: () => {
    return db.menulink.findAll({
      attributes: [
        'label', 'slug', 'menu_title', 'is_external',
      ],
      where: {
        is_active: 1,
        menu_position: 'TOP',
      },
    }).then(function (links) {
      return links;
    });
  },
};

module.exports = menulinkRepository;
