import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActions = ({ selectedCount, onBulkAction, className = '' }) => {
  const [selectedAction, setSelectedAction] = useState('');
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const actionOptions = [
    { value: '', label: 'Select Action' },
    { value: 'update-status', label: 'Update Status' },
    { value: 'update-condition', label: 'Update Condition' },
    { value: 'export', label: 'Export Selected' },
    { value: 'duplicate', label: 'Duplicate Items' },
    { value: 'archive', label: 'Archive Items' },
    { value: 'delete', label: 'Delete Items' }
  ];

  const statusOptions = [
    { value: 'available', label: 'Available' },
    { value: 'sold', label: 'Sold' },
    { value: 'pending', label: 'Pending' },
    { value: 'maintenance', label: 'Maintenance' }
  ];

  const conditionOptions = [
    { value: 'new', label: 'New' },
    { value: 'excellent', label: 'Excellent' },
    { value: 'good', label: 'Good' },
    { value: 'fair', label: 'Fair' },
    { value: 'refurbished', label: 'Refurbished' }
  ];

  const handleActionSelect = (action) => {
    setSelectedAction(action);
    
    if (action === 'delete' || action === 'archive') {
      setIsConfirmOpen(true);
    } else if (action === 'export') {
      handleBulkAction(action);
    }
  };

  const handleBulkAction = (action, value = null) => {
    onBulkAction(action, value);
    setSelectedAction('');
    setIsConfirmOpen(false);
  };

  const getActionIcon = (action) => {
    const iconMap = {
      'update-status': 'RefreshCw',
      'update-condition': 'Settings',
      'export': 'Download',
      'duplicate': 'Copy',
      'archive': 'Archive',
      'delete': 'Trash2'
    };
    return iconMap?.[action] || 'Settings';
  };

  const getActionColor = (action) => {
    if (action === 'delete') return 'text-error';
    if (action === 'archive') return 'text-warning';
    return 'text-primary';
  };

  if (selectedCount === 0) return null;

  return (
    <>
      <div className={`bg-white border border-border rounded-lg shadow-card p-4 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon name="CheckSquare" size={16} color="white" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-foreground">
                {selectedCount} item{selectedCount !== 1 ? 's' : ''} selected
              </h3>
              <p className="text-xs text-muted-foreground">
                Choose an action to apply to selected equipment
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Select
              options={actionOptions}
              value={selectedAction}
              onChange={handleActionSelect}
              placeholder="Select action"
              className="min-w-48"
            />

            {/* Quick Action Buttons */}
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                iconName="Download"
                iconSize={14}
                onClick={() => handleBulkAction('export')}
                title="Export Selected"
              />
              
              <Button
                variant="ghost"
                size="sm"
                iconName="Copy"
                iconSize={14}
                onClick={() => handleBulkAction('duplicate')}
                title="Duplicate Selected"
              />
              
              <Button
                variant="ghost"
                size="sm"
                iconName="Archive"
                iconSize={14}
                onClick={() => handleBulkAction('archive')}
                title="Archive Selected"
                className="text-warning hover:text-warning"
              />
              
              <Button
                variant="ghost"
                size="sm"
                iconName="Trash2"
                iconSize={14}
                onClick={() => setIsConfirmOpen(true)}
                title="Delete Selected"
                className="text-error hover:text-error"
              />
            </div>
          </div>
        </div>

        {/* Action-specific Options */}
        {selectedAction === 'update-status' && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center space-x-3">
              <label className="text-sm font-medium text-foreground">New Status:</label>
              <Select
                options={statusOptions}
                value=""
                onChange={(value) => handleBulkAction('update-status', value)}
                placeholder="Select status"
                className="min-w-32"
              />
            </div>
          </div>
        )}

        {selectedAction === 'update-condition' && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center space-x-3">
              <label className="text-sm font-medium text-foreground">New Condition:</label>
              <Select
                options={conditionOptions}
                value=""
                onChange={(value) => handleBulkAction('update-condition', value)}
                placeholder="Select condition"
                className="min-w-32"
              />
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {isConfirmOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 transition-opacity bg-black bg-opacity-50"
              onClick={() => setIsConfirmOpen(false)}
            />

            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  selectedAction === 'delete' ? 'bg-error' : 'bg-warning'
                }`}>
                  <Icon 
                    name={getActionIcon(selectedAction)} 
                    size={20} 
                    color="white" 
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Confirm {selectedAction === 'delete' ? 'Delete' : 'Archive'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    This action cannot be undone
                  </p>
                </div>
              </div>

              <p className="text-sm text-foreground mb-6">
                Are you sure you want to {selectedAction === 'delete' ? 'delete' : 'archive'} {selectedCount} selected item{selectedCount !== 1 ? 's' : ''}?
                {selectedAction === 'delete' && ' This will permanently remove the equipment from your inventory.'}
                {selectedAction === 'archive' && ' This will move the equipment to your archived items.'}
              </p>

              <div className="flex items-center justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setIsConfirmOpen(false)}
                >
                  Cancel
                </Button>
                
                <Button
                  variant={selectedAction === 'delete' ? 'destructive' : 'warning'}
                  onClick={() => handleBulkAction(selectedAction)}
                  iconName={getActionIcon(selectedAction)}
                  iconPosition="left"
                  iconSize={16}
                >
                  {selectedAction === 'delete' ? 'Delete Items' : 'Archive Items'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BulkActions;