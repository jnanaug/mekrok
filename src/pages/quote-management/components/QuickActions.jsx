import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onAction, className = '' }) => {
  const actions = [
    {
      id: 'bulk-update',
      label: 'Bulk Update Status',
      icon: 'Edit',
      description: 'Update multiple quotes at once',
      variant: 'outline'
    },
    {
      id: 'export-quotes',
      label: 'Export Quotes',
      icon: 'Download',
      description: 'Download quote data as CSV',
      variant: 'outline'
    },
    {
      id: 'send-reminders',
      label: 'Send Follow-up Reminders',
      icon: 'Bell',
      description: 'Automated follow-up emails',
      variant: 'outline'
    },
    {
      id: 'generate-report',
      label: 'Generate Report',
      icon: 'BarChart3',
      description: 'Create performance analytics',
      variant: 'default'
    }
  ];

  const handleAction = (actionId) => {
    if (onAction) {
      onAction(actionId);
    }
  };

  return (
    <div className={`bg-white border border-border rounded-lg p-4 shadow-card ${className}`}>
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Zap" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {actions?.map((action) => (
          <div key={action?.id} className="group">
            <Button
              variant={action?.variant}
              size="sm"
              iconName={action?.icon}
              iconPosition="left"
              iconSize={16}
              onClick={() => handleAction(action?.id)}
              fullWidth
              className="h-auto py-3 flex-col items-start text-left"
            >
              <div className="font-medium">{action?.label}</div>
              <div className="text-xs text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {action?.description}
              </div>
            </Button>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="Clock" size={14} />
            <span>Last updated: {new Date()?.toLocaleTimeString()}</span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            iconName="RefreshCw"
            iconSize={14}
            onClick={() => handleAction('refresh')}
          >
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;