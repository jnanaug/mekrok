import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-white to-accent/5 py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <motion.div className="space-y-8" initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Icon name="Shield" size={16} />
                <span>Verified Equipment Sourcing</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Premium Mining Equipment
                <span className="block text-primary">Ready to Deploy</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                Connect with verified suppliers of heavy mining equipment. From excavators to crushers, find the machinery you need with detailed condition reports and transparent pricing.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/product-listing">
                <Button
                  variant="default"
                  size="lg"
                  iconName="Search"
                  iconPosition="left"
                  iconSize={20}
                  className="w-full sm:w-auto"
                >
                  Browse Equipment Inventory
                </Button>
              </Link>
              
              <Link to="/quote-request-form">
                <Button
                  variant="outline"
                  size="lg"
                  iconName="FileText"
                  iconPosition="left"
                  iconSize={20}
                  className="w-full sm:w-auto"
                >
                  Request Custom Quote
                </Button>
              </Link>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <motion.div className="text-center" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Equipment Units</div>
              </motion.div>
              <motion.div className="text-center" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Verified Suppliers</div>
              </motion.div>
              <motion.div className="text-center" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Support Available</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div className="relative" initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg"
                alt="Heavy mining excavator at construction site"
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              
              {/* Overlay Card */}
              <motion.div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">CAT 320D Excavator</h3>
                    <p className="text-sm text-muted-foreground">2019 • 2,450 Hours • Excellent</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">$185,000</div>
                    <div className="text-xs text-success">Available Now</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Floating Elements */}
            <motion.div className="absolute -top-4 -right-4 w-20 h-20 bg-accent rounded-full flex items-center justify-center shadow-lg" animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 4 }}>
              <Icon name="Award" size={32} color="white" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;