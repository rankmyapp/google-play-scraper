const R = require('ramda');

const scriptData = require('./scriptData');
const { INITIAL_MAPPING } = require('../mappers/featuredApps');

function extract (data) {
  return R.map(scriptData.extractor(INITIAL_MAPPING), data);
}

module.exports = { extract };
