import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import Select from '../../../components/ui/Select';
import QuoteStatusBadge from './QuoteStatusBadge';

const QuoteDetailsModal = ({ quote, isOpen, onClose, onStatusChange, onSendResponse }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [responseMessage, setResponseMessage] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');

  if (!isOpen || !quote) return null;

  const templateOptions = [
    { value: '', label: 'Select template' },
    { value: 'initial-response', label: 'Initial Response' },
    { value: 'quote-provided', label: 'Quote Provided' },
    { value: 'follow-up', label: 'Follow-up Required' },
    { value: 'additional-info', label: 'Request Additional Info' },
    { value: 'closing', label: 'Closing Response' }
  ];

  const statusOptions = [
    { value: 'new', label: 'New' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'quoted', label: 'Quoted' },
    { value: 'follow-up', label: 'Follow-up Required' },
    { value: 'closed', label: 'Closed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const tabs = [
    { id: 'details', label: 'Quote Details', icon: 'FileText' },
    { id: 'communication', label: 'Communication', icon: 'MessageSquare' },
    { id: 'response', label: 'Send Response', icon: 'Send' }
  ];

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
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleStatusChange = (newStatus) => {
    if (onStatusChange) {
      onStatusChange(quote?.id, newStatus);
    }
  };

  const handleSendResponse = () => {
    if (onSendResponse) {
      onSendResponse(quote?.id, responseMessage, selectedTemplate);
    }
    setResponseMessage('');
    setSelectedTemplate('');
  };

  const loadTemplate = (templateId) => {
    const templates = {
      'initial-response': `Dear ${quote?.customerName},\n\nThank you for your interest in our mining equipment. We have received your quote request for ${quote?.equipmentName} and our team is currently reviewing your requirements.\n\nWe will get back to you within 24 hours with a detailed quote and availability information.\n\nBest regards,\nMekRok Sales Team`,
      'quote-provided': `Dear ${quote?.customerName},\n\nPlease find attached our detailed quote for the ${quote?.equipmentName} you requested. The quote includes:\n\n- Equipment specifications\n- Pricing breakdown\n- Delivery timeline\n- Warranty information\n\nPlease review and let us know if you have any questions.\n\nBest regards,\nMekRok Sales Team`,
      'follow-up': `Dear ${quote?.customerName},\n\nI wanted to follow up on the quote we provided for ${quote?.equipmentName}. Do you have any questions about our proposal?\n\nWe're here to help and can discuss any modifications to meet your specific requirements.\n\nBest regards,\nMekRok Sales Team`,
      'additional-info': `Dear ${quote?.customerName},\n\nTo provide you with the most accurate quote for ${quote?.equipmentName}, we need some additional information:\n\n- Specific delivery location\n- Preferred delivery timeline\n- Any special requirements or modifications\n\nPlease provide these details so we can finalize your quote.\n\nBest regards,\nMekRok Sales Team`,
      'closing': `Dear ${quote?.customerName},\n\nThank you for choosing MekRok for your mining equipment needs. We're pleased to confirm your order for ${quote?.equipmentName}.\n\nNext steps:\n- Contract finalization\n- Payment processing\n- Delivery scheduling\n\nOur team will be in touch shortly to coordinate the details.\n\nBest regards,\nMekRok Sales Team`
    };
    
    if (templates?.[templateId]) {
      setResponseMessage(templates?.[templateId]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-modal w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Quote #{quote?.quoteId}</h2>
              <p className="text-sm text-muted-foreground">{quote?.customerName} • {quote?.company}</p>
            </div>
            <QuoteStatusBadge status={quote?.status} priority={quote?.priority} />
          </div>
          
          <div className="flex items-center space-x-2">
            <Select
              options={statusOptions}
              value={quote?.status}
              onChange={handleStatusChange}
              className="w-40"
            />
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              iconSize={16}
              onClick={onClose}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-colors duration-300 ${
                activeTab === tab?.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'details' && (
            <div className="space-y-6">
              {/* Customer Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Customer Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Name</label>
                      <p className="text-foreground">{quote?.customerName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Company</label>
                      <p className="text-foreground">{quote?.company}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Email</label>
                      <p className="text-foreground">{quote?.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Phone</label>
                      <p className="text-foreground">{quote?.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Location</label>
                      <p className="text-foreground">{quote?.location}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Equipment Requirements</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Equipment</label>
                      <p className="text-foreground">{quote?.equipmentName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Type</label>
                      <p className="text-foreground">{quote?.equipmentType}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Quantity</label>
                      <p className="text-foreground">{quote?.quantity} units</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Budget</label>
                      <p className="text-foreground">{formatCurrency(quote?.budget)} ({quote?.budgetType})</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Delivery Timeline</label>
                      <p className="text-foreground">{quote?.deliveryTimeline}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Requirements */}
              {quote?.requirements && (
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Additional Requirements</h3>
                  <div className="bg-muted rounded-lg p-4">
                    <p className="text-foreground whitespace-pre-wrap">{quote?.requirements}</p>
                  </div>
                </div>
              )}

              {/* Submission Details */}
              <div className="border-t border-border pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Submitted on:</span>
                  <span className="text-foreground">{formatDate(quote?.submissionDate)}</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-muted-foreground">Last activity:</span>
                  <span className="text-foreground">{formatDate(quote?.lastActivity)}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'communication' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Communication History</h3>
              
              {quote?.communications && quote?.communications?.length > 0 ? (
                <div className="space-y-4">
                  {quote?.communications?.map((comm, index) => (
                    <div key={index} className="border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Icon name={comm?.type === 'email' ? 'Mail' : 'Phone'} size={16} className="text-primary" />
                          <span className="font-medium text-foreground">{comm?.type === 'email' ? 'Email' : 'Phone Call'}</span>
                          <span className="text-sm text-muted-foreground">by {comm?.sender}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{formatDate(comm?.timestamp)}</span>
                      </div>
                      <p className="text-foreground whitespace-pre-wrap">{comm?.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Icon name="MessageSquare" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No communication history yet</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'response' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Send Response</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Use Template"
                  options={templateOptions}
                  value={selectedTemplate}
                  onChange={(value) => {
                    setSelectedTemplate(value);
                    if (value) loadTemplate(value);
                  }}
                />
                
                <div className="flex items-end">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Paperclip"
                    iconPosition="left"
                    iconSize={14}
                  >
                    Attach Files
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                <textarea
                  value={responseMessage}
                  onChange={(e) => setResponseMessage(e?.target?.value)}
                  placeholder="Type your response message here..."
                  rows={8}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center space-x-2">
                  <Icon name="Info" size={14} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Response will be sent to {quote?.email}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Save"
                    iconPosition="left"
                    iconSize={14}
                  >
                    Save Draft
                  </Button>
                  
                  <Button
                    variant="default"
                    size="sm"
                    iconName="Send"
                    iconPosition="left"
                    iconSize={14}
                    onClick={handleSendResponse}
                    disabled={!responseMessage?.trim()}
                  >
                    Send Response
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteDetailsModal;