'use strict';

const debug = require('debug')(
  'google-play-scraper:featuredAppsMappedRequests'
);
const R = require('ramda');
const c = require('./constants');
const request = require('./utils/request');
const scriptData = require('./utils/scriptData');
const reviewsList = require('./utils/reviewsList');
const { extract } = require('./utils/featuredCategories');
const { REQUEST_MAPPINGS } = require('./mappers/reviews');
const { BASE_URL } = require('./utils/configurations');
const util = require('util');

const body =
  'f.req=%5B%5B%5B%22qnKhOb%22%2C%22%5B%5Bnull%2C%5B%5B10%2C%5B10%2C50%5D%5D%2Ctrue%2Cnull%2C%5B96%2C27%2C4%2C8%2C57%2C30%2C110%2C79%2C11%2C16%2C49%2C1%2C3%2C9%2C12%2C104%2C55%2C56%2C51%2C10%2C34%2C77%5D%5D%2Cnull%2C%5C%22%token%%5C%22%5D%5D%22%2Cnull%2C%22generic%22%5D%5D%5D';

function getBodyForRequests({
  withToken = '%token%',
  requestType = c.requestType.initial
}) {
  /* The body is slight different for the initial and paginated requests */
  const formBody = {
    [c.requestType.initial]: `f.req=%5B%5B%5B%22KT5WVe%22%2C%22%5B1%2Cnull%2Cnull%2C%5B1%5D%5D%22%2Cnull%2C%221%22%5D%5D%5D`,
    [c.requestType.paginated]: `f.req=%5B%5B%5B%22qnKhOb%22%2C%22%5B%5Bnull%2C%5B%5B10%2C%5B10%2C50%5D%5D%2Ctrue%2Cnull%2C%5B96%2C27%2C4%2C8%2C57%2C30%2C110%2C79%2C11%2C16%2C49%2C1%2C3%2C9%2C12%2C104%2C55%2C56%2C51%2C10%2C34%2C77%5D%5D%2Cnull%2C%5C%22${withToken}%5C%22%5D%5D%22%2Cnull%2C%22generic%22%5D%5D%5D`
  };

  return formBody[requestType];
}

async function processAndRecur(html, opts, savedApps, mappings) {
  if (R.is(String, html)) {
    html = scriptData.parse(html);
  }

  if (html.length === 0) {
    return savedApps;
  }

  const apps = reviewsList.extract(mappings.reviews, html, opts.appId);
  const token = R.path(mappings.token, html);
  opts.requestType = c.requestType.paginated;

  return checkFinished(opts, [...savedApps, ...apps], token);
}

function checkFinished(opts, savedReviews, nextToken) {
  const body = getBodyForRequests({
    appId: opts.appId,
    sort: opts.sort,
    withToken: nextToken,
    requestType: opts.requestType
  });
  const url = `${BASE_URL}/_/PlayStoreUi/data/batchexecute?rpcids=w3QCWb&f.sid=-7485691798152842261&bl=boq_playuiserver_20191203.01_p0&hl=pt-BR&authuser&soc-app=121&soc-platform=1&soc-device=1&_reqid=148421&rt=c`;

  debug('batchexecute URL: %s', url);
  debug('with body: %s', body);

  const requestOptions = Object.assign(
    {
      url,
      method: 'POST',
      body,
      followAllRedirects: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    },
    opts.requestOptions
  );

  return request(requestOptions, opts.throttle).then(html => {
    const input = JSON.parse(html.substring(5));
    const data = JSON.parse(input[0][2]);

    return data === null
      ? savedReviews
      : processAndRecur(data, opts, savedReviews, REQUEST_MAPPINGS);
  });
}

function featuredApp() {
  const url = `${BASE_URL}/_/PlayStoreUi/data/batchexecute?rpcids=w3QCWb&f.sid=-7485691798152842261&bl=boq_playuiserver_20191203.01_p0&hl=pt-BR&authuser&soc-app=121&soc-platform=1&soc-device=1&_reqid=148421`;

  debug('batchexecute URL: %s', url);
  debug('with body: %s');

  const requestOptions = {
    url,
    method: 'POST',
    body,
    followAllRedirects: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  };

  return request(requestOptions, 10000).then(html => {
    const input = JSON.parse(html.substring(5));
    const data = JSON.parse(input[0][2]);

    console.log(data[0][1]);
  }).catch(e => { console.log(e); });
}

module.exports = featuredApp;
