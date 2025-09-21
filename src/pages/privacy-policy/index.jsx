import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - MEKROK Mining Equipment</title>
        <meta name="description" content="Privacy Policy for MEKROK Mining Equipment." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        <main className="pt-24 pb-16">
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
            <div className="bg-white shadow rounded-xl p-6 md:p-8 space-y-4 text-gray-700 leading-relaxed">
              <p>
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services. If you do not agree with the terms of this policy, please do not access the site.
              </p>
              <h2 className="text-xl font-semibold text-gray-900 mt-6">Information We Collect</h2>
              <p>
                We may collect personal information such as your name, email, phone number, company details, and any other information you provide when contacting us or requesting quotes.
              </p>
              <h2 className="text-xl font-semibold text-gray-900 mt-6">How We Use Information</h2>
              <p>
                We use the information to provide and improve services, respond to inquiries, process requests, and communicate updates.
              </p>
              <h2 className="text-xl font-semibold text-gray-900 mt-6">Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, contact us at mekrokeng@gmail.com.
              </p>
              <p className="text-sm text-gray-500 mt-8">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default PrivacyPolicy;


