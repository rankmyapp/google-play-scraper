'use strict';

const R = require('ramda');
const scriptData = require('./scriptData');

const MAPPINGS = {
  title: [0, 1],
  subTitle: [0, 6],
  link: [0, 3, 4, 2]  
};

/*
 * Apply MAPPINGS for each application in list from root path
*/

function extract (root, data) {
  const input = R.path(root, data);
  if (input === undefined) return [];
  return R.map(scriptData.extractor(MAPPINGS), input);
}

module.exports = { MAPPINGS, extract };
