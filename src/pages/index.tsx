import type { ReactElement } from 'react';
import FilterSidebar from '@/components/Homepage/FilterSidebar';

export default function Home(): ReactElement {
  return (
    <div className="min-h-screen bg-surface">
      <div className="container mx-auto py-8">
        <FilterSidebar />
      </div>
    </div>
  );
}
