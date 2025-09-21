import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductCard = ({ product }) => {
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
      {/* Image Section */}
      <div className="relative overflow-hidden rounded-t-lg">
        <Link to={`/product-details?id=${product?.id}`}>
          <Image
            src={product?.image}
            alt={`${product?.brand} ${product?.model}`}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        
        {/* Condition Badge */}
        <div className={`absolute top-3 left-3 px-2 py-1 rounded-md text-xs font-medium ${getConditionColor(product?.condition)}`}>
          {product?.condition}
        </div>
        
        {/* Featured Badge */}
        {product?.featured && (
          <div className="absolute top-3 right-3 px-2 py-1 bg-accent text-white rounded-md text-xs font-medium">
            Featured
          </div>
        )}
      </div>
      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Title and Brand */}
        <div>
          <Link 
            to={`/product-details?id=${product?.id}`}
            className="block hover:text-primary transition-colors duration-300"
          >
            <h3 className="text-lg font-semibold text-foreground line-clamp-2">
              {product?.brand} {product?.model}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground mt-1">{product?.category}</p>
        </div>

        {/* Specifications Grid */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={14} className="text-muted-foreground" />
            <span className="text-foreground">{product?.year}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={14} className="text-muted-foreground" />
            <span className="text-foreground">{formatHours(product?.hours)} hrs</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={14} className="text-muted-foreground" />
            <span className="text-foreground">{product?.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Truck" size={14} className="text-muted-foreground" />
            <span className="text-foreground">{product?.availability}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-primary">{formatPrice(product?.price)}</div>
            {product?.originalPrice && product?.originalPrice > product?.price && (
              <div className="text-sm text-muted-foreground line-through">
                {formatPrice(product?.originalPrice)}
              </div>
            )}
          </div>
          {product?.financing && (
            <div className="text-xs text-accent font-medium">
              Financing Available
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 pt-2">
          <Button
            variant="default"
            size="sm"
            iconName="FileText"
            iconPosition="left"
            iconSize={14}
            className="flex-1"
            onClick={() => window.location.href = `/quote-request-form?equipment=${product?.id}`}
          >
            Request Quote
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Video"
            iconSize={14}
            className="px-3"
            title="Request Inspection Video"
          >
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
        </div>

        {/* Additional Info */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
          <span>ID: {product?.id}</span>
          <span>Updated {product?.lastUpdated}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;