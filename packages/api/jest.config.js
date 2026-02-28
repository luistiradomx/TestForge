module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.test.ts'],
  moduleNameMapper: {
    '^@testforge/core$': '<rootDir>/../core/src/index.ts',
    '^@testforge/execution-engine$': '<rootDir>/../execution-engine/src/index.ts',
    '^@testforge/locator-engine$': '<rootDir>/../locator-engine/src/index.ts',
    '^@testforge/plugin-sdk$': '<rootDir>/../plugin-sdk/src/index.ts',
    '^@testforge/tia$': '<rootDir>/../tia/src/index.ts',
    '^@testforge/trace-viewer$': '<rootDir>/../trace-viewer/src/index.ts',
    '^@testforge/visual-regression$': '<rootDir>/../visual-regression/src/index.ts',
  },
};
