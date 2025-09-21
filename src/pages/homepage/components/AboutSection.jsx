import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AboutSection = () => {
  const vettingProcess = [
    {
      step: 1,
      title: "Supplier Verification",
      description: "Comprehensive background checks, business registration verification, and financial stability assessment.",
      icon: "Shield"
    },
    {
      step: 2,
      title: "Equipment Inspection",
      description: "Professional on-site inspections with detailed condition reports and high-resolution photography.",
      icon: "Search"
    },
    {
      step: 3,
      title: "Documentation Review",
      description: "Verification of ownership, maintenance records, and compliance with safety standards.",
      icon: "FileCheck"
    },
    {
      step: 4,
      title: "Quality Assurance",
      description: "Final quality checks and certification before equipment is listed on our platform.",
      icon: "Award"
    }
  ];

  const logisticsPartners = [
    {
      name: "Global Heavy Transport",
      specialization: "Oversized Equipment",
      coverage: "Worldwide",
      logo: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg"
    },
    {
      name: "Mining Logistics Pro",
      specialization: "Mining Equipment",
      coverage: "North America",
      logo: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
    },
    {
      name: "International Freight Solutions",
      specialization: "Cross-border Shipping",
      coverage: "Global",
      logo: "https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg"
    }
  ];

  const certifications = [
    { name: "ISO 9001:2015", description: "Quality Management" },
    { name: "ISO 14001", description: "Environmental Management" },
    { name: "OHSAS 18001", description: "Occupational Health & Safety" },
    { name: "Global Trade Certified", description: "International Commerce" }
  ];

  const clientLogos = [
    "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg",
    "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
    "https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg",
    "https://images.pexels.com/photos/3184294/pexels-photo-3184294.jpeg",
    "https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg",
    "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg"
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="Building" size={16} />
            <span>About MekRok</span>
          </div>
          
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Your Trusted Mining Equipment Partner
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            With over a decade of experience in mining equipment sourcing, we've built the industry's most comprehensive platform for connecting buyers with verified suppliers worldwide.
          </p>
        </div>

        {/* Company Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-foreground">
              Revolutionizing Mining Equipment Procurement
            </h3>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Founded in 2013, MekRok has transformed how mining companies source heavy equipment. Our platform combines cutting-edge technology with deep industry expertise to deliver unmatched transparency, efficiency, and reliability.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-muted/30 rounded-xl">
                <div className="text-3xl font-bold text-primary mb-1">500+</div>
                <div className="text-sm text-muted-foreground">Equipment Units Listed</div>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-xl">
                <div className="text-3xl font-bold text-primary mb-1">50+</div>
                <div className="text-sm text-muted-foreground">Verified Suppliers</div>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-xl">
                <div className="text-3xl font-bold text-primary mb-1">$2.5B+</div>
                <div className="text-sm text-muted-foreground">Equipment Value Traded</div>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-xl">
                <div className="text-3xl font-bold text-primary mb-1">98%</div>
                <div className="text-sm text-muted-foreground">Customer Satisfaction</div>
              </div>
            </div>

            <Link to="/quote-request-form">
              <Button
                variant="default"
                size="lg"
                iconName="ArrowRight"
                iconPosition="right"
                iconSize={16}
              >
                Start Your Project
              </Button>
            </Link>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg"
                alt="MekRok team inspecting mining equipment"
                className="w-full h-96 object-cover"
              />
            </div>
            
            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-lg border border-border">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="TrendingUp" size={24} className="text-success" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">10+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Supplier Vetting Process */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Our Rigorous Supplier Vetting Process
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Every supplier and piece of equipment on our platform undergoes a comprehensive verification process to ensure quality, authenticity, and reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {vettingProcess?.map((step, index) => (
              <div key={step?.step} className="relative">
                <div className="bg-white rounded-xl p-6 shadow-card border border-border hover:shadow-lg transition-all duration-300">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon name={step?.icon} size={28} className="text-primary" />
                    </div>
                    
                    <div className="text-sm font-medium text-primary mb-2">
                      Step {step?.step}
                    </div>
                    
                    <h4 className="text-lg font-semibold text-foreground mb-3">
                      {step?.title}
                    </h4>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step?.description}
                    </p>
                  </div>
                </div>

                {/* Connecting Arrow */}
                {index < vettingProcess?.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <Icon name="ArrowRight" size={20} className="text-border" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Logistics Partners */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Trusted Logistics Partners
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We work with industry-leading logistics companies to ensure safe, timely, and cost-effective delivery of your equipment worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {logisticsPartners?.map((partner, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-card border border-border hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-border">
                    <Image
                      src={partner?.logo}
                      alt={`${partner?.name} logo`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-foreground">
                      {partner?.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {partner?.specialization}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Globe" size={14} />
                  <span>{partner?.coverage}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Certifications & Compliance
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our commitment to excellence is validated by international certifications and industry standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications?.map((cert, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-card border border-border text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon name="Award" size={24} className="text-accent" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  {cert?.name}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {cert?.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Client Logos */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-foreground mb-8">
            Trusted by Leading Mining Companies
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center opacity-60">
            {clientLogos?.map((logo, index) => (
              <div
                key={index}
                className="w-20 h-20 mx-auto rounded-lg overflow-hidden border border-border grayscale hover:grayscale-0 transition-all duration-300"
              >
                <Image
                  src={logo}
                  alt={`Client ${index + 1} logo`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;