module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    globals: {
      TextDecoder: require('util').TextDecoder,
    },
    moduleNameMapper: {
      '\\.css$': '<rootDir>/__mocks/styleMock.js'
    },
  };