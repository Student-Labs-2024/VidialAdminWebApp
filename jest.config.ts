module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
    '^routes/(.*)$': '<rootDir>/src/routes/$1',
    '^stores/(.*)$': '<rootDir>/src/stores/$1',
    '^theme/(.*)$': '<rootDir>/src/theme/$1',
    '^forms/(.*)$': '<rootDir>/src/forms/$1',
    '^types/(.*)$': '<rootDir>/src/types/$1',
    '^layouts/(.*)$': '<rootDir>/src/layouts/$1',
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^api/(.*)$': '<rootDir>/src/api/$1',
  },
};
