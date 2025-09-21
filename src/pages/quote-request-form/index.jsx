import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import CompanyDetailsSection from './components/CompanyDetailsSection';
import ProductSpecsSection from './components/ProductSpecsSection';
import BudgetFinancingSection from './components/BudgetFinancingSection';
import DeliveryRequirementsSection from './components/DeliveryRequirementsSection';
import FileUploadSection from './components/FileUploadSection';
import FormProgressIndicator from './components/FormProgressIndicator';
import FormValidation from './components/FormValidation';

const isLocalhost = typeof window !== 'undefined' && window.location && /^(localhost|127\.0\.0\.1)/.test(window.location.hostname);
const API_BASE = isLocalhost
  ? ''
  : (import.meta.env.VITE_API_BASE_URL || 'https://mekrok-mining-backend.onrender.com');

// Helper to convert camelCase to snake_case
const camelToSnakeCase = (key) => {
  if (typeof key !== 'string') return key;
  return key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
};

// Helper to recursively transform object keys
const transformObjectKeys = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(transformObjectKeys);
  }
  if (obj !== null && typeof obj === 'object' && obj?.constructor === Object) {
    return Object.keys(obj)?.reduce((acc, key) => {
      acc[camelToSnakeCase(key)] = transformObjectKeys(obj[key]);
      return acc;
    }, {});
  }
  return obj;
};

function cleanPayload(payload) {
  const integerFields = ["trade_in_year", "trade_in_hours"];
  const numericFields = ["down_payment", "specific_budget", "annual_revenue", "trade_in_value"];

  integerFields.forEach(f => {
    if (payload[f] === "" || payload[f] === undefined) payload[f] = null;
    else payload[f] = parseInt(payload[f], 10);
  });

  numericFields.forEach(f => {
    if (payload[f] === "" || payload[f] === undefined) payload[f] = null;
    else payload[f] = Number(payload[f]);
  });

  return payload;
}

const QuoteRequestForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [completedSections, setCompletedSections] = useState([]);
  const [lastSaved, setLastSaved] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpError, setOtpError] = useState(null);
  const [otpTimer, setOtpTimer] = useState(0);

  // Get prefilled product data from navigation state
  const prefilledProduct = location?.state?.product || null;

  const [formData, setFormData] = useState({
    companyDetails: {
      companyName: '',
      companyType: '',
      taxId: '',
      companySize: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      contactName: '',
      jobTitle: '',
      email: '',
      phone: '',
      contactPreference: '',
      certifications: [],
      additionalCertifications: ''
    },
    productSpecs: {
      equipmentItems: prefilledProduct ? [{
        id: Date.now(),
        type: prefilledProduct?.category || '',
        brand: prefilledProduct?.brand || '',
        model: prefilledProduct?.model || '',
        quantity: 1,
        condition: prefilledProduct?.condition || '',
        specifications: ''
      }] : [],
      urgency: '',
      deliveryDate: null,
      specifications: [],
      additionalRequirements: '',
      prefilledProduct: prefilledProduct
    },
    budgetFinancing: {
      budgetRange: '',
      specificBudget: null,
      paymentTerms: '',
      downPayment: null,
      financingOptions: [],
      financingType: '',
      termLength: null,
      creditScore: null,
      annualRevenue: null,
      tradeInType: '',
      tradeInModel: '',
      tradeInYear: null,
      tradeInHours: null,
      tradeInValue: null,
      authorizationLevel: '',
      approvalTimeline: '',
      financialNotes: ''
    },
    deliveryRequirements: {
      locationType: '',
      siteName: '',
      deliveryAddress: '',
      city: '',
      state: '',
      zipCode: '',
      gpsCoordinates: '',
      siteContact: '',
      siteContactPhone: '',
      operatingHours: '',
      accessLimitations: '',
      maxWeight: null,
      maxHeight: null,
      roadWidth: null,
      turningRadius: null,
      specialAccess: '',
      logisticsPartner: '',
      preferredDate: null,
      latestDate: null,
      timePreferences: '',
      additionalServices: [],
      specialInstructions: ''
    },
    fileUploads: {
      uploadedFiles: []
    }
  });

  const [errors, setErrors] = useState({});
  const [warnings, setWarnings] = useState({});

  const totalSteps = 6;

  const breadcrumbItems = [
    { label: 'Equipment', path: '/product-listing' },
    { label: 'Request Quote', path: '/quote-request-form' }
  ];

  // Auto-save functionality
  useEffect(() => {
    const saveInterval = setInterval(() => {
      localStorage.setItem('quoteFormData', JSON.stringify(formData));
      setLastSaved(new Date());
    }, 30000); // Save every 30 seconds

    return () => clearInterval(saveInterval);
  }, [formData]);

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem('quoteFormData');
    if (savedData && !prefilledProduct) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      } catch (error) {
        console.error('Error loading saved form data:', error);
      }
    }
  }, [prefilledProduct]);

  const updateFormData = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
    
    // Clear errors for this section when data is updated
    const sectionErrors = Object.keys(errors)?.filter(key => key?.startsWith(section));
    if (sectionErrors?.length > 0) {
      const newErrors = { ...errors };
      sectionErrors?.forEach(key => delete newErrors?.[key]);
      setErrors(newErrors);
    }
  };

  const validateField = (section, field, value) => {
    let newErrors = { ...errors };
    let newWarnings = { ...warnings };
    const tempFormData = { ...formData, [section]: { ...formData[section], [field]: value } };

    // Temporarily replace formData for validation context
    const originalFormData = formData;
    setFormData(tempFormData);

    const validation = validateSection(section);
    
    // Revert formData after validation
    setFormData(originalFormData);

    if (validation?.errors[field]) {
      newErrors[field] = validation.errors[field];
    } else {
      delete newErrors[field];
    }

    if (validation?.warnings[field]) {
      newWarnings[field] = validation.warnings[field];
    } else {
      delete newWarnings[field];
    }

    setErrors(newErrors);
    setWarnings(newWarnings);
  };

  const validateSection = (section) => {
    const sectionErrors = {};
    const sectionWarnings = {};

    switch (section) {
      case 'companyDetails':
        if (!formData?.companyDetails?.companyName) sectionErrors.companyName = 'Company name is required';
        if (!formData?.companyDetails?.companyType) sectionErrors.companyType = 'Company type is required';
        if (!formData?.companyDetails?.address) sectionErrors.address = 'Address is required';
        if (!formData?.companyDetails?.city) sectionErrors.city = 'City is required';
        if (!formData?.companyDetails?.state) sectionErrors.state = 'State is required';
        if (!formData?.companyDetails?.zipCode) sectionErrors.zipCode = 'ZIP code is required';
        if (!formData?.companyDetails?.country) sectionErrors.country = 'Country is required';
        if (!formData?.companyDetails?.contactName) sectionErrors.contactName = 'Contact name is required';
        if (!formData?.companyDetails?.jobTitle) sectionErrors.jobTitle = 'Job title is required';
        if (!formData?.companyDetails?.email) sectionErrors.email = 'Email is required';
        if (!formData?.companyDetails?.phone) sectionErrors.phone = 'Phone number is required';
        
        // More robust email validation regex
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (formData?.companyDetails?.email && !emailRegex.test(formData?.companyDetails?.email)) {
          sectionErrors.email = 'Please enter a valid email address';
        }
        break;

      case 'productSpecs':
        if (!formData?.productSpecs?.equipmentItems || formData?.productSpecs?.equipmentItems?.length === 0) {
          sectionErrors.equipmentItems = 'At least one equipment item is required';
        }
        if (!formData?.productSpecs?.urgency) sectionErrors.urgency = 'Timeline urgency is required';
        break;

      case 'budgetFinancing':
        if (!formData?.budgetFinancing?.budgetRange) sectionErrors.budgetRange = 'Budget range is required';
        if (!formData?.budgetFinancing?.paymentTerms) sectionErrors.paymentTerms = 'Payment terms are required';
        break;

      case 'deliveryRequirements':
        if (!formData?.deliveryRequirements?.locationType) sectionErrors.locationType = 'Location type is required';
        if (!formData?.deliveryRequirements?.siteName) sectionErrors.siteName = 'Site name is required';
        if (!formData?.deliveryRequirements?.deliveryAddress) sectionErrors.deliveryAddress = 'Delivery address is required';
        if (!formData?.deliveryRequirements?.city) sectionErrors.city = 'City is required';
        if (!formData?.deliveryRequirements?.state) sectionErrors.state = 'State is required';
        if (!formData?.deliveryRequirements?.zipCode) sectionErrors.zipCode = 'ZIP code is required';
        if (!formData?.deliveryRequirements?.siteContact) sectionErrors.siteContact = 'Site contact is required';
        if (!formData?.deliveryRequirements?.siteContactPhone) sectionErrors.siteContactPhone = 'Site contact phone is required';
        if (!formData?.deliveryRequirements?.accessLimitations) sectionErrors.accessLimitations = 'Access limitations must be specified';
        break;
    }

    return { errors: sectionErrors, warnings: sectionWarnings };
  };

  const validateCurrentStep = () => {
    const sectionMap = {
      1: 'companyDetails',
      2: 'productSpecs',
      3: 'budgetFinancing',
      4: 'deliveryRequirements',
      5: 'fileUploads'
    };

    const section = sectionMap?.[currentStep];
    if (!section) return { isValid: true, errors: {}, warnings: {} };

    const validation = validateSection(section);
    setErrors(validation?.errors);
    setWarnings(validation?.warnings);
    setShowValidation(Object.keys(validation?.errors)?.length > 0);

    const isValid = Object.keys(validation?.errors)?.length === 0;
    
    if (isValid && !completedSections?.includes(section)) {
      setCompletedSections(prev => [...prev, section]);
    }

    return { isValid, errors: validation?.errors, warnings: validation?.warnings };
  };

  const handleNext = () => {
    const validation = validateCurrentStep();
    if (validation?.isValid) {
      // Special check for the first step: OTP verification
      if (currentStep === 1 && !otpVerified) {
        setOtpError('Please verify your email address before proceeding.');
        setShowValidation(true); // Show validation messages
        return;
      }
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
        setOtpError(null); // Clear OTP error on successful navigation
        setShowValidation(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setShowValidation(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSendOtp = async () => {
    setOtpError(null);
    setOtpSent(false);
    setOtpVerified(false);
    setOtpCode('');

    const email = formData.companyDetails.email?.trim();
    const validationErrors = validateSection('companyDetails').errors;

    if (!email) {
      setOtpError('Please enter a valid email address.');
      return;
    }

    if (validationErrors.email) {
      setOtpError(validationErrors.email);
      return;
    }

    try {
      // Placeholder for API call to send OTP
      const response = await fetch(`${API_BASE}/api/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send OTP');
      }

      setOtpSent(true);
      setOtpTimer(60); // Start 60-second countdown
      const timerInterval = setInterval(() => {
        setOtpTimer(prev => {
          if (prev <= 1) {
            clearInterval(timerInterval);
            setOtpSent(false); // Allow resend
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      alert('OTP sent to your email address!');
    } catch (error) {
      console.error('Error sending OTP:', error);
      setOtpError(error.message || 'Failed to send OTP. Please try again.');
    }
  };

  const handleVerifyOtp = async () => {
    setOtpError(null);

    if (!otpCode) {
      setOtpError('Please enter the OTP code.');
      return;
    }

    try {
      // Placeholder for API call to verify OTP
      const response = await fetch(`${API_BASE}/api/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.companyDetails.email, otp: otpCode }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'OTP verification failed');
      }

      setOtpVerified(true);
      alert('Email verified successfully!');
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setOtpError(error.message || 'OTP verification failed. Please try again.');
    }
  };

  const handleSubmit = async () => {
    // Validate all sections
    let allValid = true;
    const allErrors = {};
  
    ['companyDetails', 'productSpecs', 'budgetFinancing', 'deliveryRequirements']?.forEach(section => {
      const validation = validateSection(section);
      if (Object.keys(validation?.errors)?.length > 0) {
        allValid = false;
        Object.assign(allErrors, validation?.errors);
      }
    });
  
    if (!allValid) {
      setErrors(allErrors);
      setShowValidation(true);
      // Jump to first error section
      const firstErrorSection = Object.keys(allErrors)?.[0];
      const sectionStepMap = {
        companyDetails: 1,
        productSpecs: 2,
        budgetFinancing: 3,
        deliveryRequirements: 4
      };
      const errorStep = Object.keys(sectionStepMap)?.find(section =>
        firstErrorSection?.startsWith(section)
      );
      if (errorStep) setCurrentStep(sectionStepMap?.[errorStep]);
      return;
    }
  
    setIsSubmitting(true);
  
    // OTP System: If email is not verified, prevent submission and prompt for OTP
    if (!otpVerified) {
      setOtpError('Please verify your email address with the OTP.');
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
  
    try {
      // Merge all sections
      const mergedData = {
        ...formData.companyDetails,
        ...formData.productSpecs,
        ...formData.budgetFinancing,
        ...formData.deliveryRequirements,
        ...formData.fileUploads,
        submissionDate: new Date(),
        status: 'new',
        priority: 'normal',
        communications: [],
        lastActivity: new Date(),
      };
  
      // Convert camelCase → snake_case
      let payload = transformObjectKeys(mergedData);
  
      // Normalize numerics & dates
      const integerFields = ["trade_in_year", "trade_in_hours"];
      const numericFields = ["down_payment", "specific_budget", "annual_revenue", "trade_in_value"];
      const dateFields = ["delivery_date", "preferred_date", "latest_date"];
  
      integerFields.forEach(f => {
        if (payload[f] === "" || payload[f] === undefined) payload[f] = null;
        else payload[f] = parseInt(payload[f], 10);
      });
  
      numericFields.forEach(f => {
        if (payload[f] === "" || payload[f] === undefined) payload[f] = null;
        else payload[f] = Number(payload[f]);
      });
  
      dateFields.forEach(f => {
        if (!payload[f]) payload[f] = null;
      });
  
      const response = await fetch(`${API_BASE}/api/quotes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
  
      localStorage.removeItem('quoteFormData');
      alert('Quote request submitted successfully! We will contact you within 24 hours.');
      navigate('/homepage');
  
    } catch (error) {
      console.error('❌ Submission error:', error);
      alert(`Error submitting request: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <CompanyDetailsSection
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
            validateField={validateField}
            otpSent={otpSent}
            setOtpSent={setOtpSent}
            otpVerified={otpVerified}
            setOtpVerified={setOtpVerified}
            otpCode={otpCode}
            setOtpCode={setOtpCode}
            otpError={otpError}
            setOtpError={setOtpError}
            otpTimer={otpTimer}
            setOtpTimer={setOtpTimer}
            handleSendOtp={handleSendOtp}
            handleVerifyOtp={handleVerifyOtp}
          />
        );
      case 2:
        return (
          <ProductSpecsSection
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
            prefilledProduct={prefilledProduct}
          />
        );
      case 3:
        return (
          <BudgetFinancingSection
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 4:
        return (
          <DeliveryRequirementsSection
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 5:
        return (
          <FileUploadSection
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 6:
        return (
          <div className="bg-white rounded-lg border border-border p-6 space-y-6">
            <div className="flex items-center space-x-3 pb-4 border-b border-border">
              <div className="w-8 h-8 bg-success rounded-lg flex items-center justify-center">
                <Icon name="CheckCircle" size={18} color="white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Review & Submit</h3>
                <p className="text-sm text-muted-foreground">Review your quote request before submission</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">Company Information</h4>
                  <p className="text-sm text-muted-foreground">{formData?.companyDetails?.companyName}</p>
                  <p className="text-sm text-muted-foreground">{formData?.companyDetails?.contactName}</p>
                  <p className="text-sm text-muted-foreground">{formData?.companyDetails?.email}</p>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">Equipment Request</h4>
                  <p className="text-sm text-muted-foreground">
                    {formData?.productSpecs?.equipmentItems?.length || 0} equipment item(s)
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Urgency: {formData?.productSpecs?.urgency}
                  </p>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">Budget & Payment</h4>
                  <p className="text-sm text-muted-foreground">
                    Budget: {formData?.budgetFinancing?.budgetRange}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Payment: {formData?.budgetFinancing?.paymentTerms}
                  </p>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">Delivery Location</h4>
                  <p className="text-sm text-muted-foreground">{formData?.deliveryRequirements?.siteName}</p>
                  <p className="text-sm text-muted-foreground">
                    {formData?.deliveryRequirements?.city}, {formData?.deliveryRequirements?.state}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Icon name="Info" size={16} className="text-primary mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-primary">What happens next?</h4>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                      <li>• Our team will review your request within 2 business hours</li>
                      <li>• You'll receive a detailed quote within 24 hours</li>
                      <li>• A specialist will contact you to discuss your requirements</li>
                      <li>• We'll arrange equipment inspection if needed</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={breadcrumbItems} />
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Request Equipment Quote</h1>
            <p className="text-lg text-muted-foreground">
              Get competitive quotes from verified mining equipment suppliers
            </p>
            {lastSaved && (
              <p className="text-sm text-muted-foreground mt-2">
                Last saved: {lastSaved?.toLocaleTimeString()}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Progress Sidebar */}
            <div className="lg:col-span-1">
              <FormProgressIndicator
                currentStep={currentStep}
                totalSteps={totalSteps}
                completedSections={completedSections}
              />
            </div>

            {/* Main Form Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Validation Messages */}
              <FormValidation
                errors={errors}
                warnings={warnings}
                isVisible={showValidation}
              />

              {/* Current Step Content */}
              {renderCurrentStep()}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-border">
                <Button
                  variant="outline"
                  iconName="ChevronLeft"
                  iconPosition="left"
                  iconSize={16}
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>

                <div className="flex items-center space-x-3">
                  {currentStep < totalSteps ? (
                    <Button
                      variant="default"
                      iconName="ChevronRight"
                      iconPosition="right"
                      iconSize={16}
                      onClick={handleNext}
                    >
                      Next Step
                    </Button>
                  ) : (
                    <Button
                      variant="default"
                      iconName="Send"
                      iconPosition="left"
                      iconSize={16}
                      onClick={handleSubmit}
                      loading={isSubmitting}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuoteRequestForm;