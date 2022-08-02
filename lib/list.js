'use strict';

const R = require('ramda');
const { category, collection, age, listTypes } = require('./constants');
const scriptData = require('./utils/scriptData');
const { processFullDetailApps } = require('./utils/processPages');
const requestCollectionApps = require('./requesters/requestCollectionApps');
const { requestClusterAppsPage, requestClusterAppsPaginated } = require('./requesters/requestClusterApps');
const { COLLECTION_APPS_MAPPINGS, COLLECTION_APPS_RESPONSE_DATA_MAPPINGS } = require('./mappers/collectionAppsMappings');
const { CLUSTER_APPS_MAPPINGS, CLUSTER_APPS_RESPONSE_DATA_MAPPINGS } = require('./mappers/clusterAppsMappings');

function validate (opts) {
  opts.category = opts.category || category.APPLICATION;
  if (opts.category && !R.contains(opts.category, R.values(category))) {
    throw Error('Invalid category ' + opts.category);
  }

  opts.collection = opts.collection || collection.TOP_FREE;
  if (!R.contains(opts.collection, R.values(collection))) {
    throw Error(`Invalid collection ${opts.collection}`);
  }

  if (opts.age && !R.contains(opts.age, R.values(age))) {
    throw Error(`Invalid age range ${opts.age}`);
  }
}

function getListType(opts) {
  if(opts.clusterUrl) {
    return listTypes.CLUSTER;
  }
  return listTypes.DEFAULT;
}

async function getAllListApps(listResponse, opts, responseDataMappings) {
  const { rawApps: allApps, paginationCode } = scriptData.extractor(responseDataMappings)(listResponse);
  if(paginationCode) {
    const paginatedResponse = await requestClusterAppsPaginated(
      {
        ...opts,
        num: opts.num-allApps.length
      }, 
      paginationCode
    );
    const paginatedResponseParsed = await scriptData.parseBatchResponse(paginatedResponse);
    const { rawApps: paginatedApps } = scriptData.extractor(responseDataMappings)(paginatedResponseParsed);
    allApps.push(...paginatedApps);
  }
  return allApps;
}

function parseClusterUrlResponse(response) {
  const input = scriptData.parse(response);
  return R.path(['ds:3', 0, 1], input);
}

async function parseListApps(listApps, opts, appsMappings) {
  const processedApps = R.map(scriptData.extractor(appsMappings), listApps);
  const apps = opts.fullDetail
    ? await processFullDetailApps(processedApps, opts)
    : processedApps;
  return apps;
}

function getListMethods(listType) {
  switch(listType) {
    case listTypes.CLUSTER:
      return {
        doRequest: requestClusterAppsPage,
        parseResponse: parseClusterUrlResponse,
      };
    default:
      return {
        doRequest: requestCollectionApps,
        parseResponse: scriptData.parseBatchResponse,
      };
  }
}

function getListMappings(listType) {
  switch(listType) {
    case listTypes.CLUSTER:
      return {
        responseDataMappings: CLUSTER_APPS_RESPONSE_DATA_MAPPINGS,
        appsMappings: CLUSTER_APPS_MAPPINGS,
      };
    default:
      return {
        responseDataMappings: COLLECTION_APPS_RESPONSE_DATA_MAPPINGS,
        appsMappings: COLLECTION_APPS_MAPPINGS,
      };
  }
}

function list(opts) {
  return new Promise(function (resolve, reject) {
    validate(opts);

    const fullListOpts = Object.assign({
      lang: 'en',
      country: 'us',
      num: 500
    }, opts);
    const listType = getListType(opts);
    const listMethods = getListMethods(listType);
    const listMappings = getListMappings(listType);

    listMethods.doRequest(fullListOpts)
      .then(listMethods.parseResponse)
      .then(async (parsedResponse) => await getAllListApps(parsedResponse, opts, listMappings.responseDataMappings))
      .then(async (collectionObject) => await parseListApps(collectionObject, opts, listMappings.appsMappings))
      .then(resolve)
      .catch(reject);
  });
}

module.exports = list;
