import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';

const CookiePolicy = () => {
  return (
    <>
      <Helmet>
        <title>Cookie Policy - MEKROK Mining Equipment</title>
        <meta name="description" content="Cookie Policy for MEKROK Mining Equipment." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        <main className="pt-24 pb-16">
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Cookie Policy</h1>
            <div className="bg-white shadow rounded-xl p-6 md:p-8 space-y-4 text-gray-700 leading-relaxed">
              <p>
                We use cookies and similar technologies to improve your browsing experience, analyze traffic, and personalize content.
              </p>
              <h2 className="text-xl font-semibold text-gray-900 mt-6">What Are Cookies?</h2>
              <p>
                Cookies are small text files placed on your device that help our site function and provide insights into how it is used.
              </p>
              <h2 className="text-xl font-semibold text-gray-900 mt-6">Managing Cookies</h2>
              <p>
                You can control cookies through your browser settings. Disabling cookies may affect site functionality.
              </p>
              <h2 className="text-xl font-semibold text-gray-900 mt-6">Contact</h2>
              <p>
                For questions about this Cookie Policy, contact mekrokeng@gmail.com.
              </p>
              <p className="text-sm text-gray-500 mt-8">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default CookiePolicy;


