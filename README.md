# Get Deployment Path GitHub Action

This action takes an environment name and paths to various environments to give you a single deployment path.

## Problem

> I need to use GitHub actions to build and deploy my site, but I don't want to write 9001 conditionals in order to determine the path I need to deploy to based on my current environment.


> I could just duplicate workflows and/or steps to point to different environments, but then I'd be violating the DRY principle.

## Solution

You can use this to simply this process instead of having to use so many conditionals.

## Usage

```yaml
- name: Get Deployment Path
  id: get-deployment-path
  uses: dually8/action-get-deployment-path@v1
  with:
    # Optional: defaults to 'dev'
    # A good idea is to pass in ${{ github.ref_name }} to get the environment you want
    environment-name: 'dev'
    # Required: Input the development deployment path
    dev-path: 'path/to/dev'
    # Required: Input the staging deployment path
    staging-path: 'path/to/staging'
    # Required: Input the production deployment path
    prod-path: 'path/to/production'
```

then later

```yaml
- uses: actions/download-artifact@v3
  with:
    name: my-artifact
    # Notice the `get-deployment-path` is the `id` of our Get Deployment Path action
    path: ${{ steps.get-deployment-path.outputs.deployment-path }}

## or if your build comes from a different workflow
- name: Publish site to dev
  id: download-artifact
  uses: dawidd6/action-download-artifact@v2
  with:
    github_token: ${{secrets.GITHUB_TOKEN}}
    workflow: build.yml
    workflow_conclusion: success
    name: my-artifact
    # Notice the `get-deployment-path` is the `id` of our Get Deployment Path action
    path: ${{ steps.get-deployment-path.outputs.deployment-path }}
    check_artifacts: true
```
