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
        token: "ya29.a0AfB_byBEKO4UbO9EnkONktsnPV3TJpv0OvRyHfSRC3pKEr58xTYfH5KRbvgLlljAoR-nLSnAFXNSMGX0Gz7tVuqk5zRHimsG9BOTr16UpjslbSP9iHWu8ldVQ-5OEmtv7QQJqJQGkWUcO3VXpLLZYmhd3SlXk65oPUp0GbKUVMeyToZsiJkaWU_GpGu9puqw6PiFkqcjF1-J3sCC7cmqfZdc1jtfMRigNhWN77MrfV0TIYoFlzuaIeQDWhgR3DiRjE0l1VybNwe6H8KJVA_yoSDwwRkg6p3STHv1sfM8U20iieFMzPDlQh7oqpqx-Utm72j9GgaCgYKAYcSAQ8SFQHGX2Mic4GR9jmKUXbqi4-GKGfsyw0333",
        deviceId: "32C428D6BE1DB6A2"
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
