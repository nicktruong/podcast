/** @type {import('jest').Config} */

const config = {
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/__mocks__/fileMock.js",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  coveragePathIgnorePatterns: [
    "<rootDir>/src/HOCs",
    "<rootDir>/src/hooks",
    "<rootDir>/src/assets",
    "<rootDir>/src/common",
    "<rootDir>/src/config",
    "<rootDir>/src/guards",
    "<rootDir>/src/layouts",
    "<rootDir>/src/firebase",
    "<rootDir>/src/constants",
    "<rootDir>/src/containers",
    "<rootDir>/src/components/SideBar",
    "<rootDir>/src/components/Steppers",
    "<rootDir>/src/components/ChangeLanguageButton",
  ],
  testEnvironment: "jsdom",
  preset: "ts-jest",
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",

  // moduleNameMapper: {
  //   "^image![a-zA-Z0-9$_-]+$": "GlobalImageStub",
  //   "^[./a-zA-Z0-9$_-]+\\.png$": "<rootDir>/RelativeImageStub.js",
  //   "module_name_(.*)": "<rootDir>/substituted_module_$1.js",
  //   "assets/(.*)": [
  //     "<rootDir>/images/$1",
  //     "<rootDir>/photos/$1",
  //     "<rootDir>/recipes/$1",
  //   ],
  // },
};

// eslint-disable-next-line no-undef
module.exports = config;
