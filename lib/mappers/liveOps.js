'use strict';

// TODO: check how access event object!
const EVENT_DETAIL_MAPPINGS = {
  title: ['11', 0, '15', 0, '79', 0, '2', 0, '1', 4, '6'],
  description: ['11', 0, '15', 0, '79', 0, '2', 0, '1', 9, '12'],
  image: ['11', 0, '15', 0, '79', 0, '2', 1, '2', 1, '5'],
  start: ['11', 0, '15', 0, '79', 0, '2', 0, '1', 2, '4', 0, '1'],
  end: ['11', 0, '15', 0, '79', 0, '2', 0, '1', 3, '5', 0, '1'],
};

const RAW_DATA_MAPPING = {
  rootLiveOps: [0, '1', 0, '1', 0, '2', 0, '11'],
  liveOpsData: ['11']
};

module.exports = {
  EVENT_DETAIL_MAPPINGS,
  RAW_DATA_MAPPING
};
