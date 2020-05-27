module.exports = {
  roots: ['./src'],
  setupFilesAfterEnv: ['./src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy'
  },
  testTimeout: 10000
}
