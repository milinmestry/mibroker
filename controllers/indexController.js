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
      domainsSL = [
        { id: 1, name: 'short-1' }, { id: 2, name: 'short-2' },
        { id: 3, name: 'short-3' }, { id: 4, name: 'short-4' },
        { id: 5, name: 'short-5' }, { id: 6, name: 'short-6' },
        { id: 7, name: 'short-7' }, { id: 8, name: 'short-8' },
        { id: 9, name: 'short-9' }, { id: 10, name: 'short-10' },
        { id: 11, name: 'short-11' }, { id: 12, name: 'short-12' },
      ];
      res.render('index', {
        title: 'MiB Home', menuLinks: allPromises[0], activeMenu: '/',
        categoriesList: allPromises[1], categoriesShortLength: domainsSL,
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

// Buy
exports.buy_domains = function (req, res, next) {
  menulinkData.getTopMenus()
    .then(function (listMenus) {
      res.render('buy-domains', { title: 'MiB Buy', menuLinks: listMenus,
        activeMenu: '/buy-furnitures', });
    });
};

// Sell
exports.sell_domains = function (req, res, next) {
  menulinkData.getTopMenus()
    .then(function (listMenus) {
      res.render('sell-domains', { title: 'MiB Sell', menuLinks: listMenus,
        activeMenu: '/sell-furnitures', });
    });
};

// About Us
exports.about_us = function (req, res, next) {
  menulinkData.getTopMenus()
    .then(function (listMenus) {
      res.render('about-us', { title: 'MiB About MiB', menuLinks: listMenus,
        activeMenu: '/about-us', });
    });
};
