/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  rootDir:         '.',
  testMatch:       ['<rootDir>/src/__tests__/**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.test.json' }],
  },
  moduleNameMapper: { '^(\\.{1,2}/.*)\\.js$': '$1' },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/__tests__/**',
    '!src/generated/**',
    '!src/index.ts',
  ],
  coverageThreshold: {
    global: { lines: 60, functions: 60 },
  },
};
