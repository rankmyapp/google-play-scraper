'use strict';

const parseHomeCategories = require('./utils/parseHomeCategories');

function homeCategories (opts) {
  return new Promise(function (resolve, reject) {
    opts = Object.assign({
      lang: 'pt-BR',
      country: 'br',
      num: 100
    }, opts);

    parseHomeCategories(opts)
      .then(resolve)
      .catch(reject);
  });
}

module.exports = homeCategories;
