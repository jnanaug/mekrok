import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const InventoryFilters = ({ onFiltersChange, onClearFilters, className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    condition: '',
    status: '',
    manufacturer: '',
    priceRange: { min: '', max: '' },
    yearRange: { min: '', max: '' },
    location: '',
    dateAdded: ''
  });

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'excavators', label: 'Excavators' },
    { value: 'bulldozers', label: 'Bulldozers' },
    { value: 'loaders', label: 'Loaders' },
    { value: 'dump-trucks', label: 'Dump Trucks' },
    { value: 'crushers', label: 'Crushers' },
    { value: 'drilling', label: 'Drilling Equipment' },
    { value: 'haulers', label: 'Haulers' },
    { value: 'compactors', label: 'Compactors' }
  ];

  const conditionOptions = [
    { value: '', label: 'Any Condition' },
    { value: 'new', label: 'New' },
    { value: 'excellent', label: 'Excellent' },
    { value: 'good', label: 'Good' },
    { value: 'fair', label: 'Fair' },
    { value: 'refurbished', label: 'Refurbished' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'available', label: 'Available' },
    { value: 'sold', label: 'Sold' },
    { value: 'pending', label: 'Pending' },
    { value: 'maintenance', label: 'Maintenance' }
  ];

  const manufacturerOptions = [
    { value: '', label: 'All Manufacturers' },
    { value: 'caterpillar', label: 'Caterpillar' },
    { value: 'komatsu', label: 'Komatsu' },
    { value: 'volvo', label: 'Volvo' },
    { value: 'liebherr', label: 'Liebherr' },
    { value: 'hitachi', label: 'Hitachi' },
    { value: 'john-deere', label: 'John Deere' },
    { value: 'case', label: 'Case' },
    { value: 'jcb', label: 'JCB' }
  ];

  const dateOptions = [
    { value: '', label: 'Any Date' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleRangeChange = (rangeKey, type, value) => {
    const newFilters = {
      ...filters,
      [rangeKey]: { ...filters?.[rangeKey], [type]: value }
    };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleClearAll = () => {
    const clearedFilters = {
      search: '',
      category: '',
      condition: '',
      status: '',
      manufacturer: '',
      priceRange: { min: '', max: '' },
      yearRange: { min: '', max: '' },
      location: '',
      dateAdded: ''
    };
    setFilters(clearedFilters);
    onClearFilters();
  };

  const hasActiveFilters = Object.values(filters)?.some(value => {
    if (typeof value === 'object' && value !== null) {
      return Object.values(value)?.some(v => v !== '');
    }
    return value !== '';
  });

  return (
    <div className={`bg-white border border-border rounded-lg shadow-card ${className}`}>
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Filter Equipment</h3>
          {hasActiveFilters && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
              Active
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              iconPosition="left"
              iconSize={14}
              onClick={handleClearAll}
            >
              Clear All
            </Button>
          )}
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center w-8 h-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-300"
            aria-label={isExpanded ? 'Collapse filters' : 'Expand filters'}
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
          </button>
        </div>
      </div>
      {/* Quick Search (Always Visible) */}
      <div className="p-4 border-b border-border">
        <Input
          type="search"
          placeholder="Search equipment by name, model, or ID..."
          value={filters?.search}
          onChange={(e) => handleFilterChange('search', e?.target?.value)}
          className="w-full"
        />
      </div>
      {/* Advanced Filters */}
      <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-96' : 'max-h-0'}`}>
        <div className="p-4 space-y-4">
          {/* Primary Filters Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select
              label="Category"
              options={categoryOptions}
              value={filters?.category}
              onChange={(value) => handleFilterChange('category', value)}
              placeholder="Select category"
            />

            <Select
              label="Condition"
              options={conditionOptions}
              value={filters?.condition}
              onChange={(value) => handleFilterChange('condition', value)}
              placeholder="Select condition"
            />

            <Select
              label="Status"
              options={statusOptions}
              value={filters?.status}
              onChange={(value) => handleFilterChange('status', value)}
              placeholder="Select status"
            />

            <Select
              label="Manufacturer"
              options={manufacturerOptions}
              value={filters?.manufacturer}
              onChange={(value) => handleFilterChange('manufacturer', value)}
              placeholder="Select manufacturer"
              searchable
            />
          </div>

          {/* Range Filters Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Price Range (USD)</label>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters?.priceRange?.min}
                  onChange={(e) => handleRangeChange('priceRange', 'min', e?.target?.value)}
                  className="flex-1"
                />
                <span className="text-muted-foreground">-</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters?.priceRange?.max}
                  onChange={(e) => handleRangeChange('priceRange', 'max', e?.target?.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Year Range</label>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  placeholder="From"
                  value={filters?.yearRange?.min}
                  onChange={(e) => handleRangeChange('yearRange', 'min', e?.target?.value)}
                  className="flex-1"
                />
                <span className="text-muted-foreground">-</span>
                <Input
                  type="number"
                  placeholder="To"
                  value={filters?.yearRange?.max}
                  onChange={(e) => handleRangeChange('yearRange', 'max', e?.target?.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <Input
              label="Location"
              type="text"
              placeholder="Enter location"
              value={filters?.location}
              onChange={(e) => handleFilterChange('location', e?.target?.value)}
            />
          </div>

          {/* Additional Filters Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Date Added"
              options={dateOptions}
              value={filters?.dateAdded}
              onChange={(value) => handleFilterChange('dateAdded', value)}
              placeholder="Select date range"
            />
          </div>

          {/* Filter Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="text-sm text-muted-foreground">
              {hasActiveFilters ? 'Filters applied' : 'No filters applied'}
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
                iconSize={14}
              >
                Export Results
              </Button>
              
              <Button
                variant="default"
                size="sm"
                iconName="Search"
                iconPosition="left"
                iconSize={14}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryFilters;