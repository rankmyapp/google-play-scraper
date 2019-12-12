'use strict';

const parseFeaturedApps = require('./utils/parseFeaturedApps');

function featuredApp (opts) {
  return new Promise(function (resolve, reject) {
   
    opts = Object.assign({
      lang: 'pt-BR',
      country: 'br',
      num: 100
    }, opts);

    parseFeaturedApps(opts)
    .then(resolve)
    .catch(reject);
  });
}

module.exports = featuredApp;
