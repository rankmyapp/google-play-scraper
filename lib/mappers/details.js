'use strict';

const R = require('ramda');
const helper = require('../utils/mappingHelpers');

const MAPPINGS =  {
  title: {
    useServiceRequestId: 'Ws7gDc',
    path: [1, 2, 0, 0]
  },
  description: {
    useServiceRequestId: 'Ws7gDc',
    path: [1, 2, 72, 0, 1],
    fun: helper.descriptionText
  },
  descriptionHTML: {
    useServiceRequestId: 'Ws7gDc',
    path: [1, 2, 72, 0, 1],
  },
  summary: {
    useServiceRequestId: 'Ws7gDc',
    path: [1, 2, 73, 0, 1],
  },
  installs: {
    useServiceRequestId: 'Ws7gDc',
    path: [1, 2, 13, 0],
  },
  minInstalls: {
    useServiceRequestId: 'Ws7gDc',
    path: [1, 2, 13, 1],
  },
  maxInstalls: {
    useServiceRequestId: 'Ws7gDc',
    path: [1, 2, 13, 2],
  },
  score: {
    useServiceRequestId: 'Ws7gDc',
    path: [1, 2, 51, 0, 1],
  },
  scoreText: {
    useServiceRequestId: 'Ws7gDc',
    path: [1, 2, 51, 0, 0],
  },
  ratings: {
    useServiceRequestId: 'Ws7gDc',
    path: [1, 2, 51, 2, 1],
  },
  reviews: {
    useServiceRequestId: 'Ws7gDc',
    path: [1, 2, 51, 3, 1],
  },
  histogram: {
    useServiceRequestId: 'Ws7gDc',
    path: [1, 2, 51, 1],
    fun: helper.buildHistogram
  },
  price: {
    useServiceRequestId: 'Ws7gDc',
    path: [1, 2, 57, 0, 0, 0, 0, 1, 0, 0],
    fun: (val) => val / 1000000 || 0
  },
  free: {
    useServiceRequestId: 'Ws7gDc',
    path: [1, 2, 57, 0, 0, 0, 0, 1, 0, 0],
    // considered free only if price is exactly zero
    fun: (val) => val === 0
  },
  currency: {
    useServiceRequestId: 'Ws7gDc',
    path: [1, 2, 57, 0, 0, 0, 0, 1, 0, 1],
  },
  priceText: {
    useServiceRequestId: 'Ws7gDc',
    path: [1, 2, 57, 0, 0, 0, 0, 1, 0, 2],
    fun: helper.priceText
  },
  available: {
    useServiceRequestId: 'Ws7gDc',
    path: [1, 2, 18, 0],
    fun: Boolean
  },
  offersIAP: {
    useServiceRequestId: 'Ws7gDc',
    path: [1, 2, 19, 0],
    fun: Boolean
  },
  IAPRange: {
    useServiceRequestId: 'Ws7gDc',
    path: [1, 2, 19, 0],
  },
  androidVersion: {
    useServiceRequestId: 'Ws7gDc',
    path: [1, 2, 140, 1, 1, 0, 0, 1],
    fun: helper.normalizeAndroidVersion
  },
  androidVersionText: {
    useServiceRequestId: 'Ws7gDc',
    path: [1, 2, 140, 1, 1, 0, 0, 1],
    fun: (version) => version || 'Varies with device'
  },
  developer: {
    useServiceRequestId: 'Ws7gDc',
    path: [1, 2, 68, 0],
  },
  developerId: {
    useServiceRequestId: 'Ws7gDc',
    path: [1, 2, 68, 1, 4, 2],
    fun: (devUrl) => devUrl.split('id=')[1]
  },
  developerEmail: {
    useServiceRequestId: 'Ws7gDc',
    path: [1, 2, 69, 1, 0],
  },
  developerWebsite: {
    useServiceRequestId: 'Ws7gDc',
    path: [1, 2, 69, 0, 5, 2],
  },
  developerAddress: {
    useServiceRequestId: 'Ws7gDc',
    path: [1, 2, 69, 2, 0],
  },
  privacyPolicy: {
    useServiceRequestId: 'Ws7gDc',
    path: [1, 2, 99, 0, 5, 2],
  },
  developerInternalID: {
    useServiceRequestId: 'Ws7gDc',
    path: [1, 2, 68, 1, 4, 2],
    fun: (devUrl) => devUrl.split('id=')[1]
  },
  genre: {
    useServiceRequestId: 'Ws7gDc',
    path: [1, 2, 79, 0, 0, 0],
  },
  genreId: {
    useServiceRequestId: 'Ws7gDc',
    path: [1, 2, 79, 0, 0, 2],
  },
  familyGenre: {
    useServiceRequestId: 'Ws7gDc',
    path: ['ds:5', 0, 12, 13, 1, 0],
  },
  familyGenreId: {
    useServiceRequestId: 'Ws7gDc',
    path: ['ds:5', 0, 12, 13, 1, 2],
  },
  icon: {
    useServiceRequestId: 'Ws7gDc',
    path: [1, 2, 95, 0, 3, 2],
  },
  headerImage: {
    useServiceRequestId: 'Ws7gDc',
    path: [1, 2, 96, 0, 3, 2],
  },
  screenshots: {
    useServiceRequestId: 'Ws7gDc',
    path: [1, 2, 78, 0],
    fun: (screenshots) => {
      if (screenshots === null) return [];
      return screenshots.map(R.path([3, 2]));
    }
  },
  video: {
    useServiceRequestId: 'Ws7gDc',
    path: [1, 2, 100, 0, 0, 3, 2],
  },
  videoImage: {
    useServiceRequestId: 'Ws7gDc',
    path: [1, 2, 100, 1, 0, 3, 2],
  },
  contentRating: {
    useServiceRequestId: 'Ws7gDc',
    path: [1, 2, 9, 0],
  },
  contentRatingDescription: {
    useServiceRequestId: 'Ws7gDc',
    path: [1, 2, 9, 2, 1],
  },
  adSupported: {
    useServiceRequestId: 'Ws7gDc',
    path: [1, 2, 48],
    fun: Boolean
  },
  released: {
    useServiceRequestId: 'Ws7gDc',
    path: [1, 2, 10, 0],
  },
  updated: {
    useServiceRequestId: 'Ws7gDc',
    path: [1, 2, 145, 0, 1, 0],
    fun: (ts) => ts * 1000
  },
  version: {
    useServiceRequestId: 'Ws7gDc',
    path: [1, 2, 140, 0, 0, 0],
    fun: (val) => val || 'VARY'
  },
  recentChanges: {
    useServiceRequestId: 'Ws7gDc',
    path: [1, 2, 144, 1, 1],
  },
  comments: {
    useServiceRequestId: 'oCPfdb',
    path: [0],
    isArray: true,
    fun: helper.extractComments
  },
};


module.exports = { MAPPINGS };
