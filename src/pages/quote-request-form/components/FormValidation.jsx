import React from 'react';
import Icon from '../../../components/AppIcon';

const FormValidation = ({ errors, warnings, isVisible }) => {
  if (!isVisible || (Object.keys(errors)?.length === 0 && Object.keys(warnings)?.length === 0)) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg border border-border p-4 space-y-4">
      {/* Errors */}
      {Object.keys(errors)?.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-error" />
            <h4 className="text-sm font-medium text-error">
              Please fix the following errors:
            </h4>
          </div>
          <ul className="space-y-1 ml-6">
            {Object.entries(errors)?.map(([field, error]) => (
              <li key={field} className="text-sm text-error">
                • {error}
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Warnings */}
      {Object.keys(warnings)?.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <h4 className="text-sm font-medium text-warning">
              Recommendations:
            </h4>
          </div>
          <ul className="space-y-1 ml-6">
            {Object.entries(warnings)?.map(([field, warning]) => (
              <li key={field} className="text-sm text-warning">
                • {warning}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FormValidation;