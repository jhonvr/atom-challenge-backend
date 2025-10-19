import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const status = (err?.status as number) || 500;
  const payload = {
    type: 'about:blank',
    title: 'Internal Server Error',
    status,
    detail: err?.message ?? 'Unexpected error',
  };
  res.status(status).json(payload);
};
