'use strict';

const { assert } = require('chai');
const gplay = require('../index');
const { assertValidApp } = require('./common');

describe('Home Categories & Apps', () => {
  const assertFeaturedCategory = (category) => {
    assert.isString(category.title);
    assert.isString(category.link);
    if (category.subTitle) assert.isString(category.subTitle);
  };

  let homeCategories = [];

  it('should return a list of home categories', async () => {
    const opts = {
      country: 'br',
      lang: 'pt-BR',
      num: 100
    };
    homeCategories = await gplay.homeCategories(opts);
    homeCategories.map(assertFeaturedCategory);
  });

  it('should return a list of apps by a home category', async () => {
    const { link } = homeCategories[0];
    const opts = {
      country: 'br',
      lang: 'pt-BR',
      num: 100,
      clusterUrl: link
    };
    const response = await gplay.list(opts);
    response.map(assertValidApp);
  });
});
