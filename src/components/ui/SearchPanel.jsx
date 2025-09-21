import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';
import Select from './Select';

const SearchPanel = ({ isExpanded = false, onToggle, onSearch, className = '' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'excavators', label: 'Excavators' },
    { value: 'bulldozers', label: 'Bulldozers' },
    { value: 'loaders', label: 'Loaders' },
    { value: 'dump-trucks', label: 'Dump Trucks' },
    { value: 'crushers', label: 'Crushers' },
    { value: 'drilling', label: 'Drilling Equipment' },
  ];

  const conditionOptions = [
    { value: '', label: 'Any Condition' },
    { value: 'new', label: 'New' },
    { value: 'excellent', label: 'Excellent' },
    { value: 'good', label: 'Good' },
    { value: 'fair', label: 'Fair' },
    { value: 'refurbished', label: 'Refurbished' },
  ];

  const handleSearch = () => {
    const searchParams = {
      query: searchQuery,
      category: selectedCategory,
      condition: selectedCondition,
      priceRange: priceRange,
    };
    
    if (onSearch) {
      onSearch(searchParams);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedCondition('');
    setPriceRange({ min: '', max: '' });
  };

  return (
    <div className={`bg-white border border-border rounded-lg shadow-card transition-all duration-300 ${className}`}>
      {/* Search Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Search" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Find Equipment</h3>
        </div>
        
        {onToggle && (
          <button
            onClick={onToggle}
            className="flex items-center justify-center w-8 h-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-300"
            aria-label={isExpanded ? 'Collapse search' : 'Expand search'}
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
          </button>
        )}
      </div>
      {/* Search Content */}
      <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-96' : 'max-h-0'}`}>
        <div className="p-4 space-y-4">
          {/* Main Search Input */}
          <Input
            type="search"
            placeholder="Search by equipment name, model, or manufacturer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="w-full"
          />

          {/* Filter Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Select
              label="Category"
              options={categoryOptions}
              value={selectedCategory}
              onChange={setSelectedCategory}
              placeholder="Select category"
            />

            <Select
              label="Condition"
              options={conditionOptions}
              value={selectedCondition}
              onChange={setSelectedCondition}
              placeholder="Select condition"
            />

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Price Range</label>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={priceRange?.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: e?.target?.value }))}
                  className="flex-1"
                />
                <span className="text-muted-foreground">-</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={priceRange?.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: e?.target?.value }))}
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="RotateCcw"
              iconPosition="left"
              iconSize={14}
              onClick={handleClearFilters}
            >
              Clear Filters
            </Button>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Filter"
                iconPosition="left"
                iconSize={14}
              >
                Advanced
              </Button>
              
              <Button
                variant="default"
                size="sm"
                iconName="Search"
                iconPosition="left"
                iconSize={14}
                onClick={handleSearch}
              >
                Search Equipment
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Quick Search (when collapsed) */}
      {!isExpanded && (
        <div className="p-4">
          <div className="flex items-center space-x-2">
            <Input
              type="search"
              placeholder="Quick search equipment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="flex-1"
            />
            <Button
              variant="default"
              size="default"
              iconName="Search"
              iconSize={16}
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPanel;