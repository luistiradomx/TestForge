module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.test.ts'],
  moduleNameMapper: {
    '^@testforge/core$': '<rootDir>/../../packages/core/src/index.ts',
    '^@testforge/plugin-sdk$': '<rootDir>/../../packages/plugin-sdk/src/index.ts',
  },
};
