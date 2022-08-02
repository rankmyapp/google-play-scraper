'use strict';

const url = require('url');
const { BASE_URL } = require('../constants');

const COLLECTION_APPS_RESPONSE_DATA_MAPPINGS = {
 rawApps: [0, 1, 0, 28, 0],
}

const COLLECTION_APPS_MAPPINGS = {
  title: [0, 3],
  appId: [0, 0, 0],
  url: {
    path: [0, 10, 4, 2],
    fun: (path) => new url.URL(path, BASE_URL).toString()
  },
  icon: [0, 1, 3, 2],
  developer: [0, 14],
  currency: [0, 8, 1, 0, 1],
  price: {
    path: [0, 8, 1, 0, 0],
    fun: (price) => price / 1000000
  },
  free: {
    path: [0, 8, 1, 0, 0],
    fun: (price) => price === 0
  },
  summary: [0, 13, 1],
  scoreText: [0, 4, 0],
  score: [0, 4, 1]
};

module.exports = {
  COLLECTION_APPS_RESPONSE_DATA_MAPPINGS,
  COLLECTION_APPS_MAPPINGS
}
