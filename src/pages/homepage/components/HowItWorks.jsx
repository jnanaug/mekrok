import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HowItWorks = () => {
  const steps = [
    {
      step: 1,
      icon: "Search",
      title: "Browse & Search",
      description: "Explore our extensive inventory of verified mining equipment with advanced filtering options by type, condition, location, and price range.",
      features: [
        "Advanced search filters",
        "High-resolution imagery",
        "Detailed specifications",
        "Real-time availability"
      ],
      cta: {
        text: "Start Browsing",
        link: "/product-listing",
        variant: "outline"
      }
    },
    {
      step: 2,
      icon: "FileText",
      title: "Request Quote",
      description: "Submit a detailed quote request with your specific requirements. Our team will connect you with verified suppliers and provide competitive pricing.",
      features: [
        "Custom quote forms",
        "Supplier matching",
        "Competitive pricing",
        "Fast response time"
      ],
      cta: {
        text: "Get Quote",
        link: "/quote-request-form",
        variant: "default"
      }
    },
    {
      step: 3,
      icon: "Truck",
      title: "Secure Delivery",
      description: "Complete your purchase with confidence. We coordinate logistics, provide condition reports, and ensure safe delivery to your mining site.",
      features: [
        "Global logistics network",
        "Condition verification",
        "Secure transactions",
        "Delivery tracking"
      ],
      cta: {
        text: "Learn More",
        link: "/homepage#about",
        variant: "ghost"
      }
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-muted/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="Workflow" size={16} />
            <span>Simple Process</span>
          </div>
          
          <h2 className="text-4xl font-bold text-foreground mb-4">
            How MekRok Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From discovery to delivery, our streamlined process ensures you get the right mining equipment quickly and efficiently.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-16">
          {steps?.map((step, index) => (
            <div
              key={step?.step}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } items-center gap-12`}
            >
              {/* Step Content */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-2xl shadow-lg">
                    <Icon name={step?.icon} size={28} color="white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-primary mb-1">
                      Step {step?.step}
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">
                      {step?.title}
                    </h3>
                  </div>
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  {step?.description}
                </p>

                {/* Features List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {step?.features?.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center space-x-2 text-sm text-foreground"
                    >
                      <Icon name="Check" size={16} className="text-success flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                  <Link to={step?.cta?.link}>
                    <Button
                      variant={step?.cta?.variant}
                      size="lg"
                      iconName="ArrowRight"
                      iconPosition="right"
                      iconSize={16}
                    >
                      {step?.cta?.text}
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Step Visual */}
              <div className="flex-1 relative">
                <div className="relative bg-white rounded-2xl shadow-xl border border-border p-8 max-w-md mx-auto">
                  {/* Step Number */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">{step?.step}</span>
                  </div>

                  {/* Visual Content */}
                  <div className="text-center space-y-6">
                    <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                      <Icon name={step?.icon} size={40} className="text-primary" />
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-foreground">
                        {step?.title}
                      </h4>
                      
                      {/* Mock Interface Elements */}
                      {step?.step === 1 && (
                        <div className="space-y-2">
                          <div className="h-3 bg-muted rounded-full"></div>
                          <div className="h-3 bg-muted rounded-full w-3/4"></div>
                          <div className="h-3 bg-primary/20 rounded-full w-1/2"></div>
                        </div>
                      )}
                      
                      {step?.step === 2 && (
                        <div className="space-y-2">
                          <div className="h-8 bg-muted rounded-lg"></div>
                          <div className="h-8 bg-muted rounded-lg"></div>
                          <div className="h-6 bg-primary/20 rounded-lg w-2/3"></div>
                        </div>
                      )}
                      
                      {step?.step === 3 && (
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="w-4 h-4 bg-success rounded-full"></div>
                            <div className="flex-1 h-1 bg-success mx-2"></div>
                            <div className="w-4 h-4 bg-success rounded-full"></div>
                          </div>
                          <div className="text-xs text-success font-medium">Delivery in Progress</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Connecting Line */}
                {index < steps?.length - 1 && (
                  <div className="hidden lg:block absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                    <div className="w-1 h-16 bg-gradient-to-b from-primary/50 to-transparent"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 pt-12 border-t border-border">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of mining companies who trust MekRok for their equipment sourcing needs. Start browsing our inventory today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/product-listing">
              <Button
                variant="default"
                size="lg"
                iconName="Search"
                iconPosition="left"
                iconSize={20}
                className="w-full sm:w-auto"
              >
                Browse Equipment
              </Button>
            </Link>
            
            <Link to="/quote-request-form">
              <Button
                variant="outline"
                size="lg"
                iconName="MessageSquare"
                iconPosition="left"
                iconSize={20}
                className="w-full sm:w-auto"
              >
                Request Custom Quote
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;