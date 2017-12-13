const db = require('../../models');

const Op = db.Sequelize.Op;

const menulinkRepository = {
  getTopMenus: () => {
    return db.menulink.findAll({
      attributes: [
        'label', 'slug', 'menu_title', 'is_external', 'menu_position',
      ],
      where: {
        is_active: 1,
        menu_position: {
          [Op.or]: ['TOP', 'BOTTOM'],
        },
      },
    }).then(function (links) {
      return links;
    });
  },
};

module.exports = menulinkRepository;
