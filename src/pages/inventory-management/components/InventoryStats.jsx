import React from 'react';
import Icon from '../../../components/AppIcon';

const InventoryStats = ({ stats = {}, className = '' }) => {
  const defaultStats = {
    totalEquipment: 0,
    availableEquipment: 0,
    soldEquipment: 0,
    pendingEquipment: 0,
    totalValue: 0,
    averagePrice: 0,
    recentlyAdded: 0,
    lowStock: 0
  };

  const currentStats = { ...defaultStats, ...stats };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(amount);
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat('en-US')?.format(number);
  };

  const getPercentage = (value, total) => {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  };

  const statCards = [
    {
      title: 'Total Equipment',
      value: formatNumber(currentStats?.totalEquipment),
      icon: 'Package',
      color: 'bg-primary',
      textColor: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Available',
      value: formatNumber(currentStats?.availableEquipment),
      subtitle: `${getPercentage(currentStats?.availableEquipment, currentStats?.totalEquipment)}% of total`,
      icon: 'CheckCircle',
      color: 'bg-success',
      textColor: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Sold This Month',
      value: formatNumber(currentStats?.soldEquipment),
      subtitle: `${getPercentage(currentStats?.soldEquipment, currentStats?.totalEquipment)}% of total`,
      icon: 'TrendingUp',
      color: 'bg-accent',
      textColor: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      title: 'Pending Sales',
      value: formatNumber(currentStats?.pendingEquipment),
      subtitle: `${getPercentage(currentStats?.pendingEquipment, currentStats?.totalEquipment)}% of total`,
      icon: 'Clock',
      color: 'bg-warning',
      textColor: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      title: 'Total Inventory Value',
      value: formatCurrency(currentStats?.totalValue),
      subtitle: `Avg: ${formatCurrency(currentStats?.averagePrice)}`,
      icon: 'DollarSign',
      color: 'bg-primary',
      textColor: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Recently Added',
      value: formatNumber(currentStats?.recentlyAdded),
      subtitle: 'Last 7 days',
      icon: 'Plus',
      color: 'bg-secondary',
      textColor: 'text-secondary',
      bgColor: 'bg-secondary/10'
    }
  ];

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 ${className}`}>
      {statCards?.map((stat, index) => (
        <div key={index} className="bg-white border border-border rounded-lg shadow-card p-4 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 rounded-lg ${stat?.color} flex items-center justify-center`}>
              <Icon name={stat?.icon} size={20} color="white" />
            </div>
            
            <div className={`px-2 py-1 rounded-full ${stat?.bgColor}`}>
              <Icon name="TrendingUp" size={12} className={stat?.textColor} />
            </div>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-foreground">{stat?.value}</h3>
            <p className="text-sm font-medium text-muted-foreground">{stat?.title}</p>
            {stat?.subtitle && (
              <p className="text-xs text-muted-foreground">{stat?.subtitle}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InventoryStats;