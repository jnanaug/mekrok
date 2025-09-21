import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const DeliveryRequirementsSection = ({ formData, updateFormData, errors }) => {
  const deliveryLocationOptions = [
    { value: '', label: 'Select delivery location type' },
    { value: 'mine-site', label: 'Mine Site' },
    { value: 'warehouse', label: 'Warehouse/Depot' },
    { value: 'construction-site', label: 'Construction Site' },
    { value: 'port', label: 'Port/Terminal' },
    { value: 'dealer-location', label: 'Dealer Location' },
    { value: 'other', label: 'Other Location' }
  ];

  const accessLimitationOptions = [
    { value: '', label: 'Select access limitations' },
    { value: 'none', label: 'No Limitations' },
    { value: 'weight-restricted', label: 'Weight Restricted Roads' },
    { value: 'height-restricted', label: 'Height Restrictions' },
    { value: 'narrow-roads', label: 'Narrow Access Roads' },
    { value: 'remote-location', label: 'Remote Location' },
    { value: 'special-permits', label: 'Special Permits Required' },
    { value: 'crane-required', label: 'Crane Required for Unloading' }
  ];

  const logisticsPartnerOptions = [
    { value: '', label: 'No preference' },
    { value: 'mekrok-logistics', label: 'MekRok Logistics (Recommended)' },
    { value: 'customer-arranged', label: 'Customer Arranged' },
    { value: 'supplier-arranged', label: 'Supplier Arranged' },
    { value: 'third-party', label: 'Specific Third Party' }
  ];

  const handleInputChange = (field, value) => {
    updateFormData('deliveryRequirements', { ...formData?.deliveryRequirements, [field]: value });
  };

  const handleServiceChange = (service, checked) => {
    const currentServices = formData?.deliveryRequirements?.additionalServices || [];
    const updatedServices = checked
      ? [...currentServices, service]
      : currentServices?.filter(s => s !== service);
    
    handleInputChange('additionalServices', updatedServices);
  };

  return (
    <div className="bg-white rounded-lg border border-border p-6 space-y-6">
      <div className="flex items-center space-x-3 pb-4 border-b border-border">
        <div className="w-8 h-8 bg-warning rounded-lg flex items-center justify-center">
          <Icon name="Truck" size={18} color="white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Delivery Requirements</h3>
          <p className="text-sm text-muted-foreground">Specify delivery location and logistics needs</p>
        </div>
      </div>
      <div className="space-y-4">
        <h4 className="text-md font-medium text-foreground">Delivery Location</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Location Type"
            options={deliveryLocationOptions}
            value={formData?.deliveryRequirements?.locationType || ''}
            onChange={(value) => handleInputChange('locationType', value)}
            error={errors?.locationType}
            required
          />

          <Input
            label="Site Name"
            type="text"
            placeholder="Enter site or facility name"
            value={formData?.deliveryRequirements?.siteName || ''}
            onChange={(e) => handleInputChange('siteName', e?.target?.value)}
            error={errors?.siteName}
            required
          />
        </div>

        <Input
          label="Delivery Address"
          type="text"
          placeholder="Enter complete delivery address"
          value={formData?.deliveryRequirements?.deliveryAddress || ''}
          onChange={(e) => handleInputChange('deliveryAddress', e?.target?.value)}
          error={errors?.deliveryAddress}
          required
          className="md:col-span-2"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="City"
            type="text"
            placeholder="Enter city"
            value={formData?.deliveryRequirements?.city || ''}
            onChange={(e) => handleInputChange('city', e?.target?.value)}
            error={errors?.city}
            required
          />

          <Input
            label="State/Province"
            type="text"
            placeholder="Enter state or province"
            value={formData?.deliveryRequirements?.state || ''}
            onChange={(e) => handleInputChange('state', e?.target?.value)}
            error={errors?.state}
            required
          />

          <Input
            label="ZIP/Postal Code"
            type="text"
            placeholder="Enter ZIP or postal code"
            value={formData?.deliveryRequirements?.zipCode || ''}
            onChange={(e) => handleInputChange('zipCode', e?.target?.value)}
            error={errors?.zipCode}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="GPS Coordinates (Optional)"
            type="text"
            placeholder="e.g., 40.7128, -74.0060"
            value={formData?.deliveryRequirements?.gpsCoordinates || ''}
            onChange={(e) => handleInputChange('gpsCoordinates', e?.target?.value)}
            description="Helpful for remote locations"
          />

          <Input
            label="Site Contact Person"
            type="text"
            placeholder="On-site contact name"
            value={formData?.deliveryRequirements?.siteContact || ''}
            onChange={(e) => handleInputChange('siteContact', e?.target?.value)}
            required
          />

          <Input
            label="Site Contact Phone"
            type="tel"
            placeholder="On-site contact phone"
            value={formData?.deliveryRequirements?.siteContactPhone || ''}
            onChange={(e) => handleInputChange('siteContactPhone', e?.target?.value)}
            required
          />

          <Input
            label="Operating Hours"
            type="text"
            placeholder="e.g., Mon-Fri 7AM-5PM"
            value={formData?.deliveryRequirements?.operatingHours || ''}
            onChange={(e) => handleInputChange('operatingHours', e?.target?.value)}
            description="Site operating hours for delivery"
          />
        </div>
      </div>
      <div className="space-y-4">
        <h4 className="text-md font-medium text-foreground">Access & Logistics</h4>
        
        <Select
          label="Access Limitations"
          options={accessLimitationOptions}
          value={formData?.deliveryRequirements?.accessLimitations || ''}
          onChange={(value) => handleInputChange('accessLimitations', value)}
          error={errors?.accessLimitations}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Maximum Load Weight"
            type="number"
            placeholder="Weight limit in tons"
            value={formData?.deliveryRequirements?.maxWeight || ''}
            onChange={(e) => handleInputChange('maxWeight', e?.target?.value)}
            description="Road/bridge weight restrictions"
          />

          <Input
            label="Maximum Height Clearance"
            type="number"
            placeholder="Height limit in feet"
            value={formData?.deliveryRequirements?.maxHeight || ''}
            onChange={(e) => handleInputChange('maxHeight', e?.target?.value)}
            description="Bridge/tunnel height restrictions"
          />

          <Input
            label="Road Width"
            type="number"
            placeholder="Minimum road width in feet"
            value={formData?.deliveryRequirements?.roadWidth || ''}
            onChange={(e) => handleInputChange('roadWidth', e?.target?.value)}
            description="Narrowest point on access route"
          />

          <Input
            label="Turning Radius"
            type="number"
            placeholder="Minimum turning radius in feet"
            value={formData?.deliveryRequirements?.turningRadius || ''}
            onChange={(e) => handleInputChange('turningRadius', e?.target?.value)}
            description="Tightest turn on access route"
          />
        </div>

        <Input
          label="Special Access Requirements"
          type="text"
          placeholder="Describe any special access considerations"
          value={formData?.deliveryRequirements?.specialAccess || ''}
          onChange={(e) => handleInputChange('specialAccess', e?.target?.value)}
          description="Security clearances, permits, escorts, etc."
        />
      </div>
      <div className="space-y-4">
        <h4 className="text-md font-medium text-foreground">Logistics Preferences</h4>
        
        <Select
          label="Preferred Logistics Partner"
          options={logisticsPartnerOptions}
          value={formData?.deliveryRequirements?.logisticsPartner || ''}
          onChange={(value) => handleInputChange('logisticsPartner', value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Preferred Delivery Date"
            type="date"
            value={formData?.deliveryRequirements?.preferredDate || ''}
            onChange={(e) => handleInputChange('preferredDate', e?.target?.value)}
          />

          <Input
            label="Latest Acceptable Date"
            type="date"
            value={formData?.deliveryRequirements?.latestDate || ''}
            onChange={(e) => handleInputChange('latestDate', e?.target?.value)}
          />
        </div>

        <Input
          label="Delivery Time Preferences"
          type="text"
          placeholder="e.g., Morning delivery preferred, avoid Fridays"
          value={formData?.deliveryRequirements?.timePreferences || ''}
          onChange={(e) => handleInputChange('timePreferences', e?.target?.value)}
        />
      </div>
      <div className="space-y-4">
        <h4 className="text-md font-medium text-foreground">Additional Services</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Checkbox
            label="Unloading Service Required"
            checked={(formData?.deliveryRequirements?.additionalServices || [])?.includes('unloading')}
            onChange={(e) => handleServiceChange('unloading', e?.target?.checked)}
          />

          <Checkbox
            label="Crane Service Required"
            checked={(formData?.deliveryRequirements?.additionalServices || [])?.includes('crane')}
            onChange={(e) => handleServiceChange('crane', e?.target?.checked)}
          />

          <Checkbox
            label="Assembly/Setup Service"
            checked={(formData?.deliveryRequirements?.additionalServices || [])?.includes('assembly')}
            onChange={(e) => handleServiceChange('assembly', e?.target?.checked)}
          />

          <Checkbox
            label="Delivery Inspection"
            checked={(formData?.deliveryRequirements?.additionalServices || [])?.includes('inspection')}
            onChange={(e) => handleServiceChange('inspection', e?.target?.checked)}
          />

          <Checkbox
            label="Insurance Coverage"
            checked={(formData?.deliveryRequirements?.additionalServices || [])?.includes('insurance')}
            onChange={(e) => handleServiceChange('insurance', e?.target?.checked)}
          />

          <Checkbox
            label="Tracking & Updates"
            checked={(formData?.deliveryRequirements?.additionalServices || [])?.includes('tracking')}
            onChange={(e) => handleServiceChange('tracking', e?.target?.checked)}
          />
        </div>
      </div>
      <Input
        label="Special Delivery Instructions"
        type="text"
        placeholder="Any additional delivery requirements or instructions"
        value={formData?.deliveryRequirements?.specialInstructions || ''}
        onChange={(e) => handleInputChange('specialInstructions', e?.target?.value)}
        description="Include any specific requirements, safety protocols, or site procedures"
      />
    </div>
  );
};

export default DeliveryRequirementsSection;