'use strict';

const CATEGORIES_MAPPINGS = {
  title: [21, 1, 0],
  subTitle: [21, 1, 1],
  link: [21, 1, 2, 4, 2],
}

const RESPONSE_DATA_MAPPINGS = {
  rawCategories: [0, 1],
  paginationCode: [0, 3, 1]
}

module.exports = {
  CATEGORIES_MAPPINGS,
  RESPONSE_DATA_MAPPINGS
};
