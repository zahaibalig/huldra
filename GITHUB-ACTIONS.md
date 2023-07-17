# Huldra Github Actions Workflow

## General Information

Currently, the github repository `huldra-internal` have three workflows in github actions, a continuous integration and continuous delivery (CI/CD) platform.

## Workflows

### Lint on Push/PR

**Triggers on:** Push to all branches except dev and main, PR to dev and main.

This workflow lints the codebase and logs the errors or warnings. If any error exixts, the work flow will fail, and a cross mark will appear on the PR/commit. In case of failure, please resolve the errors and push again.

### Build

**Triggers on:** Push to dev and main.

This workflow builds runs `npm run build` and created a build of the application to ensure that the latest push to dev/main is working so that it can be deployed successfully. The application will only be deployed to the current hosting platform 'Heroku' on successful completion of this workflow.

### Build Docker Image

**Triggers on:** Successful completion of **`Build`** workflow

The workflow builds a docker image of the application and pushed into dockerhub in a private repository.
