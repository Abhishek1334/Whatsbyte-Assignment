"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/types';

interface FilterState {
  searchQuery: string;
  selectedCategories: string[];
  selectedBrands: string[];
  priceRange: { min: number; max: number };
}

interface FilterContextType {
  filters: FilterState;
  setSearchQuery: (query: string) => void;
  setSelectedCategories: (categories: string[]) => void;
  setSelectedBrands: (brands: string[]) => void;
  setPriceRange: (range: { min: number; max: number }) => void;
  getFilteredProducts: (products: Product[]) => Product[];
  getAvailableCategories: (products: Product[]) => string[];
  getAvailableBrands: (products: Product[]) => string[];
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
};

interface FilterProviderProps {
  children: ReactNode;
}

export const FilterProvider = ({ children }: FilterProviderProps) => {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    selectedCategories: [],
    selectedBrands: [],
    priceRange: { min: 0, max: 1000 }
  });

  const setSearchQuery = (query: string) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
  };

  const setSelectedCategories = (categories: string[]) => {
    setFilters(prev => ({ ...prev, selectedCategories: categories }));
  };

  const setSelectedBrands = (brands: string[]) => {
    setFilters(prev => ({ ...prev, selectedBrands: brands }));
  };

  const setPriceRange = (range: { min: number; max: number }) => {
    setFilters(prev => ({ ...prev, priceRange: range }));
  };

  const getAvailableCategories = (products: Product[]): string[] => {
    const categories = [...new Set(products.map(product => product.category))];
    return categories.sort();
  };

  const getAvailableBrands = (products: Product[]): string[] => {
    const brands = [...new Set(products.map(product => product.brand))];
    return brands.sort();
  };

  const getFilteredProducts = (products: Product[]): Product[] => {
    return products.filter(product => {
      // Search filter
      const matchesSearch = product.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(filters.searchQuery.toLowerCase());

      // Category filter
      const matchesCategory = filters.selectedCategories.length === 0 || filters.selectedCategories.includes(product.category);

      // Brand filter
      const matchesBrand = filters.selectedBrands.length === 0 || filters.selectedBrands.includes(product.brand);

      // Price filter
      const matchesPrice = product.price >= filters.priceRange.min && product.price <= filters.priceRange.max;

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
    });
  };

  return (
    <FilterContext.Provider value={{
      filters,
      setSearchQuery,
      setSelectedCategories,
      setSelectedBrands,
      setPriceRange,
      getFilteredProducts,
      getAvailableCategories,
      getAvailableBrands
    }}>
      {children}
    </FilterContext.Provider>
  );
}; 