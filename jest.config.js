module.exports = {
  testMatch: [
    '<rootDir>/test/**/*.(test|spect).js',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
  ],
  collectCoverage: false,
  // coverageDirectory: '<rootDir>/.coverage/',
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/*.{config,setup}.js',
    '!**/node_modules/**',
    '!**/*.test.js',
    '!dist/*',
    '!coverage/**',
  ],

};
