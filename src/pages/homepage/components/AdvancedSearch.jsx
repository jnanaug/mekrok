import React, { useState } from 'react';

import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AdvancedSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [yearRange, setYearRange] = useState({ min: '', max: '' });
  const [hoursRange, setHoursRange] = useState({ min: '', max: '' });
  const [isExpanded, setIsExpanded] = useState(false);

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'excavators', label: 'Excavators' },
    { value: 'bulldozers', label: 'Bulldozers' },
    { value: 'loaders', label: 'Wheel Loaders' },
    { value: 'dump-trucks', label: 'Dump Trucks' },
    { value: 'crushers', label: 'Crushers & Screens' },
    { value: 'drilling', label: 'Drilling Equipment' },
    { value: 'compactors', label: 'Compactors' },
    { value: 'graders', label: 'Motor Graders' },
  ];

  const conditionOptions = [
    { value: '', label: 'Any Condition' },
    { value: 'new', label: 'New' },
    { value: 'excellent', label: 'Excellent' },
    { value: 'good', label: 'Good' },
    { value: 'fair', label: 'Fair' },
    { value: 'refurbished', label: 'Refurbished' },
  ];

  const locationOptions = [
    { value: '', label: 'All Locations' },
    { value: 'usa', label: 'United States' },
    { value: 'canada', label: 'Canada' },
    { value: 'australia', label: 'Australia' },
    { value: 'europe', label: 'Europe' },
    { value: 'asia', label: 'Asia' },
    { value: 'south-america', label: 'South America' },
  ];

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    
    if (searchQuery) searchParams?.set('q', searchQuery);
    if (selectedCategory) searchParams?.set('category', selectedCategory);
    if (selectedCondition) searchParams?.set('condition', selectedCondition);
    if (selectedLocation) searchParams?.set('location', selectedLocation);
    if (priceRange?.min) searchParams?.set('price_min', priceRange?.min);
    if (priceRange?.max) searchParams?.set('price_max', priceRange?.max);
    if (yearRange?.min) searchParams?.set('year_min', yearRange?.min);
    if (yearRange?.max) searchParams?.set('year_max', yearRange?.max);
    if (hoursRange?.min) searchParams?.set('hours_min', hoursRange?.min);
    if (hoursRange?.max) searchParams?.set('hours_max', hoursRange?.max);

    // Navigate to product listing with search parameters
    window.location.href = `/product-listing?${searchParams?.toString()}`;
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedCondition('');
    setSelectedLocation('');
    setPriceRange({ min: '', max: '' });
    setYearRange({ min: '', max: '' });
    setHoursRange({ min: '', max: '' });
  };

  const hasActiveFilters = searchQuery || selectedCategory || selectedCondition || 
    selectedLocation || priceRange?.min || priceRange?.max || 
    yearRange?.min || yearRange?.max || hoursRange?.min || hoursRange?.max;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Find Your Perfect Equipment
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Use our advanced search to filter through hundreds of verified mining equipment listings and find exactly what you need.
          </p>
        </div>

        {/* Search Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-border overflow-hidden">
          {/* Quick Search Bar */}
          <div className="p-6 bg-gradient-to-r from-primary/5 to-accent/5">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="search"
                  placeholder="Search by equipment name, model, or manufacturer..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-full text-lg"
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
                  iconPosition="left"
                  iconSize={16}
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? 'Less Filters' : 'More Filters'}
                </Button>
                
                <Button
                  variant="default"
                  size="default"
                  iconName="Search"
                  iconPosition="left"
                  iconSize={16}
                  onClick={handleSearch}
                  className="px-8"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          <div className={`transition-all duration-300 overflow-hidden ${
            isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="p-6 border-t border-border bg-muted/20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Category Filter */}
                <Select
                  label="Equipment Category"
                  options={categoryOptions}
                  value={selectedCategory}
                  onChange={setSelectedCategory}
                  placeholder="Select category"
                />

                {/* Condition Filter */}
                <Select
                  label="Condition"
                  options={conditionOptions}
                  value={selectedCondition}
                  onChange={setSelectedCondition}
                  placeholder="Select condition"
                />

                {/* Location Filter */}
                <Select
                  label="Location"
                  options={locationOptions}
                  value={selectedLocation}
                  onChange={setSelectedLocation}
                  placeholder="Select location"
                />

                {/* Price Range */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Price Range (USD)</label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      placeholder="Min price"
                      value={priceRange?.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: e?.target?.value }))}
                      className="flex-1"
                    />
                    <span className="text-muted-foreground">-</span>
                    <Input
                      type="number"
                      placeholder="Max price"
                      value={priceRange?.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: e?.target?.value }))}
                      className="flex-1"
                    />
                  </div>
                </div>

                {/* Year Range */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Year Range</label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      placeholder="Min year"
                      value={yearRange?.min}
                      onChange={(e) => setYearRange(prev => ({ ...prev, min: e?.target?.value }))}
                      className="flex-1"
                    />
                    <span className="text-muted-foreground">-</span>
                    <Input
                      type="number"
                      placeholder="Max year"
                      value={yearRange?.max}
                      onChange={(e) => setYearRange(prev => ({ ...prev, max: e?.target?.value }))}
                      className="flex-1"
                    />
                  </div>
                </div>

                {/* Hours Range */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Operating Hours</label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      placeholder="Min hours"
                      value={hoursRange?.min}
                      onChange={(e) => setHoursRange(prev => ({ ...prev, min: e?.target?.value }))}
                      className="flex-1"
                    />
                    <span className="text-muted-foreground">-</span>
                    <Input
                      type="number"
                      placeholder="Max hours"
                      value={hoursRange?.max}
                      onChange={(e) => setHoursRange(prev => ({ ...prev, max: e?.target?.value }))}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              {/* Filter Actions */}
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
                <div className="flex items-center space-x-4">
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="RotateCcw"
                      iconPosition="left"
                      iconSize={14}
                      onClick={handleClearFilters}
                    >
                      Clear All Filters
                    </Button>
                  )}
                  
                  <span className="text-sm text-muted-foreground">
                    {hasActiveFilters ? 'Filters applied' : 'No filters applied'}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Save"
                    iconPosition="left"
                    iconSize={14}
                  >
                    Save Search
                  </Button>
                  
                  <Button
                    variant="default"
                    size="sm"
                    iconName="Search"
                    iconPosition="left"
                    iconSize={14}
                    onClick={handleSearch}
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Searches */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Popular Searches
          </h3>
          
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'CAT Excavators',
              'Komatsu Bulldozers',
              'Volvo Loaders',
              'New Equipment',
              'Under $200k',
              'Low Hours'
            ]?.map((search, index) => (
              <button
                key={index}
                onClick={() => {
                  setSearchQuery(search);
                  handleSearch();
                }}
                className="px-4 py-2 bg-muted hover:bg-primary/10 hover:text-primary rounded-full text-sm font-medium text-foreground transition-colors duration-300"
              >
                {search}
              </button>
            ))}
          </div>
        </div>

        {/* Search Tips */}
        <div className="mt-12 bg-muted/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <Icon name="Lightbulb" size={20} className="mr-2 text-accent" />
            Search Tips
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-muted-foreground">
            <div className="flex items-start space-x-2">
              <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
              <span>Use specific model numbers for precise results</span>
            </div>
            <div className="flex items-start space-x-2">
              <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
              <span>Filter by location to reduce shipping costs</span>
            </div>
            <div className="flex items-start space-x-2">
              <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
              <span>Set realistic price ranges for better matches</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvancedSearch;