import middy from '@middy/core';
import { zodValidator } from '../middy-zod-validator';
import * as z from 'zod';
import { Context } from 'aws-lambda';

test('should return an error if the schema does not pass', async () => {
  const schema = z.object({
    id: z.string(),
  });

  const handler = middy(() => Promise.resolve('ok'));
  handler.use(zodValidator(schema));

  handler({}, {} as Context, (error) => {
    console.log(error);
    expect(error).toBeInstanceOf(Error);
  });
});
