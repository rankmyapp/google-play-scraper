'use strict';

const { assert } = require('chai');
const gplay = require('../index');
// const { assertValidApp } = require('./common');

describe('Home Categories & Apps', () => {
  const assertHomeCategory = (category) => {
    assert.isString(category.title);
    assert.isString(category.link);
    if (category.subTitle) assert.isString(category.subTitle);
  };

  let homeCategories = [];

  it('should return a list of home categories', async () => {
    const opts = {
      country: 'us',
      lang: 'en-us'
    };
    homeCategories = await gplay.homeCategories(opts);
    homeCategories.map(assertHomeCategory);
  });

  // it('should return a list of featured apps by a featured category', async () => {
  //   const { link } = featuredCategories[0];
  //   const opts = {
  //     country: 'br',
  //     lang: 'pt-BR',
  //     num: 100,
  //     clusterUrl: link
  //   };
  //   const response = await gplay.list(opts);
  //   response.map(assertValidApp);
  // });
});
