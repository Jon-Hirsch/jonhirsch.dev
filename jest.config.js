module.exports = {
  testEnvironment: `jsdom`,
  setupFilesAfterEnv: ["<rootDir>/test/test-utils/setup.js"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/test/test-utils/file-mock.js",
    "\\.(css|scss)$": "<rootDir>/test/test-utils/style-mock.js",
  },
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/components/**/*.(js|jsx)"],
  coverageReporters: ["lcov"],
};
