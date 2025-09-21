import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import QuoteStatusBadge from './QuoteStatusBadge';

const QuoteTable = ({ quotes = [], onQuoteSelect, onStatusChange, className = '' }) => {
  const [sortField, setSortField] = useState('submissionDate');
  const [sortDirection, setSortDirection] = useState('desc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return 'ArrowUpDown';
    return sortDirection === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const diffInHours = Math.floor((now - new Date(date)) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return formatDate(date);
  };

  const sortedQuotes = [...quotes]?.sort((a, b) => {
    let aValue = a?.[sortField];
    let bValue = b?.[sortField];
    
    if (sortField === 'submissionDate' || sortField === 'lastActivity') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <div className={`bg-white border border-border rounded-lg shadow-card overflow-hidden ${className}`}>
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('quoteId')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-colors duration-300"
                >
                  <span>Quote ID</span>
                  <Icon name={getSortIcon('quoteId')} size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('customerName')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-colors duration-300"
                >
                  <span>Customer</span>
                  <Icon name={getSortIcon('customerName')} size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <span className="text-sm font-medium text-foreground">Equipment</span>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('budget')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-colors duration-300"
                >
                  <span>Budget</span>
                  <Icon name={getSortIcon('budget')} size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <span className="text-sm font-medium text-foreground">Status</span>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('submissionDate')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-colors duration-300"
                >
                  <span>Submitted</span>
                  <Icon name={getSortIcon('submissionDate')} size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <span className="text-sm font-medium text-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedQuotes?.map((quote) => (
              <tr key={quote?.id} className="border-b border-border hover:bg-muted/50 transition-colors duration-300">
                <td className="p-4">
                  <div className="font-mono text-sm text-primary font-medium">
                    #{quote?.quoteId}
                  </div>
                </td>
                <td className="p-4">
                  <div>
                    <div className="font-medium text-foreground">{quote?.customerName}</div>
                    <div className="text-sm text-muted-foreground">{quote?.company}</div>
                    <div className="text-xs text-muted-foreground">{quote?.email}</div>
                  </div>
                </td>
                <td className="p-4">
                  <div>
                    <div className="font-medium text-foreground">{quote?.equipmentName}</div>
                    <div className="text-sm text-muted-foreground">{quote?.equipmentType}</div>
                    <div className="text-xs text-muted-foreground">Qty: {quote?.quantity}</div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="font-medium text-foreground">
                    {formatCurrency(quote?.budget)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {quote?.budgetType}
                  </div>
                </td>
                <td className="p-4">
                  <QuoteStatusBadge status={quote?.status} priority={quote?.priority} />
                </td>
                <td className="p-4">
                  <div className="text-sm text-foreground">{formatDate(quote?.submissionDate)}</div>
                  <div className="text-xs text-muted-foreground">{getTimeAgo(quote?.submissionDate)}</div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      iconSize={14}
                      onClick={() => onQuoteSelect && onQuoteSelect(quote)}
                    >
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="MessageSquare"
                      iconSize={14}
                    >
                      Reply
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4 p-4">
        {sortedQuotes?.map((quote) => (
          <div key={quote?.id} className="border border-border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-mono text-sm text-primary font-medium">#{quote?.quoteId}</div>
                <div className="font-medium text-foreground">{quote?.customerName}</div>
                <div className="text-sm text-muted-foreground">{quote?.company}</div>
              </div>
              <QuoteStatusBadge status={quote?.status} priority={quote?.priority} />
            </div>

            <div className="space-y-2">
              <div>
                <div className="text-sm font-medium text-foreground">{quote?.equipmentName}</div>
                <div className="text-xs text-muted-foreground">{quote?.equipmentType} • Qty: {quote?.quantity}</div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Budget:</span>
                <span className="font-medium text-foreground">{formatCurrency(quote?.budget)}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Submitted:</span>
                <span className="text-foreground">{getTimeAgo(quote?.submissionDate)}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2 border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                iconName="Eye"
                iconPosition="left"
                iconSize={14}
                onClick={() => onQuoteSelect && onQuoteSelect(quote)}
                fullWidth
              >
                View Details
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="MessageSquare"
                iconPosition="left"
                iconSize={14}
                fullWidth
              >
                Reply
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Empty State */}
      {quotes?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No quotes found</h3>
          <p className="text-muted-foreground">Try adjusting your filters or search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default QuoteTable;