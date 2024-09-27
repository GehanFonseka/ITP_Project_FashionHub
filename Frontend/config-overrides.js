module.exports = function override(config, env) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      // Add other fallbacks here
    };
    return config;
  };
  