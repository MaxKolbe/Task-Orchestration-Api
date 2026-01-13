import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.log(`Internal Server Error: ${err.stack} \n`);
  res.status(500).json({ status: 500, message: 'There was an error', error: err.message });
};

export default errorHandler;
