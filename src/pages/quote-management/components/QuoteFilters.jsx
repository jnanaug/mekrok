import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const QuoteFilters = ({ onFilterChange, onSearch, className = '' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [dateRange, setDateRange] = useState('');

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'new', label: 'New' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'quoted', label: 'Quoted' },
    { value: 'follow-up', label: 'Follow-up Required' },
    { value: 'closed', label: 'Closed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const priorityOptions = [
    { value: '', label: 'All Priorities' },
    { value: 'low', label: 'Low Priority' },
    { value: 'normal', label: 'Normal Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const dateRangeOptions = [
    { value: '', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' }
  ];

  const handleSearch = () => {
    const filters = {
      search: searchQuery,
      status: selectedStatus,
      priority: selectedPriority,
      dateRange: dateRange
    };
    
    if (onFilterChange) {
      onFilterChange(filters);
    }
    
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedStatus('');
    setSelectedPriority('');
    setDateRange('');
    
    if (onFilterChange) {
      onFilterChange({
        search: '',
        status: '',
        priority: '',
        dateRange: ''
      });
    }
  };

  return (
    <div className={`bg-white border border-border rounded-lg p-4 shadow-card ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Filter Quotes</h3>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          iconName="RotateCcw"
          iconPosition="left"
          iconSize={14}
          onClick={handleClearFilters}
        >
          Clear All
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Input
          type="search"
          placeholder="Search quotes, customers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e?.target?.value)}
          className="w-full"
        />

        <Select
          placeholder="Filter by status"
          options={statusOptions}
          value={selectedStatus}
          onChange={setSelectedStatus}
        />

        <Select
          placeholder="Filter by priority"
          options={priorityOptions}
          value={selectedPriority}
          onChange={setSelectedPriority}
        />

        <Select
          placeholder="Filter by date"
          options={dateRangeOptions}
          value={dateRange}
          onChange={setDateRange}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Info" size={14} />
          <span>Use filters to narrow down quote results</span>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            iconSize={14}
          >
            Export
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
  );
};

export default QuoteFilters;