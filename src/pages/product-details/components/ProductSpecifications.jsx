import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductSpecifications = ({ product = {} }) => {
  const {
    name = 'Equipment Name',
    brand = 'Brand',
    model = 'Model',
    year = 2020,
    hours = 0,
    condition = 'Good',
    price = 0,
    location = 'Location',
    specifications = {}
  } = product;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(price);
  };

  const formatHours = (hours) => {
    return new Intl.NumberFormat('en-US')?.format(hours);
  };

  const getConditionColor = (condition) => {
    const colors = {
      'New': 'text-success bg-success/10',
      'Excellent': 'text-success bg-success/10',
      'Good': 'text-primary bg-primary/10',
      'Fair': 'text-warning bg-warning/10',
      'Poor': 'text-error bg-error/10',
      'Refurbished': 'text-accent bg-accent/10'
    };
    return colors?.[condition] || 'text-muted-foreground bg-muted';
  };

  const basicSpecs = [
    { label: 'Brand', value: brand, icon: 'Building2' },
    { label: 'Model', value: model, icon: 'Tag' },
    { label: 'Year', value: year, icon: 'Calendar' },
    { label: 'Operating Hours', value: `${formatHours(hours)} hrs`, icon: 'Clock' },
    { label: 'Location', value: location, icon: 'MapPin' },
  ];

  const technicalSpecs = [
    { label: 'Engine Power', value: specifications?.enginePower || 'N/A', icon: 'Zap' },
    { label: 'Operating Weight', value: specifications?.operatingWeight || 'N/A', icon: 'Weight' },
    { label: 'Bucket Capacity', value: specifications?.bucketCapacity || 'N/A', icon: 'Container' },
    { label: 'Max Digging Depth', value: specifications?.maxDiggingDepth || 'N/A', icon: 'ArrowDown' },
    { label: 'Max Reach', value: specifications?.maxReach || 'N/A', icon: 'ArrowRight' },
    { label: 'Travel Speed', value: specifications?.travelSpeed || 'N/A', icon: 'Gauge' },
  ];

  return (
    <div className="space-y-6">
      {/* Product Header */}
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">{name}</h1>
        <div className="flex items-center space-x-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getConditionColor(condition)}`}>
            {condition}
          </span>
          <div className="text-2xl lg:text-3xl font-bold text-primary">
            {formatPrice(price)}
          </div>
        </div>
      </div>
      {/* Basic Specifications */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Info" size={20} className="mr-2 text-primary" />
          Basic Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {basicSpecs?.map((spec, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
              <Icon name={spec?.icon} size={18} className="text-muted-foreground flex-shrink-0" />
              <div>
                <div className="text-sm text-muted-foreground">{spec?.label}</div>
                <div className="font-medium text-foreground">{spec?.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Technical Specifications */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Settings" size={20} className="mr-2 text-primary" />
          Technical Specifications
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {technicalSpecs?.map((spec, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
              <Icon name={spec?.icon} size={18} className="text-muted-foreground flex-shrink-0" />
              <div>
                <div className="text-sm text-muted-foreground">{spec?.label}</div>
                <div className="font-medium text-foreground">{spec?.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
        <Button
          variant="default"
          size="lg"
          iconName="FileText"
          iconPosition="left"
          iconSize={18}
          className="flex-1"
        >
          Request This Item
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          iconName="Video"
          iconPosition="left"
          iconSize={18}
          className="flex-1"
        >
          Ask for Inspection Video
        </Button>
      </div>
      {/* Additional Actions */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant="ghost"
          size="sm"
          iconName="Heart"
          iconPosition="left"
          iconSize={16}
        >
          Save to Favorites
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          iconName="Share2"
          iconPosition="left"
          iconSize={16}
        >
          Share Equipment
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          iconName="Calculator"
          iconPosition="left"
          iconSize={16}
        >
          Financing Calculator
        </Button>
      </div>
    </div>
  );
};

export default ProductSpecifications;