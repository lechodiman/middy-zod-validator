import { APIGatewayProxyHandler } from 'aws-lambda';
import middy from '@middy/core';
import { zodValidator } from 'middy-zod-validator';
import * as z from 'zod';

const schema = z.object({
  body: z.object({
    id: z.string(),
  }),
});

const hello: APIGatewayProxyHandler = async (event, _context) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message:
          'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };
};

export const handler = middy(hello).use(zodValidator(schema));
