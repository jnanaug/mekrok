import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ isOpen, onToggle, filters, onFiltersChange, onClearFilters, resultCount }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'excavators', label: 'Excavators' },
    { value: 'bulldozers', label: 'Bulldozers' },
    { value: 'loaders', label: 'Loaders' },
    { value: 'dump-trucks', label: 'Dump Trucks' },
    { value: 'crushers', label: 'Crushers' },
    { value: 'drilling', label: 'Drilling Equipment' },
    { value: 'haulers', label: 'Haulers' },
    { value: 'graders', label: 'Graders' },
  ];

  const conditionOptions = [
    { value: '', label: 'Any Condition' },
    { value: 'new', label: 'New' },
    { value: 'excellent', label: 'Excellent' },
    { value: 'good', label: 'Good' },
    { value: 'fair', label: 'Fair' },
    { value: 'refurbished', label: 'Refurbished' },
  ];

  const brandOptions = [
    { value: '', label: 'All Brands' },
    { value: 'caterpillar', label: 'Caterpillar' },
    { value: 'komatsu', label: 'Komatsu' },
    { value: 'volvo', label: 'Volvo' },
    { value: 'hitachi', label: 'Hitachi' },
    { value: 'liebherr', label: 'Liebherr' },
    { value: 'john-deere', label: 'John Deere' },
    { value: 'case', label: 'Case' },
  ];

  const availabilityOptions = [
    { value: '', label: 'Any Availability' },
    { value: 'immediate', label: 'Immediate' },
    { value: '1-2-weeks', label: '1-2 Weeks' },
    { value: '3-4-weeks', label: '3-4 Weeks' },
    { value: 'on-order', label: 'On Order' },
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleClearAll = () => {
    const clearedFilters = {
      search: '',
      category: '',
      condition: '',
      brand: '',
      yearMin: '',
      yearMax: '',
      hoursMin: '',
      hoursMax: '',
      priceMin: '',
      priceMax: '',
      location: '',
      availability: '',
      financing: false,
      featured: false,
    };
    setLocalFilters(clearedFilters);
    onClearFilters();
  };

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          fullWidth
          iconName="Filter"
          iconPosition="left"
          iconSize={16}
          onClick={onToggle}
        >
          Filters {resultCount && `(${resultCount} results)`}
        </Button>
      </div>
      {/* Filter Panel */}
      <div className={`bg-card border border-border rounded-lg shadow-card transition-all duration-300 ${
        isOpen ? 'block' : 'hidden lg:block'
      }`}>
        {/* Filter Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Filters</h3>
            {resultCount && (
              <span className="text-sm text-muted-foreground">({resultCount} results)</span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="RotateCcw"
              iconSize={14}
              onClick={handleClearAll}
            >
              Clear
            </Button>
            
            <button
              onClick={onToggle}
              className="lg:hidden flex items-center justify-center w-8 h-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-300"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
        </div>

        {/* Filter Content */}
        <div className="p-4 space-y-6">
          {/* Search */}
          <div>
            <Input
              type="search"
              label="Search Equipment"
              placeholder="Model, brand, or keywords..."
              value={localFilters?.search}
              onChange={(e) => handleFilterChange('search', e?.target?.value)}
            />
          </div>

          {/* Category & Condition */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Category"
              options={categoryOptions}
              value={localFilters?.category}
              onChange={(value) => handleFilterChange('category', value)}
            />
            
            <Select
              label="Condition"
              options={conditionOptions}
              value={localFilters?.condition}
              onChange={(value) => handleFilterChange('condition', value)}
            />
          </div>

          {/* Brand & Availability */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Brand"
              options={brandOptions}
              value={localFilters?.brand}
              onChange={(value) => handleFilterChange('brand', value)}
              searchable
            />
            
            <Select
              label="Availability"
              options={availabilityOptions}
              value={localFilters?.availability}
              onChange={(value) => handleFilterChange('availability', value)}
            />
          </div>

          {/* Year Range */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Year Range</label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="Min year"
                value={localFilters?.yearMin}
                onChange={(e) => handleFilterChange('yearMin', e?.target?.value)}
                min="1990"
                max="2024"
              />
              <Input
                type="number"
                placeholder="Max year"
                value={localFilters?.yearMax}
                onChange={(e) => handleFilterChange('yearMax', e?.target?.value)}
                min="1990"
                max="2024"
              />
            </div>
          </div>

          {/* Hours Range */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Operating Hours</label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="Min hours"
                value={localFilters?.hoursMin}
                onChange={(e) => handleFilterChange('hoursMin', e?.target?.value)}
                min="0"
              />
              <Input
                type="number"
                placeholder="Max hours"
                value={localFilters?.hoursMax}
                onChange={(e) => handleFilterChange('hoursMax', e?.target?.value)}
                min="0"
              />
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Price Range (USD)</label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="Min price"
                value={localFilters?.priceMin}
                onChange={(e) => handleFilterChange('priceMin', e?.target?.value)}
                min="0"
              />
              <Input
                type="number"
                placeholder="Max price"
                value={localFilters?.priceMax}
                onChange={(e) => handleFilterChange('priceMax', e?.target?.value)}
                min="0"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <Input
              type="text"
              label="Location"
              placeholder="City, state, or zip code"
              value={localFilters?.location}
              onChange={(e) => handleFilterChange('location', e?.target?.value)}
            />
          </div>

          {/* Additional Options */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-foreground">Additional Options</label>
            
            <Checkbox
              label="Financing Available"
              checked={localFilters?.financing}
              onChange={(e) => handleFilterChange('financing', e?.target?.checked)}
            />
            
            <Checkbox
              label="Featured Equipment Only"
              checked={localFilters?.featured}
              onChange={(e) => handleFilterChange('featured', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;