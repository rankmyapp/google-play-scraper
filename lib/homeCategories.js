'use strict';

const getHomeCategories = require('./utils/getHomeCategories');

function homeCategories (opts) {
  return new Promise(function (resolve, reject) {
    opts = Object.assign({
      lang: 'en-us',
      country: 'us',
    }, opts);

    getHomeCategories(opts)
      .then(resolve)
      .catch(reject);
  });
}

module.exports = homeCategories;
