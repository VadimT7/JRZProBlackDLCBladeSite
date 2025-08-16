import { v4 as uuidv4 } from 'uuid';

const YOOKASSA_API_URL = 'https://api.yookassa.ru/v3';

interface CreatePaymentParams {
  amount: {
    value: string;
    currency: string;
  };
  capture: boolean;
  description: string;
  metadata?: Record<string, any>;
  confirmation: {
    type: 'redirect';
    return_url: string;
  };
  receipt?: {
    customer: {
      email?: string;
      phone?: string;
    };
    items: Array<{
      description: string;
      quantity: string;
      amount: {
        value: string;
        currency: string;
      };
      vat_code: number;
    }>;
  };
}

interface PaymentResponse {
  id: string;
  status: string;
  paid: boolean;
  amount: {
    value: string;
    currency: string;
  };
  confirmation?: {
    type: string;
    confirmation_url?: string;
  };
  created_at: string;
  metadata?: Record<string, any>;
}

class YooKassaClient {
  private shopId: string;
  private secretKey: string;

  constructor(shopId: string, secretKey: string) {
    this.shopId = shopId;
    this.secretKey = secretKey;
  }

  private getAuthHeader(): string {
    return `Basic ${Buffer.from(`${this.shopId}:${this.secretKey}`).toString('base64')}`;
  }

  async createPayment(params: CreatePaymentParams, idempotenceKey?: string): Promise<PaymentResponse> {
    const key = idempotenceKey || uuidv4();
    
    const response = await fetch(`${YOOKASSA_API_URL}/payments`, {
      method: 'POST',
      headers: {
        'Authorization': this.getAuthHeader(),
        'Idempotence-Key': key,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`YooKassa API Error: ${error.description || 'Unknown error'}`);
    }

    return response.json();
  }

  async getPayment(paymentId: string): Promise<PaymentResponse> {
    const response = await fetch(`${YOOKASSA_API_URL}/payments/${paymentId}`, {
      method: 'GET',
      headers: {
        'Authorization': this.getAuthHeader(),
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`YooKassa API Error: ${error.description || 'Unknown error'}`);
    }

    return response.json();
  }
}

// Export singleton instance
export const yookassa = new YooKassaClient(
  process.env.YKS_SHOP_ID || '',
  process.env.YKS_SECRET_KEY || ''
);

// Helper functions
export function formatAmountForYooKassa(amount: number): string {
  return amount.toFixed(2);
}

export function shouldSendReceipt(): boolean {
  return process.env.YKS_SEND_RECEIPT === 'true';
}
