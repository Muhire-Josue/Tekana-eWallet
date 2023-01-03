module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.ts'],
  coveragePathIgnorePatterns: [
    'node_modules',
    'coverage',
    'src/server.ts',
    'src/app.ts',
    'src/models/index.ts',
    'src/middlewares/joiErrors.ts',
    'src/middlewares/asyncHandler.ts',
    'src/constants',
  ],
  verbose: true,
  coverageThreshold: {
    global: {
      functions: 0,
      lines: 0,
      statements: -5000,
    },
  },
  moduleFileExtensions: ['ts', 'js', 'tsx', 'json'],
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(test).ts?(x)'],
  transform: {
    '\\.(js|jsx|ts|tsx)$': 'ts-jest',
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
};
