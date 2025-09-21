import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustIndicators = () => {
  const indicators = [
    {
      icon: "Shield",
      title: "Verified Suppliers",
      description: "All equipment suppliers undergo rigorous verification process"
    },
    {
      icon: "Truck",
      title: "Global Logistics",
      description: "Worldwide shipping and delivery coordination services"
    },
    {
      icon: "FileCheck",
      title: "Condition Reports",
      description: "Detailed inspection reports with high-resolution imagery"
    },
    {
      icon: "Clock",
      title: "24/7 Support",
      description: "Round-the-clock customer service and technical assistance"
    },
    {
      icon: "DollarSign",
      title: "Transparent Pricing",
      description: "No hidden fees, competitive rates with clear breakdowns"
    },
    {
      icon: "Users",
      title: "Industry Experts",
      description: "Mining equipment specialists with decades of experience"
    }
  ];

  return (
    <section className="bg-muted/30 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Why Mining Companies Trust MekRok
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We've built our reputation on reliability, transparency, and delivering exceptional value to mining operations worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {indicators?.map((indicator, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-card hover:shadow-lg transition-all duration-300 border border-border"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={indicator?.icon} size={24} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {indicator?.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {indicator?.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certification Badges */}
        <div className="mt-16 pt-12 border-t border-border">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Certified & Compliant
            </h3>
            <p className="text-muted-foreground">
              Meeting international standards for equipment trading and logistics
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-border">
              <Icon name="Award" size={20} className="text-primary" />
              <span className="text-sm font-medium text-foreground">ISO 9001</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-border">
              <Icon name="Shield" size={20} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Safety Certified</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-border">
              <Icon name="Globe" size={20} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Global Trade</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-border">
              <Icon name="CheckCircle" size={20} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Verified Partner</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;