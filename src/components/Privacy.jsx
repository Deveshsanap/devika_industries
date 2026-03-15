import React from 'react';

const Privacy = () => {
  return (
    <div className="container mx-auto px-4 py-16 font-sans text-gray-700">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
      <p className="mb-4 text-sm text-gray-500">Last Updated: February 2026</p>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-2">1. Information We Collect</h2>
          <p>We collect information you provide directly to us, such as when you fill out a contact form, request a quote, or make a purchase. This includes your name, email address, phone number, and company details.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-2">2. How We Use Your Information</h2>
          <p>We use the information we collect to communicate with you, process your orders, and provide customer support. We do not sell your personal data to third parties.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-2">3. Cookies</h2>
          <p>We use cookies to improve your experience on our website. You can control cookies through your browser settings.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-2">4. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at info@devikaindustries.com.</p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
