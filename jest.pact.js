const commonConfig = require('./jest.config')

module.exports = Object.assign({}, commonConfig, {
  testMatch: ['<rootDir>/**/*.pact.{js,jsx,ts,tsx}']
})
