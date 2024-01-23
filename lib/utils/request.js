'use strict';

const requestLib = require('axios');
const axiosThrottle = require('axios-request-throttle');
const debug = require('debug')('google-play-scraper:request');

function doRequest (opts, limit) {
  const req = requestLib
  if (limit) {
    axiosThrottle.use(requestLib, { requestsPerSecond: limit })
  }
  return new Promise((resolve, reject) => req(opts)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error)));
}

function request(opts, limit) {
  const baseUrl = process.env.BASE_URL || 'https://play.google.com';
  const gatewayProxy = process.env.GATEWAY_PROXY_URL || 'https://play.google.com';
  const url = opts.url.replace(baseUrl, gatewayProxy);
  const params = { ...opts, url };

  debug('Request started: %j', params);
  return doRequest(params, limit)
    .then(function (response) {
      debug('Request finished: %j', params);
      return response;
    })
    .catch(function (reason) {
      debug('Request error:', reason.message, reason.response && reason.response.statusCode);
      let message = 'Error requesting Google Play:' + reason.message;
      if (reason.response && reason.response.statusCode === 404) {
        message = 'App not found (404)';
      }
      const err = Error(message);
      err.status = reason.response && reason.response.statusCode;
      throw err;
    });
}

module.exports = request;
