'use strict';

const request = require('./request');
const scriptData = require('./scriptData');
const { processAndRecur } = require('../requesters/featuredCategoriesMappedRequests');
const { CLUSTER_BASE_URL } = require('./configurations');
const { INITIAL_MAPPINGS } = require('../mappers/featuredCategories');

function parseFeaturedCategories (opts) {
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

module.exports = parseFeaturedCategories;
