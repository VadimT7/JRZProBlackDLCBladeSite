import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Payment Terms | JRZ Pro Black DLC',
};

export default function PaymentTermsPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto prose prose-invert">
          <h1 className="text-4xl font-cormorant font-bold mb-8">Payment Terms</h1>
          
          <section className="mb-8">
            <h2>1. Accepted Payment Methods</h2>
            <p>We accept the following payment methods through YooKassa:</p>
            <ul>
              <li>Bank cards (Visa, Mastercard, Mir)</li>
              <li>SberPay</li>
              <li>Mir Pay</li>
              <li>FPS (Faster Payment System / СБП)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>2. Payment Security</h2>
            <p>All payments are processed securely through YooKassa, a certified payment service provider. We do not store your payment card details.</p>
          </section>

          <section className="mb-8">
            <h2>3. Pricing</h2>
            <p>All prices are displayed in Russian Rubles (RUB) and include VAT. Prices are subject to change without notice, but orders already placed will not be affected.</p>
          </section>

          <section className="mb-8">
            <h2>4. Payment Process</h2>
            <ol>
              <li>Add items to your cart</li>
              <li>Proceed to checkout</li>
              <li>Enter your contact information</li>
              <li>You will be redirected to YooKassa secure payment page</li>
              <li>Complete payment using your preferred method</li>
              <li>Return to our site for order confirmation</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2>5. Failed Payments</h2>
            <p>If your payment fails, you can try again or contact our support team for assistance.</p>
          </section>

          <section className="mb-8">
            <h2>6. Refunds</h2>
            <p>Refunds are processed according to our Return Policy. Refunds will be issued to the original payment method within 5-10 business days.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
