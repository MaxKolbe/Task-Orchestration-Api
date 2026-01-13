import { Response } from 'express';

const responseHandler = (res: Response, status: number, message: string, data: unknown = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export default responseHandler;
