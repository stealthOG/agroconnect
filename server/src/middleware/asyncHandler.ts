import type { Request, Response, NextFunction, RequestHandler } from 'express';
import { captureException } from '../lib/sentry';

type AsyncFn = (req: Request, res: Response, next: NextFunction) => Promise<void>;

/* Wraps an async route handler so thrown errors are forwarded to Express's
   error handler instead of causing unhandled promise rejections. */
export function asyncHandler(fn: AsyncFn): RequestHandler {
  return (req, res, next) => {
    fn(req, res, next).catch(err => {
      captureException(err, { path: req.path, method: req.method });
      next(err);
    });
  };
}
