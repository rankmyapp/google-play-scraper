'use strict';

const R = require('ramda');
const queryString = require('querystring');
const request = require('./utils/request');
const scriptData = require('./utils/scriptData');
const MAPPINGS = require('./mappers/details');

const BASE_URL = 'https://play.google.com';
const PLAYSTORE_URL = 'https://google-play-scraper.azure-api.net/store/apps';

function app (opts) {
  return new Promise(function (resolve, reject) {
    if (!opts || !opts.appId) {
      throw Error('appId missing');
    }

    opts.lang = opts.lang || 'en';
    opts.country = opts.country || 'us';

    const qs = queryString.stringify({
      id: opts.appId,
      hl: opts.lang,
      gl: opts.country
    });
    const reqUrl = `${PLAYSTORE_URL}?${qs}`;
    const urlDetail = `${BASE_URL}?${qs}`;

    const options = Object.assign({
      url: reqUrl,
      followAllRedirects: true
    }, opts.requestOptions);

    request(options, opts.throttle)
      .then(scriptData.parse)
    // comment next line to get raw data
      .then(scriptData.extractor(MAPPINGS))
      .then(R.assoc('appId', opts.appId))
      .then(R.assoc('url', urlDetail))
      .then(resolve)
      .catch(reject);
  });
}

module.exports = app;
