import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | JRZ Pro Black DLC',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto prose prose-invert">
          <h1 className="text-4xl font-cormorant font-bold mb-8">Privacy Policy</h1>
          
          <p className="text-dlc-text-secondary mb-8">Last updated: January 2024</p>

          <section className="mb-8">
            <h2>1. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as:</p>
            <ul>
              <li>Name and contact information (email, phone number)</li>
              <li>Billing and shipping addresses</li>
              <li>Payment information (processed by YooKassa)</li>
              <li>Order history and preferences</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Process and fulfill your orders</li>
              <li>Send order confirmations and updates</li>
              <li>Respond to your requests and questions</li>
              <li>Improve our products and services</li>
              <li>Send marketing communications (with your consent)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>3. Information Sharing</h2>
            <p>We do not sell, trade, or rent your personal information. We may share your information with:</p>
            <ul>
              <li>Payment processor (YooKassa) for transaction processing</li>
              <li>Shipping partners for order delivery</li>
              <li>Service providers who assist in our operations</li>
              <li>Law enforcement when required by law</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>4. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
          </section>

          <section className="mb-8">
            <h2>5. Cookies</h2>
            <p>We use cookies and similar technologies to:</p>
            <ul>
              <li>Remember your preferences</li>
              <li>Understand how you use our site</li>
              <li>Improve your experience</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>7. Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us:</p>
            <ul>
              <li>Email: privacy@jrzpro.ru</li>
              <li>Phone: +7 (999) 123-45-67</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
