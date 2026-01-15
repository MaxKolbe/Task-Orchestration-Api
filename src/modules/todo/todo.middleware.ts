import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

// Validate Todos To Be Created
export const vttbc = (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;

    const schema = Joi.object({
      uid: Joi.number(),
      task: Joi.string().required(),
      isDone: Joi.boolean(),
    });

    const { error } = schema.validate(payload);

    if (!error) {
      next();
    } else {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid payload',
        error: error.details,
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: error,
    });
  }
};

// Validate Todos To Be Updated
export const vttbu = (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;

    const schema = Joi.object({
      uid: Joi.number(),
      task: Joi.string(),
      isDone: Joi.boolean(),
    }).min(1);

    const { error } = schema.validate(payload);

    if (!error) {
      next();
    } else {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid payload',
        error: error.details,
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: error,
    });
  }
};
