import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ImageGallery from './components/ImageGallery';
import ProductSpecifications from './components/ProductSpecifications';
import ConditionReport from './components/ConditionReport';
import RelatedItems from './components/RelatedItems';
import ShippingInfo from './components/ShippingInfo';
import DocumentationSection from './components/DocumentationSection';

const ProductDetails = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  
  const productId = searchParams?.get('id') || 'EXC-001';

  // Mock product data
  const productData = {
    id: productId,
    name: 'Caterpillar 320D2 Hydraulic Excavator',
    brand: 'Caterpillar',
    model: '320D2',
    year: 2019,
    hours: 3250,
    condition: 'Good',
    price: 175000,
    location: 'Phoenix, AZ',
    description: `This well-maintained Caterpillar 320D2 hydraulic excavator is ready for immediate deployment. 
    Featuring advanced hydraulic systems, comfortable operator cab, and proven reliability in demanding mining operations. 
    Regular maintenance has been performed by certified technicians, ensuring optimal performance and longevity.`,
    specifications: {
      enginePower: '174 HP (130 kW)',
      operatingWeight: '45,900 lbs (20,820 kg)',
      bucketCapacity: '1.5 yd³ (1.15 m³)',
      maxDiggingDepth: '22 ft 8 in (6.91 m)',
      maxReach: '32 ft 9 in (9.98 m)',
      travelSpeed: '3.4 mph (5.5 km/h)'
    },
    images: [
      {
        url: 'https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg?auto=compress&cs=tinysrgb&w=800',
        caption: 'Main view of the excavator'
      },
      {
        url: 'https://images.pixabay.com/photo/2016/11/29/08/34/excavators-1868726_960_720.jpg',
        caption: 'Side profile view'
      },
      {
        url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80',
        caption: 'Operator cab interior'
      },
      {
        url: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=800',
        caption: 'Engine compartment'
      }
    ],
    features: [
      'GPS Ready System',
      'Climate Controlled Cab',
      'Hydraulic Thumb Attachment',
      'LED Work Lights',
      'Backup Camera',
      'Bluetooth Connectivity'
    ],
    seller: {
      name: 'Mountain West Equipment',
      rating: 4.8,
      location: 'Phoenix, AZ',
      phone: '+1 (555) 123-4567',
      email: 'sales@mountainwestequip.com'
    }
  };

  const conditionData = {
    overallCondition: 'Good',
    lastInspectionDate: '2024-08-15',
    inspectorName: 'John Smith',
    inspectorCertification: 'Certified Equipment Inspector'
  };

  const breadcrumbItems = [
    { label: 'Equipment', path: '/product-listing' },
    { label: 'Excavators', path: '/product-listing?category=excavators' },
    { label: productData?.name }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Eye' },
    { id: 'condition', label: 'Condition Report', icon: 'FileCheck' },
    { id: 'shipping', label: 'Shipping', icon: 'Truck' },
    { id: 'documentation', label: 'Documentation', icon: 'FolderOpen' }
  ];

  const handleQuoteRequest = () => {
    // Navigate to quote request form with pre-filled data
    window.location.href = `/quote-request-form?productId=${productId}&productName=${encodeURIComponent(productData?.name)}`;
  };

  const handleContactSeller = () => {
    setIsContactModalOpen(true);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Product Description */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <Icon name="FileText" size={20} className="mr-2 text-primary" />
                Equipment Description
              </h3>
              <p className="text-muted-foreground leading-relaxed">{productData?.description}</p>
            </div>
            {/* Key Features */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <Icon name="Star" size={20} className="mr-2 text-primary" />
                Key Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {productData?.features?.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
                    <Icon name="Check" size={16} className="text-success flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Seller Information */}
            <div className="bg-white border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <Icon name="Building2" size={20} className="mr-2 text-primary" />
                Seller Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-muted-foreground">Company Name</div>
                    <div className="font-medium text-foreground">{productData?.seller?.name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Location</div>
                    <div className="font-medium text-foreground flex items-center">
                      <Icon name="MapPin" size={14} className="mr-1" />
                      {productData?.seller?.location}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Rating</div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={14} className="text-warning fill-current" />
                      <span className="font-medium text-foreground">{productData?.seller?.rating}</span>
                      <span className="text-sm text-muted-foreground">(127 reviews)</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Phone"
                    iconPosition="left"
                    iconSize={16}
                    onClick={handleContactSeller}
                  >
                    Contact Seller
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Mail"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Send Message
                  </Button>
                </div>
              </div>
            </div>
            <RelatedItems currentProductId={productId} category="excavators" />
          </div>
        );
      case 'condition':
        return <ConditionReport conditionData={conditionData} />;
      case 'shipping':
        return <ShippingInfo productLocation={productData?.location} productWeight="45,900 lbs" />;
      case 'documentation':
        return <DocumentationSection productId={productId} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={breadcrumbItems} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Images */}
            <div className="lg:col-span-2">
              <ImageGallery images={productData?.images} productName={productData?.name} />
            </div>

            {/* Right Column - Product Info */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <ProductSpecifications product={productData} />
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-12">
            {/* Tab Navigation */}
            <div className="border-b border-border">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-300 ${
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
            <div className="py-8">
              {renderTabContent()}
            </div>
          </div>

          {/* Sticky Action Bar */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-modal p-4 lg:hidden z-40">
            <div className="flex space-x-3">
              <Button
                variant="outline"
                size="lg"
                iconName="Heart"
                iconSize={18}
                className="flex-shrink-0"
              >
                Save
              </Button>
              <Button
                variant="default"
                size="lg"
                iconName="FileText"
                iconPosition="left"
                iconSize={18}
                onClick={handleQuoteRequest}
                className="flex-1"
              >
                Request Quote
              </Button>
            </div>
          </div>
        </div>
      </main>
      {/* Contact Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Contact Seller</h3>
              <button
                onClick={() => setIsContactModalOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold text-foreground">{productData?.seller?.name}</h4>
                <p className="text-sm text-muted-foreground">{productData?.seller?.location}</p>
              </div>
              
              <div className="space-y-3">
                <Button
                  variant="default"
                  fullWidth
                  iconName="Phone"
                  iconPosition="left"
                  iconSize={16}
                >
                  Call {productData?.seller?.phone}
                </Button>
                
                <Button
                  variant="outline"
                  fullWidth
                  iconName="Mail"
                  iconPosition="left"
                  iconSize={16}
                >
                  Email {productData?.seller?.email}
                </Button>
                
                <Link to={`/quote-request-form?productId=${productId}`}>
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="FileText"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Request Formal Quote
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;