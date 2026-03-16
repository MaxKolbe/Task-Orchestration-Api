import { initializeTransaction, verifyTransaction } from './payment.api.js';
import { Request, Response, NextFunction } from 'express';
import responseHandler from '../../utils/responseHandler.util.js';

export const initializationController = async (req: Request, res: Response, next: NextFunction) => {
  const { email, amount, redirectUrl, name, phoneNumber, comment } = req.body;
  // const reference = randomStringFuntion()

  try {
    const transactionResult = await initializeTransaction({
      email,
      amount: amount * 100,
      callback_url: redirectUrl,
      metadata: { name, phoneNumber, comment },
      // reference
    });

    return responseHandler(res, 200, 'Transaction initialized successfully', transactionResult);
  } catch (err) {
    next(err);
  }
};

export const verificationController = async (req: Request, res: Response, next: NextFunction) => {
  const reference = req.query.reference?.toString();

  try {
    const verificationResult = await verifyTransaction(reference!);

    if (!verificationResult.status) {
      return responseHandler( 
        res,
        400,
        `Transaction verification failed. Reason: ${verificationResult.message}`,
        verificationResult,
      );
    }

    if(verificationResult.data && verificationResult.data.status !== "success") {
        return responseHandler(res, 200, verificationResult.data.status, verificationResult)
    }

    return responseHandler(res, 200, 'Transaction verified successfully', verificationResult);
  } catch (err) {
    next(err);
  }
};
