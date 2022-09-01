import * as core from '@actions/core';
import { Outputs } from '../src/constants';
import { setOutputs } from '../src/set-outputs';

let setOutputSpy: jest.SpyInstance;

const testArgs = {
  devPath: 'path/to/dev',
  envName: 'dev',
  prodPath: 'path/to/prod',
  stagingPath: 'path/to/staging'
}

describe('Test deployment path', () => {
  beforeEach(() => {
    setOutputSpy = jest.spyOn(core, 'setOutput');
    setOutputSpy.mockImplementation(() => undefined);
  })

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  })

  it('should output dev path', async () => {
    setOutputs(testArgs);

    expect(setOutputSpy).toBeCalledWith(
      Outputs.DeploymentPath,
      testArgs.devPath,
    );
  });

  it('should output staging path', async () => {
    setOutputs({
      ...testArgs,
      envName: 'staging',
    });

    expect(setOutputSpy).toBeCalledWith(
      Outputs.DeploymentPath,
      testArgs.stagingPath,
    );
  });

  it('should output production path', async () => {
    setOutputs({
      ...testArgs,
      envName: 'main',
    });

    expect(setOutputSpy).toBeCalledWith(
      Outputs.DeploymentPath,
      testArgs.prodPath,
    );
  });

});
