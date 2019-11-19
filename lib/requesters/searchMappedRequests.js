'use strict';

const debug = require('debug')('google-play-scraper:searchMappedRequests');
const request = require('../utils/request');
const scriptData = require('../utils/scriptData');
const appList = require('../utils/appList');
const R = require('ramda');
const c = require('../constants');
const { REQUEST_MAPPINGS } = require('../mappers/apps');
const { BASE_URL } = require('../utils/configurations');

const RPCIDS = {
  [c.requestType.initial]: 'lGYRle',
  [c.requestType.paginated]: 'qnKhOb'
};

/**
 * This method allow us to get the body for the review request
 *
 * @param options.term The term to be searched
 * @param options.withToken The token to be used for the given request
 * @param options.requestType The request type (initial or paginated)
 */
function getBodyForRequests ({
  term,
  withToken = '%token%',
  requestType = c.requestType.initial
}) {
  /* The body is slight different for the initial and paginated requests */
  const formBody = {
    [c.requestType.initial]: `f.req=%5B%5B%5B%22lGYRle%22%2C%22%5B%5B%5B%5D%2C%5B%5B10%2C%5B10%2C50%5D%5D%2Ctrue%2Cnull%2C%5B96%2C27%2C4%2C8%2C57%2C30%2C110%2C79%2C11%2C16%2C49%2C1%2C3%2C9%2C12%2C104%2C55%2C56%2C51%2C10%2C34%2C77%5D%5D%2C%5B%5C%22${term}%5C%22%5D%2C4%2C%5Bnull%2C1%5D%2Cnull%2Cnull%2C%5B%5D%5D%5D%22%2Cnull%2C%222%22%5D%5D%5D`,
    [c.requestType.paginated]: `f.req=%5B%5B%5B%22qnKhOb%22%2C%22%5B%5Bnull%2C%5B%5B10%2C%5B10%2C50%5D%5D%2Ctrue%2Cnull%2C%5B96%2C27%2C4%2C8%2C57%2C30%2C110%2C79%2C11%2C16%2C49%2C1%2C3%2C9%2C12%2C104%2C55%2C56%2C51%2C10%2C34%2C77%5D%5D%2Cnull%2C%5C%22${withToken}%5C%22%5D%5D%22%2Cnull%2C%22generic%22%5D%5D%5D`
  };

  return formBody[requestType];
}

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
  opts.requestType = c.requestType.paginated;

  return checkFinished(opts, [...savedApps, ...apps], token);
}

/*
 * If already have requested results or there are no more pages, return current
 * app list, otherwise request the ajax endpoint of the next page and process
 * the results.
 */
function checkFinished (opts, savedApps, nextToken) {
  debug('nextToken: %s', nextToken);
  debug('savedApps length: %s', savedApps.length);

  if (savedApps.length >= opts.num || !nextToken) {
    return savedApps.slice(0, opts.num);
  }

  const body = getBodyForRequests({
    term: opts.term,
    requestType: opts.requestType,
    withToken: nextToken
  });
  const url = `${BASE_URL}/_/PlayStoreUi/data/batchexecute?rpcids=${RPCIDS[opts.requestType]}&f.sid=1&bl=boq_playuiserver_20191015.07_p0&hl=${opts.lang}&gl=${opts.country}&authuser&soc-app=121&soc-platform=1&soc-device=1`;

  debug('batchexecute URL: %s', url);
  debug('with body: %s', body);

  const requestOptions = Object.assign({
    url,
    method: 'POST',
    body,
    followAllRedirects: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  }, opts.requestOptions);

  return request(requestOptions, opts.throttle)
    .then((html) => {
      const input = JSON.parse(html.substring(5));
      const data = JSON.parse(input[0][2]);
      const parsedData = (opts.requestType === c.requestType.initial)
        ? data[0][1]
        : data;

      return processAndRecur(parsedData, opts, savedApps, REQUEST_MAPPINGS);
    });
}

function processSearch (opts) {
  opts.requestType = c.requestType.initial;
  return checkFinished(opts, [], '%token%');
}

module.exports = {
  processSearch
};
