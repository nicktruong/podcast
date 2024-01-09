const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    configure: {
      resolve: {
        fallback: {
          crypto: false,
          "crypto-browserify": require.resolve("crypto-browserify"),
        },
      },
    },
  },
};
