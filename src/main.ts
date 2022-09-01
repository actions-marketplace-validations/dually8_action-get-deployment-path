import * as core from "@actions/core";
import { Inputs } from "./constants";
import { setOutputs } from "./set-outputs";

async function run() {
  try {
    const envName = core.getInput(Inputs.EnvironmentName);
    const devPath = core.getInput(Inputs.DevPath, { required: true });
    const prodPath = core.getInput(Inputs.ProdPath, { required: true });
    const stagingPath = core.getInput(Inputs.StagingPath, { required: true });
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
