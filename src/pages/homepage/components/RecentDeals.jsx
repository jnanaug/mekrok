import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecentDeals = () => {
  const [activeTab, setActiveTab] = useState('deals');

  const recentDeals = [
    {
      id: 1,
      equipment: "CAT 336F Hydraulic Excavator",
      client: "Mountain Peak Mining Co.",
      location: "Colorado, USA",
      dealValue: 285000,
      completedDate: "2025-08-28",
      image: "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg",
      clientLogo: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg",
      testimonial: "MekRok delivered exactly what we needed. The equipment was in perfect condition and arrived ahead of schedule. Their team made the entire process seamless.",
      clientRole: "Operations Director",
      metrics: {
        deliveryTime: "12 days",
        condition: "Excellent",
        satisfaction: "5/5"
      },
      tags: ["Fast Delivery", "Excellent Condition", "Competitive Price"]
    },
    {
      id: 2,
      equipment: "Komatsu D65PX Bulldozer",
      client: "Desert Gold Mining",
      location: "Nevada, USA",
      dealValue: 320000,
      completedDate: "2025-08-25",
      image: "https://images.pexels.com/photos/162539/architecture-building-site-build-construction-162539.jpeg",
      clientLogo: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
      testimonial: "Outstanding service from start to finish. The detailed condition report gave us complete confidence in our purchase. Highly recommended for serious mining operations.",
      clientRole: "Equipment Manager",
      metrics: {
        deliveryTime: "8 days",
        condition: "Like New",
        satisfaction: "5/5"
      },
      tags: ["Verified Supplier", "Detailed Reports", "Professional Service"]
    },
    {
      id: 3,
      equipment: "Volvo L120H Wheel Loader",
      client: "Rocky Mountain Aggregates",
      location: "Montana, USA",
      dealValue: 195000,
      completedDate: "2025-08-22",
      image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg",
      clientLogo: "https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg",
      testimonial: "The transparency in pricing and condition reporting is unmatched. We saved significant time and money compared to traditional equipment sourcing methods.",
      clientRole: "Procurement Manager",
      metrics: {
        deliveryTime: "15 days",
        condition: "Good",
        satisfaction: "5/5"
      },
      tags: ["Transparent Pricing", "Time Saving", "Cost Effective"]
    }
  ];

  const caseStudies = [
    {
      id: 1,
      title: "Large-Scale Mining Operation Equipment Upgrade",
      client: "Continental Mining Corp",
      challenge: "Needed to replace aging fleet of 12 excavators and 8 dump trucks within 60 days to maintain production schedules.",
      solution: "MekRok coordinated with multiple verified suppliers to source equipment meeting exact specifications, arranged staggered deliveries, and provided comprehensive condition reports.",
      results: [
        "100% on-time delivery within 45 days",
        "$2.3M total equipment value",
        "15% cost savings vs. dealer pricing",
        "Zero equipment issues post-delivery"
      ],
      image: "https://images.pexels.com/photos/1108102/pexels-photo-1108102.jpeg",
      downloadLink: "/assets/case-studies/continental-mining-case-study.pdf"
    },
    {
      id: 2,
      title: "Emergency Equipment Replacement",
      client: "Apex Quarry Operations",
      challenge: "Critical crusher breakdown required immediate replacement to avoid production shutdown and contract penalties.",
      solution: "Located and delivered replacement crusher within 72 hours through emergency sourcing network, including expedited logistics and technical support.",
      results: [
        "72-hour emergency delivery",
        "Zero production downtime",
        "Avoided $500K in penalties",
        "Ongoing maintenance support"
      ],
      image: "https://images.pexels.com/photos/1108103/pexels-photo-1108103.jpeg",
      downloadLink: "/assets/case-studies/apex-quarry-case-study.pdf"
    }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(amount);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-muted/20 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="TrendingUp" size={16} />
            <span>Success Stories</span>
          </div>
          
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Recent Deals & Case Studies
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how we've helped mining companies worldwide find and acquire the right equipment quickly and cost-effectively.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-lg p-1 shadow-card border border-border">
            <button
              onClick={() => setActiveTab('deals')}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-300 ${
                activeTab === 'deals' ?'bg-primary text-white shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Recent Deals
            </button>
            <button
              onClick={() => setActiveTab('cases')}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-300 ${
                activeTab === 'cases' ?'bg-primary text-white shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Case Studies
            </button>
          </div>
        </div>

        {/* Recent Deals Tab */}
        {activeTab === 'deals' && (
          <div className="space-y-8">
            {recentDeals?.map((deal) => (
              <div
                key={deal?.id}
                className="bg-white rounded-2xl shadow-card border border-border overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                  {/* Equipment Image */}
                  <div className="relative h-64 lg:h-auto overflow-hidden">
                    <Image
                      src={deal?.image}
                      alt={deal?.equipment}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Deal Value Badge */}
                    <div className="absolute top-4 left-4 bg-success text-white px-4 py-2 rounded-lg font-semibold">
                      {formatCurrency(deal?.dealValue)}
                    </div>
                  </div>

                  {/* Deal Details */}
                  <div className="lg:col-span-2 p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                      <div className="mb-4 lg:mb-0">
                        <h3 className="text-2xl font-bold text-foreground mb-2">
                          {deal?.equipment}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Icon name="Building" size={14} />
                            <span>{deal?.client}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon name="MapPin" size={14} />
                            <span>{deal?.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon name="Calendar" size={14} />
                            <span>{formatDate(deal?.completedDate)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Client Logo */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-lg overflow-hidden border border-border">
                          <Image
                            src={deal?.clientLogo}
                            alt={`${deal?.client} logo`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Testimonial */}
                    <blockquote className="mb-6">
                      <p className="text-foreground italic text-lg leading-relaxed mb-3">
                        "{deal?.testimonial}"
                      </p>
                      <cite className="text-sm text-muted-foreground font-medium">
                        — {deal?.clientRole}, {deal?.client}
                      </cite>
                    </blockquote>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <div className="text-lg font-bold text-primary">{deal?.metrics?.deliveryTime}</div>
                        <div className="text-xs text-muted-foreground">Delivery Time</div>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <div className="text-lg font-bold text-primary">{deal?.metrics?.condition}</div>
                        <div className="text-xs text-muted-foreground">Condition</div>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <div className="text-lg font-bold text-primary">{deal?.metrics?.satisfaction}</div>
                        <div className="text-xs text-muted-foreground">Satisfaction</div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {deal?.tags?.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Case Studies Tab */}
        {activeTab === 'cases' && (
          <div className="space-y-8">
            {caseStudies?.map((study) => (
              <div
                key={study?.id}
                className="bg-white rounded-2xl shadow-card border border-border overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Case Study Image */}
                  <div className="relative h-64 lg:h-auto overflow-hidden">
                    <Image
                      src={study?.image}
                      alt={study?.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Case Study Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {study?.title}
                    </h3>
                    <p className="text-primary font-medium mb-6">{study?.client}</p>

                    <div className="space-y-4 mb-6">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Challenge:</h4>
                        <p className="text-muted-foreground text-sm">{study?.challenge}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Solution:</h4>
                        <p className="text-muted-foreground text-sm">{study?.solution}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Results:</h4>
                        <ul className="space-y-1">
                          {study?.results?.map((result, index) => (
                            <li key={index} className="flex items-start space-x-2 text-sm">
                              <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Download"
                      iconPosition="left"
                      iconSize={14}
                    >
                      Download Full Case Study
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-16 pt-12 border-t border-border">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ready to Join Our Success Stories?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let us help you find the perfect mining equipment for your operation. Start your success story with MekRok today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/quote-request-form">
              <Button
                variant="default"
                size="lg"
                iconName="MessageSquare"
                iconPosition="left"
                iconSize={20}
                className="w-full sm:w-auto"
              >
                Start Your Project
              </Button>
            </Link>
            
            <Link to="/product-listing">
              <Button
                variant="outline"
                size="lg"
                iconName="Search"
                iconPosition="left"
                iconSize={20}
                className="w-full sm:w-auto"
              >
                Browse Equipment
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentDeals;