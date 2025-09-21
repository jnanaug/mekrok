import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import TrustIndicators from './components/TrustIndicators';
import FeaturedInventory from './components/FeaturedInventory';
import HowItWorks from './components/HowItWorks';
import AdvancedSearch from './components/AdvancedSearch';
import RecentDeals from './components/RecentDeals';
import AboutSection from './components/AboutSection';

const Homepage = () => {
  return (
    <>
      <Helmet>
        <title>MekRok - Premium Mining Equipment Marketplace | Heavy Machinery for Mining Operations</title>
        <meta 
          name="description" 
          content="Discover verified mining equipment from trusted suppliers. Browse excavators, bulldozers, loaders, and more with detailed condition reports and transparent pricing. Get quotes instantly." 
        />
        <meta 
          name="keywords" 
          content="mining equipment, heavy machinery, excavators, bulldozers, mining supplies, equipment marketplace, verified suppliers" 
        />
        <meta property="og:title" content="MekRok - Premium Mining Equipment Marketplace" />
        <meta 
          property="og:description" 
          content="Connect with verified suppliers of heavy mining equipment. Find excavators, crushers, and more with detailed condition reports and competitive pricing." 
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mekrok.com/homepage" />
        <meta property="og:image" content="https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg" />
        <link rel="canonical" href="https://mekrok.com/homepage" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "MekRok Mining Equipment",
            "description": "Premium mining equipment marketplace connecting buyers with verified suppliers worldwide",
            "url": "https://mekrok.com",
            "logo": "https://mekrok.com/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-800-MEKROK",
              "contactType": "sales"
            },
            "sameAs": [
              "https://linkedin.com/company/mekrok",
              "https://twitter.com/mekrok"
            ]
          })}
        </script>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <HeroSection />
          <TrustIndicators />
          <FeaturedInventory />
          <HowItWorks />
          <AdvancedSearch />
          <RecentDeals />
          <AboutSection />
        </main>

        {/* Footer */}
        <footer className="bg-foreground text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Link to="/" className="flex items-center">
                    <img
                      src="/assets/mekrok-logo.jpg"
                      alt="MekRok Logo"
                      className="h-10 w-auto rounded-lg opacity-70 hover:opacity-100 transition-all duration-300 mix-blend-lighten filter brightness-90 contrast-110 blur-[0.6px]"
                      style={{ WebkitMaskImage: 'radial-gradient(ellipse at center, black 78%, transparent 100%)', maskImage: 'radial-gradient(ellipse at center, black 78%, transparent 100%)' }}
                    />
                  </Link>
                  <div>
                    <div className="text-xl font-bold">MekRok</div>
                    <div className="text-sm text-gray-400">Mining Equipment</div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Your trusted partner for premium mining equipment sourcing. Connecting buyers with verified suppliers worldwide since 2013.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <span className="sr-only">LinkedIn</span>
                    <div className="w-6 h-6 bg-gray-600 rounded"></div>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <span className="sr-only">Twitter</span>
                    <div className="w-6 h-6 bg-gray-600 rounded"></div>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/product-listing" className="text-gray-300 hover:text-white transition-colors">Browse Equipment</a></li>
                  <li><a href="/quote-request-form" className="text-gray-300 hover:text-white transition-colors">Request Quote</a></li>
                  <li><a href="/homepage#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</a></li>
                </ul>
              </div>

              {/* Equipment Categories */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Equipment</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/product-listing?category=excavators" className="text-gray-300 hover:text-white transition-colors">Excavators</a></li>
                  <li><a href="/product-listing?category=bulldozers" className="text-gray-300 hover:text-white transition-colors">Bulldozers</a></li>
                  <li><a href="/product-listing?category=loaders" className="text-gray-300 hover:text-white transition-colors">Loaders</a></li>
                  <li><a href="/product-listing?category=crushers" className="text-gray-300 hover:text-white transition-colors">Crushers</a></li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>+91 96638 72029</li>
                  <li>mekrokeng@gmail.com</li>
                  <li>24/7 Customer Support</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © {new Date()?.getFullYear()} MekRok Mining Equipment. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link to="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
                <Link to="/terms-of-service" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link>
                <Link to="/cookie-policy" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Homepage;