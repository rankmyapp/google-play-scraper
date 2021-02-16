'use strict';

const INITIAL_MAPPINGS = {
  cluster: ['ds:3', 0, 1, 0, 0, 3, 4, 2],
  apps: ['ds:3', 0, 1],
  token: ['ds:3', 0, 3, 1]
};

const REQUEST_MAPPINGS = {
  token: [0, 3, 1],
  apps: [0, 1]
};

module.exports = {
  INITIAL_MAPPINGS,
  REQUEST_MAPPINGS
};
