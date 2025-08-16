'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TestPaymentsPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const createTestPayment = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          phone: '+79991234567',
          items: [
            {
              variantId: 'test-variant-id', // This will fail in real scenario
              quantity: 1,
            },
          ],
          locale: 'ru',
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create payment');
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (process.env.NODE_ENV === 'production') {
    return <div>Not available in production</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-dlc-bg">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Test Payments</h1>
        
        <div className="glass p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">YooKassa Test Mode</h2>
          <p className="text-dlc-text-secondary mb-4">
            This page helps test the YooKassa integration. Make sure you have:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-dlc-text-secondary mb-6">
            <li>Set up YooKassa credentials in .env.local</li>
            <li>Enabled test mode in YooKassa merchant cabinet</li>
            <li>Seeded the database with products</li>
          </ul>

          <Button
            onClick={createTestPayment}
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating Test Payment...
              </>
            ) : (
              'Create 1 RUB Test Payment'
            )}
          </Button>
        </div>

        {error && (
          <div className="glass p-4 rounded-lg border-red-500/20 bg-red-500/10 mb-6">
            <p className="text-red-500">Error: {error}</p>
          </div>
        )}

        {result && (
          <div className="glass p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Payment Created</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Order ID:</strong> {result.orderId}</p>
              <p><strong>Payment ID:</strong> {result.paymentId}</p>
              {result.confirmationUrl && (
                <div>
                  <p className="mb-2"><strong>Confirmation URL:</strong></p>
                  <a
                    href={result.confirmationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-dlc-silver hover:underline break-all"
                  >
                    {result.confirmationUrl}
                  </a>
                  <Button
                    className="w-full mt-4"
                    onClick={() => window.open(result.confirmationUrl, '_blank')}
                  >
                    Go to Payment Page
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-8 glass p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Test Card Numbers</h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-medium">Success:</p>
              <code className="text-dlc-silver">5555 5555 5555 4444</code>
            </div>
            <div>
              <p className="font-medium">3D Secure:</p>
              <code className="text-dlc-silver">5555 5555 5555 4477</code>
            </div>
            <div>
              <p className="font-medium">Decline:</p>
              <code className="text-dlc-silver">5555 5555 5555 4446</code>
            </div>
          </div>
          <p className="text-xs text-dlc-text-secondary mt-4">
            Use any future expiry date and any 3-digit CVV
          </p>
        </div>
      </div>
    </div>
  );
}
