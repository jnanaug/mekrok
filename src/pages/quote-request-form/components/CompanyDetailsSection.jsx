import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button'; // Import Button

const CompanyDetailsSection = ({
  formData,
  updateFormData,
  errors,
  validateField,
  otpSent,
  setOtpSent,
  otpVerified,
  setOtpVerified,
  otpCode,
  setOtpCode,
  otpError,
  setOtpError,
  otpTimer,
  setOtpTimer,
  handleSendOtp,
  handleVerifyOtp
}) => {
  const companyTypeOptions = [
    { value: '', label: 'Select company type' },
    { value: 'mining-company', label: 'Mining Company' },
    { value: 'contractor', label: 'Mining Contractor' },
    { value: 'equipment-dealer', label: 'Equipment Dealer' },
    { value: 'rental-company', label: 'Equipment Rental' },
    { value: 'other', label: 'Other' }
  ];

  const companySizeOptions = [
    { value: '', label: 'Select company size' },
    { value: 'startup', label: 'Startup (1-10 employees)' },
    { value: 'small', label: 'Small (11-50 employees)' },
    { value: 'medium', label: 'Medium (51-200 employees)' },
    { value: 'large', label: 'Large (201-1000 employees)' },
    { value: 'enterprise', label: 'Enterprise (1000+ employees)' }
  ];

  const contactPreferenceOptions = [
    { value: '', label: 'Select preferred contact method' },
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone Call' },
    { value: 'whatsapp', label: 'WhatsApp' },
    { value: 'video-call', label: 'Video Call' }
  ];

  const handleInputChange = (field, value) => {
    updateFormData('companyDetails', { ...formData?.companyDetails, [field]: value });
  };

  const handleCertificationChange = (certification, checked) => {
    const currentCertifications = formData?.companyDetails?.certifications || [];
    const updatedCertifications = checked
      ? [...currentCertifications, certification]
      : currentCertifications?.filter(cert => cert !== certification);
    
    handleInputChange('certifications', updatedCertifications);
  };

  return (
    <div className="bg-white rounded-lg border border-border p-6 space-y-6">
      <div className="flex items-center space-x-3 pb-4 border-b border-border">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <Icon name="Building2" size={18} color="white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Company Information</h3>
          <p className="text-sm text-muted-foreground">Tell us about your organization</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Company Name"
          type="text"
          placeholder="Enter your company name"
          value={formData?.companyDetails?.companyName || ''}
          onChange={(e) => handleInputChange('companyName', e?.target?.value)}
          error={errors?.companyName}
          required
        />

        <Select
          label="Company Type"
          options={companyTypeOptions}
          value={formData?.companyDetails?.companyType || ''}
          onChange={(value) => handleInputChange('companyType', value)}
          error={errors?.companyType}
          required
        />

        <Input
          label="Tax ID / Registration Number"
          type="text"
          placeholder="Enter tax ID or registration number"
          value={formData?.companyDetails?.taxId || ''}
          onChange={(e) => handleInputChange('taxId', e?.target?.value)}
          error={errors?.taxId}
        />

        <Select
          label="Company Size"
          options={companySizeOptions}
          value={formData?.companyDetails?.companySize || ''}
          onChange={(value) => handleInputChange('companySize', value)}
          error={errors?.companySize}
        />
      </div>
      <div className="space-y-4">
        <h4 className="text-md font-medium text-foreground">Business Address</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Street Address"
            type="text"
            placeholder="Enter street address"
            value={formData?.companyDetails?.address || ''}
            onChange={(e) => handleInputChange('address', e?.target?.value)}
            error={errors?.address}
            required
            className="md:col-span-2"
          />

          <Input
            label="City"
            type="text"
            placeholder="Enter city"
            value={formData?.companyDetails?.city || ''}
            onChange={(e) => handleInputChange('city', e?.target?.value)}
            error={errors?.city}
            required
          />

          <Input
            label="State/Province"
            type="text"
            placeholder="Enter state or province"
            value={formData?.companyDetails?.state || ''}
            onChange={(e) => handleInputChange('state', e?.target?.value)}
            error={errors?.state}
            required
          />

          <Input
            label="ZIP/Postal Code"
            type="text"
            placeholder="Enter ZIP or postal code"
            value={formData?.companyDetails?.zipCode || ''}
            onChange={(e) => handleInputChange('zipCode', e?.target?.value)}
            error={errors?.zipCode}
            required
          />

          <Input
            label="Country"
            type="text"
            placeholder="Enter country"
            value={formData?.companyDetails?.country || ''}
            onChange={(e) => handleInputChange('country', e?.target?.value)}
            error={errors?.country}
            required
          />
        </div>
      </div>
      <div className="space-y-4">
        <h4 className="text-md font-medium text-foreground">Primary Contact</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter contact person's name"
            value={formData?.companyDetails?.contactName || ''}
            onChange={(e) => handleInputChange('contactName', e?.target?.value)}
            error={errors?.contactName}
            required
          />

          <Input
            label="Job Title"
            type="text"
            placeholder="Enter job title"
            value={formData?.companyDetails?.jobTitle || ''}
            onChange={(e) => handleInputChange('jobTitle', e?.target?.value)}
            error={errors?.jobTitle}
            required
          />

          <div className="md:col-span-2 flex items-end space-x-2">
            <div className="flex-grow">
              <Input
                label="Email Address"
                type="email"
                placeholder="Enter email address"
                value={formData?.companyDetails?.email || ''}
                onChange={(e) => handleInputChange('email', e?.target?.value)}
                onBlur={(e) => validateField('companyDetails', 'email', e?.target?.value)}
                error={errors?.email}
                required
                disabled={otpSent && !otpVerified} // Disable email input if OTP sent but not verified
              />
            </div>
            {!otpVerified && (
              <Button
                type="button"
                onClick={handleSendOtp}
                disabled={!formData?.companyDetails?.email || errors?.email || otpSent || otpTimer > 0}
                variant="outline"
                className="whitespace-nowrap"
              >
                {otpSent && otpTimer > 0 ? `Resend OTP (${otpTimer}s)` : (otpSent ? 'Resend OTP' : 'Send OTP')}
              </Button>
            )}
            {otpVerified && (
              <div className="flex items-center text-success space-x-1 whitespace-nowrap">
                <Icon name="CheckCircle" size={16} />
                <span>Verified</span>
              </div>
            )}
          </div>

          {otpSent && !otpVerified && (
            <div className="md:col-span-2 flex items-end space-x-2">
              <div className="flex-grow">
                <Input
                  label="One-Time Password (OTP)"
                  type="text"
                  placeholder="Enter OTP"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e?.target?.value)}
                  error={otpError}
                  required
                />
              </div>
              <Button
                type="button"
                onClick={handleVerifyOtp}
                disabled={!otpCode}
                className="whitespace-nowrap"
              >
                Verify OTP
              </Button>
            </div>
          )}
          {otpError && <p className="text-destructive text-sm md:col-span-2">{otpError}</p>}

          <Input
            label="Phone Number"
            type="tel"
            placeholder="Enter phone number"
            value={formData?.companyDetails?.phone || ''}
            onChange={(e) => handleInputChange('phone', e?.target?.value)}
            error={errors?.phone}
            required
          />

          <Select
            label="Preferred Contact Method"
            options={contactPreferenceOptions}
            value={formData?.companyDetails?.contactPreference || ''}
            onChange={(value) => handleInputChange('contactPreference', value)}
            error={errors?.contactPreference}
            className="md:col-span-2"
          />
        </div>
      </div>
      <div className="space-y-4">
        <h4 className="text-md font-medium text-foreground">Certifications & Compliance</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Checkbox
            label="ISO 9001 Quality Management"
            checked={(formData?.companyDetails?.certifications || [])?.includes('iso-9001')}
            onChange={(e) => handleCertificationChange('iso-9001', e?.target?.checked)}
          />

          <Checkbox
            label="ISO 14001 Environmental Management"
            checked={(formData?.companyDetails?.certifications || [])?.includes('iso-14001')}
            onChange={(e) => handleCertificationChange('iso-14001', e?.target?.checked)}
          />

          <Checkbox
            label="OHSAS 18001 Safety Management"
            checked={(formData?.companyDetails?.certifications || [])?.includes('ohsas-18001')}
            onChange={(e) => handleCertificationChange('ohsas-18001', e?.target?.checked)}
          />

          <Checkbox
            label="Mining Industry Certification"
            checked={(formData?.companyDetails?.certifications || [])?.includes('mining-cert')}
            onChange={(e) => handleCertificationChange('mining-cert', e?.target?.checked)}
          />
        </div>

        <Input
          label="Additional Certifications"
          type="text"
          placeholder="List any other relevant certifications"
          value={formData?.companyDetails?.additionalCertifications || ''}
          onChange={(e) => handleInputChange('additionalCertifications', e?.target?.value)}
          description="Separate multiple certifications with commas"
        />
      </div>
    </div>
  );
};

export default CompanyDetailsSection;