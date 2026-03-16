import { createFetchClient } from '@zayne-labs/callapi';
import { Paymentschema, initializationDataSchema, VerificationDataSchema } from '../../types/payment.js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
});

const callPaystackApi = createFetchClient({
  throwOnError: true,
  baseURL: process.env.PAYMENT_BASEURL!,
  auth: {
    type: 'Bearer',
    value: process.env.TEST_PAYSTACK_KEY,
  },
});

export const initializeTransaction = async (prop: Paymentschema) => {
  const { data } = await callPaystackApi<initializationDataSchema>('/transaction/initialize', {
    body: JSON.stringify(prop),
    method: 'POST',
  });

  return data;
};

export const verifyTransaction = async (reference: string) => {
  const { data } = await callPaystackApi<VerificationDataSchema>(`/transaction/verify/${reference}`, {
    method: 'GET',
  });

  return data
};
