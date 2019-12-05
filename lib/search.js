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

function search (getParseList, opts) {
  return new Promise(function (resolve, reject) {
    validate(opts);

    const fullOptions = Object.assign(
      {
        term: encodeURIComponent(opts.term),
        lang: 'en',
        country: 'us',
        num: 20,
        fullDetail: false,
        price: opts.price ? getPriceGoogleValue(opts.price) : 0,
        getParseList
      },
      opts
    );

    processSearch(fullOptions)
      .then(resolve)
      .catch(reject);
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
