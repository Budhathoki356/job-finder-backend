import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';
/**
 * Middleware to validate request body against a Zod schema.
 * @param schema - Zod schema to validate against.
 * @returns Middleware function that validates the request body.
 */
export const validate = (schema: ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        message: 'Validation failed',
        errors: result.error.issues,
      });
    }
    req.body = result.data; 
    next();
  };
};