import { FullConfig, TestError } from '@playwright/test';
import { Suite } from '@playwright/test/reporter';

import TeamcityReporter from './teamcity.reporter';

beforeAll(() => {
  jest.spyOn(global.console, 'error');
  jest.spyOn(global.console, 'log');
});

describe(`TeamcityReporter`, () => {
  test(`should log test error to console on error`, () => {
    const error: TestError = { message: 'SomeError message' };

    new TeamcityReporter().onError(error);
    expect(global.console.error)
      .toBeCalledWith(error);
  });

  test(`should store suite on run begin`, () => {
    const config: FullConfig = {
      forbidOnly: false,
      globalSetup: null,
      globalTeardown: null,
      globalTimeout: 0,
      grep: [],
      grepInvert: null,
      maxFailures: 0,
      preserveOutput: "never",
      projects: [],
      reporter: [],
      reportSlowTests: null,
      rootDir: "MOCK_PATH",
      quiet: false,
      shard: null,
      updateSnapshots: "none",
      version: "MOCK_VERSION",
      workers: 4,
      webServer: null
    };
    const suite: Suite = {
      location: undefined,
      parent: undefined,
      suites: [],
      tests: [],
      title: '',
      titlePath: jest.fn(),
      allTests: jest.fn(),
      project: jest.fn()
    };

    const reporter = new TeamcityReporter();
    reporter.onBegin(config, suite);

    expect(reporter).toMatchObject({
      flowId: expect.any(String),
      suite,
    });
  });

  test('log configuration to console on run begin', () => {
    const config: FullConfig = {
      forbidOnly: false,
      globalSetup: null,
      globalTeardown: null,
      globalTimeout: 0,
      grep: [],
      grepInvert: null,
      maxFailures: 0,
      preserveOutput: "never",
      projects: [],
      reporter: [],
      reportSlowTests: null,
      rootDir: "MOCK_PATH",
      quiet: false,
      shard: null,
      updateSnapshots: "none",
      version: "MOCK_VERSION",
      workers: 4,
      webServer: null
    };
    const suite: Suite = {
      location: undefined,
      parent: undefined,
      suites: [],
      tests: [],
      title: '',
      titlePath: jest.fn(),
      allTests: jest.fn(),
      project: jest.fn()
    };

    const reporter = new TeamcityReporter();
    reporter.onBegin(config, suite);

    expect(console.log).toHaveBeenCalledWith(`'${JSON.stringify(config)}'`);
  });

});
