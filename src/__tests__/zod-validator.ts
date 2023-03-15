import middy from "@middy/core";
import { zodValidator } from "../";
import { z } from "zod";
import { Context, Handler } from "aws-lambda";
import createHttpError from "http-errors";

const eventSchema = z.strictObject({
  id: z.string(),
});

type EventSchema = z.infer<typeof eventSchema>;

const schemaParseAsyncSpy = jest.spyOn(eventSchema, "parseAsync");

const response = { statusCode: 200 };
const baseHandler: Handler<EventSchema> = async () => response;
const middyfiedHandler = middy(baseHandler).use(zodValidator(eventSchema));

test("zod-validator should evaluate valid request with schema parseAsync method and resolve", async () => {
  const validEvent: EventSchema = { id: "foo" };

  await expect(
    zodValidator(eventSchema).before({
      event: validEvent,
      context: {} as Context,
      response: {},
      internal: {},
      error: null,
    })
  ).resolves.toStrictEqual(undefined);

  expect(schemaParseAsyncSpy).toBeCalledWith(validEvent);
});

test("zod-validator should evaluate invalid request with schema parseAsync method and reject error", async () => {
  const invalidEvent: EventSchema = { someKey: "someValue" } as EventSchema; // satisfy ts compiler

  await expect(
    zodValidator(eventSchema).before({
      event: invalidEvent,
      context: {} as Context,
      response: {},
      internal: {},
      error: null,
    })
  ).rejects.toBeInstanceOf(createHttpError.BadRequest);

  expect(schemaParseAsyncSpy).toBeCalledWith(invalidEvent);
});

test("middyfied handler should resolve if the schema passes validation", async () => {
  const validEvent = { id: "foo" };

  await expect(
    middyfiedHandler(validEvent, {} as Context)
  ).resolves.toStrictEqual(response);

  expect(schemaParseAsyncSpy).toBeCalledWith(validEvent);
});

test("middyfied handler should reject a Bad Request error if the schema does not pass", async () => {
  const invalidEvent = { someKey: "someValue" };
  await expect(
    middyfiedHandler(invalidEvent as EventSchema, {} as Context)
  ).rejects.toBeInstanceOf(createHttpError.BadRequest);

  expect(schemaParseAsyncSpy).toBeCalledWith(invalidEvent);
});
