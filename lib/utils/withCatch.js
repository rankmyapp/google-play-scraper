const withCatch = (fn, defaultValue) => (args) => {
  if (!defaultValue) {
    defaultValue = [];
  }

  try {
    if (fn) return fn.apply(this, args);
    return defaultValue;
  } catch (err) {
    return defaultValue;
  }
};

module.exports = {
  withCatch,
};
