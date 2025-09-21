import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentationSection = ({ productId = 'EXC-001' }) => {
  const [downloadingDoc, setDownloadingDoc] = useState(null);

  const documents = [
    {
      id: 'manual-001',
      name: 'Operator Manual',
      type: 'PDF',
      size: '12.5 MB',
      description: 'Complete operator manual with safety guidelines and operating procedures',
      category: 'Manual',
      icon: 'BookOpen',
      downloadUrl: '#',
      lastUpdated: '2024-08-15'
    },
    {
      id: 'inspection-001',
      name: 'Detailed Inspection Report',
      type: 'PDF',
      size: '8.2 MB',
      description: 'Comprehensive 127-point inspection report with photos and findings',
      category: 'Inspection',
      icon: 'FileCheck',
      downloadUrl: '#',
      lastUpdated: '2024-08-20'
    },
    {
      id: 'maintenance-001',
      name: 'Service History Records',
      type: 'PDF',
      size: '4.1 MB',
      description: 'Complete maintenance and service history with receipts and documentation',
      category: 'Maintenance',
      icon: 'Wrench',
      downloadUrl: '#',
      lastUpdated: '2024-08-18'
    },
    {
      id: 'specs-001',
      name: 'Technical Specifications',
      type: 'PDF',
      size: '2.8 MB',
      description: 'Detailed technical specifications, dimensions, and performance data',
      category: 'Specifications',
      icon: 'FileText',
      downloadUrl: '#',
      lastUpdated: '2024-08-10'
    },
    {
      id: 'cert-001',
      name: 'Safety Certifications',
      type: 'PDF',
      size: '1.9 MB',
      description: 'EPA compliance, safety certifications, and regulatory documentation',
      category: 'Certifications',
      icon: 'Award',
      downloadUrl: '#',
      lastUpdated: '2024-08-12'
    },
    {
      id: 'warranty-001',
      name: 'Warranty Information',
      type: 'PDF',
      size: '1.2 MB',
      description: 'Warranty terms, coverage details, and extended warranty options',
      category: 'Warranty',
      icon: 'Shield',
      downloadUrl: '#',
      lastUpdated: '2024-08-05'
    }
  ];

  const handleDownload = async (doc) => {
    setDownloadingDoc(doc?.id);
    
    // Simulate download process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real application, this would trigger the actual download
    console.log(`Downloading ${doc?.name}...`);
    
    setDownloadingDoc(null);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Manual': 'text-primary bg-primary/10',
      'Inspection': 'text-success bg-success/10',
      'Maintenance': 'text-warning bg-warning/10',
      'Specifications': 'text-accent bg-accent/10',
      'Certifications': 'text-secondary bg-secondary/10',
      'Warranty': 'text-error bg-error/10'
    };
    return colors?.[category] || 'text-muted-foreground bg-muted';
  };

  const formatFileSize = (size) => {
    return size;
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground flex items-center">
          <Icon name="FolderOpen" size={24} className="mr-2 text-primary" />
          Documentation & Downloads
        </h2>
        
        <Button
          variant="outline"
          size="sm"
          iconName="Download"
          iconPosition="left"
          iconSize={16}
        >
          Download All
        </Button>
      </div>
      {/* Quick Access Summary */}
      <div className="bg-muted/50 p-4 rounded-lg">
        <h3 className="font-semibold text-foreground mb-3 flex items-center">
          <Icon name="Zap" size={18} className="mr-2 text-primary" />
          Quick Access
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{documents?.length}</div>
            <div className="text-sm text-muted-foreground">Total Documents</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">127</div>
            <div className="text-sm text-muted-foreground">Inspection Points</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">15</div>
            <div className="text-sm text-muted-foreground">Service Records</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">5</div>
            <div className="text-sm text-muted-foreground">Certifications</div>
          </div>
        </div>
      </div>
      {/* Document List */}
      <div className="space-y-4">
        {documents?.map((doc) => (
          <div key={doc?.id} className="bg-white border border-border rounded-lg p-4 hover:shadow-card transition-shadow duration-300">
            <div className="flex items-start space-x-4">
              {/* Document Icon */}
              <div className="flex-shrink-0 w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                <Icon name={doc?.icon} size={24} className="text-primary" />
              </div>

              {/* Document Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-foreground">{doc?.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{doc?.description}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(doc?.category)}`}>
                      {doc?.category}
                    </span>
                  </div>
                </div>

                {/* Document Meta */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <Icon name="File" size={14} />
                      <span>{doc?.type}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="HardDrive" size={14} />
                      <span>{formatFileSize(doc?.size)}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="Calendar" size={14} />
                      <span>Updated {formatDate(doc?.lastUpdated)}</span>
                    </span>
                  </div>

                  {/* Download Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Download"
                    iconPosition="left"
                    iconSize={14}
                    loading={downloadingDoc === doc?.id}
                    onClick={() => handleDownload(doc)}
                  >
                    {downloadingDoc === doc?.id ? 'Downloading...' : 'Download'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Additional Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-border rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3 flex items-center">
            <Icon name="Video" size={18} className="mr-2 text-primary" />
            Video Documentation
          </h4>
          <p className="text-sm text-muted-foreground mb-3">
            Request custom inspection videos or virtual walkarounds of this equipment.
          </p>
          <Button
            variant="outline"
            size="sm"
            iconName="Play"
            iconPosition="left"
            iconSize={14}
          >
            Request Video
          </Button>
        </div>

        <div className="bg-white border border-border rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3 flex items-center">
            <Icon name="Users" size={18} className="mr-2 text-primary" />
            Expert Consultation
          </h4>
          <p className="text-sm text-muted-foreground mb-3">
            Schedule a call with our equipment specialists to discuss this machine.
          </p>
          <Button
            variant="outline"
            size="sm"
            iconName="Phone"
            iconPosition="left"
            iconSize={14}
          >
            Schedule Call
          </Button>
        </div>
      </div>
      {/* Security Notice */}
      <div className="bg-muted/50 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Lock" size={18} className="text-success flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-foreground mb-1">Secure Document Access</h4>
            <p className="text-sm text-muted-foreground">
              All documents are securely stored and transmitted using industry-standard encryption. 
              Downloads are logged for security and compliance purposes. Some documents may require 
              verification of purchase intent before access is granted.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationSection;