import * as core from "@actions/core";
import { Outputs } from "./constants";

type SetOutputArgs = {
  devPath: string;
  envName: string;
  prodPath: string;
  stagingPath: string;
};
export function setOutputs({
  devPath, envName, prodPath, stagingPath,
}: SetOutputArgs) {
  switch (envName) {
    case "main":
    case "master":
    case "production":
    case "prod":
    case "prd":
      core.info(`Set output to prod: ${prodPath}`);
      core.setOutput(Outputs.DeploymentPath, prodPath);
      break;
    case "staging":
    case "acceptance":
    case "acc":
    case "stage":
      core.info(`Set output to staging: ${stagingPath}`);
      core.setOutput(Outputs.DeploymentPath, stagingPath);
      break;
    default:
      core.info(`Set output to dev: ${devPath}`);
      core.setOutput(Outputs.DeploymentPath, devPath);
      break;
  }
}
