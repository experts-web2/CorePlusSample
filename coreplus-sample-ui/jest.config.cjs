module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx,css}'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  "moduleNameMapper": {
    "\\.(s?css|less|css)$": "identity-obj-proxy"
  },
  resolver: undefined,
}