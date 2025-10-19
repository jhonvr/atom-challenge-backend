import { RequestHandler } from 'express';
import { ZodSchema } from 'zod';

type Loc = 'body' | 'query' | 'params';

export const validate =
  (schema: ZodSchema, loc: Loc = 'body'): RequestHandler =>
  (req, res, next) => {
    const data = (req as any)[loc];
    const result = schema.safeParse(data);

    if (!result.success) {
      res.status(400).json({
        type: 'https://http.dev/errors/validation',
        title: 'Invalid request',
        status: 400,
        errors: result.error.issues,
      });
      return;
    }

    (req as any)[loc] = result.data;
    return next();
  };
