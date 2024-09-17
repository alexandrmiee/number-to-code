import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  maxWorkers: 1,
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "..",
  testEnvironment: "node",
  modulePaths: ["<rootDir>"],
  modulePathIgnorePatterns: ["<rootDir>/dist"],
  testRegex: "\\.spec.ts$",
  transform: {
    "^.+\\.(t)s$": "ts-jest",
  },
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
  },
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
  resetMocks: true,
  restoreMocks: true,
  clearMocks: true,
  verbose: true,
};
export default config;
