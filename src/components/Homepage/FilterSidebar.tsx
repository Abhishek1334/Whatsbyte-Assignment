"use client";

import { useFilters } from '@/context/FilterContext';
import products from '@/data/products';
import { X, Filter, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut" as const
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.2,
      ease: "easeIn" as const
    }
  }
};

const backdropVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
};

const filterButtonVariants = {
  initial: {
    scale: 1
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2
    }
  },
  tap: {
    scale: 0.95
  }
};

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

  const FilterContent = () => (
    <div className="bg-primary text-text-light p-4 md:p-5 rounded-xl w-full h-fit">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-bold">Filters</h2>
        <div className="flex items-center gap-2">
          {(filters.selectedCategories.length > 0 || filters.selectedBrands.length > 0 || filters.priceRange.min > 0 || filters.priceRange.max < 1000) && (
            <motion.button
              onClick={clearAllFilters}
              className="text-sm text-text-light hover:text-gray-300 flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw size={16} />
              <span className="hidden sm:inline">Clear All</span>
            </motion.button>
          )}
          {/* Mobile Close Button */}
          <motion.button
            onClick={() => setIsMobileFiltersOpen(false)}
            className="lg:hidden text-text-light hover:text-gray-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={20} />
          </motion.button>
        </div>
      </div>
      
      {/* Category Section */}
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <h3 className="text-lg font-semibold mb-3">Category</h3>
        <div className="space-y-2">
          {availableCategories.map((category, index) => (
            <motion.label 
              key={category}
              className="flex items-center cursor-pointer"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
              whileHover={{ x: 5 }}
            >
              <div className="relative">
                <input
                  type="checkbox"
                  checked={filters.selectedCategories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                  className="sr-only"
                />
                <motion.div 
                  className={`w-5 h-5 rounded-full border-2 border-white flex items-center justify-center ${
                    filters.selectedCategories.includes(category) ? 'bg-white' : 'bg-transparent'
                  }`}
                  whileTap={{ scale: 0.9 }}
                >
                  {filters.selectedCategories.includes(category) && (
                    <motion.div 
                      className="w-3 h-3 bg-primary rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.div>
              </div>
              <span className={`ml-3 ${filters.selectedCategories.includes(category) ? 'font-semibold' : 'font-light'}`}>
                {category}
              </span>
            </motion.label>
          ))}
        </div>
      </motion.div>

      {/* Brand Section */}
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <h3 className="text-lg font-semibold mb-3">Brand</h3>
        <div className="space-y-2">
          {availableBrands.map((brand, index) => (
            <motion.label 
              key={brand}
              className="flex items-center cursor-pointer"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.05, duration: 0.3 }}
              whileHover={{ x: 5 }}
            >
              <div className="relative">
                <input
                  type="checkbox"
                  checked={filters.selectedBrands.includes(brand)}
                  onChange={() => handleBrandToggle(brand)}
                  className="sr-only"
                />
                <motion.div 
                  className={`w-5 h-5 rounded-full border-2 border-white flex items-center justify-center ${
                    filters.selectedBrands.includes(brand) ? 'bg-white' : 'bg-transparent'
                  }`}
                  whileTap={{ scale: 0.9 }}
                >
                  {filters.selectedBrands.includes(brand) && (
                    <motion.div 
                      className="w-3 h-3 bg-primary rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.div>
              </div>
              <span className={`ml-3 ${filters.selectedBrands.includes(brand) ? 'font-semibold' : 'font-light'}`}>
                {brand}
              </span>
            </motion.label>
          ))}
        </div>
      </motion.div>

      {/* Price Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <h3 className="text-lg font-semibold mb-4">Price</h3>
        <div className="space-y-4">
          {/* Dual Range Slider */}
          <div className="relative h-6">
            {/* Background track */}
            <div className="absolute top-2 w-full h-2 bg-blue-300 rounded-lg">
              {/* Active range highlight */}
              <motion.div 
                className="absolute h-2 bg-white rounded-lg"
                style={{
                  left: `${(filters.priceRange.min / 1000) * 100}%`,
                  width: `${((filters.priceRange.max - filters.priceRange.min) / 1000) * 100}%`
                }}
                layout
                transition={{ duration: 0.2 }}
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
          </div>
          
          <div className="flex justify-between text-sm">
            <span>${filters.priceRange.min}</span>
            <span>${filters.priceRange.max}</span>
          </div>
        </div>
      </motion.div>

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
          pointer-events: all;
        }
      `}</style>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden mb-4">
        <motion.button
          onClick={() => setIsMobileFiltersOpen(true)}
          className="flex items-center gap-2 bg-primary text-text-light px-4 py-2 rounded-lg hover:bg-blue-900 transition"
          variants={filterButtonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
        >
          <Filter size={20} />
          <span>Filters</span>
          {(filters.selectedCategories.length > 0 || filters.selectedBrands.length > 0 || filters.priceRange.min > 0 || filters.priceRange.max < 1000) && (
            <motion.span 
              className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              {filters.selectedCategories.length + filters.selectedBrands.length + (filters.priceRange.min > 0 ? 1 : 0) + (filters.priceRange.max < 1000 ? 1 : 0)}
            </motion.span>
          )}
        </motion.button>
      </div>

      {/* Desktop Filter Sidebar */}
      <motion.div 
        className="hidden lg:block"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" as const }}
      >
        <FilterContent />
      </motion.div>

      {/* Mobile Filter Modal */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <motion.div 
            className="lg:hidden fixed inset-0 z-50 backdrop-blur-sm flex items-start justify-center p-4 pt-8"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div 
              className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="text-text-dark">
                <FilterContent />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 