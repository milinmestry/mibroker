const menulinkData = require('../db/data/menulinkRepository');
const categoryData = require('../db/data/categoryRepository');

const Promise = require('bluebird');

// Home page
exports.home = function (req, res, next) {
  const listMenus = menulinkData.getTopMenus()
    .then(function (list) {
      return list;
    });

  const allCategories = categoryData.getAllCategories()
    .then(function (categories) {
      return categories;
    });

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
  Promise.all([listMenus, allCategories])
    .then(function (allPromises) {
      // console.log(allPromises[0]);
      // console.log(allPromises[1]);
      res.render('index', {
        title: 'MiB Home', menuLinks: allPromises[0], activeMenu: '/',
        categoriesList: allPromises[1],
      });
    })
    .catch(TypeError, function (e) {
      //If it is a TypeError, will end up here because
      //it is a type error to reference property of undefined
      console.log(e);
    })
    .catch(function (exception) {
      console.log(exception);
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
