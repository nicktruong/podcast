// eslint-disable-next-line no-undef, @typescript-eslint/no-var-requires
const path = require("path");

// eslint-disable-next-line no-undef
module.exports = {
  process(sourceText, sourcePath, _options) {
    return {
      code: `module.exports = ${JSON.stringify(path.basename(sourcePath))};`,
    };
  },
};
