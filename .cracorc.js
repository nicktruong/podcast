const path = require("path");

const dotenv = require("dotenv");
const webpack = require("webpack");

let result = dotenv.config({ path: path.join(process.cwd(), "./.env") });

if (result.error) {
  result.parsed = {};
}

const envKeys = Object.keys(result.parsed).reduce((prev, next) => {
  // first we search for each key inside of .env.local, because of precedence
  prev[`process.env.${next.trim()}`] = JSON.stringify(
    result.parsed[next].trim()
  );

  return prev;
}, {});

module.exports = {
  webpack: {
    alias: {
      "@": path.join(process.cwd(), "src"),
    },
    plugins: [new webpack.DefinePlugin(envKeys)],
  },
};
