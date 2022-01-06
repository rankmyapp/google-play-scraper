'use strict';

const { processSearch } = require('./requesters/searchMappedRequests');
const request = require('./utils/request');
const scriptData = require('./utils/scriptData');
const appList = require('./utils/appList');
const R = require('ramda');

const body = 'f.req=%5B%5B%5B%22qnKhOb%22%2C%22%5B%5Bnull%2C%5B%5B10%2C%5B10%2C50%5D%5D%2Ctrue%2Cnull%2C%5B96%2C27%2C4%2C8%2C57%2C30%2C110%2C79%2C11%2C16%2C49%2C1%2C3%2C9%2C12%2C104%2C55%2C56%2C51%2C10%2C34%2C77%5D%5D%2Cnull%2C%5C%22%token%%5C%22%5D%5D%22%2Cnull%2C%22generic%22%5D%5D%5D';

/*
 * Extract navigation tokens for next pages, parse results and call
 * `checkFinished` to repeat the process with next page if necessary.
 */
function processAndRecur (html, opts, savedApps, mappings) {
  if (R.is(String, html)) {
    html = scriptData.parse(html);
  }

  const apps = appList.extract(mappings.apps, html);
  const token = R.path(mappings.token, html);

  return checkFinished(opts, [...savedApps, ...apps], token);
}

/*
 * If already have requested results or there are no more pages, return current
 * app list, otherwise request the ajax endpoint of the next page and process
 * the results.
 */
function checkFinished (opts, savedApps, nextToken) {
  if (savedApps.length >= opts.num || !nextToken) {
    return savedApps.slice(0, opts.num);
  }

  const requestOptions = Object.assign({
    url: `https://play.google.com/_/PlayStoreUi/data/batchexecute?rpcids=qnKhOb&bl=boq_playuiserver_20190424.04_p0&hl=${opts.lang}&gl=${opts.country}&authuser=0&soc-app=121&soc-platform=1&soc-device=1`,
    method: 'POST',
    body: body.replace('%token%', nextToken),
    followRedirect: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  }, opts.requestOptions);

  return request(requestOptions, opts.throttle)
    .then((html) => {
      const input = JSON.parse(html.substring(5));
      const data = JSON.parse(input[0][2]);
      return processAndRecur(data, opts, savedApps, REQUEST_MAPPINGS);
    });
}

const REQUEST_MAPPINGS = {
  apps: [0, 0, 0],
  token: [0, 0, 7, 1]
};

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
