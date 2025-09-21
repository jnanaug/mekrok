import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const EquipmentModal = ({ isOpen, onClose, equipment = null, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    manufacturer: '',
    model: '',
    category: '',
    year: '',
    hours: '',
    condition: '',
    price: '',
    location: '',
    status: 'available',
    description: '',
    specifications: {
      enginePower: '',
      operatingWeight: '',
      bucketCapacity: '',
      maxDigDepth: '',
      maxReach: ''
    },
    images: [],
    documents: []
  });

  const [activeTab, setActiveTab] = useState('basic');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (equipment) {
      setFormData({
        name: equipment?.name || '',
        manufacturer: equipment?.manufacturer || '',
        model: equipment?.model || '',
        category: equipment?.category || '',
        year: equipment?.year?.toString() || '',
        hours: equipment?.hours?.toString() || '',
        condition: equipment?.condition || '',
        price: equipment?.price?.toString() || '',
        location: equipment?.location || '',
        status: equipment?.status || 'available',
        description: equipment?.description || '',
        specifications: equipment?.specifications || {
          enginePower: '',
          operatingWeight: '',
          bucketCapacity: '',
          maxDigDepth: '',
          maxReach: ''
        },
        images: equipment?.images || [],
        documents: equipment?.documents || []
      });
    } else {
      // Reset form for new equipment
      setFormData({
        name: '',
        manufacturer: '',
        model: '',
        category: '',
        year: '',
        hours: '',
        condition: '',
        price: '',
        location: '',
        status: 'available',
        description: '',
        specifications: {
          enginePower: '',
          operatingWeight: '',
          bucketCapacity: '',
          maxDigDepth: '',
          maxReach: ''
        },
        images: [],
        documents: []
      });
    }
  }, [equipment, isOpen]);

  const categoryOptions = [
    { value: 'excavators', label: 'Excavators' },
    { value: 'bulldozers', label: 'Bulldozers' },
    { value: 'loaders', label: 'Loaders' },
    { value: 'dump-trucks', label: 'Dump Trucks' },
    { value: 'crushers', label: 'Crushers' },
    { value: 'drilling', label: 'Drilling Equipment' }
  ];

  const manufacturerOptions = [
    { value: 'caterpillar', label: 'Caterpillar' },
    { value: 'komatsu', label: 'Komatsu' },
    { value: 'volvo', label: 'Volvo' },
    { value: 'liebherr', label: 'Liebherr' },
    { value: 'hitachi', label: 'Hitachi' }
  ];

  const conditionOptions = [
    { value: 'new', label: 'New' },
    { value: 'excellent', label: 'Excellent' },
    { value: 'good', label: 'Good' },
    { value: 'fair', label: 'Fair' },
    { value: 'refurbished', label: 'Refurbished' }
  ];

  const statusOptions = [
    { value: 'available', label: 'Available' },
    { value: 'sold', label: 'Sold' },
    { value: 'pending', label: 'Pending' },
    { value: 'maintenance', label: 'Maintenance' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSpecificationChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      specifications: { ...prev?.specifications, [field]: value }
    }));
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event?.target?.files);
    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      const newImages = files?.map((file, index) => ({
        id: Date.now() + index,
        url: URL.createObjectURL(file),
        name: file?.name,
        size: file?.size
      }));
      
      setFormData(prev => ({
        ...prev,
        images: [...prev?.images, ...newImages]
      }));
      setIsUploading(false);
    }, 1000);
  };

  const handleRemoveImage = (imageId) => {
    setFormData(prev => ({
      ...prev,
      images: prev?.images?.filter(img => img?.id !== imageId)
    }));
  };

  const handleSave = () => {
    const equipmentData = {
      ...formData,
      id: equipment?.id || Date.now(),
      year: parseInt(formData?.year),
      hours: parseInt(formData?.hours),
      price: parseFloat(formData?.price),
      updatedAt: new Date()?.toISOString()
    };
    
    onSave(equipmentData);
    onClose();
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: 'Info' },
    { id: 'specifications', label: 'Specifications', icon: 'Settings' },
    { id: 'media', label: 'Images & Documents', icon: 'Image' },
    { id: 'pricing', label: 'Pricing & Status', icon: 'DollarSign' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 transition-opacity bg-black bg-opacity-50"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
          {/* Modal Header */}
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Package" size={20} color="white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {equipment ? 'Edit Equipment' : 'Add New Equipment'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {equipment ? 'Update equipment details' : 'Add equipment to inventory'}
                </p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="flex items-center justify-center w-8 h-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-300"
            >
              <Icon name="X" size={16} />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 mt-4 bg-muted rounded-lg p-1">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  activeTab === tab?.id
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span className="hidden sm:inline">{tab?.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mt-6 max-h-96 overflow-y-auto">
            {/* Basic Info Tab */}
            {activeTab === 'basic' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Equipment Name"
                    type="text"
                    placeholder="Enter equipment name"
                    value={formData?.name}
                    onChange={(e) => handleInputChange('name', e?.target?.value)}
                    required
                  />
                  
                  <Select
                    label="Category"
                    options={categoryOptions}
                    value={formData?.category}
                    onChange={(value) => handleInputChange('category', value)}
                    placeholder="Select category"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label="Manufacturer"
                    options={manufacturerOptions}
                    value={formData?.manufacturer}
                    onChange={(value) => handleInputChange('manufacturer', value)}
                    placeholder="Select manufacturer"
                    searchable
                    required
                  />
                  
                  <Input
                    label="Model"
                    type="text"
                    placeholder="Enter model"
                    value={formData?.model}
                    onChange={(e) => handleInputChange('model', e?.target?.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="Year"
                    type="number"
                    placeholder="Enter year"
                    value={formData?.year}
                    onChange={(e) => handleInputChange('year', e?.target?.value)}
                    required
                  />
                  
                  <Input
                    label="Operating Hours"
                    type="number"
                    placeholder="Enter hours"
                    value={formData?.hours}
                    onChange={(e) => handleInputChange('hours', e?.target?.value)}
                  />
                  
                  <Select
                    label="Condition"
                    options={conditionOptions}
                    value={formData?.condition}
                    onChange={(value) => handleInputChange('condition', value)}
                    placeholder="Select condition"
                    required
                  />
                </div>

                <Input
                  label="Location"
                  type="text"
                  placeholder="Enter location"
                  value={formData?.location}
                  onChange={(e) => handleInputChange('location', e?.target?.value)}
                  required
                />

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Description</label>
                  <textarea
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    rows={4}
                    placeholder="Enter equipment description..."
                    value={formData?.description}
                    onChange={(e) => handleInputChange('description', e?.target?.value)}
                  />
                </div>
              </div>
            )}

            {/* Specifications Tab */}
            {activeTab === 'specifications' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Engine Power (HP)"
                    type="text"
                    placeholder="e.g., 300 HP"
                    value={formData?.specifications?.enginePower}
                    onChange={(e) => handleSpecificationChange('enginePower', e?.target?.value)}
                  />
                  
                  <Input
                    label="Operating Weight (lbs)"
                    type="text"
                    placeholder="e.g., 45,000 lbs"
                    value={formData?.specifications?.operatingWeight}
                    onChange={(e) => handleSpecificationChange('operatingWeight', e?.target?.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Bucket Capacity (yd³)"
                    type="text"
                    placeholder="e.g., 2.5 yd³"
                    value={formData?.specifications?.bucketCapacity}
                    onChange={(e) => handleSpecificationChange('bucketCapacity', e?.target?.value)}
                  />
                  
                  <Input
                    label="Max Dig Depth (ft)"
                    type="text"
                    placeholder="e.g., 22 ft"
                    value={formData?.specifications?.maxDigDepth}
                    onChange={(e) => handleSpecificationChange('maxDigDepth', e?.target?.value)}
                  />
                </div>

                <Input
                  label="Max Reach (ft)"
                  type="text"
                  placeholder="e.g., 32 ft"
                  value={formData?.specifications?.maxReach}
                  onChange={(e) => handleSpecificationChange('maxReach', e?.target?.value)}
                />
              </div>
            )}

            {/* Media Tab */}
            {activeTab === 'media' && (
              <div className="space-y-6">
                {/* Image Upload */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Equipment Images</label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Icon name="Upload" size={32} className="text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload images or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PNG, JPG, GIF up to 10MB each
                      </p>
                    </label>
                  </div>

                  {/* Image Preview */}
                  {formData?.images?.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      {formData?.images?.map((image) => (
                        <div key={image?.id} className="relative group">
                          <div className="w-full h-24 rounded-lg overflow-hidden bg-muted">
                            <Image
                              src={image?.url}
                              alt={image?.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button
                            onClick={() => handleRemoveImage(image?.id)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-error text-error-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          >
                            <Icon name="X" size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {isUploading && (
                    <div className="flex items-center justify-center py-4">
                      <Icon name="Loader2" size={20} className="animate-spin text-primary mr-2" />
                      <span className="text-sm text-muted-foreground">Uploading images...</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Pricing & Status Tab */}
            {activeTab === 'pricing' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Price (USD)"
                    type="number"
                    placeholder="Enter price"
                    value={formData?.price}
                    onChange={(e) => handleInputChange('price', e?.target?.value)}
                    required
                  />
                  
                  <Select
                    label="Status"
                    options={statusOptions}
                    value={formData?.status}
                    onChange={(value) => handleInputChange('status', value)}
                    required
                  />
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-border mt-6">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            
            <Button
              variant="default"
              onClick={handleSave}
              iconName="Save"
              iconPosition="left"
              iconSize={16}
            >
              {equipment ? 'Update Equipment' : 'Add Equipment'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentModal;