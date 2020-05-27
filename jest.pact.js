module.exports = {
  roots: ['./src'],
  setupFilesAfterEnv: ['./src/setupTests.ts'],
  testMatch: ['<rootDir>/**/*.pact.{js,jsx,ts,tsx}'],
  testTimeout: 10000
}
