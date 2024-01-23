'use strict';

const { requestLiveOps } = require('./requesters/requestLiveOps');
const { getLiveOpsRaw, parseLiveOpsList } = require('./utils/liveOpsUtils');

function liveOps(opts) {
  return new Promise(function(resolve, reject) {
    if (!opts || !opts.appId) {
      throw Error('appId missing');
    }

    if(!opts.auth || !opts.auth.token || !opts.auth.deviceId) {
      throw Error('auth data missing');
    }

    opts.lang = opts.lang || 'en-US';
    requestLiveOps(opts)
      .then(getLiveOpsRaw)
      .then(parseLiveOpsList(opts))
      .then(resolve)
      .catch(reject);
  });
}

module.exports = liveOps;
