import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const BudgetFinancingSection = ({ formData, updateFormData, errors }) => {
  const budgetRangeOptions = [
    { value: '', label: 'Select budget range' },
    { value: 'under-50k', label: 'Under $50,000' },
    { value: '50k-100k', label: '$50,000 - $100,000' },
    { value: '100k-250k', label: '$100,000 - $250,000' },
    { value: '250k-500k', label: '$250,000 - $500,000' },
    { value: '500k-1m', label: '$500,000 - $1,000,000' },
    { value: 'over-1m', label: 'Over $1,000,000' },
    { value: 'flexible', label: 'Flexible based on value' }
  ];

  const paymentTermOptions = [
    { value: '', label: 'Select payment terms' },
    { value: 'cash', label: 'Cash Payment' },
    { value: 'net-30', label: 'Net 30 Days' },
    { value: 'net-60', label: 'Net 60 Days' },
    { value: 'net-90', label: 'Net 90 Days' },
    { value: 'installments', label: 'Installment Payments' },
    { value: 'financing', label: 'Equipment Financing' },
    { value: 'lease', label: 'Equipment Lease' },
    { value: 'rent-to-own', label: 'Rent-to-Own' }
  ];

  const financingTypeOptions = [
    { value: '', label: 'Select financing type' },
    { value: 'bank-loan', label: 'Bank Loan' },
    { value: 'equipment-financing', label: 'Equipment Financing' },
    { value: 'lease-financing', label: 'Lease Financing' },
    { value: 'vendor-financing', label: 'Vendor Financing' },
    { value: 'government-grant', label: 'Government Grant' },
    { value: 'internal-funding', label: 'Internal Company Funding' }
  ];

  const handleInputChange = (field, value) => {
    updateFormData('budgetFinancing', { ...formData?.budgetFinancing, [field]: value });
  };

  const handleFinancingOptionChange = (option, checked) => {
    const currentOptions = formData?.budgetFinancing?.financingOptions || [];
    const updatedOptions = checked
      ? [...currentOptions, option]
      : currentOptions?.filter(opt => opt !== option);
    
    handleInputChange('financingOptions', updatedOptions);
  };

  const isFinancingRequired = formData?.budgetFinancing?.paymentTerms === 'financing' || 
                             formData?.budgetFinancing?.paymentTerms === 'lease' ||
                             (formData?.budgetFinancing?.financingOptions || [])?.length > 0;

  return (
    <div className="bg-white rounded-lg border border-border p-6 space-y-6">
      <div className="flex items-center space-x-3 pb-4 border-b border-border">
        <div className="w-8 h-8 bg-success rounded-lg flex items-center justify-center">
          <Icon name="DollarSign" size={18} color="white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Budget & Financing</h3>
          <p className="text-sm text-muted-foreground">Specify your budget and payment preferences</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Budget Range"
          options={budgetRangeOptions}
          value={formData?.budgetFinancing?.budgetRange || ''}
          onChange={(value) => handleInputChange('budgetRange', value)}
          error={errors?.budgetRange}
          required
        />

        <Input
          label="Specific Budget Amount"
          type="number"
          placeholder="Enter specific amount if known"
          value={formData?.budgetFinancing?.specificBudget || ''}
          onChange={(e) => handleInputChange('specificBudget', e?.target?.value)}
          description="Optional: Enter exact budget if different from range"
        />

        <Select
          label="Preferred Payment Terms"
          options={paymentTermOptions}
          value={formData?.budgetFinancing?.paymentTerms || ''}
          onChange={(value) => handleInputChange('paymentTerms', value)}
          error={errors?.paymentTerms}
          required
        />

        <Input
          label="Down Payment Available"
          type="number"
          placeholder="Enter down payment amount"
          value={formData?.budgetFinancing?.downPayment || ''}
          onChange={(e) => handleInputChange('downPayment', e?.target?.value)}
          description="Amount available for initial payment"
        />
      </div>
      <div className="space-y-4">
        <h4 className="text-md font-medium text-foreground">Financing Options</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Checkbox
            label="Equipment Financing"
            checked={(formData?.budgetFinancing?.financingOptions || [])?.includes('equipment-financing')}
            onChange={(e) => handleFinancingOptionChange('equipment-financing', e?.target?.checked)}
          />

          <Checkbox
            label="Lease-to-Own"
            checked={(formData?.budgetFinancing?.financingOptions || [])?.includes('lease-to-own')}
            onChange={(e) => handleFinancingOptionChange('lease-to-own', e?.target?.checked)}
          />

          <Checkbox
            label="Operating Lease"
            checked={(formData?.budgetFinancing?.financingOptions || [])?.includes('operating-lease')}
            onChange={(e) => handleFinancingOptionChange('operating-lease', e?.target?.checked)}
          />

          <Checkbox
            label="Rental with Purchase Option"
            checked={(formData?.budgetFinancing?.financingOptions || [])?.includes('rental-purchase')}
            onChange={(e) => handleFinancingOptionChange('rental-purchase', e?.target?.checked)}
          />

          <Checkbox
            label="Trade-in Available"
            checked={(formData?.budgetFinancing?.financingOptions || [])?.includes('trade-in')}
            onChange={(e) => handleFinancingOptionChange('trade-in', e?.target?.checked)}
          />

          <Checkbox
            label="Government Grant Funding"
            checked={(formData?.budgetFinancing?.financingOptions || [])?.includes('government-grant')}
            onChange={(e) => handleFinancingOptionChange('government-grant', e?.target?.checked)}
          />
        </div>
      </div>
      {isFinancingRequired && (
        <div className="bg-muted rounded-lg p-4 space-y-4">
          <h4 className="text-md font-medium text-foreground flex items-center space-x-2">
            <Icon name="CreditCard" size={16} />
            <span>Financing Details</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Financing Type"
              options={financingTypeOptions}
              value={formData?.budgetFinancing?.financingType || ''}
              onChange={(value) => handleInputChange('financingType', value)}
            />

            <Input
              label="Preferred Term Length"
              type="text"
              placeholder="e.g., 36 months, 5 years"
              value={formData?.budgetFinancing?.termLength || ''}
              onChange={(e) => handleInputChange('termLength', e?.target?.value)}
            />

            <Input
              label="Credit Score Range"
              type="text"
              placeholder="e.g., 700-750"
              value={formData?.budgetFinancing?.creditScore || ''}
              onChange={(e) => handleInputChange('creditScore', e?.target?.value)}
              description="Optional: Helps us find suitable financing options"
            />

            <Input
              label="Annual Revenue"
              type="number"
              placeholder="Company annual revenue"
              value={formData?.budgetFinancing?.annualRevenue || ''}
              onChange={(e) => handleInputChange('annualRevenue', e?.target?.value)}
              description="Required for financing pre-qualification"
            />
          </div>
        </div>
      )}
      {(formData?.budgetFinancing?.financingOptions || [])?.includes('trade-in') && (
        <div className="bg-muted rounded-lg p-4 space-y-4">
          <h4 className="text-md font-medium text-foreground flex items-center space-x-2">
            <Icon name="RefreshCw" size={16} />
            <span>Trade-in Information</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Trade-in Equipment Type"
              type="text"
              placeholder="e.g., Excavator, Bulldozer"
              value={formData?.budgetFinancing?.tradeInType || ''}
              onChange={(e) => handleInputChange('tradeInType', e?.target?.value)}
            />

            <Input
              label="Trade-in Brand & Model"
              type="text"
              placeholder="e.g., Caterpillar 320D"
              value={formData?.budgetFinancing?.tradeInModel || ''}
              onChange={(e) => handleInputChange('tradeInModel', e?.target?.value)}
            />

            <Input
              label="Trade-in Year"
              type="number"
              placeholder="Manufacturing year"
              value={formData?.budgetFinancing?.tradeInYear || ''}
              onChange={(e) => handleInputChange('tradeInYear', e?.target?.value)}
            />

            <Input
              label="Trade-in Operating Hours"
              type="number"
              placeholder="Total operating hours"
              value={formData?.budgetFinancing?.tradeInHours || ''}
              onChange={(e) => handleInputChange('tradeInHours', e?.target?.value)}
            />

            <Input
              label="Estimated Trade-in Value"
              type="number"
              placeholder="Your estimated value"
              value={formData?.budgetFinancing?.tradeInValue || ''}
              onChange={(e) => handleInputChange('tradeInValue', e?.target?.value)}
              className="md:col-span-2"
            />
          </div>
        </div>
      )}
      <div className="space-y-4">
        <h4 className="text-md font-medium text-foreground">Additional Financial Information</h4>
        
        <Input
          label="Purchase Authorization Level"
          type="text"
          placeholder="e.g., $500,000 without board approval"
          value={formData?.budgetFinancing?.authorizationLevel || ''}
          onChange={(e) => handleInputChange('authorizationLevel', e?.target?.value)}
          description="Maximum amount you can approve without additional authorization"
        />

        <Input
          label="Budget Approval Timeline"
          type="text"
          placeholder="e.g., 2 weeks for board approval"
          value={formData?.budgetFinancing?.approvalTimeline || ''}
          onChange={(e) => handleInputChange('approvalTimeline', e?.target?.value)}
          description="How long does your budget approval process take?"
        />

        <Input
          label="Financial Notes"
          type="text"
          placeholder="Any additional financial considerations or requirements"
          value={formData?.budgetFinancing?.financialNotes || ''}
          onChange={(e) => handleInputChange('financialNotes', e?.target?.value)}
        />
      </div>
    </div>
  );
};

export default BudgetFinancingSection;