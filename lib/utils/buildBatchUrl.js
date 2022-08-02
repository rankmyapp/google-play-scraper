'use strict';

const qs = require('querystring');

function buildBatchUrl (opts) {
  const queryString = {
    hl: opts.lang,
    gl: opts.country
  };

  if (opts.age) {
    queryString.age = opts.age;
  }
  const url = `https://play.google.com/_/PlayStoreUi/data/batchexecute?source-path=%2Fstore%2Fapps&f.sid=-4178618388443751758&bl=boq_playuiserver_20220612.08_p0&authuser=0&soc-app=121&soc-platform=1&soc-device=1&_reqid=82003&rt=c`;

  const fullURL = `${url}&${qs.stringify(queryString)}`;

  return fullURL;
}

module.exports = buildBatchUrl;
