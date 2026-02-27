module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.test.ts', '**/*.test.tsx'],
  moduleNameMapper: {
    '^@testforge/core$': '<rootDir>/../core/src/index.ts',
  },
  globals: {
    'ts-jest': {
      tsconfig: {
        jsx: 'react-jsx',
        module: 'CommonJS',
        moduleResolution: 'node',
      },
    },
  },
};
