'use strict';

const parseFeaturedCategories = require('./utils/parseFeaturedCategories');

function featuredApp (opts) {
  return new Promise(function (resolve, reject) {
    opts = Object.assign({
      lang: 'pt-BR',
      country: 'br',
      num: 100
    }, opts);

    parseFeaturedCategories(opts)
      .then(resolve)
      .catch(reject);
  });
}

module.exports = featuredApp;
