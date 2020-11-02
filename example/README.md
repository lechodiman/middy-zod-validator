# AWS NodeJs Typescript Base

Base template for Serverless Projects. It comes with `serverless-bundle`, `serverless-psudo-params` and `Typescript` support.

### How is this different from the aws-nodejs-typescript template?

- This template comes with webpacks defaults provided by `serverless-bundle`.
- The default configuration is a `serverless.yml` file as opposed to a `serverless.ts`. This allows to use other `serverless.yml` as a starting point or as a reference more easily.

## Usage

To use this template, run:

```bash
sls create --path my-service --template-url https://github.com/lechodiman/aws-nodejs-ts-base
```

This will create a new project with name `my-service` and the structure and packages provided by this template.
