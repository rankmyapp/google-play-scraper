'use strict';

const url = require('url');
const { BASE_URL } = require('../constants');

const CLUSTER_APPS_RESPONSE_DATA_MAPPINGS = {
 rawApps: [0, 21, 0],
 paginationCode: [0, 21, 1, 3, 1],
}

const CLUSTER_APPS_MAPPINGS = {
  title: [3],
  appId: [0, 0],
  url: {
    path: [10, 4, 2],
    fun: (path) => new url.URL(path, BASE_URL).toString()
  },
  icon: [1, 3, 2],
  developer: [14],
  currency: [8, 1, 0, 1],
  price: {
    path: [8, 1, 0, 0],
    fun: (price) => price / 1000000
  },
  free: {
    path: [8, 1, 0, 0],
    fun: (price) => price === 0
  },
  summary: [13, 1],
  scoreText: [4, 0],
  score: [4, 1]
};

module.exports = {
  CLUSTER_APPS_RESPONSE_DATA_MAPPINGS,
  CLUSTER_APPS_MAPPINGS
}
