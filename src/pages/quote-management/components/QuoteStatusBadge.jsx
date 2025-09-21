import React from 'react';
import Icon from '../../../components/AppIcon';

const QuoteStatusBadge = ({ status, priority = 'normal', className = '' }) => {
  const getStatusConfig = (status) => {
    const configs = {
      new: {
        label: 'New',
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-800',
        icon: 'Plus',
        iconColor: 'text-blue-600'
      },
      'in-progress': {
        label: 'In Progress',
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-800',
        icon: 'Clock',
        iconColor: 'text-yellow-600'
      },
      quoted: {
        label: 'Quoted',
        bgColor: 'bg-purple-100',
        textColor: 'text-purple-800',
        icon: 'FileText',
        iconColor: 'text-purple-600'
      },
      'follow-up': {
        label: 'Follow-up Required',
        bgColor: 'bg-orange-100',
        textColor: 'text-orange-800',
        icon: 'AlertCircle',
        iconColor: 'text-orange-600'
      },
      closed: {
        label: 'Closed',
        bgColor: 'bg-green-100',
        textColor: 'text-green-800',
        icon: 'CheckCircle',
        iconColor: 'text-green-600'
      },
      cancelled: {
        label: 'Cancelled',
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-800',
        icon: 'XCircle',
        iconColor: 'text-gray-600'
      }
    };
    return configs?.[status] || configs?.new;
  };

  const getPriorityIndicator = (priority) => {
    if (priority === 'high') {
      return <div className="w-2 h-2 bg-red-500 rounded-full absolute -top-1 -right-1"></div>;
    }
    if (priority === 'urgent') {
      return <div className="w-2 h-2 bg-red-600 rounded-full absolute -top-1 -right-1 animate-pulse"></div>;
    }
    return null;
  };

  const config = getStatusConfig(status);

  return (
    <div className={`relative inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-medium ${config?.bgColor} ${config?.textColor} ${className}`}>
      <Icon name={config?.icon} size={12} className={config?.iconColor} />
      <span>{config?.label}</span>
      {getPriorityIndicator(priority)}
    </div>
  );
};

export default QuoteStatusBadge;