import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProductSpecsSection = ({ formData, updateFormData, errors, prefilledProduct }) => {
  const equipmentTypeOptions = [
    { value: '', label: 'Select equipment type' },
    { value: 'excavator', label: 'Excavator' },
    { value: 'bulldozer', label: 'Bulldozer' },
    { value: 'loader', label: 'Wheel Loader' },
    { value: 'dump-truck', label: 'Dump Truck' },
    { value: 'crusher', label: 'Crusher' },
    { value: 'drilling-rig', label: 'Drilling Rig' },
    { value: 'grader', label: 'Motor Grader' },
    { value: 'compactor', label: 'Compactor' },
    { value: 'other', label: 'Other Equipment' }
  ];

  const conditionOptions = [
    { value: '', label: 'Any condition' },
    { value: 'new', label: 'New' },
    { value: 'excellent', label: 'Excellent (Like New)' },
    { value: 'good', label: 'Good (Minor Wear)' },
    { value: 'fair', label: 'Fair (Moderate Wear)' },
    { value: 'refurbished', label: 'Refurbished' }
  ];

  const urgencyOptions = [
    { value: '', label: 'Select urgency level' },
    { value: 'immediate', label: 'Immediate (Within 1 week)' },
    { value: 'urgent', label: 'Urgent (Within 1 month)' },
    { value: 'standard', label: 'Standard (1-3 months)' },
    { value: 'flexible', label: 'Flexible (3+ months)' }
  ];

  const handleInputChange = (field, value) => {
    updateFormData('productSpecs', { ...formData?.productSpecs, [field]: value });
  };

  const handleSpecificationChange = (spec, checked) => {
    const currentSpecs = formData?.productSpecs?.specifications || [];
    const updatedSpecs = checked
      ? [...currentSpecs, spec]
      : currentSpecs?.filter(s => s !== spec);
    
    handleInputChange('specifications', updatedSpecs);
  };

  const addEquipmentItem = () => {
    const currentItems = formData?.productSpecs?.equipmentItems || [];
    const newItem = {
      id: Date.now(),
      type: '',
      brand: '',
      model: '',
      quantity: 1,
      specifications: ''
    };
    handleInputChange('equipmentItems', [...currentItems, newItem]);
  };

  const removeEquipmentItem = (itemId) => {
    const currentItems = formData?.productSpecs?.equipmentItems || [];
    const updatedItems = currentItems?.filter(item => item?.id !== itemId);
    handleInputChange('equipmentItems', updatedItems);
  };

  const updateEquipmentItem = (itemId, field, value) => {
    const currentItems = formData?.productSpecs?.equipmentItems || [];
    const updatedItems = currentItems?.map(item =>
      item?.id === itemId ? { ...item, [field]: value } : item
    );
    handleInputChange('equipmentItems', updatedItems);
  };

  return (
    <div className="bg-white rounded-lg border border-border p-6 space-y-6">
      <div className="flex items-center space-x-3 pb-4 border-b border-border">
        <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
          <Icon name="Settings" size={18} color="white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Equipment Specifications</h3>
          <p className="text-sm text-muted-foreground">Specify your equipment requirements</p>
        </div>
      </div>
      {prefilledProduct && (
        <div className="bg-muted rounded-lg p-4 border border-border">
          <div className="flex items-start space-x-4">
            <Image
              src={prefilledProduct?.image}
              alt={prefilledProduct?.name}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-foreground">{prefilledProduct?.name}</h4>
              <p className="text-sm text-muted-foreground">{prefilledProduct?.brand} • {prefilledProduct?.model}</p>
              <p className="text-sm text-primary font-medium">${prefilledProduct?.price?.toLocaleString()}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={() => updateFormData('productSpecs', { ...formData?.productSpecs, prefilledProduct: null })}
            />
          </div>
        </div>
      )}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-md font-medium text-foreground">Equipment Items</h4>
          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            iconSize={14}
            onClick={addEquipmentItem}
          >
            Add Equipment
          </Button>
        </div>

        {(formData?.productSpecs?.equipmentItems || [])?.map((item, index) => (
          <div key={item?.id} className="border border-border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h5 className="font-medium text-foreground">Equipment #{index + 1}</h5>
              {(formData?.productSpecs?.equipmentItems || [])?.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Trash2"
                  onClick={() => removeEquipmentItem(item?.id)}
                />
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Select
                label="Equipment Type"
                options={equipmentTypeOptions}
                value={item?.type || ''}
                onChange={(value) => updateEquipmentItem(item?.id, 'type', value)}
                required
              />

              <Input
                label="Brand/Manufacturer"
                type="text"
                placeholder="e.g., Caterpillar, Komatsu"
                value={item?.brand || ''}
                onChange={(e) => updateEquipmentItem(item?.id, 'brand', e?.target?.value)}
              />

              <Input
                label="Model"
                type="text"
                placeholder="Enter model number"
                value={item?.model || ''}
                onChange={(e) => updateEquipmentItem(item?.id, 'model', e?.target?.value)}
              />

              <Input
                label="Quantity"
                type="number"
                placeholder="1"
                min="1"
                value={item?.quantity || 1}
                onChange={(e) => updateEquipmentItem(item?.id, 'quantity', parseInt(e?.target?.value) || 1)}
                required
              />

              <Select
                label="Preferred Condition"
                options={conditionOptions}
                value={item?.condition || ''}
                onChange={(value) => updateEquipmentItem(item?.id, 'condition', value)}
              />

              <Input
                label="Max Operating Hours"
                type="number"
                placeholder="e.g., 5000"
                value={item?.maxHours || ''}
                onChange={(e) => updateEquipmentItem(item?.id, 'maxHours', e?.target?.value)}
              />
            </div>

            <Input
              label="Additional Specifications"
              type="text"
              placeholder="Specific requirements, attachments, or features needed"
              value={item?.specifications || ''}
              onChange={(e) => updateEquipmentItem(item?.id, 'specifications', e?.target?.value)}
              description="Include any specific attachments, features, or technical requirements"
            />
          </div>
        ))}

        {(!formData?.productSpecs?.equipmentItems || formData?.productSpecs?.equipmentItems?.length === 0) && (
          <div className="text-center py-8 border-2 border-dashed border-border rounded-lg">
            <Icon name="Package" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">No equipment items added yet</p>
            <Button
              variant="outline"
              iconName="Plus"
              iconPosition="left"
              iconSize={16}
              onClick={addEquipmentItem}
            >
              Add Your First Equipment
            </Button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Timeline Urgency"
          options={urgencyOptions}
          value={formData?.productSpecs?.urgency || ''}
          onChange={(value) => handleInputChange('urgency', value)}
          error={errors?.urgency}
          required
        />

        <Input
          label="Specific Delivery Date"
          type="date"
          value={formData?.productSpecs?.deliveryDate || ''}
          onChange={(e) => handleInputChange('deliveryDate', e?.target?.value)}
          description="If you have a specific date requirement"
        />
      </div>
      <div className="space-y-4">
        <h4 className="text-md font-medium text-foreground">Required Features & Specifications</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Checkbox
            label="Warranty Required"
            checked={(formData?.productSpecs?.specifications || [])?.includes('warranty')}
            onChange={(e) => handleSpecificationChange('warranty', e?.target?.checked)}
          />

          <Checkbox
            label="Service Manual Included"
            checked={(formData?.productSpecs?.specifications || [])?.includes('service-manual')}
            onChange={(e) => handleSpecificationChange('service-manual', e?.target?.checked)}
          />

          <Checkbox
            label="Inspection Report Required"
            checked={(formData?.productSpecs?.specifications || [])?.includes('inspection-report')}
            onChange={(e) => handleSpecificationChange('inspection-report', e?.target?.checked)}
          />

          <Checkbox
            label="Operator Training Included"
            checked={(formData?.productSpecs?.specifications || [])?.includes('training')}
            onChange={(e) => handleSpecificationChange('training', e?.target?.checked)}
          />

          <Checkbox
            label="Installation Support"
            checked={(formData?.productSpecs?.specifications || [])?.includes('installation')}
            onChange={(e) => handleSpecificationChange('installation', e?.target?.checked)}
          />

          <Checkbox
            label="Maintenance Package"
            checked={(formData?.productSpecs?.specifications || [])?.includes('maintenance')}
            onChange={(e) => handleSpecificationChange('maintenance', e?.target?.checked)}
          />
        </div>
      </div>
      <Input
        label="Additional Requirements"
        type="text"
        placeholder="Any other specific requirements or notes"
        value={formData?.productSpecs?.additionalRequirements || ''}
        onChange={(e) => handleInputChange('additionalRequirements', e?.target?.value)}
        description="Include any special requirements, certifications, or considerations"
      />
    </div>
  );
};

export default ProductSpecsSection;