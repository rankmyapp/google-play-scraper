const cheerio = require("cheerio");
const R = require("ramda");
const debug = require("debug")("google-play-scraper:mappers:details");

function descriptionText(description) {
  // preserve the line breaks when converting to text
  const html = cheerio.load(
    "<div>" + description.replace(/<br>/g, "\r\n") + "</div>"
  );
  return html("div").text();
}

function priceText(priceText) {
  return priceText || "Free";
}

function normalizeAndroidVersion(androidVersionText) {
  if (!androidVersionText) return "VARY";

  const number = androidVersionText.split(" ")[0];
  if (parseFloat(number)) {
    return number;
  }

  return "VARY";
}

function buildHistogram(container) {
  if (!container) {
    return { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  }

  return {
    1: container[1][1],
    2: container[2][1],
    3: container[3][1],
    4: container[4][1],
    5: container[5][1],
  };
}

/**
 * Extract the comments from google play script array
 * @param {array} comments The comments array
 */
function extractComments(comments) {
  if (!comments) return [];
  debug("comments: %O", comments);
  return comments.map(R.path([4])).slice(0, 5);
}

/**
 * Extract the the events from google play script array
 * @param {array} events The events array
 */
function extractEvents(events) {
  if (!events) return [];

  debug("events: %O", events);

  const [root, items] = [
    [
      [1, 0],
      [1, 0],
    ],
    [[2], [0, 13], [3, 3], [4]],
  ];

  function extractData(data, paths) {
    return paths.reduce(
      (acc, path) => R.reject(R.isNil)(R.path(path)(acc)),
      data
    );
  }

  function extractEventData(event) {
    const [title, description, imageUrl, label] = items.map((item) => {
      const value = extractData(event, [item]);
      return (Array.isArray(value) ? value : [value]).join("");
    });
    return { title, imageUrl, description, label };
  }

  events = extractData(events, root);
  events = events.map(R.reject(R.isNil));
  return events.map(extractEventData);
}

function extractFeatures(featuresArray) {
  if (featuresArray === null) {
    return [];
  }

  const features = featuresArray[2] || [];

  return features.map((feature) => ({
    title: feature[0],
    description: R.path([1, 0, 0, 1], feature),
  }));
}

module.exports = {
  descriptionText,
  extractEvents,
  priceText,
  normalizeAndroidVersion,
  buildHistogram,
  extractComments,
  extractFeatures,
};
