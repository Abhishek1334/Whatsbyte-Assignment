"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
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
  clearAllFilters: () => void;
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
  const router = useRouter();
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    selectedCategories: [],
    selectedBrands: [],
    priceRange: { min: 0, max: 1000 }
  });

  // Initialize filters from URL on component mount
  useEffect(() => {
    if (router.isReady) {
      const { search, category, brand, minPrice, maxPrice } = router.query;
      
      setFilters(prev => ({
        ...prev,
        searchQuery: (search as string) || '',
        selectedCategories: category ? (Array.isArray(category) ? category : [category]) : [],
        selectedBrands: brand ? (Array.isArray(brand) ? brand : [brand]) : [],
        priceRange: {
          min: minPrice ? parseInt(minPrice as string) : 0,
          max: maxPrice ? parseInt(maxPrice as string) : 1000
        }
      }));
    }
  }, [router.isReady, router.query]);

  // Update URL when filters change
  const updateURL = (newFilters: FilterState) => {
    const query: any = {};
    
    if (newFilters.searchQuery) query.search = newFilters.searchQuery;
    if (newFilters.selectedCategories.length > 0) query.category = newFilters.selectedCategories;
    if (newFilters.selectedBrands.length > 0) query.brand = newFilters.selectedBrands;
    if (newFilters.priceRange.min > 0) query.minPrice = newFilters.priceRange.min.toString();
    if (newFilters.priceRange.max < 1000) query.maxPrice = newFilters.priceRange.max.toString();

    router.push({
      pathname: router.pathname,
      query
    }, undefined, { shallow: true });
  };

  const setSearchQuery = (query: string) => {
    const newFilters = { ...filters, searchQuery: query };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const setSelectedCategories = (categories: string[]) => {
    const newFilters = { ...filters, selectedCategories: categories };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const setSelectedBrands = (brands: string[]) => {
    const newFilters = { ...filters, selectedBrands: brands };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const setPriceRange = (range: { min: number; max: number }) => {
    const newFilters = { ...filters, priceRange: range };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  const clearAllFilters = () => {
    const newFilters = {
      searchQuery: '',
      selectedCategories: [],
      selectedBrands: [],
      priceRange: { min: 0, max: 1000 }
    };
    setFilters(newFilters);
    updateURL(newFilters);
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
      const matchesSearch = !filters.searchQuery || 
        product.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(filters.searchQuery.toLowerCase());

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
      getAvailableBrands,
      clearAllFilters
    }}>
      {children}
    </FilterContext.Provider>
  );
}; 