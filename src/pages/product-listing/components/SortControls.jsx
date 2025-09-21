import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SortControls = ({ 
  sortBy, 
  onSortChange, 
  viewMode, 
  onViewModeChange, 
  resultCount, 
  currentPage, 
  totalPages 
}) => {
  const sortOptions = [
    { value: 'relevance', label: 'Best Match' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'year-new', label: 'Year: Newest First' },
    { value: 'year-old', label: 'Year: Oldest First' },
    { value: 'hours-low', label: 'Hours: Low to High' },
    { value: 'hours-high', label: 'Hours: High to Low' },
    { value: 'location', label: 'Location' },
    { value: 'updated', label: 'Recently Updated' },
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-card p-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Results Info */}
        <div className="flex items-center space-x-4">
          <div className="text-sm text-foreground">
            <span className="font-semibold">{resultCount}</span> equipment found
            {totalPages > 1 && (
              <span className="text-muted-foreground ml-2">
                (Page {currentPage} of {totalPages})
              </span>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          {/* Sort Controls */}
          <div className="flex items-center space-x-2">
            <Icon name="ArrowUpDown" size={16} className="text-muted-foreground" />
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={onSortChange}
              placeholder="Sort by"
              className="min-w-48"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-1 bg-muted rounded-md p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              iconName="Grid3X3"
              iconSize={16}
              onClick={() => onViewModeChange('grid')}
              className="px-3"
              title="Grid View"
            >
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              iconName="List"
              iconSize={16}
              onClick={() => onViewModeChange('list')}
              className="px-3"
              title="List View"
            >
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconSize={14}
              title="Export Results"
            >
              Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Share"
              iconSize={14}
              title="Share Search"
            >
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortControls;