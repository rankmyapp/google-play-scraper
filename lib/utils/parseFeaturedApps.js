'use strict';

const debug = require('debug')('google-play-scraper:parseFeaturedApps');
const request = require('./request');
const R = require('ramda');
const scriptData = require('./scriptData');
const { processAndRecur } = require('../requesters/featuredAppsMappedRequests');
const { CLUSTER_BASE_URL } = require('./configurations');
const { INITIAL_MAPPINGS } = require('../mappers/featuredApps');

function parseFeaturedApps (opts) {
  
  const url = `${CLUSTER_BASE_URL}?gl=${opts.country}&hl=${opts.lang}`;
  
  const options = {
    url,
    method: 'GET',
    followAllRedirects: true
  };

  return request(options)
    .then(scriptData.parse)
    .then(clusterObject => processAndRecur(clusterObject, opts, [], INITIAL_MAPPINGS))
    .catch(console.error);
}

module.exports = parseFeaturedApps;
