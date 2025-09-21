import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductListItem = ({ product }) => {
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
    switch (condition?.toLowerCase()) {
      case 'new':
        return 'text-success bg-success/10';
      case 'excellent':
        return 'text-primary bg-primary/10';
      case 'good':
        return 'text-accent bg-accent/10';
      case 'fair':
        return 'text-warning bg-warning/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-card hover:shadow-lg transition-all duration-300 group">
      <div className="flex flex-col lg:flex-row">
        {/* Image Section */}
        <div className="relative lg:w-80 lg:flex-shrink-0">
          <Link to={`/product-details?id=${product?.id}`}>
            <Image
              src={product?.image}
              alt={`${product?.brand} ${product?.model}`}
              className="w-full h-48 lg:h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-lg lg:rounded-l-lg lg:rounded-t-none"
            />
          </Link>
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col space-y-2">
            <div className={`px-2 py-1 rounded-md text-xs font-medium ${getConditionColor(product?.condition)}`}>
              {product?.condition}
            </div>
            {product?.featured && (
              <div className="px-2 py-1 bg-accent text-white rounded-md text-xs font-medium">
                Featured
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6">
          <div className="flex flex-col lg:flex-row lg:justify-between h-full">
            {/* Left Content */}
            <div className="flex-1 space-y-4">
              {/* Title and Category */}
              <div>
                <Link 
                  to={`/product-details?id=${product?.id}`}
                  className="block hover:text-primary transition-colors duration-300"
                >
                  <h3 className="text-xl font-semibold text-foreground">
                    {product?.brand} {product?.model}
                  </h3>
                </Link>
                <p className="text-muted-foreground mt-1">{product?.category}</p>
              </div>

              {/* Specifications */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Calendar" size={16} className="text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium text-foreground">{product?.year}</div>
                    <div className="text-xs text-muted-foreground">Year</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} className="text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium text-foreground">{formatHours(product?.hours)}</div>
                    <div className="text-xs text-muted-foreground">Hours</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={16} className="text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium text-foreground">{product?.location}</div>
                    <div className="text-xs text-muted-foreground">Location</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Icon name="Truck" size={16} className="text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium text-foreground">{product?.availability}</div>
                    <div className="text-xs text-muted-foreground">Availability</div>
                  </div>
                </div>
              </div>

              {/* Description */}
              {product?.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {product?.description}
                </p>
              )}

              {/* Additional Info */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>ID: {product?.id}</span>
                <span>Updated {product?.lastUpdated}</span>
              </div>
            </div>

            {/* Right Content - Price and Actions */}
            <div className="lg:w-64 lg:flex-shrink-0 lg:ml-6 mt-4 lg:mt-0 flex flex-col justify-between">
              {/* Price Section */}
              <div className="text-right lg:text-left">
                <div className="text-3xl font-bold text-primary">{formatPrice(product?.price)}</div>
                {product?.originalPrice && product?.originalPrice > product?.price && (
                  <div className="text-sm text-muted-foreground line-through">
                    {formatPrice(product?.originalPrice)}
                  </div>
                )}
                {product?.financing && (
                  <div className="text-sm text-accent font-medium mt-1">
                    Financing Available
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-2 mt-4">
                <Button
                  variant="default"
                  size="default"
                  iconName="FileText"
                  iconPosition="left"
                  iconSize={16}
                  fullWidth
                  onClick={() => window.location.href = `/quote-request-form?equipment=${product?.id}`}
                >
                  Request Quote
                </Button>
                
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Video"
                    iconPosition="left"
                    iconSize={14}
                    className="flex-1"
                  >
                    Inspection
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Heart"
                    iconSize={14}
                    className="px-3"
                    title="Add to Favorites"
                  >
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Share"
                    iconSize={14}
                    className="px-3"
                    title="Share Equipment"
                  >
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListItem;