import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import AdminSidebar from '../../components/ui/AdminSidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import InventoryTable from './components/InventoryTable';
import InventoryFilters from './components/InventoryFilters';
import EquipmentModal from './components/EquipmentModal';
import BulkActions from './components/BulkActions';
import InventoryStats from './components/InventoryStats';

const InventoryManagement = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState(null);
  const [equipment, setEquipment] = useState([]);
  const [filteredEquipment, setFilteredEquipment] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Mock equipment data
  const mockEquipment = [
    {
      id: 1,
      name: "CAT 320D2 Excavator",
      manufacturer: "caterpillar",
      model: "320D2",
      category: "excavators",
      year: 2019,
      hours: 2450,
      condition: "excellent",
      price: 185000,
      location: "Denver, CO",
      status: "available",
      description: `Professional-grade hydraulic excavator with advanced fuel efficiency and operator comfort features.\n\nThis CAT 320D2 has been meticulously maintained with full service records available.\n\nIdeal for construction, mining, and heavy excavation projects.`,
      specifications: {
        enginePower: "174 HP",
        operatingWeight: "45,200 lbs",
        bucketCapacity: "1.54 yd³",
        maxDigDepth: "22.3 ft",
        maxReach: "32.1 ft"
      },
      images: [
        "https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg",
        "https://images.pexels.com/photos/162539/architecture-building-site-build-162539.jpeg"
      ],
      documents: [],
      createdAt: "2025-01-15T10:30:00Z",
      updatedAt: "2025-01-20T14:45:00Z"
    },
    {
      id: 2,
      name: "Komatsu D65PX-18 Bulldozer",
      manufacturer: "komatsu",
      model: "D65PX-18",
      category: "bulldozers",
      year: 2020,
      hours: 1850,
      condition: "excellent",
      price: 295000,
      location: "Phoenix, AZ",
      status: "available",
      description: `Heavy-duty bulldozer with superior blade control and enhanced visibility for precision grading.\n\nEquipped with advanced hydraulic system and comfortable operator cabin.\n\nPerfect for large-scale earthmoving and construction projects.`,
      specifications: {
        enginePower: "215 HP",
        operatingWeight: "38,580 lbs",
        bucketCapacity: "N/A",
        maxDigDepth: "N/A",
        maxReach: "N/A"
      },
      images: [
        "https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg"
      ],
      documents: [],
      createdAt: "2025-01-10T09:15:00Z",
      updatedAt: "2025-01-18T16:20:00Z"
    },
    {
      id: 3,
      name: "Volvo L120H Wheel Loader",
      manufacturer: "volvo",
      model: "L120H",
      category: "loaders",
      year: 2018,
      hours: 3200,
      condition: "good",
      price: 165000,
      location: "Dallas, TX",
      status: "pending",
      description: `Versatile wheel loader with excellent fuel efficiency and operator comfort.\n\nFeatures advanced load-sensing hydraulics and ergonomic controls.\n\nIdeal for material handling and loading operations.`,
      specifications: {
        enginePower: "268 HP",
        operatingWeight: "35,270 lbs",
        bucketCapacity: "4.2 yd³",
        maxDigDepth: "N/A",
        maxReach: "N/A"
      },
      images: [
        "https://images.pexels.com/photos/162539/architecture-building-site-build-162539.jpeg"
      ],
      documents: [],
      createdAt: "2025-01-08T11:45:00Z",
      updatedAt: "2025-01-22T13:30:00Z"
    },
    {
      id: 4,
      name: "Liebherr R 956 Mining Excavator",
      manufacturer: "liebherr",
      model: "R 956",
      category: "excavators",
      year: 2021,
      hours: 1200,
      condition: "new",
      price: 450000,
      location: "Salt Lake City, UT",
      status: "available",
      description: `State-of-the-art mining excavator designed for heavy-duty operations.\n\nFeatures advanced hydraulic system and reinforced structure for mining applications.\n\nLow hours with full warranty coverage remaining.`,
      specifications: {
        enginePower: "469 HP",
        operatingWeight: "125,660 lbs",
        bucketCapacity: "6.5 yd³",
        maxDigDepth: "28.5 ft",
        maxReach: "42.3 ft"
      },
      images: [
        "https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg",
        "https://images.pexels.com/photos/162539/architecture-building-site-build-162539.jpeg"
      ],
      documents: [],
      createdAt: "2025-01-25T08:00:00Z",
      updatedAt: "2025-01-25T08:00:00Z"
    },
    {
      id: 5,
      name: "Hitachi ZX350LC-6 Excavator",
      manufacturer: "hitachi",
      model: "ZX350LC-6",
      category: "excavators",
      year: 2017,
      hours: 4500,
      condition: "good",
      price: 145000,
      location: "Las Vegas, NV",
      status: "sold",
      description: `Reliable hydraulic excavator with proven performance in various applications.\n\nWell-maintained with complete service history available.\n\nRecently sold to satisfied customer.`,
      specifications: {
        enginePower: "257 HP",
        operatingWeight: "77,160 lbs",
        bucketCapacity: "2.14 yd³",
        maxDigDepth: "24.3 ft",
        maxReach: "35.1 ft"
      },
      images: [
        "https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg"
      ],
      documents: [],
      createdAt: "2025-01-05T14:20:00Z",
      updatedAt: "2025-01-28T10:15:00Z"
    }
  ];

  // Mock inventory statistics
  const mockStats = {
    totalEquipment: 156,
    availableEquipment: 89,
    soldEquipment: 23,
    pendingEquipment: 12,
    totalValue: 28500000,
    averagePrice: 182692,
    recentlyAdded: 8,
    lowStock: 3
  };

  useEffect(() => {
    setEquipment(mockEquipment);
    setFilteredEquipment(mockEquipment);
  }, []);

  const breadcrumbItems = [
    { label: 'Admin', path: '/admin/dashboard' },
    { label: 'Inventory Management' }
  ];

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleSelectItem = (itemId, isSelected) => {
    if (isSelected) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems(selectedItems?.filter(id => id !== itemId));
    }
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedItems(filteredEquipment?.map(item => item?.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleFiltersChange = (filters) => {
    let filtered = [...equipment];

    // Apply search filter
    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      filtered = filtered?.filter(item =>
        item?.name?.toLowerCase()?.includes(searchTerm) ||
        item?.manufacturer?.toLowerCase()?.includes(searchTerm) ||
        item?.model?.toLowerCase()?.includes(searchTerm) ||
        item?.id?.toString()?.includes(searchTerm)
      );
    }

    // Apply category filter
    if (filters?.category) {
      filtered = filtered?.filter(item => item?.category === filters?.category);
    }

    // Apply condition filter
    if (filters?.condition) {
      filtered = filtered?.filter(item => item?.condition === filters?.condition);
    }

    // Apply status filter
    if (filters?.status) {
      filtered = filtered?.filter(item => item?.status === filters?.status);
    }

    // Apply manufacturer filter
    if (filters?.manufacturer) {
      filtered = filtered?.filter(item => item?.manufacturer === filters?.manufacturer);
    }

    // Apply price range filter
    if (filters?.priceRange?.min || filters?.priceRange?.max) {
      filtered = filtered?.filter(item => {
        const price = item?.price;
        const min = filters?.priceRange?.min ? parseFloat(filters?.priceRange?.min) : 0;
        const max = filters?.priceRange?.max ? parseFloat(filters?.priceRange?.max) : Infinity;
        return price >= min && price <= max;
      });
    }

    // Apply year range filter
    if (filters?.yearRange?.min || filters?.yearRange?.max) {
      filtered = filtered?.filter(item => {
        const year = item?.year;
        const min = filters?.yearRange?.min ? parseInt(filters?.yearRange?.min) : 0;
        const max = filters?.yearRange?.max ? parseInt(filters?.yearRange?.max) : new Date()?.getFullYear();
        return year >= min && year <= max;
      });
    }

    // Apply location filter
    if (filters?.location) {
      const locationTerm = filters?.location?.toLowerCase();
      filtered = filtered?.filter(item =>
        item?.location?.toLowerCase()?.includes(locationTerm)
      );
    }

    setFilteredEquipment(filtered);
    setCurrentPage(1);
    setSelectedItems([]);
  };

  const handleClearFilters = () => {
    setFilteredEquipment(equipment);
    setCurrentPage(1);
    setSelectedItems([]);
  };

  const handleAddEquipment = () => {
    setEditingEquipment(null);
    setIsModalOpen(true);
  };

  const handleEditEquipment = (equipmentItem) => {
    setEditingEquipment(equipmentItem);
    setIsModalOpen(true);
  };

  const handleDuplicateEquipment = (equipmentItem) => {
    const duplicatedItem = {
      ...equipmentItem,
      id: Date.now(),
      name: `${equipmentItem?.name} (Copy)`,
      status: 'available',
      createdAt: new Date()?.toISOString(),
      updatedAt: new Date()?.toISOString()
    };
    
    const newEquipment = [...equipment, duplicatedItem];
    setEquipment(newEquipment);
    setFilteredEquipment(newEquipment);
  };

  const handleDeleteEquipment = (equipmentItem) => {
    if (window.confirm(`Are you sure you want to delete "${equipmentItem?.name}"?`)) {
      const newEquipment = equipment?.filter(item => item?.id !== equipmentItem?.id);
      setEquipment(newEquipment);
      setFilteredEquipment(newEquipment?.filter(item => 
        filteredEquipment?.some(filtered => filtered?.id === item?.id)
      ));
      setSelectedItems(selectedItems?.filter(id => id !== equipmentItem?.id));
    }
  };

  const handleViewDetails = (equipmentItem) => {
    // Navigate to product details page
    window.open(`/product-details?id=${equipmentItem?.id}`, '_blank');
  };

  const handleSaveEquipment = (equipmentData) => {
    if (editingEquipment) {
      // Update existing equipment
      const newEquipment = equipment?.map(item =>
        item?.id === editingEquipment?.id ? equipmentData : item
      );
      setEquipment(newEquipment);
      setFilteredEquipment(newEquipment?.filter(item => 
        filteredEquipment?.some(filtered => filtered?.id === item?.id)
      ));
    } else {
      // Add new equipment
      const newEquipment = [...equipment, equipmentData];
      setEquipment(newEquipment);
      setFilteredEquipment(newEquipment);
    }
  };

  const handleBulkAction = (action, value = null) => {
    switch (action) {
      case 'update-status':
        if (value) {
          const newEquipment = equipment?.map(item =>
            selectedItems?.includes(item?.id) ? { ...item, status: value } : item
          );
          setEquipment(newEquipment);
          setFilteredEquipment(newEquipment?.filter(item => 
            filteredEquipment?.some(filtered => filtered?.id === item?.id)
          ));
        }
        break;
      
      case 'update-condition':
        if (value) {
          const newEquipment = equipment?.map(item =>
            selectedItems?.includes(item?.id) ? { ...item, condition: value } : item
          );
          setEquipment(newEquipment);
          setFilteredEquipment(newEquipment?.filter(item => 
            filteredEquipment?.some(filtered => filtered?.id === item?.id)
          ));
        }
        break;
      
      case 'export':
        // Mock export functionality
        console.log('Exporting selected items:', selectedItems);
        alert(`Exporting ${selectedItems?.length} items...`);
        break;
      
      case 'duplicate':
        const itemsToDuplicate = equipment?.filter(item => selectedItems?.includes(item?.id));
        const duplicatedItems = itemsToDuplicate?.map(item => ({
          ...item,
          id: Date.now() + Math.random(),
          name: `${item?.name} (Copy)`,
          status: 'available',
          createdAt: new Date()?.toISOString(),
          updatedAt: new Date()?.toISOString()
        }));
        
        const newEquipmentWithDuplicates = [...equipment, ...duplicatedItems];
        setEquipment(newEquipmentWithDuplicates);
        setFilteredEquipment(newEquipmentWithDuplicates);
        break;
      
      case 'archive':
        const newEquipmentArchived = equipment?.map(item =>
          selectedItems?.includes(item?.id) ? { ...item, status: 'archived' } : item
        );
        setEquipment(newEquipmentArchived);
        setFilteredEquipment(newEquipmentArchived?.filter(item => 
          filteredEquipment?.some(filtered => filtered?.id === item?.id)
        ));
        break;
      
      case 'delete':
        const newEquipmentDeleted = equipment?.filter(item => !selectedItems?.includes(item?.id));
        setEquipment(newEquipmentDeleted);
        setFilteredEquipment(newEquipmentDeleted?.filter(item => 
          filteredEquipment?.some(filtered => filtered?.id === item?.id)
        ));
        break;
    }
    
    setSelectedItems([]);
  };

  // Pagination
  const totalPages = Math.ceil(filteredEquipment?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEquipment = filteredEquipment?.slice(startIndex, endIndex);

  return (
    <>
      <Helmet>
        <title>Inventory Management - MekRok Mining Equipment</title>
        <meta name="description" content="Comprehensive inventory management system for mining equipment. Add, edit, and manage your equipment catalog with advanced filtering and bulk operations." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <AdminSidebar 
          isCollapsed={isSidebarCollapsed} 
          onToggleCollapse={handleToggleSidebar} 
        />
        
        <main className={`transition-all duration-300 ${
          isSidebarCollapsed ? 'ml-16' : 'ml-64'
        } pt-16`}>
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <Breadcrumb items={breadcrumbItems} />
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <Icon name="Package" size={20} color="white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">Inventory Management</h1>
                    <p className="text-muted-foreground">Manage your mining equipment catalog</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="Upload"
                  iconPosition="left"
                  iconSize={16}
                >
                  Import CSV
                </Button>
                
                <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                  iconSize={16}
                  onClick={handleAddEquipment}
                >
                  Add Equipment
                </Button>
              </div>
            </div>

            {/* Statistics */}
            <InventoryStats stats={mockStats} />

            {/* Filters */}
            <InventoryFilters
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
            />

            {/* Bulk Actions */}
            <BulkActions
              selectedCount={selectedItems?.length}
              onBulkAction={handleBulkAction}
            />

            {/* Equipment Table */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredEquipment?.length)} of {filteredEquipment?.length} equipment
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="ChevronLeft"
                    iconSize={14}
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  />
                  
                  <span className="text-sm text-foreground px-3 py-1 bg-muted rounded-md">
                    {currentPage} of {totalPages}
                  </span>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="ChevronRight"
                    iconSize={14}
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  />
                </div>
              </div>

              <InventoryTable
                equipment={currentEquipment}
                selectedItems={selectedItems}
                onSelectItem={handleSelectItem}
                onSelectAll={handleSelectAll}
                onEdit={handleEditEquipment}
                onDuplicate={handleDuplicateEquipment}
                onDelete={handleDeleteEquipment}
                onViewDetails={handleViewDetails}
              />
            </div>
          </div>
        </main>

        {/* Equipment Modal */}
        <EquipmentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          equipment={editingEquipment}
          onSave={handleSaveEquipment}
        />
      </div>
    </>
  );
};

export default InventoryManagement;