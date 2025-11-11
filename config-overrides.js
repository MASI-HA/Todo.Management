const webpack = require("webpack");

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    url: require.resolve("url/"),
    zlib: require.resolve("browserify-zlib"),
    stream: require.resolve("stream-browserify"),
    assert: require.resolve("assert/"),
    util: require.resolve("util/"),
    buffer: require.resolve("buffer/"),
    // Explicitly point to the JS file to avoid ESM fully-specified resolution issues
    process: require.resolve("process/browser.js"),
  });
  config.resolve.fallback = fallback;
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      // Also provide the exact JS file
      process: require.resolve("process/browser.js"),
      Buffer: ["buffer", "Buffer"],
    }),
  ]);
  return config;
};
