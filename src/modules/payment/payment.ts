import express from 'express';
import { Request, Response } from 'express';
import fetch from 'node-fetch';

const paymentRouter = express.Router();

paymentRouter.post('/', async (req: Request, res: Response) => {
  const email = req.body.email;
  const amount = req.body.amount * 100;
  const callback_url = 'http://localhost:3000/v1/donate/success';
  // const reference = randomStringFuntion()
   

  const response = await fetch('https://api.paystack.co/transaction/initialize', {
    port: 443,
    method: 'POST',
    body: JSON.stringify({ email, amount, callback_url }),
    headers: {
      Authorization: `Bearer ${process.env.TEST_PAYSTACK_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  res.json({ message: 'suceess', data });
});

paymentRouter.get('/success', async (req: Request, res: Response) => {
  const reference = req.query.reference?.toString();

  const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    port: 443,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.TEST_PAYSTACK_KEY}`,
    },
  });

  const data: any = await response.json();

  if (data.data.status === 'success') {
    return res.json({ status: data.data.status, message: 'Donation made!' });
  } else if (data.data.status === 'failed') {
    return res.json({ status: data.data.status, message: 'Donation Failed try again later!' });
  } else {
    return res.json({ status: data.data.status, message: `Donation hanging with status: ${data.data.status}` });
  }
});

export default paymentRouter;
