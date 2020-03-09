'use strict';

const { processSearch } = require('./requesters/searchMappedRequests');

function getPriceGoogleValue (value) {
  switch (value.toLowerCase()) {
    case 'free':
      return 1;
    case 'paid':
      return 2;
    case 'all':
    default:
      return 0;
  }
}

function search (getParseList, appData, opts) {
  return new Promise(function (resolve, reject) {
    validate(opts);

    const encodedOptions = Object.assign({}, { ...opts, term: encodeURIComponent(opts.term) });
    const fullOptions = Object.assign({
      lang: 'en',
      country: 'us',
      num: 20,
      fullDetail: false,
      price: opts.price ? getPriceGoogleValue(opts.price) : 0,
      getParseList
    }, encodedOptions);

    processSearch(fullOptions)
      .then(resolve)
      .catch(reject);
  }).then((results) => {
    if (opts.fullDetail) {
      // if full detail is wanted get it from the app module
      return Promise.all(results.map((app) => appData({ ...opts, appId: app.appId })));
    }
    return results;
  });
}

function validate (opts) {
  if (!opts || !opts.term) {
    throw Error('Search term missing');
  }

  if (opts.num && opts.num > 250) {
    throw Error("The number of results can't exceed 250");
  }
}

module.exports = search;
