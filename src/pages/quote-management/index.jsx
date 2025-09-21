import React, { useState, useEffect } from 'react';

import Button from '../../components/ui/Button';
import AdminSidebar from '../../components/ui/AdminSidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import QuoteStats from './components/QuoteStats';
import QuoteFilters from './components/QuoteFilters';
import QuoteTable from './components/QuoteTable';
import QuoteDetailsModal from './components/QuoteDetailsModal';
import QuickActions from './components/QuickActions';

const isLocalhost = typeof window !== 'undefined' && window.location && /^(localhost|127\.0\.0\.1)/.test(window.location.hostname);
const API_BASE = isLocalhost
  ? ''
  : (import.meta.env.VITE_API_BASE_URL || 'https://mekrok-mining-backend.onrender.com');

const QuoteManagement = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quotes, setQuotes] = useState([]); // All quotes from API
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [currentFilters, setCurrentFilters] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuotes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/api/quotes`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setQuotes(data);
      setFilteredQuotes(data); // Initialize filtered quotes with all quotes
    } catch (e) {
      console.error("Failed to fetch quotes:", e);
      setError("Failed to load quotes. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  // Calculate stats from live data
  const calculateStats = () => {
    const total = quotes.length;
    const newQuotes = quotes.filter(quote => quote.status === 'new').length;
    const inProgressQuotes = quotes.filter(quote => quote.status === 'in-progress').length;
    const quotedQuotes = quotes.filter(quote => quote.status === 'quoted').length;
    const closedQuotes = quotes.filter(quote => quote.status === 'closed').length;

    // Placeholder for change calculations - requires historical data or more complex logic
    // For simplicity, changes are hardcoded or set to 0 for now.
    return {
      total: total,
      totalChange: 0, 
      new: newQuotes,
      newChange: 0, 
      inProgress: inProgressQuotes,
      inProgressChange: 0, 
      quoted: quotedQuotes,
      quotedChange: 0, 
      closed: closedQuotes,
      closedChange: 0, 
      conversionRate: total > 0 ? Math.round((closedQuotes / total) * 100) : 0,
      conversionRateChange: 0 
    };
  };

  const stats = calculateStats();

  const breadcrumbItems = [
    { label: 'Admin', path: '/admin/dashboard' },
    { label: 'Quote Management', path: '/quote-management' }
  ];

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleQuoteSelect = (quote) => {
    setSelectedQuote(quote);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedQuote(null);
  };

  const handleStatusChange = async (quoteId, newStatus) => {
    try {
      const response = await fetch(`${API_BASE}/api/quotes`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: quoteId, status: newStatus, lastActivity: new Date() }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      fetchQuotes(); // Re-fetch quotes to update the list
    } catch (e) {
      console.error("Failed to update quote status:", e);
      setError("Failed to update quote status. Please try again.");
    }
  };

  const handleSendResponse = async (quoteId, message, template) => {
    const newCommunication = {
      type: 'email',
      sender: 'Admin User',
      content: message,
      timestamp: new Date()
    };

    // Find the quote to update its communications
    const quoteToUpdate = quotes.find(q => q.id === quoteId);
    if (!quoteToUpdate) {
      console.error("Quote not found for sending response:", quoteId);
      return;
    }

    const updatedCommunications = [...(quoteToUpdate.communications || []), newCommunication];
    const newStatus = template === 'closing' ? 'closed' : quoteToUpdate.status;

    try {
      const response = await fetch(`${API_BASE}/api/quotes`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id: quoteId, 
          communications: updatedCommunications, 
          lastActivity: new Date(),
          status: newStatus
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      fetchQuotes(); // Re-fetch quotes to update the list
      if (selectedQuote && selectedQuote.id === quoteId) {
        setSelectedQuote({ 
          ...selectedQuote, 
          communications: updatedCommunications, 
          lastActivity: new Date(),
          status: newStatus
        });
      }
    } catch (e) {
      console.error("Failed to send response:", e);
      setError("Failed to send response. Please try again.");
    }
  };

  const handleFilterChange = (filters) => {
    setCurrentFilters(filters);
    
    let filtered = [...quotes]; // Filter from the original fetched quotes
    
    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      filtered = filtered?.filter(quote =>
        quote?.customerName?.toLowerCase()?.includes(searchTerm) ||
        quote?.company?.toLowerCase()?.includes(searchTerm) ||
        quote?.equipmentName?.toLowerCase()?.includes(searchTerm) ||
        quote?.quoteId?.toLowerCase()?.includes(searchTerm)
      );
    }
    
    if (filters?.status) {
      filtered = filtered?.filter(quote => quote?.status === filters?.status);
    }
    
    if (filters?.priority) {
      filtered = filtered?.filter(quote => quote?.priority === filters?.priority);
    }
    
    if (filters?.dateRange) {
      const now = new Date();
      const filterDate = new Date();
      
      switch (filters?.dateRange) {
        case 'today':
          filterDate?.setHours(0, 0, 0, 0);
          filtered = filtered?.filter(quote => new Date(quote.submissionDate) >= filterDate);
          break;
        case 'week':
          filterDate?.setDate(now?.getDate() - 7);
          filtered = filtered?.filter(quote => new Date(quote.submissionDate) >= filterDate);
          break;
        case 'month':
          filterDate?.setMonth(now?.getMonth() - 1);
          filtered = filtered?.filter(quote => new Date(quote.submissionDate) >= filterDate);
          break;
        case 'quarter':
          filterDate?.setMonth(now?.getMonth() - 3);
          filtered = filtered?.filter(quote => new Date(quote.submissionDate) >= filterDate);
          break;
      }
    }
    
    setFilteredQuotes(filtered);
  };

  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case 'bulk-update': console.log('Bulk update action triggered');
        break;
      case 'export-quotes':
        console.log('Export quotes action triggered');
        break;
      case 'send-reminders': console.log('Send reminders action triggered');
        break;
      case 'generate-report': console.log('Generate report action triggered');
        break;
      case 'refresh':
        fetchQuotes();
        break;
      default:
        console.log('Unknown action:', actionId);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground text-lg">Loading quotes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-red-500 text-lg">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Sidebar */}
      <AdminSidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggleCollapse={handleToggleSidebar} 
      />

      {/* Main Content */}
      <div className={`transition-all duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <Breadcrumb items={breadcrumbItems} />
            
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Quote Management</h1>
                <p className="text-muted-foreground mt-1">
                  Process and track mining equipment quote requests
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="Filter"
                  iconPosition="left"
                  iconSize={16}
                >
                  Advanced Filters
                </Button>
                
                <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                  iconSize={16}
                >
                  Manual Quote Entry
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <QuoteStats stats={stats} className="mb-6" />

          {/* Quick Actions */}
          <QuickActions onAction={handleQuickAction} className="mb-6" />

          {/* Filters */}
          <QuoteFilters 
            onFilterChange={handleFilterChange}
            onSearch={(searchTerm) => handleFilterChange({ ...currentFilters, search: searchTerm })}
            className="mb-6"
          />

          {/* Quote Table */}
          <QuoteTable
            quotes={filteredQuotes}
            onQuoteSelect={handleQuoteSelect}
            onStatusChange={handleStatusChange}
          />

          {/* Quote Details Modal */}
          <QuoteDetailsModal
            quote={selectedQuote}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onStatusChange={handleStatusChange}
            onSendResponse={handleSendResponse}
          />
        </div>
      </div>
    </div>
  );
};

export default QuoteManagement;