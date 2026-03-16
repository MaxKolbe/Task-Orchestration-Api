export interface Paymentschema {
  email: string;
  amount: number;
  callback_url: string;
  metadata?: Paymentmetadata;
  reference?: string;
}

export interface Paymentmetadata {
  name?: string;
  phoneNumber?: number;
  comment?: string;
}

export interface initializationDataSchema {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export interface VerificationDataSchema {
  status: boolean;
  message: string;
  data?: {
    id: number;
    domain: string;
    status: string;
    reference: string;
    receipt_number: null;
    amount: number;
    message: null | string;
    gateway_response: string;
    paid_at: string;
    created_at: string;
    channel: string;
    currency: string;
    ip_address: string;
    metadata: Paymentmetadata;
    log: {
      start_time: number;
      time_spent: number;
      attempts: number;
      errors: number;
      success: boolean;
      mobile: boolean;
      input: [];
      history: { type: string; message: string; time: number }[];
    };
    fees: number;
    fees_split: null;
    authorization: {
      authorization_code: string;
      bin: string;
      last4: string;
      exp_month: string;
      exp_year: string;
      channel: string;
      card_type: string;
      bank: string;
      country_code: string;
      brand: string;
      reusable: boolean;
      signature: string;
      account_name: string | null;
      receiver_bank_account_number: string | null;
      receiver_bank: string | null;
    };
    customer: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      customer_code: string;
      phone: string;
      metadata: unknown | null;
      risk_action: string;
      international_format_phone: null;
    };
    plan: unknown | null;
    split: unknown;
    order_id: unknown | null;
    paidAt: string;
    createdAt: string;
    requested_amount: number;
    pos_transaction_data: unknown | null;
    source: unknown | null;
    fees_breakdown: unknown | null;
    connect: unknown | null;
    transaction_date: string;
    plan_object: unknown;
    subaccount: unknown;
  };
}
