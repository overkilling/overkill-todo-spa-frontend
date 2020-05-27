module.exports = {
  roots: ['./src'],
  setupFilesAfterEnv: ['./src/setupTests.ts'],
  testMatch: ['<rootDir>/**/*.{spec,test}.{js,jsx,ts,tsx}'],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy'
  }
}
