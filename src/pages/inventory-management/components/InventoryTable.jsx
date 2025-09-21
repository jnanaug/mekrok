import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const InventoryTable = ({ 
  equipment = [], 
  selectedItems = [], 
  onSelectItem, 
  onSelectAll, 
  onEdit, 
  onDuplicate, 
  onDelete,
  onViewDetails 
}) => {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      available: { color: 'bg-success text-success-foreground', label: 'Available' },
      sold: { color: 'bg-muted text-muted-foreground', label: 'Sold' },
      pending: { color: 'bg-warning text-warning-foreground', label: 'Pending' },
      maintenance: { color: 'bg-error text-error-foreground', label: 'Maintenance' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.available;
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const getConditionBadge = (condition) => {
    const conditionConfig = {
      new: { color: 'bg-success text-success-foreground', label: 'New' },
      excellent: { color: 'bg-primary text-primary-foreground', label: 'Excellent' },
      good: { color: 'bg-accent text-accent-foreground', label: 'Good' },
      fair: { color: 'bg-warning text-warning-foreground', label: 'Fair' },
      refurbished: { color: 'bg-secondary text-secondary-foreground', label: 'Refurbished' }
    };
    
    const config = conditionConfig?.[condition] || conditionConfig?.good;
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })?.format(price);
  };

  const isAllSelected = equipment?.length > 0 && selectedItems?.length === equipment?.length;
  const isPartiallySelected = selectedItems?.length > 0 && selectedItems?.length < equipment?.length;

  return (
    <div className="bg-white border border-border rounded-lg shadow-card overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = isPartiallySelected;
                  }}
                  onChange={(e) => onSelectAll(e?.target?.checked)}
                  className="w-4 h-4 text-primary bg-white border-border rounded focus:ring-primary focus:ring-2"
                />
              </th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Equipment</th>
              <th 
                className="text-left px-4 py-3 text-sm font-semibold text-foreground cursor-pointer hover:text-primary"
                onClick={() => handleSort('category')}
              >
                <div className="flex items-center space-x-1">
                  <span>Category</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th 
                className="text-left px-4 py-3 text-sm font-semibold text-foreground cursor-pointer hover:text-primary"
                onClick={() => handleSort('condition')}
              >
                <div className="flex items-center space-x-1">
                  <span>Condition</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th 
                className="text-left px-4 py-3 text-sm font-semibold text-foreground cursor-pointer hover:text-primary"
                onClick={() => handleSort('price')}
              >
                <div className="flex items-center space-x-1">
                  <span>Price</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th 
                className="text-left px-4 py-3 text-sm font-semibold text-foreground cursor-pointer hover:text-primary"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center space-x-1">
                  <span>Status</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Location</th>
              <th className="text-right px-4 py-3 text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {equipment?.map((item) => (
              <tr key={item?.id} className="hover:bg-muted/50 transition-colors duration-200">
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selectedItems?.includes(item?.id)}
                    onChange={(e) => onSelectItem(item?.id, e?.target?.checked)}
                    className="w-4 h-4 text-primary bg-white border-border rounded focus:ring-primary focus:ring-2"
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <Image
                        src={item?.images?.[0] || '/assets/images/no_image.png'}
                        alt={item?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-foreground truncate">{item?.name}</div>
                      <div className="text-xs text-muted-foreground">{item?.manufacturer} • {item?.model}</div>
                      <div className="text-xs text-muted-foreground">{item?.year} • {item?.hours?.toLocaleString()} hrs</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm text-foreground capitalize">{item?.category}</span>
                </td>
                <td className="px-4 py-4">
                  {getConditionBadge(item?.condition)}
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm font-medium text-foreground">{formatPrice(item?.price)}</div>
                </td>
                <td className="px-4 py-4">
                  {getStatusBadge(item?.status)}
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm text-foreground">{item?.location}</div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      iconSize={14}
                      onClick={() => onViewDetails(item)}
                      className="text-muted-foreground hover:text-primary"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Edit"
                      iconSize={14}
                      onClick={() => onEdit(item)}
                      className="text-muted-foreground hover:text-primary"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Copy"
                      iconSize={14}
                      onClick={() => onDuplicate(item)}
                      className="text-muted-foreground hover:text-primary"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Trash2"
                      iconSize={14}
                      onClick={() => onDelete(item)}
                      className="text-muted-foreground hover:text-error"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-border">
        {equipment?.map((item) => (
          <div key={item?.id} className="p-4">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={selectedItems?.includes(item?.id)}
                onChange={(e) => onSelectItem(item?.id, e?.target?.checked)}
                className="w-4 h-4 text-primary bg-white border-border rounded focus:ring-primary focus:ring-2 mt-1"
              />
              
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                <Image
                  src={item?.images?.[0] || '/assets/images/no_image.png'}
                  alt={item?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-medium text-foreground truncate">{item?.name}</h3>
                    <p className="text-xs text-muted-foreground">{item?.manufacturer} • {item?.model}</p>
                    <p className="text-xs text-muted-foreground">{item?.year} • {item?.hours?.toLocaleString()} hrs</p>
                  </div>
                  
                  <div className="flex items-center space-x-1 ml-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      iconSize={14}
                      onClick={() => onViewDetails(item)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="MoreVertical"
                      iconSize={14}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-2">
                    {getConditionBadge(item?.condition)}
                    {getStatusBadge(item?.status)}
                  </div>
                  <div className="text-sm font-medium text-foreground">{formatPrice(item?.price)}</div>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground">{item?.location}</span>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="Edit"
                      iconSize={12}
                      onClick={() => onEdit(item)}
                    />
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="Copy"
                      iconSize={12}
                      onClick={() => onDuplicate(item)}
                    />
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="Trash2"
                      iconSize={12}
                      onClick={() => onDelete(item)}
                      className="text-error"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {equipment?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Package" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No equipment found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
          <Button variant="outline" iconName="Plus" iconPosition="left">
            Add Equipment
          </Button>
        </div>
      )}
    </div>
  );
};

export default InventoryTable;