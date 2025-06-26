import type { ReactElement } from 'react';
import FilterSidebar from '@/components/Homepage/FilterSidebar';
import ProductGrid from '@/components/Homepage/ProductGrid';

export default function Home(): ReactElement {
  return (
    <div className="min-h-screen bg-surface">
      <div className="container mx-auto py-8 flex gap-10">
        <FilterSidebar />
        <ProductGrid />
      </div>
    </div>
  );
}
