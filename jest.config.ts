/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: false,

  // The directory where Jest should output its coverage files
  // coverageDirectory: 'coverage',

  // Indicates which provider should be used to instrument code for coverage
  // coverageProvider: 'v8',

  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/__mocks__/fileMock.ts',
    '\\.(css|s[ca]ss|less)$': '<rootDir>/src/__mocks__/styleMock.ts',
    'swiper/css': '<rootDir>/src/__mocks__/styleMock.ts',
  },
  roots: ['<rootDir>/src'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
  testPathIgnorePatterns: ['__tests__/test-utils.tsx'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.app.json' }],
  },
  resetMocks: false,
  setupFiles: ['jest-localstorage-mock'],
  collectCoverageFrom: ['src/**'],
  coveragePathIgnorePatterns: [
    'node_modules',
    './src/__mocks__',
    './src/__tests__',
  ],
};

export default config;
