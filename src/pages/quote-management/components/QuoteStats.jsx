import React from 'react';
import Icon from '../../../components/AppIcon';

const QuoteStats = ({ stats, className = '' }) => {
  const statCards = [
    {
      id: 'total',
      label: 'Total Quotes',
      value: stats?.total || 0,
      icon: 'FileText',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      change: stats?.totalChange || 0
    },
    {
      id: 'new',
      label: 'New Quotes',
      value: stats?.new || 0,
      icon: 'Plus',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      change: stats?.newChange || 0
    },
    {
      id: 'inProgress',
      label: 'In Progress',
      value: stats?.inProgress || 0,
      icon: 'Clock',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      change: stats?.inProgressChange || 0
    },
    {
      id: 'quoted',
      label: 'Quoted',
      value: stats?.quoted || 0,
      icon: 'CheckCircle',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      change: stats?.quotedChange || 0
    },
    {
      id: 'closed',
      label: 'Closed Won',
      value: stats?.closed || 0,
      icon: 'Trophy',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
      change: stats?.closedChange || 0
    },
    {
      id: 'conversionRate',
      label: 'Conversion Rate',
      value: `${stats?.conversionRate || 0}%`,
      icon: 'TrendingUp',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
      change: stats?.conversionRateChange || 0
    }
  ];

  const formatChange = (change) => {
    if (change === 0) return null;
    const isPositive = change > 0;
    return (
      <div className={`flex items-center space-x-1 text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        <Icon name={isPositive ? 'TrendingUp' : 'TrendingDown'} size={12} />
        <span>{Math.abs(change)}%</span>
      </div>
    );
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 ${className}`}>
      {statCards?.map((stat) => (
        <div key={stat?.id} className="bg-white border border-border rounded-lg p-4 shadow-card">
          <div className="flex items-center justify-between mb-3">
            <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${stat?.bgColor}`}>
              <Icon name={stat?.icon} size={20} className={stat?.color} />
            </div>
            {formatChange(stat?.change)}
          </div>
          
          <div>
            <div className="text-2xl font-bold text-foreground mb-1">{stat?.value}</div>
            <div className="text-sm text-muted-foreground">{stat?.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuoteStats;