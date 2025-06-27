import type { ReactElement } from 'react';
import FilterSidebar from '@/components/Homepage/FilterSidebar';
import ProductGrid from '@/components/Homepage/ProductGrid';

export default function Home(): ReactElement {
  return (
    <div className="min-h-screen bg-surface">
      <div className="container mx-auto py-4 md:py-8">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-10">
          {/* Filter Sidebar - Mobile toggle button + desktop sidebar */}
          <div className="lg:w-80 lg:flex-shrink-0">
            <FilterSidebar />
          </div>
          
          {/* Product Grid - Takes remaining space */}
          <div className="flex-1 min-w-0">
            <ProductGrid />
          </div>
        </div>
      </div>
    </div>
  );
}
