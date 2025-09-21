import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ShippingInfo = ({ productLocation = 'Phoenix, AZ', productWeight = '45,000 lbs' }) => {
  const shippingOptions = [
    {
      id: 'standard',
      name: 'Standard Freight',
      description: 'Professional heavy equipment transport',
      estimatedDays: '7-14 business days',
      price: 3500,
      features: ['Insured Transport', 'GPS Tracking', 'Professional Drivers'],
      recommended: false
    },
    {
      id: 'expedited',
      name: 'Expedited Delivery',
      description: 'Priority shipping for urgent needs',
      estimatedDays: '3-7 business days',
      price: 5200,
      features: ['Priority Scheduling', 'Dedicated Transport', 'Real-time Updates'],
      recommended: true
    },
    {
      id: 'white-glove',
      name: 'White Glove Service',
      description: 'Full-service delivery and setup',
      estimatedDays: '5-10 business days',
      price: 7800,
      features: ['On-site Delivery', 'Equipment Setup', 'Operator Training'],
      recommended: false
    }
  ];

  const logisticsPartners = [
    {
      name: 'HeavyHaul Express',
      rating: 4.8,
      specialties: ['Mining Equipment', 'Oversized Loads'],
      yearsExperience: 15,
      logo: 'https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      name: 'Industrial Transport Co.',
      rating: 4.9,
      specialties: ['Construction Equipment', 'Cross-Country'],
      yearsExperience: 22,
      logo: 'https://images.pixabay.com/photo/2016/11/29/08/34/excavators-1868726_960_720.jpg'
    }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(price);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground flex items-center">
          <Icon name="Truck" size={24} className="mr-2 text-primary" />
          Shipping & Logistics
        </h2>
      </div>
      {/* Current Location */}
      <div className="bg-muted/50 p-4 rounded-lg">
        <h3 className="font-semibold text-foreground mb-3 flex items-center">
          <Icon name="MapPin" size={18} className="mr-2 text-primary" />
          Equipment Location
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">Current Location</div>
            <div className="font-medium text-foreground">{productLocation}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Equipment Weight</div>
            <div className="font-medium text-foreground">{productWeight}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Dimensions</div>
            <div className="font-medium text-foreground">32' L × 10' W × 11' H</div>
          </div>
        </div>
      </div>
      {/* Shipping Options */}
      <div>
        <h3 className="font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Package" size={18} className="mr-2 text-primary" />
          Shipping Options
        </h3>
        <div className="space-y-4">
          {shippingOptions?.map((option) => (
            <div
              key={option?.id}
              className={`border rounded-lg p-4 transition-all duration-300 hover:shadow-card ${
                option?.recommended
                  ? 'border-primary bg-primary/5' :'border-border bg-white'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-foreground">{option?.name}</h4>
                    {option?.recommended && (
                      <span className="px-2 py-1 bg-primary text-white text-xs rounded-full">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{option?.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-primary">{formatPrice(option?.price)}</div>
                  <div className="text-sm text-muted-foreground">{option?.estimatedDays}</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {option?.features?.map((feature, index) => (
                  <span key={index} className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Icon name="Check" size={12} className="text-success" />
                    <span>{feature}</span>
                  </span>
                ))}
              </div>
              
              <Button
                variant={option?.recommended ? "default" : "outline"}
                size="sm"
                iconName="ArrowRight"
                iconPosition="right"
                iconSize={14}
              >
                Select {option?.name}
              </Button>
            </div>
          ))}
        </div>
      </div>
      {/* Logistics Partners */}
      <div>
        <h3 className="font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Users" size={18} className="mr-2 text-primary" />
          Trusted Logistics Partners
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {logisticsPartners?.map((partner, index) => (
            <div key={index} className="bg-white border border-border rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={partner?.logo}
                    alt={partner?.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/assets/images/no_image.png';
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{partner?.name}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={14} className="text-warning fill-current" />
                      <span className="text-sm font-medium">{partner?.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {partner?.yearsExperience} years experience
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {partner?.specialties?.map((specialty, idx) => (
                      <span key={idx} className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Shipping Calculator */}
      <div className="bg-muted/50 p-4 rounded-lg">
        <h3 className="font-semibold text-foreground mb-3 flex items-center">
          <Icon name="Calculator" size={18} className="mr-2 text-primary" />
          Shipping Cost Calculator
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Get an instant shipping quote to your location
        </p>
        <div className="flex items-center space-x-2">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Enter your ZIP code"
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <Button
            variant="default"
            iconName="Search"
            iconPosition="left"
            iconSize={16}
          >
            Calculate
          </Button>
        </div>
      </div>
      {/* Additional Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-border rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-2 flex items-center">
            <Icon name="Shield" size={16} className="mr-2 text-success" />
            Insurance Coverage
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Full replacement value coverage</li>
            <li>• Transit damage protection</li>
            <li>• Third-party liability insurance</li>
          </ul>
        </div>
        
        <div className="bg-white border border-border rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-2 flex items-center">
            <Icon name="FileText" size={16} className="mr-2 text-primary" />
            Required Documentation
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Bill of sale or lease agreement</li>
            <li>• Equipment specifications sheet</li>
            <li>• Delivery site access requirements</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo;