"use client";

import { useFilters } from '@/context/FilterContext';
import products from '@/data/products';
import { X } from 'lucide-react';

export default function FilterSidebar() {
  const { 
    filters, 
    setSelectedCategories, 
    setSelectedBrands, 
    setPriceRange,
    getAvailableCategories,
    getAvailableBrands
  } = useFilters();

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
    if (value <= filters.priceRange.max) {
      setPriceRange({ ...filters.priceRange, min: value });
    }
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (value >= filters.priceRange.min) {
      setPriceRange({ ...filters.priceRange, max: value });
    }
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange({ min: 0, max: 1000 });
  };

  return (
    <div className="bg-primary text-text-light p-5 rounded-xl w-70 h-fit">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Filters</h2>
        {(filters.selectedCategories.length > 0 || filters.selectedBrands.length > 0) && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-text-light hover:text-gray-300 flex items-center gap-1"
          >
            <X size={16} />
            Clear All
          </button>
        )}
      </div>
      
      {/* Category Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Category</h3>
        <div className="space-y-2">
          {availableCategories.map((category) => (
            <label 
              key={category}
              className="flex items-center cursor-pointer"
            >
              <div className="relative">
                <input
                  type="checkbox"
                  checked={filters.selectedCategories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded-full border-2 border-white flex items-center justify-center ${
                  filters.selectedCategories.includes(category) ? 'bg-white' : 'bg-transparent'
                }`}>
                  {filters.selectedCategories.includes(category) && (
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                  )}
                </div>
              </div>
              <span className={`ml-3  ${filters.selectedCategories.includes(category) ? 'font-semibold' : 'font-light'}`}>
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Brand Section */}
      <div className="mb-6 ">
        <h3 className="text-lg font-semibold mb-3">Brand</h3>
        <div className="space-y-2">
          {availableBrands.map((brand) => (
            <label 
              key={brand}
              className="flex items-center cursor-pointer"
            >
              <div className="relative">
                <input
                  type="checkbox"
                  checked={filters.selectedBrands.includes(brand)}
                  onChange={() => handleBrandToggle(brand)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded-full border-2 border-white flex items-center justify-center ${
                  filters.selectedBrands.includes(brand) ? 'bg-white' : 'bg-transparent'
                }`}>
                  {filters.selectedBrands.includes(brand) && (
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                  )}
                </div>
              </div>
              <span className={`ml-3  ${filters.selectedBrands.includes(brand) ? 'font-semibold' : 'font-light'}`}>
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
          <div className="relative h-6">
            {/* Background track */}
            <div className="absolute top-2 w-full h-2 bg-blue-300 rounded-lg">
              {/* Active range highlight */}
              <div 
                className="absolute h-2 bg-white rounded-lg"
                style={{
                  left: `${(filters.priceRange.min / 1000) * 100}%`,
                  width: `${((filters.priceRange.max - filters.priceRange.min) / 1000) * 100}%`
                }}
              />
            </div>
            
            {/* Min Range Input */}
            <input
              type="range"
              min="0"
              max="1000"
              value={filters.priceRange.min}
              onChange={handleMinPriceChange}
              className="absolute top-0 w-full h-6 appearance-none cursor-pointer slider-min bg-transparent pointer-events-auto"
              style={{ zIndex: filters.priceRange.min > filters.priceRange.max - 100 ? 5 : 1 }}
            />
            
            {/* Max Range Input */}
            <input
              type="range"
              min="0"
              max="1000"
              value={filters.priceRange.max}
              onChange={handleMaxPriceChange}
              className="absolute top-0 w-full h-6 appearance-none cursor-pointer slider-max bg-transparent pointer-events-auto"
              style={{ zIndex: filters.priceRange.min > filters.priceRange.max - 100 ? 1 : 5 }}
            />
            
            <style jsx>{`
              .slider-min::-webkit-slider-thumb,
              .slider-max::-webkit-slider-thumb {
                appearance: none;
                height: 20px;
                width: 20px;
                border-radius: 50%;
                background: white;
                cursor: pointer;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                border: 2px solid #0758A8;
                pointer-events: all;
              }
              .slider-min::-moz-range-thumb,
              .slider-max::-moz-range-thumb {
                height: 20px;
                width: 20px;
                border-radius: 50%;
                background: white;
                cursor: pointer;
                border: 2px solid #0758A8;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                pointer-events: all;
              }
              .slider-min::-webkit-slider-track,
              .slider-max::-webkit-slider-track {
                background: transparent;
                height: 2px;
              }
              .slider-min::-moz-range-track,
              .slider-max::-moz-range-track {
                background: transparent;
                height: 2px;
              }
              .slider-min {
                pointer-events: none;
              }
              .slider-max {
                pointer-events: none;
              }
              .slider-min::-webkit-slider-thumb {
                pointer-events: all;
                position: relative;
              }
              .slider-max::-webkit-slider-thumb {
                pointer-events: all;
                position: relative;
              }
            `}</style>
          </div>
          
          {/* Price Range Display */}
          <div className="flex justify-between mt-2">
            <span>${filters.priceRange.min}</span>
            <span>${filters.priceRange.max}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 