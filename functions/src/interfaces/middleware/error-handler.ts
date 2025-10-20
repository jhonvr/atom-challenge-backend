import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, req: Request, res: Response, _next: NextFunction) {
  console.error('[ERR]', {
    method: req.method,
    url: req.originalUrl,
    body: req.body,
    query: req.query,
    params: req.params,
    code: err?.code,
    message: err?.message,
    stack: err?.stack,
  });

  const code = String(err?.code ?? '').toUpperCase();
  const msg  = String(err?.message ?? '').toUpperCase();

  if (code === '5' || code.includes('NOT_FOUND') || msg.includes('NOT_FOUND')) {
    return res.status(404).json({ type: 'about:blank', title: 'Not Found', status: 404, detail: err?.message ?? 'Resource not found' });
  }

  if (code.includes('PERMISSION_DENIED')) {
    return res.status(403).json({ type: 'about:blank', title: 'Forbidden', status: 403, detail: 'Permission denied' });
  }

  return res.status(500).json({ type: 'about:blank', title: 'Internal Server Error', status: 500, detail: err?.message ?? 'Unexpected error' });
}
