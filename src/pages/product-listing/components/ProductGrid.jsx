import React from 'react';
import ProductCard from './ProductCard';
import ProductListItem from './ProductListItem';
import Icon from '../../../components/AppIcon';

const ProductGrid = ({ products, viewMode, loading, error }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center space-y-4">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="text-muted-foreground">Loading equipment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center space-y-4">
          <Icon name="AlertCircle" size={48} className="text-error mx-auto" />
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Error Loading Equipment</h3>
            <p className="text-muted-foreground">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!products || products?.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center space-y-4">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto" />
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No Equipment Found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
          </div>
        </div>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {products?.map((product) => (
          <ProductListItem key={product?.id} product={product} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {products?.map((product) => (
        <ProductCard key={product?.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;