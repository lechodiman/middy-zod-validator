import middy from '@middy/core';
import { zodValidator } from '../';
import * as z from 'zod';
import { Context } from 'aws-lambda';
import createHttpError from 'http-errors';

test('should return a Bad Request error if the schema does not pass', async () => {
  const schema = z.object({
    id: z.string(),
  });

  const handler = middy(() => Promise.resolve('ok'));
  handler.use(zodValidator(schema));

  handler({}, {} as Context, (error) => {
    expect(error).toBeInstanceOf(createHttpError.BadRequest);
  });
});
