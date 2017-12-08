const menulinkData = require('../db/data/menulinkRepository');

// Home page
exports.home = function (req, res, next) {
  menulinkData.getTopMenus()
    .then(function (listMenus) {
      res.render('index', { title: 'MiB Home', menuLinks: listMenus, activeMenu: '/' });
    });
};

// Home page
exports.buy_domains = function (req, res, next) {
  menulinkData.getTopMenus()
    .then(function (listMenus) {
      res.render('buy-domains', { title: 'MiB Buy Domains', menuLinks: listMenus,
        activeMenu: 'buy-domains', });
    });
};

// Home page
exports.sell_domains = function (req, res, next) {
  menulinkData.getTopMenus()
    .then(function (listMenus) {
      res.render('sell-domains', { title: 'MiB Sell Domains', menuLinks: listMenus,
        activeMenu: 'sell-domains', });
    });
};
