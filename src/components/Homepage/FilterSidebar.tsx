"use client";

import { useState, useEffect } from 'react';
import { useFilters } from '@/context/FilterContext';
import { Filter, X, RotateCcw } from 'lucide-react';
import products from '@/data/products';

export default function FilterSidebar() {
  const { 
    filters, 
    setSelectedCategories, 
    setSelectedBrands, 
    setPriceRange,
    getAvailableCategories, 
    getAvailableBrands,
    clearAllFilters 
  } = useFilters();

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  
  // Local state for price range to enable smooth dragging
  const [localPriceRange, setLocalPriceRange] = useState(filters.priceRange);
  const [isDragging, setIsDragging] = useState(false);

  // Update local state when filters change externally
  useEffect(() => {
    if (!isDragging) {
      setLocalPriceRange(filters.priceRange);
    }
  }, [filters.priceRange, isDragging]);

  // Debounce function to update filters after user stops dragging
  useEffect(() => {
    if (isDragging) {
      const timer = setTimeout(() => {
        setPriceRange(localPriceRange);
        setIsDragging(false);
      }, 300); // 300ms delay after user stops dragging

      return () => clearTimeout(timer);
    }
  }, [localPriceRange, isDragging, setPriceRange]);

  const availableCategories = getAvailableCategories(products);
  const availableBrands = getAvailableBrands(products);

  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.selectedCategories.includes(category)
      ? filters.selectedCategories.filter(c => c !== category)
      : [...filters.selectedCategories, category];
    setSelectedCategories(newCategories);
  };

  const handleBrandToggle = (brand: string) => {
    const newBrands = filters.selectedBrands.includes(brand)
      ? filters.selectedBrands.filter(b => b !== brand)
      : [...filters.selectedBrands, brand];
    setSelectedBrands(newBrands);
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (value <= localPriceRange.max) {
      setLocalPriceRange({ ...localPriceRange, min: value });
      setIsDragging(true);
    }
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (value >= localPriceRange.min) {
      setLocalPriceRange({ ...localPriceRange, max: value });
      setIsDragging(true);
    }
  };

  const handlePriceInputEnd = () => {
    // Immediately apply the filter when user releases the slider
    setPriceRange(localPriceRange);
    setIsDragging(false);
  };

  const FilterContent = () => (
    <div className="bg-primary text-text-light p-4 md:p-5 rounded-xl w-full h-fit">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-bold">Filters</h2>
        <div className="flex items-center gap-2">
          {(filters.selectedCategories.length > 0 || filters.selectedBrands.length > 0 || filters.priceRange.min > 0 || filters.priceRange.max < 1000) && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-text-light hover:text-gray-300 flex items-center gap-1 transition-colors"
            >
              <RotateCcw size={16} />
              <span className="hidden sm:inline">Clear All</span>
            </button>
          )}
          {/* Mobile Close Button */}
          <button
            onClick={() => setIsMobileFiltersOpen(false)}
            className="lg:hidden text-text-light hover:text-gray-300 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </div>
      
      {/* Category Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Category</h3>
        <div className="space-y-2">
          {availableCategories.map((category) => (
            <label 
              key={category}
              className="flex items-center cursor-pointer hover:translate-x-1 transition-transform"
            >
              <div className="relative">
                <input
                  type="checkbox"
                  checked={filters.selectedCategories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                  className="sr-only"
                />
                <div 
                  className={`w-5 h-5 rounded-full border-2 border-white flex items-center justify-center transition-colors ${
                    filters.selectedCategories.includes(category) ? 'bg-white' : 'bg-transparent'
                  }`}
                >
                  {filters.selectedCategories.includes(category) && (
                    <div className="w-3 h-3 bg-primary rounded-full" />
                  )}
                </div>
              </div>
              <span className={`ml-3 ${filters.selectedCategories.includes(category) ? 'font-semibold' : 'font-light'}`}>
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Brand Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Brand</h3>
        <div className="space-y-2">
          {availableBrands.map((brand) => (
            <label 
              key={brand}
              className="flex items-center cursor-pointer hover:translate-x-1 transition-transform"
            >
              <div className="relative">
                <input
                  type="checkbox"
                  checked={filters.selectedBrands.includes(brand)}
                  onChange={() => handleBrandToggle(brand)}
                  className="sr-only"
                />
                <div 
                  className={`w-5 h-5 rounded-full border-2 border-white flex items-center justify-center transition-colors ${
                    filters.selectedBrands.includes(brand) ? 'bg-white' : 'bg-transparent'
                  }`}
                >
                  {filters.selectedBrands.includes(brand) && (
                    <div className="w-3 h-3 bg-primary rounded-full" />
                  )}
                </div>
              </div>
              <span className={`ml-3 ${filters.selectedBrands.includes(brand) ? 'font-semibold' : 'font-light'}`}>
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Price</h3>
        <div className="space-y-4">
          {/* Dual Range Slider */}
          <div className="relative px-2">
            {/* Background track */}
            <div className="relative h-2 bg-blue-300 rounded-full">
              {/* Active range highlight */}
              <div 
                className="absolute h-2 bg-white rounded-full"
                style={{
                  left: `${(localPriceRange.min / 1000) * 100}%`,
                  width: `${((localPriceRange.max - localPriceRange.min) / 1000) * 100}%`
                }}
              />
            </div>
            
            {/* Min Range Input */}
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={localPriceRange.min}
              onChange={handleMinPriceChange}
              onMouseUp={handlePriceInputEnd}
              onTouchEnd={handlePriceInputEnd}
              className="absolute top-0 w-full h-2 bg-transparent cursor-pointer range-input"
              style={{ 
                zIndex: localPriceRange.min > localPriceRange.max - 100 ? 3 : 1,
                pointerEvents: 'all'
              }}
            />
            
            {/* Max Range Input */}
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={localPriceRange.max}
              onChange={handleMaxPriceChange}
              onMouseUp={handlePriceInputEnd}
              onTouchEnd={handlePriceInputEnd}
              className="absolute top-0 w-full h-2 bg-transparent cursor-pointer range-input"
              style={{ 
                zIndex: localPriceRange.min > localPriceRange.max - 100 ? 1 : 3,
                pointerEvents: 'all'
              }}
            />
          </div>
          
          <div className="flex justify-between text-sm mt-4">
            <span>${localPriceRange.min}</span>
            <span>${localPriceRange.max}</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .range-input {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
          outline: none;
        }
        
        .range-input::-webkit-slider-track {
          background: transparent;
          height: 8px;
        }
        
        .range-input::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: 3px solid #0758A8;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          margin-top: -9px;
        }
        
        .range-input::-webkit-slider-thumb:hover {
          box-shadow: 0 3px 6px rgba(0,0,0,0.3);
        }
        
        .range-input::-webkit-slider-thumb:active {
          box-shadow: 0 4px 8px rgba(0,0,0,0.4);
        }
        
        /* Firefox */
        .range-input::-moz-range-track {
          background: transparent;
          height: 8px;
          border: none;
        }
        
        .range-input::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: 3px solid #0758A8;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .range-input::-moz-range-thumb:hover {
          box-shadow: 0 3px 6px rgba(0,0,0,0.3);
        }
        
        .range-input::-moz-range-thumb:active {
          box-shadow: 0 4px 8px rgba(0,0,0,0.4);
        }
      `}</style>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsMobileFiltersOpen(true)}
          className="flex items-center gap-2 bg-primary text-text-light px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors"
        >
          <Filter size={20} />
          <span>Filters</span>
          {(filters.selectedCategories.length > 0 || filters.selectedBrands.length > 0 || filters.priceRange.min > 0 || filters.priceRange.max < 1000) && (
            <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {filters.selectedCategories.length + filters.selectedBrands.length + (filters.priceRange.min > 0 ? 1 : 0) + (filters.priceRange.max < 1000 ? 1 : 0)}
            </span>
          )}
        </button>
      </div>

      {/* Desktop Filter Sidebar */}
      <div className="hidden lg:block">
        <FilterContent />
      </div>

      {/* Mobile Filter Modal */}
      {isMobileFiltersOpen && (
        <div className="lg:hidden fixed inset-0 z-50 backdrop-blur-sm flex items-start justify-center p-4 pt-8">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
            <div className="text-text-dark">
              <FilterContent />
            </div>
          </div>
        </div>
      )}
    </>
  );
} 