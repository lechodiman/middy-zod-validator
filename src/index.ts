import { MiddlewareObj } from "@middy/core";
import createHttpError from "http-errors";
import { ZodSchema } from "zod";

export const zodValidator = <T>(
  schema: ZodSchema<T>
): Required<Pick<MiddlewareObj<any, any>, "before">> => ({
  before: async (request) => {
    if (!schema) return;

    try {
      await schema.parseAsync(request.event);
    } catch (error) {
      throw new createHttpError.BadRequest(error as string);
    }
  },
});
