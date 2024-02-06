const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.join(process.cwd(), "src"),
    },
  },
};
