import { Request, Response, NextFunction } from 'express';

export const requireUserCode = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.headers['code'] as string;
  if (!userId) {
    return res.status(400).json({ message: 'userId (Code header) is required' });
  }
  res.locals.userId = userId;
  return next();
};