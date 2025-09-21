import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConditionReport = ({ conditionData = {} }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const {
    overallCondition = 'Good',
    lastInspectionDate = '2024-08-15',
    inspectorName = 'John Smith',
    inspectorCertification = 'Certified Equipment Inspector',
    maintenanceHistory = [],
    inspectionChecklist = {},
    certifications = [],
    warrantyInfo = {}
  } = conditionData;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Eye' },
    { id: 'maintenance', label: 'Maintenance History', icon: 'Wrench' },
    { id: 'inspection', label: 'Inspection Checklist', icon: 'CheckSquare' },
    { id: 'certifications', label: 'Certifications', icon: 'Award' },
    { id: 'warranty', label: 'Warranty', icon: 'Shield' },
  ];

  const getConditionColor = (condition) => {
    const colors = {
      'Excellent': 'text-success',
      'Good': 'text-primary',
      'Fair': 'text-warning',
      'Poor': 'text-error',
      'Needs Attention': 'text-warning'
    };
    return colors?.[condition] || 'text-muted-foreground';
  };

  const mockMaintenanceHistory = [
    {
      date: '2024-08-01',
      type: 'Routine Service',
      description: 'Oil change, filter replacement, hydraulic system check',
      cost: 850,
      technician: 'Mike Johnson'
    },
    {
      date: '2024-06-15',
      type: 'Repair',
      description: 'Replaced hydraulic hose, track tension adjustment',
      cost: 1200,
      technician: 'Sarah Wilson'
    },
    {
      date: '2024-04-20',
      type: 'Major Service',
      description: 'Engine overhaul, transmission service, complete inspection',
      cost: 4500,
      technician: 'Robert Davis'
    }
  ];

  const mockInspectionChecklist = {
    engine: { status: 'Good', notes: 'Engine runs smoothly, no unusual noises or leaks detected' },
    hydraulics: { status: 'Excellent', notes: 'All hydraulic functions operate properly, no leaks' },
    tracks: { status: 'Fair', notes: 'Some wear on track pads, replacement recommended within 6 months' },
    cab: { status: 'Good', notes: 'Interior in good condition, all controls functional' },
    undercarriage: { status: 'Good', notes: 'Normal wear for operating hours, no major issues' },
    electrical: { status: 'Excellent', notes: 'All electrical systems functioning properly' }
  };

  const mockCertifications = [
    {
      name: 'EPA Tier 4 Compliance',
      issueDate: '2023-01-15',
      expiryDate: '2025-01-15',
      status: 'Valid'
    },
    {
      name: 'Safety Inspection Certificate',
      issueDate: '2024-08-15',
      expiryDate: '2025-08-15',
      status: 'Valid'
    },
    {
      name: 'Manufacturer Quality Assurance',
      issueDate: '2023-12-01',
      expiryDate: '2024-12-01',
      status: 'Expired'
    }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-semibold text-foreground mb-3 flex items-center">
            <Icon name="ClipboardCheck" size={18} className="mr-2 text-primary" />
            Inspection Summary
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Overall Condition:</span>
              <span className={`font-medium ${getConditionColor(overallCondition)}`}>
                {overallCondition}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Inspection:</span>
              <span className="font-medium text-foreground">
                {new Date(lastInspectionDate)?.toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Inspector:</span>
              <span className="font-medium text-foreground">{inspectorName}</span>
            </div>
          </div>
        </div>

        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-semibold text-foreground mb-3 flex items-center">
            <Icon name="TrendingUp" size={18} className="mr-2 text-primary" />
            Condition Score
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Engine</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 h-2 bg-muted rounded-full">
                  <div className="w-4/5 h-2 bg-success rounded-full"></div>
                </div>
                <span className="text-sm font-medium">85%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Hydraulics</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 h-2 bg-muted rounded-full">
                  <div className="w-full h-2 bg-success rounded-full"></div>
                </div>
                <span className="text-sm font-medium">95%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Tracks</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 h-2 bg-muted rounded-full">
                  <div className="w-3/5 h-2 bg-warning rounded-full"></div>
                </div>
                <span className="text-sm font-medium">65%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-muted/50 p-4 rounded-lg">
        <h4 className="font-semibold text-foreground mb-3 flex items-center">
          <Icon name="AlertTriangle" size={18} className="mr-2 text-warning" />
          Key Findings & Recommendations
        </h4>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
            <span>Engine and hydraulic systems in excellent working condition</span>
          </li>
          <li className="flex items-start space-x-2">
            <Icon name="AlertCircle" size={16} className="text-warning mt-0.5 flex-shrink-0" />
            <span>Track pads showing moderate wear - replacement recommended within 6 months</span>
          </li>
          <li className="flex items-start space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
            <span>All safety systems operational and up to current standards</span>
          </li>
          <li className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
            <span>Regular maintenance schedule has been followed consistently</span>
          </li>
        </ul>
      </div>
    </div>
  );

  const renderMaintenance = () => (
    <div className="space-y-4">
      {mockMaintenanceHistory?.map((record, index) => (
        <div key={index} className="bg-muted/50 p-4 rounded-lg">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-semibold text-foreground">{record?.type}</h4>
              <p className="text-sm text-muted-foreground">
                {new Date(record.date)?.toLocaleDateString()} • {record?.technician}
              </p>
            </div>
            <span className="text-lg font-bold text-primary">
              ${record?.cost?.toLocaleString()}
            </span>
          </div>
          <p className="text-sm text-foreground">{record?.description}</p>
        </div>
      ))}
    </div>
  );

  const renderInspection = () => (
    <div className="space-y-4">
      {Object.entries(mockInspectionChecklist)?.map(([component, data]) => (
        <div key={component} className="bg-muted/50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-foreground capitalize">{component}</h4>
            <span className={`px-2 py-1 rounded text-sm font-medium ${getConditionColor(data?.status)} bg-current/10`}>
              {data?.status}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{data?.notes}</p>
        </div>
      ))}
    </div>
  );

  const renderCertifications = () => (
    <div className="space-y-4">
      {mockCertifications?.map((cert, index) => (
        <div key={index} className="bg-muted/50 p-4 rounded-lg">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-semibold text-foreground">{cert?.name}</h4>
              <p className="text-sm text-muted-foreground">
                Issued: {new Date(cert.issueDate)?.toLocaleDateString()}
              </p>
              <p className="text-sm text-muted-foreground">
                Expires: {new Date(cert.expiryDate)?.toLocaleDateString()}
              </p>
            </div>
            <span className={`px-2 py-1 rounded text-sm font-medium ${
              cert?.status === 'Valid' ? 'text-success bg-success/10' : 'text-error bg-error/10'
            }`}>
              {cert?.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderWarranty = () => (
    <div className="bg-muted/50 p-4 rounded-lg">
      <h4 className="font-semibold text-foreground mb-3 flex items-center">
        <Icon name="Shield" size={18} className="mr-2 text-primary" />
        Warranty Information
      </h4>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Manufacturer Warranty:</span>
          <span className="font-medium text-foreground">Expired</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Extended Warranty:</span>
          <span className="font-medium text-success">Available</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Parts Warranty:</span>
          <span className="font-medium text-foreground">90 Days</span>
        </div>
        <div className="pt-2 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Extended warranty options available through certified dealers. 
            Contact us for detailed warranty coverage information.
          </p>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'maintenance':
        return renderMaintenance();
      case 'inspection':
        return renderInspection();
      case 'certifications':
        return renderCertifications();
      case 'warranty':
        return renderWarranty();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground flex items-center">
          <Icon name="FileCheck" size={24} className="mr-2 text-primary" />
          Condition Report
        </h2>
        
        <Button
          variant="outline"
          size="sm"
          iconName="Download"
          iconPosition="left"
          iconSize={16}
        >
          Download PDF
        </Button>
      </div>
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-300 ${
                activeTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </nav>
      </div>
      {/* Tab Content */}
      <div className="min-h-[400px]">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ConditionReport;