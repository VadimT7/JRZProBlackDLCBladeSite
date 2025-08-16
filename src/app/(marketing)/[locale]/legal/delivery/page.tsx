import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Delivery Terms | JRZ Pro Black DLC',
};

export default function DeliveryTermsPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto prose prose-invert">
          <h1 className="text-4xl font-cormorant font-bold mb-8">Delivery Terms</h1>
          
          <section className="mb-8">
            <h2>1. Delivery Areas</h2>
            <p>We deliver throughout the Russian Federation. International shipping is not currently available.</p>
          </section>

          <section className="mb-8">
            <h2>2. Delivery Methods</h2>
            <h3>Standard Delivery (Free)</h3>
            <ul>
              <li>Delivery time: 5-7 business days</li>
              <li>Available for all orders</li>
              <li>Tracking provided</li>
            </ul>
            
            <h3>Express Delivery</h3>
            <ul>
              <li>Delivery time: 2-3 business days</li>
              <li>Additional fee applies</li>
              <li>Available for major cities</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>3. Processing Time</h2>
            <p>Orders are processed within 1-2 business days after payment confirmation. You will receive a tracking number once your order ships.</p>
          </section>

          <section className="mb-8">
            <h2>4. Delivery Partners</h2>
            <p>We work with reliable delivery services including:</p>
            <ul>
              <li>Russian Post</li>
              <li>CDEK</li>
              <li>DPD</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>5. Tracking Your Order</h2>
            <p>Once your order ships, you will receive an email with tracking information. You can track your package on the carrier&apos;s website.</p>
          </section>

          <section className="mb-8">
            <h2>6. Delivery Issues</h2>
            <p>If you experience any issues with delivery, please contact our support team immediately. We will work with the carrier to resolve any problems.</p>
          </section>

          <section className="mb-8">
            <h2>7. Signature Requirements</h2>
            <p>All orders may require a signature upon delivery. Please ensure someone is available to receive the package.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
