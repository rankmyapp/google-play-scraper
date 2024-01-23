'use strict';

const { assert, expect } = require('chai');
const nock = require('nock');
const gplay = require('../index');

describe('Live Ops Data', () => {

  const assertLiveOps = (category) => {
    assert.isString(category.appId);
    assert.isString(category.lang);
    assert.isString(category.title);
    assert.isString(category.description);
    assert.isString(category.image);
    expect(category.start).to.be.an('date');
    expect(category.end).to.be.an('date');
  };

  it('should return a list of live ops events data', async () => {
    const opts = {
      appId: "com.nianticlabs.pokemongo",
      lang: "es-MX",
      auth: {
        token: "ya29.token",
        deviceId: "12391231293812931"
      }
    };
    nock(`https://play-fe.googleapis.com`)
      .get(`/fdfe/apps/detailsLiveOpsStream?doc=${opts.appId}`)
      .replyWithFile(200, __dirname + '/mocks/live-ops.response.mock', {
        'Content-Enccoding': 'gzip',
        'Content-Type': 'application/protobuf'
      });

    const liveOpsData = await gplay.liveOps(opts);
    liveOpsData.map(assertLiveOps);
  });
});
