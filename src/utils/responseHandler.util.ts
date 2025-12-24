import { Response } from 'express';

const responseHandler = (res: Response, status: number, message: string, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export default responseHandler;
