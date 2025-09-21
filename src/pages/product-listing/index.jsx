import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import FilterPanel from './components/FilterPanel';
import SortControls from './components/SortControls';
import ProductGrid from './components/ProductGrid';
import Pagination from './components/Pagination';

const ProductListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State management
  const [filters, setFilters] = useState({
    search: searchParams?.get('search') || '',
    category: searchParams?.get('category') || '',
    condition: searchParams?.get('condition') || '',
    brand: searchParams?.get('brand') || '',
    yearMin: searchParams?.get('yearMin') || '',
    yearMax: searchParams?.get('yearMax') || '',
    hoursMin: searchParams?.get('hoursMin') || '',
    hoursMax: searchParams?.get('hoursMax') || '',
    priceMin: searchParams?.get('priceMin') || '',
    priceMax: searchParams?.get('priceMax') || '',
    location: searchParams?.get('location') || '',
    availability: searchParams?.get('availability') || '',
    financing: searchParams?.get('financing') === 'true',
    featured: searchParams?.get('featured') === 'true',
  });

  const [sortBy, setSortBy] = useState(searchParams?.get('sort') || 'relevance');
  const [viewMode, setViewMode] = useState(searchParams?.get('view') || 'grid');
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams?.get('page')) || 1);

  // Mock data for products
  const mockProducts = [
    {
      id: "EQ001",
      brand: "Caterpillar",
      model: "320D2 L Hydraulic Excavator",
      category: "Excavators",
      year: 2019,
      hours: 2850,
      condition: "Excellent",
      price: 185000,
      originalPrice: 210000,
      location: "Denver, CO",
      availability: "Immediate",
      financing: true,
      featured: true,
      image: "https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg",
      description: "Well-maintained hydraulic excavator with low hours and excellent service history. Perfect for medium to large construction projects.",
      lastUpdated: "2 days ago"
    },
    {
      id: "EQ002",
      brand: "Komatsu",
      model: "PC210LC-11 Excavator",
      category: "Excavators",
      year: 2020,
      hours: 1950,
      condition: "New",
      price: 245000,
      location: "Phoenix, AZ",
      availability: "1-2 Weeks",
      financing: true,
      featured: false,
      image: "https://images.pexels.com/photos/162539/architecture-building-site-build-162539.jpeg",
      description: "Latest model with advanced hydraulic system and fuel-efficient engine. Ideal for precision excavation work.",
      lastUpdated: "1 day ago"
    },
    {
      id: "EQ003",
      brand: "Volvo",
      model: "L120H Wheel Loader",
      category: "Loaders",
      year: 2018,
      hours: 3200,
      condition: "Good",
      price: 165000,
      originalPrice: 180000,
      location: "Houston, TX",
      availability: "Immediate",
      financing: false,
      featured: true,
      image: "https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg",
      description: "Reliable wheel loader with excellent lifting capacity and operator comfort features.",
      lastUpdated: "3 days ago"
    },
    {
      id: "EQ004",
      brand: "John Deere",
      model: "850K Crawler Dozer",
      category: "Bulldozers",
      year: 2021,
      hours: 1200,
      condition: "Excellent",
      price: 320000,
      location: "Dallas, TX",
      availability: "3-4 Weeks",
      financing: true,
      featured: false,
      image: "https://images.pixabay.com/photo/2016/11/29/03/53/architecture-1867187_1280.jpg",
      description: "Heavy-duty crawler dozer with advanced blade control and GPS integration for precision grading.",
      lastUpdated: "1 week ago"
    },
    {
      id: "EQ005",
      brand: "Liebherr",
      model: "R 926 Compact Excavator",
      category: "Excavators",
      year: 2017,
      hours: 4100,
      condition: "Fair",
      price: 125000,
      originalPrice: 145000,
      location: "Las Vegas, NV",
      availability: "Immediate",
      financing: true,
      featured: false,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12",
      description: "Compact excavator perfect for urban construction and tight spaces. Recently serviced with new tracks.",
      lastUpdated: "5 days ago"
    },
    {
      id: "EQ006",
      brand: "Hitachi",
      model: "ZX350LC-6 Excavator",
      category: "Excavators",
      year: 2019,
      hours: 2650,
      condition: "Good",
      price: 195000,
      location: "Seattle, WA",
      availability: "1-2 Weeks",
      financing: true,
      featured: true,
      image: "https://images.pexels.com/photos/162539/architecture-building-site-build-162539.jpeg",
      description: "Mid-size excavator with excellent fuel efficiency and operator comfort. Ideal for various applications.",
      lastUpdated: "4 days ago"
    },
    {
      id: "EQ007",
      brand: "Case",
      model: "CX245D SR Excavator",
      category: "Excavators",
      year: 2020,
      hours: 1800,
      condition: "Excellent",
      price: 215000,
      location: "Atlanta, GA",
      availability: "Immediate",
      financing: false,
      featured: false,
      image: "https://images.pixabay.com/photo/2016/11/29/03/53/architecture-1867187_1280.jpg",
      description: "Short radius excavator perfect for confined spaces and urban construction projects.",
      lastUpdated: "6 days ago"
    },
    {
      id: "EQ008",
      brand: "Caterpillar",
      model: "D6T XL Bulldozer",
      category: "Bulldozers",
      year: 2018,
      hours: 3500,
      condition: "Good",
      price: 285000,
      originalPrice: 315000,
      location: "Chicago, IL",
      availability: "3-4 Weeks",
      financing: true,
      featured: true,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12",
      description: "Powerful bulldozer with advanced blade technology and excellent pushing power for large projects.",
      lastUpdated: "1 week ago"
    },
    {
      id: "EQ009",
      brand: "Volvo",
      model: "A40G Articulated Hauler",
      category: "Dump Trucks",
      year: 2019,
      hours: 2950,
      condition: "Excellent",
      price: 425000,
      location: "Miami, FL",
      availability: "1-2 Weeks",
      financing: true,
      featured: false,
      image: "https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg",
      description: "High-capacity articulated hauler with excellent maneuverability and fuel efficiency.",
      lastUpdated: "3 days ago"
    }
  ];

  const itemsPerPage = 12;
  const totalItems = mockProducts?.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Filter and sort products
  const getFilteredProducts = () => {
    let filtered = [...mockProducts];

    // Apply filters
    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      filtered = filtered?.filter(product => 
        product?.brand?.toLowerCase()?.includes(searchTerm) ||
        product?.model?.toLowerCase()?.includes(searchTerm) ||
        product?.category?.toLowerCase()?.includes(searchTerm)
      );
    }

    if (filters?.category) {
      filtered = filtered?.filter(product => 
        product?.category?.toLowerCase() === filters?.category?.toLowerCase()
      );
    }

    if (filters?.condition) {
      filtered = filtered?.filter(product => 
        product?.condition?.toLowerCase() === filters?.condition?.toLowerCase()
      );
    }

    if (filters?.brand) {
      filtered = filtered?.filter(product => 
        product?.brand?.toLowerCase() === filters?.brand?.toLowerCase()
      );
    }

    if (filters?.yearMin) {
      filtered = filtered?.filter(product => product?.year >= parseInt(filters?.yearMin));
    }

    if (filters?.yearMax) {
      filtered = filtered?.filter(product => product?.year <= parseInt(filters?.yearMax));
    }

    if (filters?.hoursMin) {
      filtered = filtered?.filter(product => product?.hours >= parseInt(filters?.hoursMin));
    }

    if (filters?.hoursMax) {
      filtered = filtered?.filter(product => product?.hours <= parseInt(filters?.hoursMax));
    }

    if (filters?.priceMin) {
      filtered = filtered?.filter(product => product?.price >= parseInt(filters?.priceMin));
    }

    if (filters?.priceMax) {
      filtered = filtered?.filter(product => product?.price <= parseInt(filters?.priceMax));
    }

    if (filters?.location) {
      filtered = filtered?.filter(product => 
        product?.location?.toLowerCase()?.includes(filters?.location?.toLowerCase())
      );
    }

    if (filters?.availability) {
      filtered = filtered?.filter(product => 
        product?.availability?.toLowerCase() === filters?.availability?.toLowerCase()
      );
    }

    if (filters?.financing) {
      filtered = filtered?.filter(product => product?.financing);
    }

    if (filters?.featured) {
      filtered = filtered?.filter(product => product?.featured);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered?.sort((a, b) => a?.price - b?.price);
        break;
      case 'price-high':
        filtered?.sort((a, b) => b?.price - a?.price);
        break;
      case 'year-new':
        filtered?.sort((a, b) => b?.year - a?.year);
        break;
      case 'year-old':
        filtered?.sort((a, b) => a?.year - b?.year);
        break;
      case 'hours-low':
        filtered?.sort((a, b) => a?.hours - b?.hours);
        break;
      case 'hours-high':
        filtered?.sort((a, b) => b?.hours - a?.hours);
        break;
      case 'location':
        filtered?.sort((a, b) => a?.location?.localeCompare(b?.location));
        break;
      default:
        // Keep original order for relevance
        break;
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();
  const paginatedProducts = filteredProducts?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Update URL parameters
  useEffect(() => {
    const params = new URLSearchParams();
    
    Object.entries(filters)?.forEach(([key, value]) => {
      if (value && value !== '' && value !== false) {
        params?.set(key, value?.toString());
      }
    });

    if (sortBy !== 'relevance') params?.set('sort', sortBy);
    if (viewMode !== 'grid') params?.set('view', viewMode);
    if (currentPage !== 1) params?.set('page', currentPage?.toString());

    setSearchParams(params);
  }, [filters, sortBy, viewMode, currentPage, setSearchParams]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      search: '',
      category: '',
      condition: '',
      brand: '',
      yearMin: '',
      yearMax: '',
      hoursMin: '',
      hoursMax: '',
      priceMin: '',
      priceMax: '',
      location: '',
      availability: '',
      financing: false,
      featured: false,
    };
    setFilters(clearedFilters);
    setCurrentPage(1);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    setCurrentPage(1);
  };

  const handleViewModeChange = (newViewMode) => {
    setViewMode(newViewMode);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const breadcrumbItems = [
    { label: 'Equipment Catalog', path: '/product-listing' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} />

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Mining Equipment Catalog</h1>
            <p className="text-muted-foreground">
              Browse our extensive inventory of verified mining equipment from trusted suppliers
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter Sidebar */}
            <div className="lg:w-80 lg:flex-shrink-0">
              <FilterPanel
                isOpen={isFilterOpen}
                onToggle={() => setIsFilterOpen(!isFilterOpen)}
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
                resultCount={filteredProducts?.length}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1 space-y-6">
              {/* Sort Controls */}
              <SortControls
                sortBy={sortBy}
                onSortChange={handleSortChange}
                viewMode={viewMode}
                onViewModeChange={handleViewModeChange}
                resultCount={filteredProducts?.length}
                currentPage={currentPage}
                totalPages={Math.ceil(filteredProducts?.length / itemsPerPage)}
              />

              {/* Product Grid */}
              <ProductGrid
                products={paginatedProducts}
                viewMode={viewMode}
                loading={loading}
                error={error}
              />

              {/* Pagination */}
              {filteredProducts?.length > itemsPerPage && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(filteredProducts?.length / itemsPerPage)}
                  onPageChange={handlePageChange}
                  itemsPerPage={itemsPerPage}
                  totalItems={filteredProducts?.length}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductListing;