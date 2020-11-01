import middy from '@middy/core';
import createHttpError from 'http-errors';
import { ZodSchema } from 'zod';

export function zodValidator(
  schema?: ZodSchema<any, any>
): middy.MiddlewareObject<any, any> {
  return {
    before: async (handler, next) => {
      if (!schema) {
        return next();
      }

      try {
        await schema.parseAsync(handler.event);
      } catch (error) {
        throw new createHttpError.UnprocessableEntity(error);
      }

      return next();
    },
  };
}
