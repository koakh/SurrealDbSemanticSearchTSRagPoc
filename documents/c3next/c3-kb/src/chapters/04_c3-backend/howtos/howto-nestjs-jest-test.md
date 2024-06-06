# NestJs Jest Tests

## Introduction

What a typical test flow looks like:

1. Import the function to test
2. Give an input to the function
3. Define what to expect as the output
4. Check if the function produces the expected output

## Installation

To get started, first install the required package:

```shell
# install dependencies
$ npm i --save-dev @nestjs/testing
```

## Create a unit test file

We should respect the following convention **<file_name>.spec.ts**.

> eg: `lan.controller.spec.ts`

The unit test file is generated with this structure

```typescript
import { Test } from '@nestjs/testing';
import { TimeConfigurationController } from './time-configuration.controller';

describe('TimeConfigurationController', () => {
  let timeConfigurationController: TimeConfigurationController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [], // Add
      controllers: [TimeConfigurationController], // Add
      providers: [], // Add
    }).compile();

    timeConfigurationController = moduleRef.get<TimeConfigurationController>(
      TimeConfigurationController
    );
  });

  it('should be defined', () => {
    expect(timeConfigurationController).toBeDefined();
  });
});
```

Before starting, it's necessary to:

- import all necessary external modules;
- add the controller file that we are testing; (only if we are testing the controller class);
- add the services file injected into the controller;

> **NOTE:** To confirm if everything is ok, run the jest file: the test named 'should be defined' should pass.

## Test Structure

structure:

```typescript
describe(' < Method Name >', () => {
  it(' < Test case description > ', () => {});
});
```

Then,

1. Define input
2. Define expected result
3. Check if the function returns the expected result when called

eg.

```typescript
it('should test getHttps function - Successful', async () => {
  const spyGetConfig: Https = { enabled: true };
  const spyProxyList: ProxyList = { list: [], youtubeEnabled: true };
  const result: Https = {
    enabled: true,
    list: {
      list: [],
      youtubeEnabled: true,
    },
  };
  jest
    .spyOn(core, 'getConfig')
    .mockImplementationOnce(async () => spyGetConfig);
  jest.spyOn(proxyListService, 'get').mockImplementationOnce(async () => {
    return Promise.resolve(spyProxyList);
  });
  expect(await service.getHttps()).toEqual(result);
  expect(core.getConfig).toHaveBeenCalledWith(
    BackendConfigsPropertyKeys.HTTPS_CACHE
  );
  expect(proxyListService.get).toHaveBeenCalledWith({
    id: PROXY_LISTS_IDS.noncaching,
  });
});
```

For good testing it's necessary to create a test case for each test condition. In this example:

```typescript
async getHttps(): Promise<Https> {
  const httpsCache: Https = await this.coreService.getConfig(BackendConfigsPropertyKeys.HTTPS_CACHE);

  if (httpsCache.enabled)
    httpsCache.list=await this.proxyListService.get({id: PROXY_LISTS_IDS.noncaching});

  return httpsCache;
}
```

It's necessary to create at least two test cases with http cache flag enabled and disabled.

```typescript
describe('getHttps', () => {
  it('should test getHttps function (Https Cache enabled) - Successful', async () => {
    const spyGetConfig: Https = { enabled: true };
    const spyProxyList: ProxyList = { list: [], youtubeEnabled: true };
    const result: Https = {
      enabled: true,
      list: {
        list: [],
        youtubeEnabled: true
      }
    };
    jest
      .spyOn(core, 'getConfig')
      .mockImplementationOnce(async () => spyGetConfig);
    jest
      .spyOn(proxyListService, 'get')
      .mockImplementationOnce(async () => spyProxyList);
    expect(await service.getHttps()).toEqual(result);
    expect(core.getConfig).toHaveBeenCalledWith(BackendConfigsPropertyKeys.HTTPS_CACHE);
    expect(proxyListService.get).toHaveBeenCalledWith({ id: PROXY_LISTS_IDS.noncaching });
  });

  it('should test getHttps function (Https Cache disable) - Successful', async () => {
    const spyGetConfig: Https = { enabled: false };
    const result: Https = { enabled: false };
    jest
      .spyOn(proxyListService, 'get');
    jest
      .spyOn(core, 'getConfig')
      .mockImplementationOnce(async () => spyGetConfig);
    expect(await service.getHttps()).toEqual(result);
    expect(core.getConfig).toHaveBeenCalledWith(BackendConfigsPropertyKeys.HTTPS_CACHE);
    expect(proxyListService.get).not.toHaveBeenCalled();
  });
});
```

## Test Coverage

Test coverage help us to understand how effective our test cases are. Are we covering whole source or not.

```shell
# Run a coverage
$ jest --coverage
# or
$ npm run test:cov
```

coverage report example:

```shell
# jest --coverage
-----------------------------------------------|----------|----------|----------|----------|-------------------|
File                                           |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
-----------------------------------------------|----------|----------|----------|----------|-------------------|
All files                                      |       80 |    64.15 |    63.64 |    79.52 |                   |
 common/app                                    |      100 |    89.13 |      100 |      100 |                   |
  app-constants.ts                             |      100 |      100 |      100 |      100 |                   |
  env-variables.ts                             |      100 |    89.13 |      100 |      100 |    35,36,37,39,54 |
  express.config.ts                            |      100 |      100 |      100 |      100 |                   |
```

So what is mean of statement, Branches , functions , lines coverages:

- **Function coverage** Has each function (or subroutine) in the program been called?
- **Statement coverage** Has each statement in the program been executed?
- **Branch coverage** Has each branch (also called DD-path) of each control structure (such as in if and case statements) been executed? For example, given an if statement, have both the true and false branches been executed? Another way of saying this is, has every edge in the program been executed?
- **Line coverage** has each executable line in the source file been executed?

## References

- [Documentation | NestJS - A progressive Node.js framework](https://docs.nestjs.com/fundamentals/testing)
- [Testing NestJS with unit tests - wanago.io](https://wanago.io/2020/07/06/api-nestjs-unit-tests/)
