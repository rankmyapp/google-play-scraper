'use strict';

const R = require('ramda');
const constants = require('./lib/constants');
const memoizee = require('memoizee');

const appMethod = require('./lib/app');
const getParseList = require('./lib/utils/parseList');
const parseList = R.partial(getParseList, [appMethod]);

const methods = {
  app: appMethod,
  list: require('./lib/list'),
  search: R.partial(require('./lib/search'), [parseList]),
  suggest: require('./lib/suggest'),
  developer: require('./lib/developer'),
  reviews: require('./lib/reviews'),
  similar: require('./lib/similar'),
  permissions: require('./lib/permissions'),
  categories: require('./lib/categories'),
  featuredApps: require('./lib/featuredApps')
};

function memoized(opts) {
  const cacheOpts = Object.assign(
    {
      primitive: true,
      normalizer: JSON.stringify,
      maxAge: 1000 * 60 * 5, // cache for 5 minutes
      max: 1000 // save up to 1k results to avoid memory issues
    },
    opts
  );

  // need to rebuild the methods so they all share the same memoized appMethod
  const doMemoize = fn => memoizee(fn, cacheOpts);
  const mAppMethod = memoizee(appMethod, cacheOpts);
  const mParseList = R.partial(getParseList, [mAppMethod]);

  const otherMethods = {
    list: require('./lib/list'),
    search: R.partial(require('./lib/search'), [mParseList]),
    suggest: require('./lib/suggest'),
    developer: require('./lib/developer'),
    reviews: require('./lib/reviews'),
    similar: require('./lib/similar'),
    permissions: require('./lib/permissions'),
    categories: require('./lib/categories'),
    featuredApps: require('./lib/featuredApps')
  };

  return Object.assign(
    { app: mAppMethod },
    constants,
    R.map(doMemoize, otherMethods)
  );
}

module.exports = Object.assign({ memoized }, constants, methods);

//const store = Object.assign({ memoized }, constants, methods);

// const init = async () => {
//   const opts = { 
//     category: 'EDUCATION',
//     collection: 'topselling_free',
//     cache: false,
//     fresh: false,
//     num: 500,
//     country: 'br',
//     lang: 'pt-BR' 
//   };

//   const categories = await store.list(opts);

//   const featuredCategories = await store.featuredApps({
//     num: 500,
//     country: 'br',
//     lang: 'pt-BR' 
//   });

//   console.log(categories);
//   console.log(featuredCategories);
// };

// init();