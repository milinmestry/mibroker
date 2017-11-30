// var MenuLink = require('../models/MenuLink');

// Home page
exports.home = function (req, res, next) {
  const listMenus = [
    { id: 1, lable: 'Home', slug: '/', title: 'Home Page' },
    { id: 2, lable: 'Buy Domains', slug: 'buy-domains' },
    { id: 3, lable: 'Sell Domains', slug: 'sell-domains' },
    { id: 4, lable: 'Hire a Broker', slug: 'contact-us' },
    { id: 5, lable: 'About Us', slug: 'about-us' },
  ];
  res.render('index', { title: 'MiB Home', menuLinks: listMenus, activeMenu: '/' });
};

// Home page
exports.buy_domains = function (req, res, next) {
  const listMenus = [
    { id: 1, lable: 'Home', slug: '/', title: 'Home Page' },
    { id: 2, lable: 'Buy Domains', slug: 'buy-domains' },
    { id: 3, lable: 'Sell Domains', slug: 'sell-domains' },
    { id: 4, lable: 'Hire a Broker', slug: 'contact-us' },
    { id: 5, lable: 'About Us', slug: 'about-us' },
  ];
  res.render('buy-domains', { title: 'MiB Buy Domains', menuLinks: listMenus,
    activeMenu: 'buy-domains', });
};

// Home page
exports.sell_domains = function (req, res, next) {
  res.render('sell-domains', { title: 'MiB Sell Domains', menuLinks: {}, activeMenu: 'sell-domains' });
};
