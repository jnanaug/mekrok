import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - MEKROK Mining Equipment</title>
        <meta name="description" content="Terms of Service for MEKROK Mining Equipment." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        <main className="pt-24 pb-16">
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Terms of Service</h1>
            <div className="bg-white shadow rounded-xl p-6 md:p-8 space-y-4 text-gray-700 leading-relaxed">
              <p>
                By accessing or using our website and services, you agree to these Terms of Service. If you do not agree, please do not use the site.
              </p>
              <h2 className="text-xl font-semibold text-gray-900 mt-6">Use of Services</h2>
              <p>
                You agree to use our services in compliance with applicable laws and not to misuse or interfere with the integrity and performance of our services.
              </p>
              <h2 className="text-xl font-semibold text-gray-900 mt-6">Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, MEKROK is not liable for any indirect, incidental, special, or consequential damages.
              </p>
              <h2 className="text-xl font-semibold text-gray-900 mt-6">Contact</h2>
              <p>
                Questions about these Terms can be sent to mekrokeng@gmail.com.
              </p>
              <p className="text-sm text-gray-500 mt-8">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default TermsOfService;


