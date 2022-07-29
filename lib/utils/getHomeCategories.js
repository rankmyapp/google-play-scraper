'use strict';

const R = require('ramda');
const requestHomeCategoriesResponse = require('../requesters/requestHomeCategories');
const { REQUEST_DELAY } = require('../constants');
const { CATEGORIES_MAPPINGS, RESPONSE_DATA_MAPPINGS } = require('../mappers/homeCategories');
const scriptData = require('./scriptData');
const delay = require('./delay');

const extractResponseData = scriptData.extractor(RESPONSE_DATA_MAPPINGS);
const removeEmptyValues = (object) => !Object.values(object).every((value) => !value);

function extractCategoriesData(rawCategories) {
  if (!rawCategories) {
    return [];
  }
  return R.map(scriptData.extractor(CATEGORIES_MAPPINGS), rawCategories)
    .filter(removeEmptyValues);
}

async function getHomeCategoriesPaginated(opts, paginationCode = null, totalCategories = []) {
  const rawCategoriesResponse = await requestHomeCategoriesResponse(opts, paginationCode);
  const parsedCategoriesResponse = scriptData.parseBatchResponse(rawCategoriesResponse);
  const {
    paginationCode: newPaginationCode, 
    rawCategories 
  } = extractResponseData(parsedCategoriesResponse);
  const categories = extractCategoriesData(rawCategories);
  totalCategories.push(...categories);
  if (newPaginationCode) {
    await delay(REQUEST_DELAY);
    return getHomeCategoriesPaginated(opts, newPaginationCode, totalCategories);
  }
  return totalCategories;
}

function getHomeCategories(opts) {
  return getHomeCategoriesPaginated(opts);
}

module.exports = getHomeCategories;
