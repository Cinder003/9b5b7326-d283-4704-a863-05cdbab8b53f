import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { logger } from '../utils/logger';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err);

  if (err instanceof ZodError) {
    return res.status(400).json({
      message: 'Validation error',
      errors: err.errors.map(e => ({ path: e.path, message: e.message })),
    });
  }

  // Handle other specific errors here if needed

  res.status(500).json({ message: 'An unexpected error occurred' });
};