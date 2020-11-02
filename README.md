# Zod Validator

Validator middleware for the middy framework. It is similar to the `@middy/validator` package but with support for the awesome `zod` validation library.

<hr>

This middleware automatically validates incomming events using a given `zod` schema. It is specially useful for Serverless projects using Typescript. 💪

If an incoming event fails validation a `Bad Request` error is raised.

This middleware can be used in combination with `httpErrorHandler` to automatically return the right response to the user.

## Install

To install this middleware you can run:

```
npm i --save middy-zod-validator
```

## Options

- `schema`: (zod schema) (optional): The `zod` schema that will be used to parse the input (`handler.event`) of the Lambda handler. **It can be either a syncronous or an asyncronous schema**

## Sample usage

Example for input validation:

```typescript
import middy from '@middy/core';
import { zodValidator } from 'middy-zod-validator';

const handler = middy((event, context, cb) => {
  cb(null, {});
});

const schema = z.object({
  body: z.string() // this will pass validation
  foo: z.string() // this won't as it won't be in the event
})

handler.use(
  zodValidator(schema)
);

// invokes the handler, note that property foo is missing
const event = {
  body: JSON.stringify({ something: 'somethingelse' }),
};

handler(event, {}, (err, res) => {
  // err will be a ZodError
});
```

## Contributing

Everyone is welcome to contribute to this repository. Feel free to raise issues or submit Pull Requests.
