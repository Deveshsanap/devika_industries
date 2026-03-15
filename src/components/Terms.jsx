import React from 'react';

const Terms = () => {
  return (
    <div className="container mx-auto px-4 py-16 font-sans text-gray-700">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms & Conditions</h1>
      <p className="mb-4 text-sm text-gray-500">Last Updated: February 2026</p>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-2">1. Introduction</h2>
          <p>Welcome to Devika Industries. By accessing our website, you agree to be bound by these Terms and Conditions.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-2">2. Intellectual Property</h2>
          <p>All content on this website, including text, graphics, logos, and images, is the property of Devika Industries Inc. and is protected by copyright laws.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-2">3. Limitation of Liability</h2>
          <p>Devika Industries shall not be held liable for any indirect, incidental, or consequential damages arising from the use of our products or website.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-2">4. Governing Law</h2>
          <p>These terms shall be governed by and construed in accordance with the laws of India. Any disputes are subject to the jurisdiction of the courts in Rajkot, Gujarat.</p>
        </section>
      </div>
    </div>
  );
};

export default Terms;