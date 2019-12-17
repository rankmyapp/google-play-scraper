'use strict';

const { assert } = require('chai');
const gplay = require('../index');
const { assertValidApp } = require('./common');

describe('Featured Categories & Apps', () => {
  const assertFeaturedCategory = (category) => {
    assert.isString(category.title);
    assert.isString(category.link);
    if(category.subTitle) assert.isString(category.subTitle);
  };

  let featuredCategories = [];

  it('should return a list of featured categories', async () => {    
    const opts = {
      country: 'br',
      lang: 'pt-BR',
      num: 100
    };
    featuredCategories = await gplay.featuredCategories(opts);
    featuredCategories.map(assertFeaturedCategory);
  });

  it('should return a list of featured apps by a featured category', async () => {    
    const { link } = featuredCategories[0];
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
