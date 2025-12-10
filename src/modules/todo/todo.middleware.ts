import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export const validateTodos = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const payload = req.body;

    const schema = Joi.object({
      uid: Joi.number(),
      task: Joi.string().required(),
      isDone: Joi.boolean(),
    });

    const { value, error } = schema.validate(payload);
    console.log("Here's he value", value)
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
