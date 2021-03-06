import path from 'path';

module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  preset: 'ts-jest',
  testEnvironment: './prisma-test-environment.ts',
  testRegex: '.e2e-spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};
