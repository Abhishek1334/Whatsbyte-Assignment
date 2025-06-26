import { useState } from 'react';

export default function FilterSidebar() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  const categories = ['All', 'Electronics', 'Clothing', 'Home'];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (value <= priceRange.max) {
      setPriceRange({ ...priceRange, min: value });
    }
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (value >= priceRange.min) {
      setPriceRange({ ...priceRange, max: value });
    }
  };

  return (
    <div className="bg-primary text-text-light p-5 rounded-lg w-70 h-fit">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-4">Filters</h2>
      
      {/* Category Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-1">Category</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label 
              key={category}
              className="flex items-center cursor-pointer"
            >
              <div className="relative">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={selectedCategory === category}
                  onChange={() => handleCategoryChange(category)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded-full border-1 border-white flex items-center justify-center ${
                  selectedCategory === category ? 'border-3' : 'bg-transparent'
                }`}>
                  {selectedCategory === category && (
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  )}
                </div>
              </div>
              <span className={`ml-3 text-lg ${selectedCategory === category ? 'font-semibold' : 'font-light'}`}>{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Section */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Price</h3>
        <div className="space-y-4">
          {/* Dual Range Slider */}
          <div className="relative h-6">
            {/* Background track */}
            <div className="absolute top-2 w-full h-2 bg-blue-300 rounded-lg">
              {/* Active range highlight */}
              <div 
                className="absolute h-2 bg-white rounded-lg"
                style={{
                  left: `${(priceRange.min / 1000) * 100}%`,
                  width: `${((priceRange.max - priceRange.min) / 1000) * 100}%`
                }}
              />
            </div>
            
            {/* Min Range Input */}
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange.min}
              onChange={handleMinPriceChange}
              className="absolute top-0 w-full h-6 appearance-none cursor-pointer slider-min bg-transparent pointer-events-auto"
              style={{ zIndex: priceRange.min > priceRange.max - 100 ? 5 : 1 }}
            />
            
            {/* Max Range Input */}
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange.max}
              onChange={handleMaxPriceChange}
              className="absolute top-0 w-full h-6 appearance-none cursor-pointer slider-max bg-transparent pointer-events-auto"
              style={{ zIndex: priceRange.min > priceRange.max - 100 ? 1 : 5 }}
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
          <div className="flex justify-between text-lg mt-2">
            <span>{priceRange.min}</span>
            <span>{priceRange.max}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 