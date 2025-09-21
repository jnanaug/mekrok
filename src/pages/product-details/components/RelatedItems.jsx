import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RelatedItems = ({ currentProductId, category = 'excavators' }) => {
  const relatedProducts = [
    {
      id: 'rel-001',
      name: 'Caterpillar 320D Excavator',
      brand: 'Caterpillar',
      model: '320D',
      year: 2019,
      hours: 2800,
      condition: 'Excellent',
      price: 185000,
      location: 'Phoenix, AZ',
      image: 'https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['GPS Ready', 'A/C Cab', 'Hydraulic Thumb']
    },
    {
      id: 'rel-002',
      name: 'Komatsu PC200-8 Excavator',
      brand: 'Komatsu',
      model: 'PC200-8',
      year: 2020,
      hours: 1950,
      condition: 'Good',
      price: 195000,
      location: 'Denver, CO',
      image: 'https://images.pixabay.com/photo/2016/11/29/08/34/excavators-1868726_960_720.jpg',
      features: ['Low Hours', 'Heated Cab', 'Quick Coupler']
    },
    {
      id: 'rel-003',
      name: 'Volvo EC210B Excavator',
      brand: 'Volvo',
      model: 'EC210B',
      year: 2018,
      hours: 3200,
      condition: 'Good',
      price: 165000,
      location: 'Salt Lake City, UT',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=400&q=80',
      features: ['Fuel Efficient', 'Bluetooth', 'LED Lights']
    },
    {
      id: 'rel-004',
      name: 'John Deere 210G Excavator',
      brand: 'John Deere',
      model: '210G',
      year: 2021,
      hours: 1200,
      condition: 'Excellent',
      price: 225000,
      location: 'Las Vegas, NV',
      image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=400',
      features: ['Like New', 'Warranty', 'Full Service History']
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground flex items-center">
          <Icon name="Grid3X3" size={24} className="mr-2 text-primary" />
          Similar Equipment
        </h2>
        
        <Link to="/product-listing">
          <Button
            variant="outline"
            size="sm"
            iconName="ArrowRight"
            iconPosition="right"
            iconSize={16}
          >
            View All
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {relatedProducts?.map((product) => (
          <div key={product?.id} className="bg-white border border-border rounded-lg shadow-card hover:shadow-modal transition-shadow duration-300">
            {/* Product Image */}
            <div className="relative h-48 overflow-hidden rounded-t-lg">
              <Image
                src={product?.image}
                alt={product?.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              
              {/* Condition Badge */}
              <div className="absolute top-2 left-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getConditionColor(product?.condition)}`}>
                  {product?.condition}
                </span>
              </div>

              {/* Quick Actions */}
              <div className="absolute top-2 right-2 flex space-x-1">
                <button className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors duration-300">
                  <Icon name="Heart" size={16} className="text-muted-foreground hover:text-error" />
                </button>
                <button className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors duration-300">
                  <Icon name="Share2" size={16} className="text-muted-foreground hover:text-primary" />
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold text-foreground text-sm line-clamp-2">{product?.name}</h3>
                <p className="text-xs text-muted-foreground">{product?.brand} • {product?.model}</p>
              </div>

              {/* Key Info */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={12} className="text-muted-foreground" />
                  <span className="text-muted-foreground">{product?.year}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={12} className="text-muted-foreground" />
                  <span className="text-muted-foreground">{formatHours(product?.hours)} hrs</span>
                </div>
                <div className="flex items-center space-x-1 col-span-2">
                  <Icon name="MapPin" size={12} className="text-muted-foreground" />
                  <span className="text-muted-foreground">{product?.location}</span>
                </div>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-1">
                {product?.features?.slice(0, 2)?.map((feature, index) => (
                  <span key={index} className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded">
                    {feature}
                  </span>
                ))}
                {product?.features?.length > 2 && (
                  <span className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded">
                    +{product?.features?.length - 2} more
                  </span>
                )}
              </div>

              {/* Price and Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="text-lg font-bold text-primary">
                  {formatPrice(product?.price)}
                </div>
                <div className="flex space-x-1">
                  <Link to={`/product-details?id=${product?.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Eye"
                      iconSize={14}
                    >
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Comparison Tool */}
      <div className="bg-muted/50 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground flex items-center">
              <Icon name="BarChart3" size={18} className="mr-2 text-primary" />
              Compare Equipment
            </h3>
            <p className="text-sm text-muted-foreground">
              Select multiple items to compare specifications side by side
            </p>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
          >
            Start Comparison
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RelatedItems;