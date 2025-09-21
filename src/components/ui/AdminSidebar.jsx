import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AdminSidebar = ({ isCollapsed = false, onToggleCollapse }) => {
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/admin/dashboard',
      icon: 'LayoutDashboard',
      description: 'Overview & Analytics'
    },
    {
      label: 'Inventory Management',
      path: '/inventory-management',
      icon: 'Package',
      description: 'Equipment Catalog'
    },
    {
      label: 'Quote Management',
      path: '/quote-management',
      icon: 'FileText',
      description: 'Lead Processing'
    },
    {
      label: 'Suppliers',
      path: '/admin/suppliers',
      icon: 'Building2',
      description: 'Vendor Management'
    },
    {
      label: 'Reports',
      path: '/admin/reports',
      icon: 'BarChart3',
      description: 'Analytics & Insights'
    },
  ];

  const secondaryItems = [
    {
      label: 'Settings',
      path: '/admin/settings',
      icon: 'Settings',
      description: 'System Configuration'
    },
    {
      label: 'Help & Support',
      path: '/admin/help',
      icon: 'HelpCircle',
      description: 'Documentation'
    },
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <aside className={`fixed left-0 top-16 bottom-0 z-40 bg-white border-r border-border shadow-card transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <Icon name="Shield" size={16} color="white" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-foreground">Admin Panel</h2>
                <p className="text-xs text-muted-foreground">Management Console</p>
              </div>
            </div>
          )}
          
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="flex items-center justify-center w-8 h-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-300"
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <Icon 
                name={isCollapsed ? "ChevronRight" : "ChevronLeft"} 
                size={16} 
              />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {/* Primary Navigation */}
          <div className="space-y-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-300 group ${
                  isActivePath(item?.path)
                    ? 'text-primary bg-primary/10 border-r-2 border-primary' :'text-foreground hover:text-primary hover:bg-muted'
                }`}
                title={isCollapsed ? item?.label : ''}
              >
                <Icon 
                  name={item?.icon} 
                  size={18} 
                  className={`flex-shrink-0 ${
                    isActivePath(item?.path) ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'
                  }`}
                />
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{item?.label}</div>
                    <div className="text-xs text-muted-foreground">{item?.description}</div>
                  </div>
                )}
              </Link>
            ))}
          </div>

          {/* Divider */}
          {!isCollapsed && (
            <div className="my-4 border-t border-border"></div>
          )}

          {/* Secondary Navigation */}
          <div className="space-y-1">
            {secondaryItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-300 group ${
                  isActivePath(item?.path)
                    ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                title={isCollapsed ? item?.label : ''}
              >
                <Icon 
                  name={item?.icon} 
                  size={18} 
                  className="flex-shrink-0"
                />
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{item?.label}</div>
                    <div className="text-xs text-muted-foreground">{item?.description}</div>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border">
          {!isCollapsed ? (
            <div className="space-y-3">
              <div className="flex items-center space-x-3 px-3 py-2">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground">Admin User</div>
                  <div className="text-xs text-muted-foreground">admin@mekrok.com</div>
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                fullWidth
                iconName="LogOut"
                iconPosition="left"
                iconSize={14}
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              <button
                className="flex items-center justify-center w-8 h-8 rounded-full bg-accent text-white hover:bg-accent/80 transition-colors duration-300"
                title="Admin User"
              >
                <Icon name="User" size={16} />
              </button>
              <button
                className="flex items-center justify-center w-8 h-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-300"
                title="Sign Out"
              >
                <Icon name="LogOut" size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;