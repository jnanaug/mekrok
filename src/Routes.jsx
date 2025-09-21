import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ProductDetails from './pages/product-details';
import ProductListing from './pages/product-listing';
import QuoteRequestForm from './pages/quote-request-form';
import Homepage from './pages/homepage';
import ContactSales from './pages/contact-sales';
import PrivacyPolicy from './pages/privacy-policy';
import TermsOfService from './pages/terms-of-service';
import CookiePolicy from './pages/cookie-policy';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <AnimatePresence mode="wait">
          <RouterRoutes>
            <Route path="/" element={<Homepage />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/product-listing" element={<ProductListing />} />
            <Route path="/product-details" element={<ProductDetails />} />
            <Route path="/contact-sales" element={<ContactSales />} />
            <Route path="/quote-request-form" element={<QuoteRequestForm />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </AnimatePresence>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;