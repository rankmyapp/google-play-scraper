const R = require('ramda');
const { RAW_DATA_MAPPING, EVENT_DETAIL_MAPPINGS } = require('../mappers/liveOps');
const scriptData = require('./scriptData');

const isLiveOpsObj = (obj) => obj && R.path(RAW_DATA_MAPPING.liveOpsData, obj);

const getLiveOpsRaw = (dataFromResponse) => {
  const rawData = R.path(RAW_DATA_MAPPING.rootLiveOps, dataFromResponse);
  if (!rawData) {
    return [];
  }
  const liveOpsRawData = rawData.filter(isLiveOpsObj);
  return liveOpsRawData;
};

const parseLiveOpsList = (opts) => (liveOpsRawList) => {
  const data = R.map(scriptData.extractor(EVENT_DETAIL_MAPPINGS), liveOpsRawList);
  if (!data) {
    return [];
  }
  const liveOps = data
    .filter((obj) => Object.values(obj).reduce((acc, value) => acc && !!value, true))
    .map(obj => {
      const { start, end } = obj;
      return {
        ...obj,
        start: new Date(start * 1000),
        end: new Date(end * 1000)
      };
    });

  return {
    appId: opts.appId,
    lang: opts.lang,
    events: liveOps,
  }
};

module.exports = { getLiveOpsRaw, parseLiveOpsList };