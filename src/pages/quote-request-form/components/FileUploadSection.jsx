import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FileUploadSection = ({ formData, updateFormData, errors }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  const allowedFileTypes = {
    'image/*': 'Images (JPG, PNG, GIF)',
    'application/pdf': 'PDF Documents',
    '.dwg': 'CAD Drawings (DWG)',
    '.dxf': 'CAD Drawings (DXF)',
    'application/msword': 'Word Documents',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'Word Documents',
    'application/vnd.ms-excel': 'Excel Spreadsheets',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'Excel Spreadsheets'
  };

  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const handleInputChange = (field, value) => {
    updateFormData('fileUploads', { ...formData?.fileUploads, [field]: value });
  };

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === 'dragenter' || e?.type === 'dragover') {
      setDragActive(true);
    } else if (e?.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFiles(Array.from(e?.dataTransfer?.files));
    }
  };

  const handleFileInput = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      handleFiles(Array.from(e?.target?.files));
    }
  };

  const handleFiles = (files) => {
    const validFiles = [];
    const errors = [];

    files?.forEach(file => {
      // Check file size
      if (file?.size > maxFileSize) {
        errors?.push(`${file?.name}: File size exceeds 10MB limit`);
        return;
      }

      // Check file type
      const isValidType = Object.keys(allowedFileTypes)?.some(type => {
        if (type?.startsWith('.')) {
          return file?.name?.toLowerCase()?.endsWith(type);
        }
        return file?.type?.match(type);
      });

      if (!isValidType) {
        errors?.push(`${file?.name}: File type not supported`);
        return;
      }

      validFiles?.push(file);
    });

    if (errors?.length > 0) {
      // In a real app, you'd show these errors to the user console.error('File upload errors:', errors);
    }

    if (validFiles?.length > 0) {
      uploadFiles(validFiles);
    }
  };

  const uploadFiles = async (files) => {
    const currentFiles = formData?.fileUploads?.uploadedFiles || [];
    
    for (const file of files) {
      const fileId = Date.now() + Math.random();
      
      // Simulate file upload progress
      setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));
      
      // In a real app, you'd upload to S3 using presigned URLs
      const mockUpload = () => {
        return new Promise((resolve) => {
          let progress = 0;
          const interval = setInterval(() => {
            progress += Math.random() * 30;
            if (progress >= 100) {
              progress = 100;
              clearInterval(interval);
              setUploadProgress(prev => {
                const newProgress = { ...prev };
                delete newProgress[fileId];
                return newProgress;
              });
              resolve({
                id: fileId,
                name: file.name,
                size: file.size,
                type: file.type,
                url: `https://mock-s3-bucket.com/uploads/${fileId}-${file.name}`,
                uploadedAt: new Date().toISOString()
              });
            }
            setUploadProgress(prev => ({ ...prev, [fileId]: Math.min(progress, 100) }));
          }, 200);
        });
      };

      try {
        const uploadedFile = await mockUpload();
        const updatedFiles = [...currentFiles, uploadedFile];
        handleInputChange('uploadedFiles', updatedFiles);
      } catch (error) {
        console.error('Upload failed:', error);
        setUploadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress?.[fileId];
          return newProgress;
        });
      }
    }
  };

  const removeFile = (fileId) => {
    const currentFiles = formData?.fileUploads?.uploadedFiles || [];
    const updatedFiles = currentFiles?.filter(file => file?.id !== fileId);
    handleInputChange('uploadedFiles', updatedFiles);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const getFileIcon = (fileType) => {
    if (fileType?.startsWith('image/')) return 'Image';
    if (fileType === 'application/pdf') return 'FileText';
    if (fileType?.includes('word')) return 'FileText';
    if (fileType?.includes('excel') || fileType?.includes('spreadsheet')) return 'FileSpreadsheet';
    if (fileType?.includes('dwg') || fileType?.includes('dxf')) return 'Drafting';
    return 'File';
  };

  return (
    <div className="bg-white rounded-lg border border-border p-6 space-y-6">
      <div className="flex items-center space-x-3 pb-4 border-b border-border">
        <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
          <Icon name="Upload" size={18} color="white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">File Uploads</h3>
          <p className="text-sm text-muted-foreground">Upload supporting documents and images</p>
        </div>
      </div>
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-300 ${
          dragActive 
            ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          onChange={handleFileInput}
          accept={Object.keys(allowedFileTypes)?.join(',')}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="space-y-4">
          <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
            <Icon name="Upload" size={24} className="text-muted-foreground" />
          </div>
          
          <div>
            <p className="text-lg font-medium text-foreground">
              Drop files here or click to upload
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Support for images, PDFs, CAD drawings, and documents
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
            {Object.values(allowedFileTypes)?.map((type, index) => (
              <span key={index} className="px-2 py-1 bg-muted rounded">
                {type}
              </span>
            ))}
          </div>
          
          <p className="text-xs text-muted-foreground">
            Maximum file size: 10MB per file
          </p>
        </div>
      </div>
      {/* Upload Progress */}
      {Object.keys(uploadProgress)?.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">Uploading...</h4>
          {Object.entries(uploadProgress)?.map(([fileId, progress]) => (
            <div key={fileId} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Uploading file...</span>
                <span className="text-muted-foreground">{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Uploaded Files */}
      {(formData?.fileUploads?.uploadedFiles || [])?.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-md font-medium text-foreground">Uploaded Files</h4>
          <div className="space-y-2">
            {(formData?.fileUploads?.uploadedFiles || [])?.map((file) => (
              <div key={file?.id} className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={getFileIcon(file?.type)} size={16} className="text-muted-foreground" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{file?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(file?.size)} • Uploaded {new Date(file.uploadedAt)?.toLocaleDateString()}
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Download"
                    onClick={() => window.open(file?.url, '_blank')}
                    title="Download file"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Trash2"
                    onClick={() => removeFile(file?.id)}
                    title="Remove file"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* File Categories */}
      <div className="space-y-4">
        <h4 className="text-md font-medium text-foreground">Recommended Documents</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h5 className="text-sm font-medium text-foreground flex items-center space-x-2">
              <Icon name="Image" size={14} />
              <span>Site Photos</span>
            </h5>
            <ul className="text-xs text-muted-foreground space-y-1 ml-5">
              <li>• Current equipment location</li>
              <li>• Access route photos</li>
              <li>• Site layout images</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h5 className="text-sm font-medium text-foreground flex items-center space-x-2">
              <Icon name="FileText" size={14} />
              <span>Technical Documents</span>
            </h5>
            <ul className="text-xs text-muted-foreground space-y-1 ml-5">
              <li>• Technical specifications</li>
              <li>• Site drawings/plans</li>
              <li>• Safety requirements</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h5 className="text-sm font-medium text-foreground flex items-center space-x-2">
              <Icon name="Shield" size={14} />
              <span>Compliance Documents</span>
            </h5>
            <ul className="text-xs text-muted-foreground space-y-1 ml-5">
              <li>• Safety certifications</li>
              <li>• Environmental permits</li>
              <li>• Insurance documents</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h5 className="text-sm font-medium text-foreground flex items-center space-x-2">
              <Icon name="DollarSign" size={14} />
              <span>Financial Documents</span>
            </h5>
            <ul className="text-xs text-muted-foreground space-y-1 ml-5">
              <li>• Purchase authorization</li>
              <li>• Budget approval</li>
              <li>• Financing pre-approval</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploadSection;