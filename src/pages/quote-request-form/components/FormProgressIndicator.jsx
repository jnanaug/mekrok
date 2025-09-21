import React from 'react';
import Icon from '../../../components/AppIcon';

const FormProgressIndicator = ({ currentStep, totalSteps, completedSections }) => {
  const steps = [
    { id: 1, label: 'Company Details', icon: 'Building2', key: 'companyDetails' },
    { id: 2, label: 'Product Specs', icon: 'Settings', key: 'productSpecs' },
    { id: 3, label: 'Budget & Financing', icon: 'DollarSign', key: 'budgetFinancing' },
    { id: 4, label: 'Delivery Requirements', icon: 'Truck', key: 'deliveryRequirements' },
    { id: 5, label: 'File Uploads', icon: 'Upload', key: 'fileUploads' },
    { id: 6, label: 'Review & Submit', icon: 'CheckCircle', key: 'review' }
  ];

  const getStepStatus = (step) => {
    if (step?.id < currentStep) return 'completed';
    if (step?.id === currentStep) return 'current';
    return 'upcoming';
  };

  const isStepCompleted = (stepKey) => {
    return completedSections?.includes(stepKey);
  };

  const getProgressPercentage = () => {
    return Math.round((completedSections?.length / (totalSteps - 1)) * 100);
  };

  return (
    <div className="bg-white rounded-lg border border-border p-6 sticky top-20">
      <div className="space-y-6">
        {/* Progress Header */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground">Quote Request Progress</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Step {currentStep} of {totalSteps}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Overall Progress</span>
            <span className="text-primary font-medium">{getProgressPercentage()}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        </div>

        {/* Step List */}
        <div className="space-y-1">
          {steps?.map((step, index) => {
            const status = getStepStatus(step);
            const isCompleted = isStepCompleted(step?.key);
            
            return (
              <div
                key={step?.id}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                  status === 'current' ?'bg-primary/10 border border-primary/20' 
                    : status === 'completed' ?'bg-success/5 border border-success/10' :'hover:bg-muted/50'
                }`}
              >
                {/* Step Icon */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  status === 'completed' || isCompleted
                    ? 'bg-success text-white'
                    : status === 'current' ?'bg-primary text-white' :'bg-muted text-muted-foreground'
                }`}>
                  {status === 'completed' || isCompleted ? (
                    <Icon name="Check" size={14} />
                  ) : (
                    <Icon name={step?.icon} size={14} />
                  )}
                </div>
                {/* Step Content */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium transition-colors duration-300 ${
                    status === 'current' ?'text-primary'
                      : status === 'completed' || isCompleted
                      ? 'text-success' :'text-foreground'
                  }`}>
                    {step?.label}
                  </p>
                  
                  {status === 'current' && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Currently editing
                    </p>
                  )}
                  
                  {(status === 'completed' || isCompleted) && (
                    <p className="text-xs text-success mt-1">
                      Completed
                    </p>
                  )}
                </div>
                {/* Step Status Indicator */}
                {status === 'current' && (
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                )}
              </div>
            );
          })}
        </div>

        {/* Completion Status */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Sections Completed</span>
            <span className="font-medium text-foreground">
              {completedSections?.length} / {totalSteps - 1}
            </span>
          </div>
          
          {completedSections?.length === totalSteps - 1 && (
            <div className="mt-3 p-3 bg-success/10 border border-success/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={16} className="text-success" />
                <p className="text-sm font-medium text-success">
                  Ready to submit!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className="pt-4 border-t border-border">
          <div className="text-center space-y-2">
            <p className="text-xs text-muted-foreground">
              Need help with your quote request?
            </p>
            <button className="text-xs text-primary hover:text-primary/80 transition-colors duration-300">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormProgressIndicator;