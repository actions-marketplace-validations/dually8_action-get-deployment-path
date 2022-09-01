import * as core from "@actions/core";
import { Inputs } from "./constants";
import { setOutputs } from "./set-outputs";

async function run() {
  try {
    const devPath = core.getInput(Inputs.DevPath);
    const envName = core.getInput(Inputs.EnvironmentName);
    const prodPath = core.getInput(Inputs.ProdPath);
    const stagingPath = core.getInput(Inputs.StagingPath);
    setOutputs({
      devPath,
      envName,
      prodPath,
      stagingPath,
    });
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  }
}

run();
